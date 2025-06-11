
  export interface Booking {
  _id: string;
  user: string;
   tour_operator: {
    _id: string;
    title: string;
    price:number;
    images:string

  };
  tour_and_activity: {
    title:string,
    images:string
  };
  phone_number: string;
  email: string;
  pickup_point: string;
  special_requirements?: string | null;
  date: string; // ISO string from MongoDB
  time: string;
  price:number;
  no_of_persons: number;
  total_cost: number;
  payment_mode: string;
  payment_status: boolean;
  status: 'accepted' | 'rejected' | 'pending'; // you can adjust allowed values
  isCancelled?: boolean | null;
  isDeleted: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  booking:[]
}

