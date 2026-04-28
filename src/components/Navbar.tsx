import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { STORE_CONFIG } from '../config/store';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Build Your PC', path: '/build-pc' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${location.pathname === '/' ? 'bg-slate-900/60 backdrop-blur-md border-b border-white/10 text-white' : 'bg-white border-b border-slate-200 text-slate-900 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <Link to="/" className="flex items-center gap-2 group">
                <img src="/rk-logo.jpg" alt="Dynatek Logo" className="h-10 w-auto object-contain" />
                <span className={`font-bold text-xl tracking-tight uppercase ${location.pathname === '/' ? 'text-white' : 'text-slate-900'}`}>{STORE_CONFIG.name}</span>
             </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                const isHome = location.pathname === '/';
                let linkClass = isActive 
                  ? (isHome ? 'text-white' : 'text-blue-600') 
                  : (isHome ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-blue-600');
                
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${linkClass}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${location.pathname === '/' ? 'text-slate-200 hover:text-white focus:ring-offset-slate-900' : 'text-slate-400 hover:text-slate-900 focus:ring-offset-slate-100'}`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t ${location.pathname === '/' ? 'bg-slate-900/80 backdrop-blur-md border-white/10' : 'bg-white border-slate-200'}`}>
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              const isHome = location.pathname === '/';
              let linkClass = isActive 
                ? (isHome ? 'bg-white/10 text-white' : 'bg-slate-50 text-blue-600') 
                : (isHome ? 'text-slate-300 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600');
                
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-semibold ${linkClass}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
