"use client"
import { useEffect, useState } from "react"; // Adjust as needed
import { ItineraryItem } from "@/types/TourTypes";
import ItineraryForm from "./AddItinerary"; // Adjust path
import EditItineraryForm from "./EditItinerary";
import { deleteItinerary } from "@/store/Itinerary"; 
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ItineraryListProps {
  itinerary: ItineraryItem[];
  tourId: string; 
 operatorId:string
 role:string | null
 loading:boolean
}

const ItineraryList = ({ itinerary, tourId ,operatorId,loading}: ItineraryListProps) => {

  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
const [showEditForm, setShowEditForm] = useState(false);
const [selectedItem, setSelectedItem] = useState<ItineraryItem | null>(null);

const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const id = localStorage.getItem("userId");

    setUserId(id);
  }, []);

  const isOwner = userId === operatorId;

  return (
    <div className="p-6">
       {isOwner && (
      <div className="flex items-center mb-4">
        <button
         disabled={loading}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        >
          + Add Day
        </button>
        {itinerary.length > 0 && (
      <button
       disabled={loading}
        className="text-sm ml-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        onClick={() => {
          const lastItem = itinerary[itinerary.length - 1];
          if (
            lastItem &&
            confirm("Are you sure you want to delete the last itinerary day?")
          ) {
            dispatch(deleteItinerary({ tourId, itineraryId: lastItem._id }));
             toast.success("Last itinerary day deleted successfully!");
          }
        }}
      >
         Delete
      </button>
    )}
      </div>
       )}

      <ItineraryForm
        open={showForm}
        handleClose={() => setShowForm(false)}
        tourId = {tourId}
         currentItineraryLength={itinerary.length}
      />

      {selectedItem && (
  <EditItineraryForm
    open={showEditForm}
    handleClose={() => {
      setShowEditForm(false);
      setSelectedItem(null);
    }}
    tourId={tourId}
    itineraryId={selectedItem._id}
    currentDescription={selectedItem.description}
  />
)}

      <div className="mt-4">
        {itinerary.map((item, index) => (
  <div key={item._id || index} className="mb-4 pb-2">
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Day {item.step}
      </h3>
      <div className="flex gap-3">
         {isOwner && (
        <button
          className="text-sm text-blue-600"
          onClick={() => {
            setSelectedItem(item); // Set the itinerary to edit
            setShowEditForm(true); // Show the form
          }}
        >
          Edit
        </button>
         )}
 
      </div>
    </div>
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
      <li>{item.description}</li>
    </ul>
  </div>
))}

      </div>
    </div>
  );
};

export default ItineraryList;
