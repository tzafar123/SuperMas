
import { MenuItem } from './types';

export const PIZZA_ALLERGENS = ["1", "3", "7", "15"];

export const MENU_ITEMS: MenuItem[] = [
  // PIZZAS
  {
    id: 'p1',
    name: 'Margherita',
    description: 'Fresh tomato sauce, extra mozzarella cheese, oregano',
    price: 11,
    category: 'PIZZAS',
    allergens: PIZZA_ALLERGENS,
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80',
    options: [
      { name: '10 inch', price: 0 },
      { name: '12 inch', price: 2 },
      { name: '14 inch', price: 4 }
    ]
  },
  {
    id: 'p2',
    name: 'Pepperoni Passion',
    description: 'Double pepperoni and double cheese',
    price: 11,
    category: 'PIZZAS',
    allergens: PIZZA_ALLERGENS,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    options: [
      { name: '10 inch', price: 0 },
      { name: '12 inch', price: 2 },
      { name: '14 inch', price: 4 }
    ]
  },
  {
    id: 'p3',
    name: 'Special Pizza',
    description: 'Chefs special selection of toppings with fresh herbs and premium meats',
    price: 15,
    category: 'PIZZAS',
    allergens: PIZZA_ALLERGENS,
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80',
    options: [
      { name: '12 inch Special', price: 0 },
      { name: '14 inch Special', price: 2 }
    ]
  },

  // KEBABS
  {
    id: 'k1',
    name: 'Doner Kebab',
    description: 'Freshly sliced lamb doner in pita bread with crisp salad and house sauce',
    price: 10,
    category: 'KEBABS',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'k2',
    name: 'Mixed Kebab',
    description: 'Combination of lamb doner, chicken, and seekh kebab on a fresh base',
    price: 11,
    category: 'KEBABS',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'k3',
    name: 'Special Kebab',
    description: 'The ultimate kebab platter with extra sides and premium cuts',
    price: 12,
    category: 'KEBABS',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },

  // BOXES
  {
    id: 'b1',
    name: 'Standard Box',
    description: 'Fries, choice of meat, signature garlic sauce and fresh salad',
    price: 10,
    category: 'BOXES',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'b2',
    name: 'Mixed Box',
    description: 'A feast of variety: multiple meats, fries, and special dips',
    price: 11,
    category: 'BOXES',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80'
  },

  // BURGERS
  {
    id: 'bg1',
    name: '1/2 Pounder with Cheese',
    description: 'Juicy double beef patty with melted cheddar in a toasted brioche bun',
    price: 8,
    category: 'BURGERS',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  },

  // CHIPS
  {
    id: 'c1',
    name: 'Regular Chips',
    description: 'Crispy golden triple-cooked fries',
    price: 4,
    category: 'CHIPS',
    image: 'https://images.unsplash.com/photo-1630384066252-19e1ad955494?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c2',
    name: 'Garlic Chips',
    description: 'Golden chips smothered in our creamy signature garlic sauce',
    price: 5.5,
    category: 'CHIPS',
    image: 'https://images.unsplash.com/photo-1623238913973-21e45cced554?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c3',
    name: 'Garlic Cheese Chips',
    description: 'The fan favorite: garlic sauce and a heavy layer of melted mozzarella',
    price: 6.5,
    category: 'CHIPS',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'c4',
    name: 'Curry Chips',
    description: 'Crispy fries with our rich, aromatic home-style curry sauce',
    price: 5.5,
    category: 'CHIPS',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80'
  },

  // TENDERS
  {
    id: 't1',
    name: 'Chicken Tenders 5pcs with Chips',
    description: 'Hand-breaded premium chicken breast strips with a side of fries',
    price: 9,
    category: 'TENDERS',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 't2',
    name: 'Chicken Tenders 5pcs',
    description: 'Juicy, crispy breaded chicken breast strips',
    price: 6,
    category: 'TENDERS',
    image: 'https://images.unsplash.com/photo-1626645272661-ca36f3333333?auto=format&fit=crop&w=800&q=80'
  },

  // MEALS
  {
    id: 'm1',
    name: 'Pizza Meal 10 inch',
    description: 'A 10 inch Margherita or Pepperoni, golden chips, and a refreshing soft drink',
    price: 16,
    category: 'MEALS',
    image: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=800&q=80'
  }
];

export const APP_INFO = {
  name: 'SuperMas',
  address: 'Main Street Abbeyfeale V94E13C',
  phone: '06832360'
};
