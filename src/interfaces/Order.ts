export interface Order {
  id: string;
  order_type: string;
  total: number;
  isViewedByAdmin: boolean;
  order_number: string;
  delivery_type: string;
  isPayed: boolean;
  user: {
    id: string | null;
    name: string | null;
    lastName: string | null;
    secondName: string | null;
    firmName: string | null;
    role: string | null;
  };
  warehouse: { city: string };
  date: string;
}
