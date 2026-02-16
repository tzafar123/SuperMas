
import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number, optionName?: string) => void;
  onRemove: (id: string, optionName?: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  onCheckout
}) => {
  const total = cart.reduce((sum, item) => sum + (item.price + (item.selectedOption?.price || 0)) * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-stone-900 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-red-500" />
                <h2 className="text-xl font-bold font-bungee">Your Order</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-stone-800 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-4">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="text-lg">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${item.selectedOption?.name || 'default'}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 group"
                  >
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                      {item.selectedOption && (
                        <p className="text-stone-400 text-sm">Size: {item.selectedOption.name}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-stone-800/50 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1, item.selectedOption?.name)}
                            className="p-1 hover:bg-stone-700 rounded-md transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-6 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1, item.selectedOption?.name)}
                            className="p-1 hover:bg-stone-700 rounded-md transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-red-500">
                            €{((item.price + (item.selectedOption?.price || 0)) * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => onRemove(item.id, item.selectedOption?.name)}
                            className="text-stone-500 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-stone-800 bg-stone-900/80 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-stone-400 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold font-bungee">€{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-red-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
