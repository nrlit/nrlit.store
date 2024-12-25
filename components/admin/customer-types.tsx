import { User, Order, Product } from "@prisma/client";

export type SearchParams = {
  search?: string;
};

export type CustomerWithOrders = User & {
  orders: (Order & {
    product: Product;
  })[];
  totalSpent: number;
  orderCount: number;
};
