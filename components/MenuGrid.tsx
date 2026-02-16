
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, Category } from '../types';
import { Plus, Eye } from 'lucide-react';

interface MenuGridProps {
  items: MenuItem[];
  onViewDetails: (item: MenuItem) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ items, onViewDetails }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'ALL'>('ALL');

  const categories: (Category | 'ALL')[] = ['ALL', 'PIZZAS', 'KEBABS', 'BOXES', 'BURGERS', 'CHIPS', 'TENDERS', 'MEALS'];

  const filteredItems = activeCategory === 'ALL' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category Filter */}
      <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-3 rounded-full font-bold transition-all ${
              activeCategory === cat 
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                : 'bg-stone-800/50 text-stone-400 hover:bg-stone-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => onViewDetails(item)}
              className="bg-stone-900/40 border border-stone-800/50 rounded-[2rem] overflow-hidden hover:border-red-500/50 transition-all group flex flex-col cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent" />
                
                {item.allergens && (
                  <div className="absolute top-4 left-4 flex gap-1">
                    {item.allergens.map(a => (
                      <span key={a} className="bg-black/50 backdrop-blur-md text-[10px] px-2 py-1 rounded-full text-white/80 font-bold border border-white/10">
                        {a}
                      </span>
                    ))}
                  </div>
                )}

                <div className="absolute bottom-4 left-6">
                  <span className="text-3xl font-bungee text-white">
                    €{item.price.toFixed(2)}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                   <div className="bg-white text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     <Eye size={20} />
                     View Options
                   </div>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div>
                  <h3 className="text-2xl font-bold font-playfair group-hover:text-red-500 transition-colors leading-tight">{item.name}</h3>
                  <p className="text-stone-400 text-sm mt-2 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 mt-auto">
                  <div className="flex items-center gap-2 text-red-500 font-bold text-sm">
                    <Plus size={16} />
                    Customize & Add
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MenuGrid;
