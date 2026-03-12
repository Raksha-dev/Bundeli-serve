import { StaticImageData } from "next/image";
import JatashankarChaupati from "../assets/jatashankar-chaupati.jpg";

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  minOrder: number;
  deliveryFee: number;
  imageUrl: string | StaticImageData;
  isOpen: boolean;
  isVegOnly: boolean;
  address: string;
  description: string;
};

export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isVeg: boolean;
  isAvailable: boolean;
  isBestseller?: boolean;
};

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Jatashankar Chopati",
    cuisine: ["North Indian", "Dal Baati", "Thali"],
    rating: 4.5,
    deliveryTime: "20-30 min",
    minOrder: 50,
    deliveryFee: 30,
    imageUrl: JatashankarChaupati,
    isOpen: true,
    isVegOnly: true,
    address: "New Bus Stand, Amanganj",
    description:
      "Authentic Bundelkhandi cuisine with traditional flavors of the region.",
  },
  {
    id: "r2",
    name: "Poha Party",
    cuisine: ["Poha", "Samosa", "Kebabs"],
    rating: 4.3,
    deliveryTime: "40-50 min",
    minOrder: 20,
    deliveryFee: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    isOpen: true,
    isVegOnly: true,
    address: "Old bus stand Katni, panna main road",
    description: "Dum-cooked biryanis with aromatic spices, a Jabalpur staple.",
  },
  {
    id: "r3",
    name: "The Mid Town Cafe",
    cuisine: ["Vegetarian", "Gujarati", "Rajasthani"],
    rating: 4.7,
    deliveryTime: "25-35 min",
    minOrder: 100,
    deliveryFee: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    isOpen: true,
    isVegOnly: true,
    address: "Old bus stand, Amanganj",
    description:
      "Pure veg thali with unlimited refills — home-cooked goodness.",
  },
  {
    id: "r4",
    name: "Jatashankar Restaurant",
    cuisine: ["Street Food", "Chaat", "Sweets"],
    rating: 4.4,
    deliveryTime: "20-30 min",
    minOrder: 80,
    deliveryFee: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80",
    isOpen: true,
    isVegOnly: true,
    address: "New Bus Stand, Amanganj",
    description:
      "Famous for Jabalpur-style chaat, poha jalebi, and fresh mithai.",
  },
  {
    id: "r5",
    name: "Rakku Dhaba",
    cuisine: ["Cafe", "Sandwiches", "Pasta", "Coffee"],
    rating: 4.2,
    deliveryTime: "30-45 min",
    minOrder: 120,
    deliveryFee: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    isOpen: true,
    isVegOnly: false,
    address: "Panna Road, Amanganj",
    description: "A cozy dhawa with forest-themed decor and great cold coffee.",
  },
  {
    id: "r6",
    name: "Samrat Dhawa",
    cuisine: ["Tandoori", "North Indian", "Rolls"],
    rating: 4.1,
    deliveryTime: "35-45 min",
    minOrder: 180,
    deliveryFee: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80",
    isOpen: true,
    isVegOnly: false,
    address: "Katni road, Amanganj",
    description: "Live tandoor with fresh naans, kebabs, and tikka platters.",
  },
];

