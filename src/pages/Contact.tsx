import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-black text-slate-900 mb-6">Contact Us</h1>
          <p className="text-lg text-slate-600">
            Have a question? Looking for a specific part? Or need technical support? We are here to help. Drop by our store or send us a message.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Contact Details */}
            <div className="p-8 md:p-12 lg:p-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-xl border border-blue-100 shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-tight text-slate-400 mb-1">Phone Number</h3>
                    <a href={`tel:${STORE_CONFIG.phone.replace(/[^0-9+]/g, '')}`} className="text-slate-900 font-bold text-lg hover:text-blue-600 transition-colors block">{STORE_CONFIG.phone}</a>
                    <a href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-bold shadow-sm transition-colors mt-3">
                      <MessageCircle className="w-4 h-4" /> Message on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-50 text-slate-600 p-3 rounded-xl border border-slate-200 shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-tight text-slate-400 mb-1">Store Address</h3>
                    <p className="text-slate-900 font-medium leading-relaxed pr-8">{STORE_CONFIG.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-50 text-slate-600 p-3 rounded-xl border border-slate-200 shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-tight text-slate-400 mb-1">Opening Hours</h3>
                    <p className="text-slate-900 font-medium">Monday - Saturday: 10:00 AM - 8:30 PM</p>
                    <p className="text-slate-500 mt-1 text-sm font-medium">Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-slate-50 text-slate-600 p-3 rounded-xl border border-slate-200 shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-tight text-slate-400 mb-1">Email Us</h3>
                    <a href={`mailto:${STORE_CONFIG.email}`} className="text-slate-900 font-medium hover:text-blue-600 transition-colors">{STORE_CONFIG.email}</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-[400px] lg:h-auto bg-slate-100 relative">
               <iframe 
                 src={STORE_CONFIG.mapEmbedUrl} 
                 className="absolute inset-0 w-full h-full border-0" 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Store Location"
               ></iframe>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
