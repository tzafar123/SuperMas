
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, AlertCircle } from 'lucide-react';
import { MenuItem } from '../types';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, selectedOptionName?: string) => void;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    if (item?.options && item.options.length > 0) {
      setSelectedSize(item.options[0].name);
    } else {
      setSelectedSize('');
    }
  }, [item]);

  if (!item) return null;

  const currentPrice = item.price + (item.options?.find(o => o.name === selectedSize)?.price || 0);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative bg-stone-900 w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-800 flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Image Section */}
            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent md:bg-gradient-to-r" />
              <button
                onClick={onClose}
                className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-full md:hidden transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col">
              <div className="hidden md:flex justify-end mb-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-stone-800 rounded-full transition-colors text-stone-400 hover:text-white"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bungee leading-none">{item.name}</h2>
                  <p className="text-red-500 font-bold text-xl mt-2 font-bungee">€{currentPrice.toFixed(2)}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Description</h3>
                  <p className="text-stone-300 text-lg leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {item.allergens && item.allergens.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
                      <AlertCircle size={14} className="text-red-500" />
                      Allergens
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.allergens.map(a => (
                        <span key={a} className="px-3 py-1 bg-stone-800 rounded-lg text-sm font-medium border border-stone-700">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.options && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Choose Size</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {item.options.map((opt) => (
                        <button
                          key={opt.name}
                          onClick={() => setSelectedSize(opt.name)}
                          className={`px-4 py-4 rounded-2xl text-sm font-bold transition-all border text-left flex justify-between items-center ${
                            selectedSize === opt.name
                              ? 'bg-red-600/10 border-red-600 text-red-500'
                              : 'bg-stone-800 border-stone-700 text-stone-400 hover:border-stone-600'
                          }`}
                        >
                          <span>{opt.name}</span>
                          <span className="text-xs opacity-60">
                            {opt.price === 0 ? 'Base' : `+€${opt.price.toFixed(2)}`}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-12">
                <button
                  onClick={() => {
                    onAddToCart(item, selectedSize);
                    onClose();
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 px-8 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-red-900/30 text-lg"
                >
                  <ShoppingCart size={24} />
                  Add to Order
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ItemDetailModal;
