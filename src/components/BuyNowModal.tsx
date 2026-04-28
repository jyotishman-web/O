import { useState, useEffect } from 'react';
import { X, MapPin, Truck, Store, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STORE_CONFIG } from '../config/store';

export type Product = {
  id: string;
  category: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

interface BuyNowModalProps {
  product: Product | null;
  onClose: () => void;
}

export function BuyNowModal({ product, onClose }: BuyNowModalProps) {
  const [method, setMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  useEffect(() => {
     if (product) {
        document.body.style.overflow = 'hidden';
     } else {
        document.body.style.overflow = '';
     }
     return () => { document.body.style.overflow = ''; }
  }, [product]);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    let message = `Hi, I would like to order *${product.name}* (${product.price}).\n\n`;
    if (method === 'pickup') {
      message += `*Method:* Store Pickup`;
    } else {
      message += `*Method:* Delivery\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}, ${formData.city} - ${formData.pincode}`;
    }
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
           {/* Fallback overlay click handler */}
           <div className="absolute inset-0" onClick={onClose}></div>
           <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] relative z-10"
           >
             <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                <h2 className="font-bold text-lg text-slate-900">Complete Your Order</h2>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors">
                   <X className="w-5 h-5" />
                </button>
             </div>

             <div className="p-6 overflow-y-auto w-full">
                <div className="flex items-center gap-4 mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                   <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                   </div>
                   <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-tight mb-1">{product.name}</h3>
                      <div className="font-black text-blue-600">{product.price}</div>
                   </div>
                </div>

                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Fulfillment Method</h4>
                <div className="grid grid-cols-2 gap-3 mb-6">
                   <button
                      type="button"
                      onClick={() => setMethod('pickup')}
                      className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${method === 'pickup' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                   >
                      <Store className="w-6 h-6" />
                      <span className="font-bold text-sm">Store Pickup</span>
                   </button>
                   <button
                      type="button"
                      onClick={() => setMethod('delivery')}
                      className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${method === 'delivery' ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                   >
                      <Truck className="w-6 h-6" />
                      <span className="font-bold text-sm">Delivery</span>
                   </button>
                </div>

                <form id="orderForm" onSubmit={handleOrder} className="space-y-4">
                   {method === 'pickup' ? (
                         <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center flex flex-col items-center">
                            <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                               <MapPin className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-slate-900 mb-1">{STORE_CONFIG.name}</h4>
                            <p className="text-sm text-slate-600 mb-3 max-w-[250px] mx-auto">{STORE_CONFIG.address}</p>
                            <p className="text-xs text-slate-500 font-medium">You can pay at the store when you pick up your item.</p>
                         </div>
                   ) : (
                      <div className="space-y-4">
                         <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Delivery Details</h4>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                               <label className="text-xs font-bold text-slate-500 mb-1 block">Name</label>
                               <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none focus:bg-white transition-colors" placeholder="Your Name" />
                            </div>
                            <div>
                               <label className="text-xs font-bold text-slate-500 mb-1 block">Phone Number</label>
                               <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none focus:bg-white transition-colors" placeholder="10-digit number" />
                            </div>
                         </div>
                         <div>
                            <label className="text-xs font-bold text-slate-500 mb-1 block">Full Address</label>
                            <textarea required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none focus:bg-white transition-colors resize-none" rows={2} placeholder="House no, Building, Street area"></textarea>
                         </div>
                         <div className="grid grid-cols-2 gap-3">
                            <div>
                               <label className="text-xs font-bold text-slate-500 mb-1 block">City</label>
                               <input required type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none focus:bg-white transition-colors" placeholder="Guwahati" />
                            </div>
                            <div>
                               <label className="text-xs font-bold text-slate-500 mb-1 block">Pincode</label>
                               <input required type="text" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none focus:bg-white transition-colors" placeholder="781005" />
                            </div>
                         </div>
                      </div>
                   )}
                </form>
             </div>

             <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
                <button type="submit" form="orderForm" className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors">
                   Continue on WhatsApp <ExternalLink className="w-4 h-4" />
                </button>
             </div>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
