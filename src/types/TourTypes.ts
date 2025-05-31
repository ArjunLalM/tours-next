export interface Tour {
  tour_operator: string; // ObjectId as string
  title: string;
  isDeleted?: boolean; // optional since it has a default
  description: string;
  activityTypes: string;
  tourType: 'Adventure' | 'Cultural' | 'Wildlife' | 'Leisure' | 'Historical' | 'Other';
  duration: number;
  availability: number;
  destination: string;
  coordinates: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  images: string[];
  itinerary: {
    step?: number;
    description: string;
  }[];
}
