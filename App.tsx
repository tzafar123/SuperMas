
import React, { useState, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Phone, MapPin, Pizza, Instagram, Facebook } from 'lucide-react';
import { MENU_ITEMS, APP_INFO } from './constants';
import { MenuItem, CartItem, OrderDetails } from './types';
import MenuGrid from './components/MenuGrid';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ItemDetailModal from './components/ItemDetailModal';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], ['rgba(12, 10, 9, 0)', 'rgba(12, 10, 9, 0.9)']);
  const navBlur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(12px)']);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const handleAddToCart = useCallback((item: MenuItem, selectedOptionName?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.selectedOption?.name === selectedOptionName);
      if (existing) {
        return prev.map(i => (i.id === item.id && i.selectedOption?.name === selectedOptionName) 
          ? { ...i, quantity: i.quantity + 1 } 
          : i);
      }
      const selectedOption = item.options?.find(o => o.name === selectedOptionName) || (item.options && item.options.length > 0 ? item.options[0] : undefined);
      return [...prev, { ...item, quantity: 1, selectedOption }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((id: string, delta: number, optionName?: string) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedOption?.name === optionName) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const handleRemoveItem = useCallback((id: string, optionName?: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedOption?.name === optionName)));
  }, []);

  const handleCheckoutConfirm = (details: OrderDetails) => {
    console.log('Order Confirmed:', { details, cart });
    setCart([]);
  };

  return (
    <div className="min-h-screen selection:bg-red-500/30">
      {/* Navigation */}
      <motion.nav 
        style={{ backgroundColor: navBg, backdropFilter: navBlur }}
        className="fixed top-0 left-0 right-0 z-40 transition-shadow"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pizza className="text-red-600 w-8 h-8 md:w-10 md:h-10 rotate-12" />
            <h1 className="text-2xl md:text-3xl font-bungee tracking-tighter text-white">
              SUPER<span className="text-red-600">MAS</span>
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-stone-400 font-medium">
            <a href="#menu" className="hover:text-red-500 transition-colors">Menu</a>
            <a href="#about" className="hover:text-red-500 transition-colors">About</a>
            <a href="#contact" className="hover:text-red-500 transition-colors">Contact</a>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative group p-3 bg-stone-900 border border-stone-800 rounded-2xl hover:border-red-500 transition-all active:scale-95"
          >
            <ShoppingCart className="text-white group-hover:text-red-500 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-red-900/40">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover grayscale-[0.2]"
            alt="Hero Background"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-6"
          >
            <span className="inline-block px-4 py-1.5 bg-red-600/10 text-red-500 rounded-full text-sm font-bold border border-red-500/20">
              AUTHENTIC ABBEYFEALE PIZZERIA
            </span>
            <h2 className="text-6xl md:text-8xl font-bungee leading-[0.9] tracking-tighter">
              PIZZA <br />
              <span className="text-red-600 italic">PERFECTION.</span>
            </h2>
            <p className="text-lg md:text-xl text-stone-400 max-w-lg leading-relaxed font-light">
              Crispy crust, melted mozzarella, and fresh ingredients. Order your favorite pizza and grill specialties from SuperMas today.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#menu"
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-900/30 transition-all hover:-translate-y-1"
              >
                Order Online Now
              </a>
              <div className="flex items-center gap-4 bg-stone-900/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-stone-800">
                <Phone className="text-red-500" />
                <span className="font-bold text-lg">{APP_INFO.phone}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating animated pizza element */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 -bottom-20 z-10 opacity-60 md:opacity-100 pointer-events-none"
        >
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-red-600/30 blur-[120px] rounded-full scale-150" />
            
            {/* Pizza Image Container */}
            <div className="relative w-[350px] h-[350px] md:w-[650px] md:h-[650px] rounded-full overflow-hidden border-[12px] border-stone-900 shadow-[0_0_100px_rgba(239,68,68,0.4)]">
               <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80" 
                className="w-full h-full object-cover scale-110"
                alt="Floating Premium Pizza"
              />
            </div>
            
            {/* Reflection Overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-stone-950/40 via-transparent to-white/10" />
          </div>
        </motion.div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-stone-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bungee">The Menu</h2>
              <div className="w-24 h-2 bg-red-600 rounded-full" />
              <p className="text-stone-400 max-w-xl">
                Explore our wide selection of pizzas, kebabs, and authentic grill dishes. Each one prepared with passion.
              </p>
            </div>
            <div className="text-stone-500 text-sm">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-red-600" />
                {APP_INFO.address}
              </p>
            </div>
          </div>

          <MenuGrid items={MENU_ITEMS} onViewDetails={setSelectedItem} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-800 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Pizza className="text-red-600 w-8 h-8 rotate-12" />
              <h2 className="text-2xl font-bungee tracking-tighter">SUPERMAS</h2>
            </div>
            <p className="text-stone-400 font-light max-w-xs">
              Delivering the best pizza experience to the heart of Abbeyfeale. Open daily for your convenience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-stone-800 rounded-xl hover:text-red-500 transition-colors"><Instagram /></a>
              <a href="#" className="p-3 bg-stone-800 rounded-xl hover:text-red-500 transition-colors"><Facebook /></a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold font-playfair">Visit Us</h3>
            <div className="space-y-4 text-stone-400">
              <div className="flex items-start gap-3">
                <MapPin className="text-red-600 mt-1 shrink-0" />
                <p>{APP_INFO.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-red-600 shrink-0" />
                <p>{APP_INFO.phone}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold font-playfair">Opening Hours</h3>
            <div className="space-y-2 text-stone-400">
              <div className="flex justify-between">
                <span>Mon - Fri</span>
                <span>12:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sat - Sun</span>
                <span>1:00 PM - 12:00 AM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-stone-800 text-center text-stone-500 text-sm">
          &copy; {new Date().getFullYear()} SuperMas Abbeyfeale. All rights reserved. Built with passion for pizza.
        </div>
      </footer>

      {/* Overlays */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleCheckoutConfirm}
        cart={cart}
      />

      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default App;
