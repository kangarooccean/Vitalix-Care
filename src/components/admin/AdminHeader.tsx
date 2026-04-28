import { Search, Bell, FileText } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex justify-between items-center px-8">
      <div className="flex items-center gap-8">
        <span className="font-extrabold text-primary uppercase tracking-[0.2em] text-[10px] font-mono">Vitalix Intelligence</span>
        <nav className="hidden md:flex gap-8">
          <a className="text-sm text-primary font-bold border-b-2 border-primary pb-[1.35rem] transition-all" href="#">Directives</a>
          <a className="text-sm text-slate-500 font-medium hover:text-primary transition-all pb-[1.35rem]" href="#">Inventory</a>
          <a className="text-sm text-slate-500 font-medium hover:text-primary transition-all pb-[1.35rem]" href="#">Compliance</a>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative flex items-center group">
          <Search className="absolute left-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm w-72 focus:ring-2 focus:ring-primary/10 transition-all outline-none placeholder:text-slate-400 font-sans" 
            placeholder="Search directives or patients..." 
          />
        </div>
        
        <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
          <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-all">
            <FileText className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 ml-2 group cursor-pointer">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Dr. Sarah Johnson" 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover group-hover:border-primary/20 transition-all"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-white"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
