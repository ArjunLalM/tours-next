
export interface Reviews {

   _id: string;
   tourId:string;
   reviewId:string
  review: string;
  ratings: number;
  user: {
    _id: string;
    firstName: string;
  },
  tour:{
       _id: string;
        title: string;
  },
  };

