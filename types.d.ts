interface IUser {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  registration: string;
  status: boolean;
  labels: Array;
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  mfa: boolean;
  prefs: object;
  targets: Array;
  accessedAt: string;
}

interface ISessionCookie {
  value: string;
}

interface UserData {
  userName: string;
  userEmail: string;
  userPassword: string;
  orders: Array;
  totalSpent: number;
  isAdmin: boolean;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: Array;
  $databaseId: string;
  $collectionId: string;
}

interface ProductData {
  productSlug: string;
  name: string;
  description: string;
  category:
    | "streaming"
    | "learning"
    | "creativity"
    | "utility"
    | "service"
    | "others";
  variation: Array<{
    validity: string;
    price: number;
  }>;
  metaTitle: string;
  metaDescription: string;
  image: string;
  tags?: string[];
  available: boolean;
  isFeatured: boolean;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: Array;
  $databaseId: string;
  $collectionId: string;
}

interface OrderData {
  productId: string;
  userId: string;
  orderEmail: string;
  userContactNumber: string;
  variation: {
    validity: string;
    price: number;
  };
  orderStatus: "pending" | "confirmed" | "delivered" | "cancelled";
  userAdditionalNote?: string;
  paymentMethod: "bKash" | "Nagad" | "Card";
  transactionId?: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: Array;
  $databaseId: string;
  $collectionId: string;
}
