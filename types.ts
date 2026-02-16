
export type Category = 'PIZZAS' | 'KEBABS' | 'BOXES' | 'BURGERS' | 'CHIPS' | 'TENDERS' | 'MEALS';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  allergens?: string[];
  image: string;
  options?: { name: string; price: number }[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  selectedOption?: { name: string; price: number };
}

export interface OrderDetails {
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: 'card' | 'cash';
}
