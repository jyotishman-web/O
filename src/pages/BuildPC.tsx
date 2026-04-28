import { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Cpu, HardDrive, CheckCircle2 } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export function BuildPC() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const budget = formData.get('budget') as string;
    const purpose = formData.get('purpose') as string;
    const notes = formData.get('notes') as string;

    const message = `*Custom PC Build Request*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Budget:* ${budget}\n*Purpose:* ${purpose}\n*Notes:* ${notes || 'None'}`;
    
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-6">Build Your Custom PC</h1>
          <p className="text-lg text-slate-600">
            Tell us what you need in your dream machine, and our experts will design a custom parts list tailored perfectly to your budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Left Column - Info / Features */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="flex gap-4">
              <div className="bg-blue-50 border border-blue-100 text-blue-600 p-4 rounded-2xl h-fit shadow-sm">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Assembly</h3>
                <p className="text-slate-600 leading-relaxed">Each system is carefully built by professionals with immaculate cable management and optimal cooling configurations.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 p-4 rounded-2xl h-fit shadow-sm">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Stress-Tested Reliability</h3>
                <p className="text-slate-600 leading-relaxed">Before handoff, every custom build undergoes rigorous stress testing to ensure absolute stability under load.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-50 border border-green-100 text-green-600 p-4 rounded-2xl h-fit shadow-sm">
                <HardDrive className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Plug &amp; Play Ready</h3>
                <p className="text-slate-600 leading-relaxed">Windows installed, BIOS updated, fans tuned, and drivers configured. Just plug it in and start playing.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            {isSubmitted ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="h-full flex flex-col items-center justify-center text-center py-10"
               >
                 <div className="bg-green-100 text-green-600 p-4 rounded-full mb-6 relative">
                    <div className="absolute inset-0 bg-green-400 animate-ping rounded-full opacity-20"></div>
                    <CheckCircle2 className="w-12 h-12 relative z-10" />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">Request Sent to WhatsApp!</h3>
                 <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                   Thank you! We will reply to your message on WhatsApp shortly with a custom quote.
                 </p>
                 <button 
                   onClick={() => setIsSubmitted(false)}
                   className="text-blue-600 font-medium hover:text-blue-700"
                 >
                   Submit another request
                 </button>
               </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-xs font-bold uppercase text-slate-400 mb-1 block">Full Name</label>
                    <input type="text" name="name" id="name" required className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-xs font-bold uppercase text-slate-400 mb-1 block">WhatsApp / Phone</label>
                    <input type="tel" name="phone" id="phone" required className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="text-xs font-bold uppercase text-slate-400 mb-1 block">Approximate Budget (₹)</label>
                  <select id="budget" name="budget" defaultValue="" required className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow appearance-none">
                    <option value="" disabled>Select a budget range</option>
                    <option value="under_50k">Under ₹50,000</option>
                    <option value="50k_80k">₹50,000 - ₹80,000</option>
                    <option value="80k_1.2L">₹80,000 - ₹1,20,000</option>
                    <option value="1.2L_2L">₹1,20,000 - ₹2,00,000</option>
                    <option value="above_2L">Above ₹2,00,000</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">Primary Purpose</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Gaming', 'Office/Work', 'Video Editing'].map((purpose) => (
                      <label key={purpose} className="relative flex items-center justify-center p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 focus-within:ring-2 focus-within:ring-blue-500 group has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200 has-[:checked]:text-blue-700 transition-colors">
                        <input type="radio" name="purpose" value={purpose} className="sr-only" required />
                        <span className="text-sm font-bold">{purpose}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="text-xs font-bold uppercase text-slate-400 mb-1 block">Additional Notes</label>
                  <textarea id="notes" name="notes" rows={3} className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow resize-none" placeholder="E.g., I want RGB lighting..."></textarea>
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl mt-4 hover:bg-black transition-colors flex justify-center items-center gap-2">
                  Continue on WhatsApp
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
