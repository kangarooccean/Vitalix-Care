import { AlertTriangle, Clock, MapPin, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function WelcomeBanner() {
  const stats = [
    { icon: Clock, label: 'Admission Date', value: 'Oct 12, 2023' },
    { icon: MapPin, label: 'Primary Ward', value: 'B-Wing, Room 402' },
    { icon: UserCheck, label: 'Lead Clinician', value: 'Dr. Sarah Jenkins' },
  ];

  return (
    <section id="welcome-banner" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-8 mb-8 text-white shadow-xl">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold mb-2 tracking-tight">Welcome back, Ramesh</h3>
          <p className="text-white/80 text-base max-w-2xl mb-8 leading-relaxed">
            Your health journey is our priority. Access your clinical summary and real-time monitoring data for the current admission period.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-wrap gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * idx }}
                className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl min-w-[180px]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="w-3 h-3 text-white" />
                  <p className="text-[10px] uppercase tracking-widest font-mono text-white/80 font-bold">
                    {stat.label}
                  </p>
                </div>
                <p className="text-lg font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-4 bg-secondary text-white font-bold rounded-2xl shadow-lg hover:shadow-secondary/20 transition-all border border-white/20"
          >
            <AlertTriangle className="w-5 h-5" />
            Emergency Alert
          </motion.button>
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mb-32 blur-2xl" />
    </section>
  );
}
