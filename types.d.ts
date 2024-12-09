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

interface ProductVariation {
  validity: string;
  price: number;
}

interface ProductData {
  productSlug: string;
  productName: string;
  productDescription: string;
  productCategory:
    | "streaming"
    | "learning"
    | "creativity"
    | "utility"
    | "service"
    | "others";
  variations: string;
  productMetaTitle: string;
  productMetaDescription: string;
  productImage: string;
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
