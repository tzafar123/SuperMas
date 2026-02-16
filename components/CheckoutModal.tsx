
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Banknote, CheckCircle2 } from 'lucide-react';
import { OrderDetails, CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: OrderDetails) => void;
  cart: CartItem[];
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onConfirm, cart }) => {
  const [details, setDetails] = useState<OrderDetails>({
    customerName: '',
    phone: '',
    address: '',
    paymentMethod: 'cash'
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price + (item.selectedOption?.price || 0)) * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to Supabase/Stripe
    setIsSuccess(true);
    setTimeout(() => {
      onConfirm(details);
      onClose();
      setIsSuccess(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-stone-900 w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-stone-800"
          >
            {isSuccess ? (
              <div className="p-12 text-center space-y-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 size={64} className="text-green-500" />
                </motion.div>
                <h2 className="text-3xl font-bungee">Order Placed!</h2>
                <p className="text-stone-400">Your delicious food is being prepared at SuperMas. Thank you!</p>
              </div>
            ) : (
              <>
                <div className="p-8 border-b border-stone-800 flex items-center justify-between bg-stone-900/50">
                  <h2 className="text-2xl font-bungee">Finalize Order</h2>
                  <button onClick={onClose} className="p-2 hover:bg-stone-800 rounded-full">
                    <X />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase">Full Name</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-stone-800 border-stone-700 rounded-2xl px-4 py-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                        value={details.customerName}
                        onChange={e => setDetails({ ...details, customerName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase">Phone Number</label>
                      <input
                        required
                        type="tel"
                        className="w-full bg-stone-800 border-stone-700 rounded-2xl px-4 py-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                        value={details.phone}
                        onChange={e => setDetails({ ...details, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase">Delivery Address</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full bg-stone-800 border-stone-700 rounded-2xl px-4 py-3 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none"
                      value={details.address}
                      onChange={e => setDetails({ ...details, address: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase">Payment Method</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setDetails({ ...details, paymentMethod: 'cash' })}
                        className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${
                          details.paymentMethod === 'cash' 
                          ? 'border-red-500 bg-red-500/10 text-red-500' 
                          : 'border-stone-700 bg-stone-800/50 text-stone-400'
                        }`}
                      >
                        <Banknote />
                        <span className="font-bold">Cash</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetails({ ...details, paymentMethod: 'card' })}
                        className={`flex items-center justify-center gap-3 p-4 rounded-2xl border transition-all ${
                          details.paymentMethod === 'card' 
                          ? 'border-red-500 bg-red-500/10 text-red-500' 
                          : 'border-stone-700 bg-stone-800/50 text-stone-400'
                        }`}
                      >
                        <CreditCard />
                        <span className="font-bold">Card</span>
                      </button>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl text-xl shadow-lg shadow-red-900/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      Pay €{total.toFixed(2)}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
