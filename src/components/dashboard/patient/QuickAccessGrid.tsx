import { 
  Activity, 
  Pill, 
  Microscope, 
  CalendarCheck, 
  ReceiptText, 
  Headphones,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

const cards = [
  { id: 'summary', icon: Activity, title: 'Health Summary', desc: 'Vital signs, allergies, and chronic conditions tracking.' },
  { id: 'medications', icon: Pill, title: 'Prescriptions', desc: 'Active medications and dosage schedules.' },
  { id: 'reports', icon: Microscope, title: 'Medical Reports', desc: 'Diagnostic results and pathology findings.' },
  { id: 'appointments', icon: CalendarCheck, title: 'Appointments', desc: 'View and manage your upcoming clinical visits.' },
  { id: 'billing', icon: ReceiptText, title: 'Bills & Payments', desc: 'Invoices, insurance claims, and payment history.' },
  { id: 'help', icon: Headphones, title: 'Help & Support', desc: '24/7 clinical assistance and portal guidance.' },
];

export default function QuickAccessGrid({ onViewChange }: { onViewChange: (view: string) => void }) {
  return (
    <section id="quick-access" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          whileHover={{ y: -4 }}
          onClick={() => onViewChange(card.id)}
          className="group relative bg-white p-6 rounded-2xl border-l-4 border-secondary shadow-sm hover:shadow-xl transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary/5 rounded-xl group-hover:bg-secondary transition-colors">
              <card.icon className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
            </div>
            <ExternalLink className="w-4 h-4 text-outline-variant opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h4 className="text-base font-bold text-primary mb-1">{card.title}</h4>
          <p className="text-sm text-outline leading-relaxed">
            {card.desc}
          </p>
        </motion.div>
      ))}
    </section>
  );
}
