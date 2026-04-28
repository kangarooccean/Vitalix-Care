import { Search, Bell, History, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-outline-variant/30 h-16 ml-64 px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-8">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-primary leading-tight">{title}</h2>
          {subtitle && <p className="text-[10px] text-on-surface-variant font-medium">{subtitle}</p>}
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          <button className="text-sm font-semibold text-primary border-b-2 border-primary pb-1">Directives</button>
          <button className="text-sm font-medium text-outline hover:text-primary transition-colors pb-1">Inventory</button>
          <button className="text-sm font-medium text-outline hover:text-primary transition-colors pb-1">Compliance</button>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="pl-9 pr-4 py-1.5 bg-surface-container-low border-none rounded-full text-xs w-64 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-outline hover:bg-surface-container rounded-full relative transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-white"></span>
          </button>
          <button className="p-2 text-outline hover:bg-surface-container rounded-full transition-colors font-bold text-sm">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
