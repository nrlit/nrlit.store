interface IUser {
  name: string;
  email: string;
  id: string;
  password: string;
  lastOrder: string;
  totalSpent: number;
  isAdmin: boolean;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: Array;
  $databaseId: string;
  $collectionId: string;
  preference: Preference;
}

interface ISessionCookie {
  value: string;
}

interface User {
  userId: string; // Primary key
  userName: string;
  userEmail: string; // Unique
  userPassword: string; // Hashed before storage
  userContactNumber?: string; // Optional, unique if required
  creationDate: string; // ISO 8601 DateTime
  updatingDate: string; // ISO 8601 DateTime
}

interface Product {
  productId: string; // Primary key
  productSlug: string; // Unique
  name: string;
  description: string;
  category: string;
  variation: Array<{
    validity: string; // e.g., "1month", "3months"
    price: number; // Price in numeric format
  }>;
  creationDate: string; // ISO 8601 DateTime
  updatingDate: string; // ISO 8601 DateTime
  metaTitle?: string; // Optional metadata
  metaDescription?: string; // Optional metadata
  image?: string; // URL to product image
  tags?: string[]; // Array of tags
  available: boolean;
}

interface Order {
  orderId: string; // Primary key
  productId: string; // Foreign key referencing Products
  userId: string; // Foreign key referencing Users
  orderEmail: string;
  userContactNumber: string;
  variation: {
    validity: string; // e.g., "1month"
    price: number; // Price in numeric format
  };
  orderStatus: "pending" | "confirmed" | "delivered" | "cancelled"; // Enum
  creationDate: string; // ISO 8601 DateTime
  updatingDate: string; // ISO 8601 DateTime
  userAdditionalNote?: string; // Optional
  paymentMethod: "bKash" | "Nagad" | "Card" | "Cash"; // Enum
  transactionId?: string; // Optional, only for paid orders
}
