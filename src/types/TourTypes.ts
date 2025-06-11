// types/TourTypes.ts

export interface ItineraryItem {
  _id: string;
  step: number;
  day: string;
  description: string;
}

export interface Tour {
  userid: string;
  operatorId: string;
  _id: string;
  tour_operator: string;
  title: string;
  isDeleted?: boolean;
  description: string;
  price: number;
  activityTypes: string;
  tourType: 'Adventure' | 'Cultural' | 'Wildlife' | 'Leisure' | 'Historical' | 'Other';
  duration: number;
  availability: number;
  destination: string;
  coordinates: {
    type: 'Point';
    coordinates: [number, number];
  };
  images: string[];
  itinerary?: ItineraryItem[];
}
export interface HomeTours {
  _id:string,
  destination:string
  title: string;
  duration:string,
  images:string[],
  price:string,

}