interface User {
  id: string;
  clerkUserId: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  createdAt: Date;
}

interface Order {
  id: string;
  userId: string;
  orderEmail: string;
  variation: string; // JSON string with fields like { validity: "1month", price: "100" }
  createdAt: Date;
}

/**
 * Filter items by date range
 * @param items - Array of items with a `createdAt` field
 * @param startDate - Start of the date range
 * @param endDate - End of the date range
 * @returns Filtered array
 */
function filterByDateRange<T extends { createdAt: Date }>(
  items: T[],
  startDate: Date,
  endDate: Date
): T[] {
  return items.filter((item) => {
    const createdAt = new Date(item.createdAt);
    return createdAt >= startDate && createdAt <= endDate;
  });
}

/**
 * Calculate revenue for a given date range
 * @param orders - Array of orders
 * @param startDate - Start of the date range
 * @param endDate - End of the date range
 * @returns Total revenue
 */
function calculateRevenueForDateRange(
  orders: Order[],
  startDate: Date,
  endDate: Date
): number {
  const filteredOrders = filterByDateRange(orders, startDate, endDate);
  return filteredOrders.reduce((total, order) => {
    const variation = JSON.parse(order.variation);
    return total + parseFloat(variation.price || "0");
  }, 0);
}

/**
 * Calculate total subscriptions for a given date range
 * @param users - Array of users
 * @param startDate - Start of the date range
 * @param endDate - End of the date range
 * @returns Total subscriptions
 */
function calculateSubscriptionsForDateRange(
  users: User[],
  startDate: Date,
  endDate: Date
): number {
  return filterByDateRange(users, startDate, endDate).length;
}

/**
 * Calculate total sales for a given date range
 * @param orders - Array of orders
 * @param startDate - Start of the date range
 * @param endDate - End of the date range
 * @returns Total sales
 */
function calculateSalesForDateRange(
  orders: Order[],
  startDate: Date,
  endDate: Date
): number {
  return filterByDateRange(orders, startDate, endDate).length;
}

/**
 * Calculate total customers for a given date range
 * @param users - Array of users
 * @param startDate - Start of the date range
 * @param endDate - End of the date range
 * @returns Total unique customers
 */
function calculateCustomersForDateRange(
  users: User[],
  startDate: Date,
  endDate: Date
): number {
  const filteredUsers = filterByDateRange(users, startDate, endDate);
  return new Set(filteredUsers.map((user) => user.id)).size;
}

/**
 * Calculate percentage change between current and previous values
 * @param current - Current period's value
 * @param previous - Previous period's value
 * @returns Percentage change as a string
 */
function calculatePercentageChange(current: number, previous: number): string {
  if (previous === 0) {
    return current > 0 ? "Infinity%" : "0%";
  }
  const change = ((current - previous) / previous) * 100;
  return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
}

/**
 * Generate Dashboard Data with Monthly Percentage Change
 * @param users - Array of users
 * @param orders - Array of orders
 * @returns Dashboard data object
 */
export function generateDashboardDataWithMonthlyChange(
  users: User[],
  orders: Order[]
): {
  totalRevenue: { value: number; percentageChange: string };
  subscriptions: { value: number; percentageChange: string };
  sales: { value: number; percentageChange: string };
  totalCustomers: { value: number; percentageChange: string };
} {
  const now = new Date();

  // Define the current and previous month's start and end dates
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  // Normalize dates
  const normalizedOrders = orders.map((order) => ({
    ...order,
    createdAt: new Date(order.createdAt),
  }));
  const normalizedUsers = users.map((user) => ({
    ...user,
    createdAt: new Date(user.createdAt),
  }));

  // Monthly calculations (Current month)
  const currentRevenue = calculateRevenueForDateRange(
    normalizedOrders,
    currentMonthStart,
    now
  );
  const currentSubscriptions = calculateSubscriptionsForDateRange(
    normalizedUsers,
    currentMonthStart,
    now
  );
  const currentSales = calculateSalesForDateRange(
    normalizedOrders,
    currentMonthStart,
    now
  );
  const currentCustomers = calculateCustomersForDateRange(
    normalizedUsers,
    currentMonthStart,
    now
  );

  // Monthly calculations (Last month)
  const lastRevenue = calculateRevenueForDateRange(
    normalizedOrders,
    lastMonthStart,
    lastMonthEnd
  );
  const lastSubscriptions = calculateSubscriptionsForDateRange(
    normalizedUsers,
    lastMonthStart,
    lastMonthEnd
  );
  const lastSales = calculateSalesForDateRange(
    normalizedOrders,
    lastMonthStart,
    lastMonthEnd
  );
  const lastCustomers = calculateCustomersForDateRange(
    normalizedUsers,
    lastMonthStart,
    lastMonthEnd
  );

  // Lifetime totals
  const lifetimeRevenue = normalizedOrders.reduce((total, order) => {
    const variation = JSON.parse(order.variation);
    return total + parseFloat(variation.price || "0");
  }, 0);

  const lifetimeSubscriptions = normalizedUsers.length;

  const lifetimeSales = normalizedOrders.length;

  const lifetimeCustomers = new Set(normalizedUsers.map((user) => user.id))
    .size;

  // Percentage changes for the current month vs last month
  const revenueChange = calculatePercentageChange(currentRevenue, lastRevenue);
  const subscriptionsChange = calculatePercentageChange(
    currentSubscriptions,
    lastSubscriptions
  );
  const salesChange = calculatePercentageChange(currentSales, lastSales);
  const customersChange = calculatePercentageChange(
    currentCustomers,
    lastCustomers
  );

  return {
    totalRevenue: {
      value: lifetimeRevenue,
      percentageChange: revenueChange,
    },
    subscriptions: {
      value: lifetimeSubscriptions,
      percentageChange: subscriptionsChange,
    },
    sales: {
      value: lifetimeSales,
      percentageChange: salesChange,
    },
    totalCustomers: {
      value: lifetimeCustomers,
      percentageChange: customersChange,
    },
  };
}
