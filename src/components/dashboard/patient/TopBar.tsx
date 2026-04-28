import { Search, Bell, UserCircle } from 'lucide-react';

export default function TopBar() {
  return (
    <header id="top-bar" className="h-16 sticky top-0 bg-white/80 backdrop-blur-md border-b border-outline-variant/30 px-8 flex items-center justify-between z-40">
      <h2 className="text-lg font-bold text-primary tracking-tight">My Dashboard</h2>
      
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline transition-colors group-focus-within:text-primary" />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="pl-10 pr-4 py-2 bg-surface-container border border-outline-variant/20 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
          />
        </div>

        <button className="relative p-2 hover:bg-surface-container rounded-full transition-colors">
          <Bell className="w-5 h-5 text-outline" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-error border-2 border-white rounded-full" />
        </button>

        <div className="h-8 w-px bg-outline-variant/30" />

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-primary leading-none">Vitalix Pro</p>
            <p className="text-[10px] text-outline font-mono">Clinical Tier</p>
          </div>
          <UserCircle className="w-8 h-8 text-primary/40 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
