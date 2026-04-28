import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { services } from '../data/services';
import * as LucideIcons from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export function Services() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.selectedServiceId) {
      setTimeout(() => {
        const el = document.getElementById(`service-${location.state.selectedServiceId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a brief highlight
          el.classList.add('ring-4', 'ring-blue-500', 'ring-opacity-50');
          setTimeout(() => el.classList.remove('ring-4', 'ring-blue-500', 'ring-opacity-50'), 2000);
        }
      }, 100);
      window.history.replaceState(window.history.state, '', location.pathname);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-black text-slate-900 mb-6">Our Services</h1>
          <p className="text-lg text-slate-600">
            From routine maintenance to complex motherboard repairs, our experts provide reliable, transparent, and fast service for all your computing needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            // Dynamically get the icon component from string name
            const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Wrench;
            const isBlue = index % 2 === 0;

            const handleRequest = () => {
              const message = `Hi, I would like to request the *${service.title}* service.`;
              window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
            };

            return (
              <div id={`service-${service.id}`} key={service.id} className={`${isBlue ? 'bg-blue-50 border-blue-100' : 'bg-indigo-50 border-indigo-100'} p-6 rounded-2xl border hover:shadow-md transition-all duration-500 flex flex-col items-start`}>
                <div className={`${isBlue ? 'bg-blue-600' : 'bg-indigo-600'} w-10 h-10 rounded-lg flex items-center justify-center shadow-sm text-white mb-4`}>
                   <IconComponent className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <button 
                  onClick={handleRequest}
                  className="mt-auto px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-sm font-bold text-slate-700 hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center gap-2"
                >
                  <LucideIcons.MessageCircle className="w-4 h-4" /> Request Service
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-slate-900 rounded-3xl p-10 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl">
             <h2 className="text-3xl font-black text-white mb-2">Need immediate assistance?</h2>
             <p className="text-slate-300">Bring your system to our store or contact us on WhatsApp to schedule a diagnostic session.</p>
          </div>
          <div className="relative z-10 shrink-0">
             <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 shadow-xl transition-all">
                Contact Us Now
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
