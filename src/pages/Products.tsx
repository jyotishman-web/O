import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, MapPin, Loader2, ShoppingCart } from 'lucide-react';
import { BuyNowModal } from '../components/BuyNowModal';
import { useProducts } from '../hooks/useProducts';
import { STORE_CONFIG } from '../config/store';

export function Products() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { products, categories, loading } = useProducts();
  const location = useLocation();

  useEffect(() => {
    if (!loading && products.length > 0 && location.state?.selectedProductId) {
      const prod = products.find(p => p.id === location.state.selectedProductId);
      if (prod) {
        if (location.state.action === 'buy') {
          setSelectedProduct(prod);
        }
        setActiveCategory(prod.category);
        setTimeout(() => {
          const el = document.getElementById(`product-${prod.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (location.state.action !== 'buy') {
              el.classList.add('ring-4', 'ring-blue-500', 'ring-opacity-50');
              setTimeout(() => el.classList.remove('ring-4', 'ring-blue-500', 'ring-opacity-50'), 2000);
            }
          }
        }, 100);
      }
      // Clear state so it doesn't reopen if navigating back
      window.history.replaceState(window.history.state, '', location.pathname);
    }
  }, [loading, products, location.state]);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  if (loading) {
     return (
        <div className="min-h-screen bg-slate-50 py-16 flex items-center justify-center">
           <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-black text-slate-900 mb-6">Our Products</h1>
          <p className="text-lg text-slate-600">
            Browse our selection of premium PC components. We stock the latest generation of processors, graphic cards, and more.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === category
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Note Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 sm:p-6 mb-12 flex flex-col sm:flex-row items-center gap-4 sm:justify-between text-blue-900 shadow-sm">
          <div className="flex items-center gap-4">
             <div className="bg-blue-600 p-3 rounded-lg shrink-0 text-white">
               <MapPin className="h-5 w-5" />
             </div>
             <div>
               <h3 className="font-bold text-sm mb-1">Local Store & Pickup Only</h3>
               <p className="text-sm text-slate-600 font-medium">To order, please contact us on WhatsApp to check availability, or visit our physical store in {STORE_CONFIG.shortAddress.split(',')[0]}.</p>
             </div>
          </div>
          <button onClick={() => window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}`, '_blank')} className="whitespace-nowrap flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center shadow-sm">
            <MessageCircle className="h-5 w-5" /> Enquire via WhatsApp
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div id={`product-${product.id}`} key={product.id} className="bg-white rounded-[24px] border border-slate-200 shadow-sm hover:shadow-lg transition-all group overflow-hidden flex flex-col h-full">
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3">
                   <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-black uppercase rounded-full tracking-wider">
                     {product.category}
                   </span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2 leading-tight">{product.name}</h3>
                <div className="font-black text-2xl text-blue-600 mb-3">{product.price}</div>
                <p className="text-sm text-slate-500 line-clamp-2 uppercase font-medium mb-6">{product.description}</p>
                <div className="mt-auto">
                  <button 
                    onClick={() => setSelectedProduct(product)} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl text-base font-bold transition-colors flex justify-center items-center gap-2 shadow-sm"
                  >
                    <ShoppingCart className="w-5 h-5" /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <BuyNowModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </div>
    </div>
  );
}
