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
