import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

app.use(cors());
app.use(express.json());

// Middleware to protect routes and enforce HIPAA technical safeguards (Audit Logging)
const requireAuth = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    // HIPAA Safeguard: Audit Logging
    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: `ACCESS_${req.method}_${req.path}`,
        details: 'API request',
        ipAddress: req.ip
      }
    });

    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Seeding endpoint (since we don't have a real registration flow for all roles yet)
app.post('/api/seed', async (req, res) => {
  const users = [
    { email: 'sarah.n@vitalix.com', password: 'password123', name: 'Nurse Sarah', role: 'staff' },
    { email: 'sharma@vitalix.com', password: 'password123', name: 'Dr. Sharma', role: 'doctor' },
    { email: 'elena.r@example.com', password: 'password123', name: 'Elena Rodriguez', role: 'patient' },
    { email: 'admin@medcore.com', password: 'password123', name: 'Systems Admin', role: 'admin' },
    { email: 'family@example.com', password: 'password123', name: 'Rodriguez Family', role: 'family' }
  ];

  for (const u of users) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      await prisma.user.create({
        data: { ...u, password: hashedPassword }
      });
    }
  }
  res.json({ message: 'Database seeded' });
});

// Authentication endpoint
app.post('/api/login', async (req: any, res: any) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    // Audit failed login attempt (HIPAA recommended)
    if (user) {
      await prisma.auditLog.create({
        data: { userId: user.id, action: 'FAILED_LOGIN', details: 'Invalid password', ipAddress: req.ip }
      });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Audit successful login
  await prisma.auditLog.create({
    data: { userId: user.id, action: 'LOGIN', details: 'Successful login', ipAddress: req.ip }
  });

  const payload = { id: user.id, role: user.role, name: user.name, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET);

  res.json({ token, user: payload });
});

app.get('/api/me', requireAuth, async (req: any, res: any) => {
  res.json(req.user);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
