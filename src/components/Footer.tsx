import { Link, useLocation } from 'react-router-dom';
import { Monitor, MapPin, Phone, Mail } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export function Footer() {
  const location = useLocation();

  return (
    <footer className={location.pathname === '/' ? 'bg-slate-900/60 backdrop-blur-md border-t border-white/10 text-slate-300' : 'bg-slate-900 text-slate-300 border-t border-slate-800'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">{STORE_CONFIG.shortName[0]}</div>
              <span className="font-bold text-xl text-white tracking-tight uppercase">{STORE_CONFIG.name}</span>
            </div>
            <p className="text-sm text-slate-400 mb-4 max-w-sm">
              Your trusted partner for high-performance PC builds, authentic parts, and expert repair services in {STORE_CONFIG.shortAddress}.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm hover:text-blue-400 transition-colors">Products</Link></li>
              <li><Link to="/build-pc" className="text-sm hover:text-blue-400 transition-colors">Build Your PC</Link></li>
              <li><Link to="/services" className="text-sm hover:text-blue-400 transition-colors">Services</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Contact Info</h3>
             <ul className="space-y-3">
               <li className="flex items-start gap-3">
                 <MapPin className="h-5 w-5 text-slate-500 shrink-0" />
                 <span className="text-sm">{STORE_CONFIG.address}</span>
               </li>
               <li className="flex items-center gap-3">
                 <Phone className="h-5 w-5 text-slate-500 shrink-0" />
                 <a href={`tel:${STORE_CONFIG.phone.replace(/[^0-9+]/g, '')}`} className="text-sm hover:text-blue-400 transition-colors">{STORE_CONFIG.phone}</a>
               </li>
               <li className="flex items-center gap-3">
                 <Mail className="h-5 w-5 text-slate-500 shrink-0" />
                 <a href={`mailto:${STORE_CONFIG.email}`} className="text-sm hover:text-blue-400 transition-colors">{STORE_CONFIG.email}</a>
               </li>
             </ul>
          </div>
        </div>
        
        <div className={`border-t mt-10 pt-6 text-center ${location.pathname === '/' ? 'border-white/10' : 'border-slate-800'}`}>
          <p className="text-sm text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} {STORE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
