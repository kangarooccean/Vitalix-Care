/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Download, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Wallet,
  Landmark,
  Verified,
  Info,
  XCircle,
  QrCode,
  Plus,
  Save,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Billing({ role }: { role: 'staff' | 'family' | 'doctor' | 'patient' }) {
  const [isPaymentSectionOpen, setIsPaymentSectionOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Card');
  const isStaff = role === 'staff' || role === 'doctor';

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="p-8 space-y-8 max-w-[1440px] mx-auto"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/5 rounded-lg">
              <ReceiptText className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight">
              {isStaff ? 'Financial Operations' : 'My Bills & Payments'}
            </h2>
          </div>
          <p className="text-on-surface-variant font-medium">
            {isStaff ? 'Manage clinic-wide revenue, insurance claims, and outstanding balances.' : 'Manage your clinical financial statements and insurance claims.'}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-surface-container-highest px-4 py-2.5 rounded-xl text-sm font-bold text-primary flex items-center gap-2 hover:bg-surface-container-low transition-all shadow-ambient">
            <Download className="w-4 h-4" />
            Download {isStaff ? 'All Reports' : 'All Statements'}
          </button>
          {!isStaff && (
            <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:bg-primary-container transition-all">
              <CreditCard className="w-4 h-4" />
              Pay Outstanding
            </button>
          )}
        </div>
      </div>

      {/* Top Section Bento */}
      <div className="grid grid-cols-12 gap-6">
        {/* Summary Card */}
        <motion.div 
          variants={item}
          className="col-span-12 lg:col-span-8 bg-gradient-to-br from-primary to-primary-container rounded-2xl p-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Wallet className="w-48 h-48 text-white rotate-12" />
          </div>
          
          <div className="relative z-10 space-y-10">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-on-primary-container uppercase tracking-widest font-bold">Financial Summary</span>
                <h3 className="text-2xl font-bold text-white">
                   {isStaff ? 'Clinic Identifier: #V-CORP-01' : 'Patient ID: #VX-992810'}
                </h3>
              </div>
              
              <div className="glass-card rounded-xl p-3 flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-white p-1.5 flex items-center justify-center">
                  <ShieldCheck className="w-full h-full text-secondary" />
                </div>
                <div>
                  <p className="text-[9px] text-white/70 uppercase font-black tracking-tighter leading-none">
                    {isStaff ? 'Revenue Tier' : 'Primary Insurance'}
                  </p>
                  <p className="text-sm font-extrabold text-white">{isStaff ? 'Premium Optimized' : 'Star Health'}</p>
                </div>
                <span className="bg-secondary text-white text-[9px] px-2 py-0.5 rounded-full font-black tracking-widest">ACTIVE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-on-primary-container font-black uppercase">{isStaff ? 'Total Revenue' : 'Total Bill'}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white tracking-tighter">Rs. {isStaff ? '12.4L' : '45k'}</span>
                  <span className="text-xs text-on-primary-container font-bold">INR</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-on-primary-container font-black uppercase">{isStaff ? 'Paid Invoices' : 'Paid Amount'}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-secondary tracking-tighter">Rs. {isStaff ? '9.8L' : '20k'}</span>
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-on-primary-container font-black uppercase">Pending Dues</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-error tracking-tighter">Rs. {isStaff ? '2.6L' : '25k'}</span>
                  <AlertTriangle className="w-5 h-5 text-error animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment History Card */}
        <motion.div 
          variants={item}
          className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-surface-container-highest p-8 shadow-ambient flex flex-col"
        >
          <h3 className="text-lg font-extrabold text-primary mb-6">{isStaff ? 'Recent Revenue' : 'Payment History'}</h3>
          <div className="flex-1 space-y-4">
            {[
              { type: 'Online Payment', date: '12 Oct 2023', method: 'UPI', amount: isStaff ? '4,500' : '15,000', icon: Smartphone },
              { type: 'Bank Transfer', date: '05 Oct 2023', method: 'NEFT', amount: isStaff ? '1,200' : '5,000', icon: Landmark }
            ].map((pay, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-surface-container-low rounded-xl transition-all border-l-4 border-secondary group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                    <pay.icon className="w-5 h-5 text-on-secondary-container" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">{pay.type}</p>
                    <p className="text-[10px] font-mono text-on-surface-variant uppercase font-bold">{pay.date} • {pay.method}</p>
                  </div>
                </div>
                <span className="text-sm font-black text-secondary">Rs. {pay.amount}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 text-primary text-xs font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
            View All Transactions
          </button>
        </motion.div>
      </div>

      {/* Itemized Bill Breakdown Table */}
      <motion.div 
        variants={item}
        className="bg-white rounded-2xl border border-surface-container-highest overflow-hidden shadow-ambient"
      >
        <div className="px-8 py-5 border-b border-surface-container-highest bg-surface-container-low/50 flex justify-between items-center">
          <h3 className="text-lg font-extrabold text-primary">{isStaff ? 'Recent Invoices' : 'Itemized Bill Breakdown'}</h3>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase text-on-surface-variant">Filter by:</span>
            <select className="text-[11px] font-bold border-surface-container-highest rounded-lg px-3 py-1.5 focus:ring-primary focus:border-primary border border-outline-variant/30">
              <option>Latest Episode</option>
              <option>Previous Stays</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest border-b border-surface-container-highest">Service Date</th>
                <th className="px-8 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest border-b border-surface-container-highest">{isStaff ? 'Patient / Description' : 'Description'}</th>
                <th className="px-8 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest border-b border-surface-container-highest">Category</th>
                <th className="px-8 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest border-b border-surface-container-highest">Insurance</th>
                <th className="px-8 py-4 text-[10px] font-black text-on-surface-variant uppercase tracking-widest border-b border-surface-container-highest text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-highest">
              {[
                { date: '10 Oct 2023', title: isStaff ? 'Elena Rodriguez' : 'Standard Semi-Private Room', desc: isStaff ? 'Admission Fee' : '3 Nights stay • Ward 4B', cat: 'ROOM NAVY', catColor: 'bg-primary text-white', status: 'Fully Covered', statusIcon: Verified, statusColor: 'text-secondary', amount: '18,450.00' },
                { date: '11 Oct 2023', title: isStaff ? 'Jane Smith' : 'Consultation - Dr. Sharma', desc: isStaff ? 'Specialist Consultation' : 'Cardiology Review', cat: 'DOCTOR BLUE', catColor: 'bg-primary-container text-on-primary-container', status: '80% Coverage', statusIcon: Info, statusColor: 'text-on-surface-variant', amount: '4,500.00' },
                { date: '11 Oct 2023', title: isStaff ? 'Alice Brown' : 'Cardiac Enzyme Profile', desc: 'Lab Diagnostics', cat: 'LABORATORY', catColor: 'bg-secondary-container text-on-secondary-container', status: 'Fully Covered', statusIcon: Verified, statusColor: 'text-secondary', amount: '7,200.00' },
                { date: '12 Oct 2023', title: isStaff ? 'Bob Wilson' : 'Pharmacy - Inpatient Meds', desc: 'Antibiotics & Pain Relief', cat: 'PHARMACY', catColor: 'bg-surface-container-highest text-primary', status: 'Out-of-Pocket', statusIcon: XCircle, statusColor: 'text-error', amount: '15,300.00' }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low transition-colors group cursor-default">
                  <td className="px-8 py-5 text-sm font-bold text-primary">{row.date}</td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-extrabold text-primary">{row.title}</p>
                    <p className="text-[11px] font-medium text-on-surface-variant opacity-70">{row.desc}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${row.catColor}`}>
                      {row.cat}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className={`flex items-center gap-1.5 text-xs font-bold ${row.statusColor}`}>
                      <row.statusIcon className="w-4 h-4" />
                      {row.status}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-primary font-mono">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-6 bg-surface-container-low flex flex-col md:flex-row justify-between items-center gap-6 border-t border-surface-container-highest">
          <div className="flex items-center gap-10">
            <div>
              <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Subtotal</p>
              <p className="text-lg font-extrabold text-primary">Rs. 45,450.00</p>
            </div>
            <div className="h-8 w-px bg-surface-container-highest" />
            <div>
              <p className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest mb-1">Insurance Discount</p>
              <p className="text-lg font-extrabold text-secondary font-mono">- Rs.12,850.00</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">Total {isStaff ? 'Revenue' : 'Payable'}</p>
            <p className="text-3xl font-black text-primary tracking-tighter">Rs. 32,600.00</p>
          </div>
        </div>
      </motion.div>

      {/* NEW: Collapsible Add Payment Method Section */}
      {!isStaff && (
        <motion.div 
          variants={item}
          className="bg-white rounded-2xl border border-surface-container-highest shadow-ambient overflow-hidden"
        >
          <button 
            onClick={() => setIsPaymentSectionOpen(!isPaymentSectionOpen)}
            className="w-full px-8 py-5 flex items-center justify-between hover:bg-surface-container-low transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-extrabold text-primary">Add New Payment Method</h3>
            </div>
            {isPaymentSectionOpen ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
          </button>
          
          <AnimatePresence>
            {isPaymentSectionOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="px-8 pb-8"
              >
                <div className="flex gap-4 mb-8">
                  {['Card', 'UPI', 'Net Banking', 'QR Code'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all ${
                        selectedType === type 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-outline-variant/20 hover:border-primary/30'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {selectedType === 'QR Code' ? (
                  <div className="flex flex-col items-center py-8 bg-surface-container/20 rounded-2xl border-2 border-dashed border-outline-variant/30">
                    <QrCode className="w-24 h-24 text-primary mb-4" />
                    <p className="text-sm font-bold text-primary">Scan to Pay via UPI</p>
                    <p className="text-[10px] text-outline font-medium mt-1">Accepts all major UPI apps</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest">
                        {selectedType === 'Card' ? 'Card Number' : selectedType === 'UPI' ? 'UPI ID' : 'Account Number'}
                      </label>
                      <input 
                        type="text" 
                        placeholder={selectedType === 'Card' ? "XXXX XXXX XXXX XXXX" : selectedType === 'UPI' ? "user@upi" : "000000000000"}
                        className="w-full px-4 py-3 rounded-xl border border-surface-container-highest focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest">
                        {selectedType === 'Card' ? 'Expiry Date' : 'Bank / Provider'}
                      </label>
                      <input 
                        type="text" 
                        placeholder={selectedType === 'Card' ? "MM / YY" : "HDFC / Google Pay"}
                        className="w-full px-4 py-3 rounded-xl border border-surface-container-highest focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest">
                        {selectedType === 'Card' ? 'CVV' : 'Full Name'}
                      </label>
                      <input 
                        type={selectedType === 'Card' ? "password" : "text"}
                        placeholder={selectedType === 'Card' ? "***" : "Elena Rodriguez"}
                        className="w-full px-4 py-3 rounded-xl border border-surface-container-highest focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button className="bg-primary text-white px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-container transition-all shadow-lg active:scale-95">
                    <Save className="w-4 h-4" />
                    Save Payment Method
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Insurance Claim Status Section */}
      <motion.div 
        variants={item}
        className="bg-surface-container-low border border-dashed border-primary/20 rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-8"
      >
        <div className="flex items-start gap-6">
          <div className="p-4 bg-white rounded-2xl shadow-ambient">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-xl font-extrabold text-primary">Insurance Claim: #CLM-90112</h4>
              <span className="bg-[#FFF4E5] text-[#B76E00] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#B76E00]/20">
                Pending Submission
              </span>
            </div>
            <p className="text-on-surface-variant text-sm font-medium leading-relaxed max-w-2xl">
              We are waiting for the final discharge summary to finalize your claim with <span className="font-bold text-primary underline decoration-primary/30">Star Health</span>. 
              Last updated: 13 Oct 2023, 09:45 AM.
            </p>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <button className="bg-white border border-surface-container-highest px-6 py-3 rounded-xl text-sm font-bold text-primary hover:bg-white/80 shadow-ambient transition-all">
            Submit Documents
          </button>
          <button className="bg-primary text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg hover:opacity-90 transition-all">
            Check Status
          </button>
        </div>
      </motion.div>

      {/* Floating Action Button */}
      {!isStaff && (
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 group hover:bg-primary-container transition-colors"
        >
          <QrCode className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </motion.button>
      )}
    </motion.div>
  );
}