export const menuItems: MenuItem[] = [
  // Bundelkhand Dhaba (r1)
  {
    id: "m1",
    restaurantId: "r1",
    name: "Dal Baati Churma",
    description:
      "Traditional baked wheat balls with five-lentil dal and sweet churma",
    price: 180,
    category: "Specialties",
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
    isVeg: true,
    isAvailable: true,
    isBestseller: true,
  },
  {
    id: "m2",
    restaurantId: "r1",
    name: "Bundeli Thali",
    description:
      "Complete meal — roti, sabzi, dal, rice, papad, pickle, and dessert",
    price: 220,
    category: "Thali",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m3",
    restaurantId: "r1",
    name: "Mutton Rogan Josh",
    description: "Slow-cooked mutton in aromatic Kashmiri spices",
    price: 320,
    category: "Non-Veg",
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    isVeg: false,
    isAvailable: true,
    isBestseller: true,
  },
  {
    id: "m4",
    restaurantId: "r1",
    name: "Makki Ki Roti & Sarson Saag",
    description: "Cornmeal flatbread with spiced mustard greens",
    price: 140,
    category: "Breads & Sabzi",
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m5",
    restaurantId: "r1",
    name: "Chicken Laal Maas",
    description: "Fiery Rajasthani red chili chicken curry",
    price: 280,
    category: "Non-Veg",
    imageUrl:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80",
    isVeg: false,
    isAvailable: true,
  },
  {
    id: "m6",
    restaurantId: "r1",
    name: "Gulab Jamun (2 pcs)",
    description: "Soft milk-solid balls soaked in rose-flavored sugar syrup",
    price: 60,
    category: "Desserts",
    imageUrl:
      "https://images.unsplash.com/photo-1601303516534-bf7d0e7e5c22?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },

  // Marble City Biryani (r2)
  {
    id: "m7",
    restaurantId: "r2",
    name: "Chicken Dum Biryani",
    description:
      "Basmati rice slow-cooked with tender chicken, saffron, and whole spices",
    price: 260,
    category: "Biryani",
    imageUrl:
      "https://images.unsplash.com/photo-1563379091339-03246963d38a?w=400&q=80",
    isVeg: false,
    isAvailable: true,
    isBestseller: true,
  },
  {
    id: "m8",
    restaurantId: "r2",
    name: "Mutton Biryani",
    description: "Slow-cooked bone-in mutton biryani with caramelised onions",
    price: 340,
    category: "Biryani",
    imageUrl:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80",
    isVeg: false,
    isAvailable: true,
  },
  {
    id: "m9",
    restaurantId: "r2",
    name: "Veg Biryani",
    description: "Fragrant rice with garden vegetables and whole spices",
    price: 180,
    category: "Biryani",
    imageUrl:
      "https://images.unsplash.com/photo-1536304993881-ff86e0c9b91a?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m10",
    restaurantId: "r2",
    name: "Seekh Kebab (6 pcs)",
    description:
      "Minced lamb kebabs grilled over charcoal, served with mint chutney",
    price: 220,
    category: "Starters",
    imageUrl:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80",
    isVeg: false,
    isAvailable: true,
    isBestseller: true,
  },
  {
    id: "m11",
    restaurantId: "r2",
    name: "Raita",
    description: "Yogurt with cucumber, cumin, and fresh coriander",
    price: 60,
    category: "Sides",
    imageUrl:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m12",
    restaurantId: "r2",
    name: "Phirni",
    description: "Creamy rice pudding in an earthen pot, topped with pistachio",
    price: 90,
    category: "Desserts",
    imageUrl:
      "https://images.unsplash.com/photo-1601303516534-bf7d0e7e5c22?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },

  // Narmada Veg Bhojan (r3)
  {
    id: "m13",
    restaurantId: "r3",
    name: "Full Veg Thali",
    description:
      "Unlimited thali with 3 sabzi, dal, rice, roti, salad, and sweet",
    price: 150,
    category: "Thali",
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    isVeg: true,
    isAvailable: true,
    isBestseller: true,
  },
  {
    id: "m14",
    restaurantId: "r3",
    name: "Pav Bhaji",
    description: "Spiced mashed vegetables served with buttered bread rolls",
    price: 110,
    category: "Snacks",
    imageUrl:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m15",
    restaurantId: "r3",
    name: "Rajma Chawal",
    description: "Kidney bean curry over steamed basmati rice",
    price: 130,
    category: "Rice & Curry",
    imageUrl:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m16",
    restaurantId: "r3",
    name: "Kadhi Pakora",
    description: "Chickpea flour dumplings in tangy yogurt gravy",
    price: 120,
    category: "Rice & Curry",
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m17",
    restaurantId: "r3",
    name: "Lassi (Sweet)",
    description: "Chilled blended yogurt with sugar and cardamom",
    price: 70,
    category: "Drinks",
    imageUrl:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },

  // Tiranga Sweets & Chaat (r4)
  {
    id: "m18",
    restaurantId: "r4",
    name: "Poha Jalebi",
    description:
      "Fluffy flattened rice with crispy jalebis — Jabalpur's breakfast icon",
    price: 80,
    category: "Breakfast",
    imageUrl:
      "https://images.unsplash.com/photo-1601303516534-bf7d0e7e5c22?w=400&q=80",
    isVeg: true,
    isAvailable: true,
    isBestseller: true,
  },
  {
    id: "m19",
    restaurantId: "r4",
    name: "Dahi Bhalle",
    description:
      "Lentil dumplings dunked in chilled yogurt with tamarind and mint",
    price: 90,
    category: "Chaat",
    imageUrl:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m20",
    restaurantId: "r4",
    name: "Gol Gappa (8 pcs)",
    description: "Crispy hollow puris filled with spiced tamarind water",
    price: 50,
    category: "Chaat",
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m21",
    restaurantId: "r4",
    name: "Kalakand (250g)",
    description: "Milk-based fudge sweet with a grainy, moist texture",
    price: 120,
    category: "Sweets",
    imageUrl:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m22",
    restaurantId: "r4",
    name: "Aloo Tikki Chaat",
    description:
      "Crispy potato patties topped with chutneys and chickpea curry",
    price: 80,
    category: "Chaat",
    imageUrl:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80",
    isVeg: true,
    isAvailable: true,
    isBestseller: true,
  },

  // Jungle Cafe (r5)
  {
    id: "m23",
    restaurantId: "r5",
    name: "Cold Coffee",
    description: "Thick blended coffee with cream — house special",
    price: 130,
    category: "Drinks",
    imageUrl:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80",
    isVeg: true,
    isAvailable: true,
    isBestseller: true,
  },
  {
    id: "m24",
    restaurantId: "r5",
    name: "Grilled Cheese Sandwich",
    description:
      "Double-toasted with cheddar, mozzarella, herbs, and chilli flakes",
    price: 150,
    category: "Sandwiches",
    imageUrl:
      "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m25",
    restaurantId: "r5",
    name: "Chicken Club Sandwich",
    description:
      "Triple-layered with grilled chicken, lettuce, tomato, and mayo",
    price: 200,
    category: "Sandwiches",
    imageUrl:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80",
    isVeg: false,
    isAvailable: true,
  },
  {
    id: "m26",
    restaurantId: "r5",
    name: "Penne Arrabbiata",
    description: "Pasta in spicy tomato sauce with garlic and fresh basil",
    price: 180,
    category: "Pasta",
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },

  // Tandoor Express (r6)
  {
    id: "m27",
    restaurantId: "r6",
    name: "Butter Chicken",
    description: "Tender chicken in rich, creamy tomato-butter gravy",
    price: 280,
    category: "Main Course",
    imageUrl:
      "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&q=80",
    isVeg: false,
    isAvailable: true,
    isBestseller: true,
  },
  {
    id: "m28",
    restaurantId: "r6",
    name: "Paneer Tikka (6 pcs)",
    description:
      "Marinated cottage cheese cubes grilled in tandoor with peppers",
    price: 220,
    category: "Starters",
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80",
    isVeg: true,
    isAvailable: true,
    isBestseller: true,
  },
  {
    id: "m29",
    restaurantId: "r6",
    name: "Garlic Naan",
    description:
      "Soft leavened bread with butter and roasted garlic, fresh from tandoor",
    price: 60,
    category: "Breads",
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m30",
    restaurantId: "r6",
    name: "Chicken Seekh Roll",
    description:
      "Minced chicken seekh wrapped in rumali roti with onions and chutney",
    price: 160,
    category: "Rolls",
    imageUrl:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80",
    isVeg: false,
    isAvailable: true,
  },
  {
    id: "m31",
    restaurantId: "r6",
    name: "Dal Makhani",
    description: "Black lentils slow-cooked overnight with cream and butter",
    price: 180,
    category: "Main Course",
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    isVeg: true,
    isAvailable: true,
  },
  {
    id: "m32",
    restaurantId: "r6",
    name: "Tandoori Chicken (Half)",
    description: "Whole marinated chicken halved and roasted in clay oven",
    price: 300,
    category: "Starters",
    imageUrl:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80",
    isVeg: false,
    isAvailable: true,
  },
];
