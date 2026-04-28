import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star, Wrench, MonitorSmartphone, Shield, Zap } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { STORE_CONFIG } from '../config/store';
import { initialReviews } from '../data/reviews';
import { services } from '../data/services';

const iconMap: Record<string, any> = {
  'monitor': MonitorSmartphone,
  'wrench': Wrench,
  'shield': Shield,
  'zap': Zap
};

export function Home() {
  const navigate = useNavigate();
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);
  const [reviews] = useState(initialReviews);

  return (
    <div 
      className="flex flex-col min-h-screen relative bg-slate-900"
      style={{
        backgroundImage: "url('/bg1.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-slate-900/70 pointer-events-none z-0"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="p-4 sm:p-6">
        <section 
          className="rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden flex flex-col justify-center min-h-[500px]"
        >
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 max-w-xl to-transparent z-0"></div>
          </div>
          <div className="absolute top-6 right-8 z-10 hidden sm:block">
            <span className="text-4xl sm:text-5xl font-black text-white/80 tracking-widest drop-shadow-lg select-none" style={{ letterSpacing: '0.15em' }}>RK COMPUTERS</span>
          </div>
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-blue-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-4 shadow-lg shadow-blue-500/30">
                Official Reseller
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mt-4 leading-tight mb-4 text-white drop-shadow-md">
                Best PC Parts &amp; <br className="hidden md:block"/> Custom Builds in {STORE_CONFIG.shortAddress.split(',')[0]}
              </h1>
              <p className="text-slate-200 mt-4 text-sm sm:text-lg max-w-lg mb-8 drop-shadow-sm font-medium">
                Affordable pricing and expert service. Get your dream rig assembled by professionals with the best price guarantee.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                <Link to="/products" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold transition-all text-center drop-shadow-lg mb-2 sm:mb-0">
                  View Products
                </Link>
                <Link to="/contact" className="w-full sm:w-auto bg-white/20 hover:bg-white/30 px-8 py-4 rounded-xl font-bold backdrop-blur-md transition-all border border-white/30 text-center shadow-lg">
                  Contact Now
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Reviews Section Slider */}
      <section className="px-4 sm:px-6 pb-12 pt-12 border-t border-white/10">
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-black mb-2 text-center text-white drop-shadow-md">Customer Reviews</h2>
          <p className="text-sm sm:text-base text-slate-200 text-center max-w-xl mx-auto drop-shadow-sm">What our clients say about our service.</p>
        </div>
        
        <div className="w-full overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">
          <div className="flex gap-4 sm:gap-6 w-max px-4 mx-auto">
            {reviews.map(review => (
              <div key={review.id} className="w-[260px] sm:w-[350px] snap-center shrink-0 bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/20 shadow-lg flex flex-col hover:bg-white/20 transition-all text-white">
                <div className="flex gap-1 mb-2 sm:mb-3 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < review.rating ? 'fill-current' : 'text-slate-400'}`} />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-100 italic flex-grow mb-3 sm:mb-4 drop-shadow-sm">"{review.text}"</p>
                <div className="mt-auto flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-white tracking-tight">{review.name}</span>
                  <span className="text-slate-300 font-medium">{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Sneak Peek */}
      <section className="px-4 sm:px-6 pb-12 border-t border-white/10 pt-12 relative">
        <div className="flex justify-between items-end mb-6 sm:mb-8 w-full max-w-7xl mx-auto">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black mb-1 text-white drop-shadow-md">Featured Hardware</h2>
            <p className="text-sm sm:text-base text-slate-200 drop-shadow-sm">Top picks for your next upgrade.</p>
          </div>
          <Link to="/products" className="text-blue-400 font-bold text-sm underline hidden sm:block hover:text-blue-300 transition">
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-7xl mx-auto">
          {featuredProducts.length > 0 ? featuredProducts.map((product) => (
            <div onClick={() => navigate('/products', { state: { selectedProductId: product.id, action: 'scrollTo' } })} key={product.id} className="cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-[24px] border border-white/20 shadow-lg hover:shadow-2xl hover:bg-white/20 transition-all group overflow-hidden flex flex-col h-full">
               <div className="aspect-[4/3] bg-black/40 overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 pointer-events-none" />
               </div>
               <div className="p-3 sm:p-6 flex flex-col flex-grow">
                  <div className="mb-2 sm:mb-3">
                     <span className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 bg-white/20 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-full backdrop-blur-sm border border-white/10">
                       {product.category}
                     </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-xl text-white mb-1 sm:mb-2 leading-tight line-clamp-2">{product.name}</h3>
                  <div className="font-black text-lg sm:text-2xl text-blue-400 mb-2 sm:mb-3">{product.price}</div>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 uppercase font-medium mb-3 sm:mb-6 leading-relaxed hidden sm:block">
                    {product.description}
                  </p>
                  <div className="mt-auto relative z-10">
                     <button onClick={(e) => { e.stopPropagation(); navigate('/products', { state: { selectedProductId: product.id, action: 'buy' } }); }} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl flex justify-center items-center gap-1 sm:gap-2 transition-colors shadow-lg text-xs sm:text-base">
                       <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" /> Buy
                     </button>
                  </div>
               </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-20 text-slate-300">
               No products available right now. Please add some products.
            </div>
          )}
        </div>
        <div className="mt-6 sm:mt-8 text-center sm:hidden">
           <Link to="/products" className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md">
             View all products
           </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 sm:px-6 pb-12 pt-12 border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl font-black mb-2 text-center text-white drop-shadow-md">Our Services</h2>
        <p className="text-sm sm:text-base text-slate-200 text-center mb-6 sm:mb-8 max-w-xl mx-auto drop-shadow-sm">Expert repairs, builds, and upgrades tailored for you.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Wrench;
            return (
              <div onClick={() => navigate('/services', { state: { selectedServiceId: service.id } })} key={service.id} className="cursor-pointer bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/20 shadow-lg hover:shadow-2xl hover:bg-white/20 transition-all group flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/20 text-blue-300 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-inner">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-bold text-sm sm:text-lg text-white mb-1 sm:mb-2">{service.title}</h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed hidden sm:block">{service.description}</p>
              </div>
            );
          })}
        </div>
      </section>
      
      </div>
    </div>
  );
}
