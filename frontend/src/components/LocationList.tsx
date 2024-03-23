import React from "react";
import { useLocations } from "../context/LocationsContext";
import LocationListItem from "./LocationListItem";
import { LocationData } from "../types/types";
import { downloadJson } from "../utils/downloadJson";

const LocationList: React.FC = () => {
  const { state, dispatch } = useLocations();

  const handleDownload = () => {
    // Assuming `state.locations` holds your data
    downloadJson(state.locations, "locations");
  };

  // Function to handle selection of an item, should be inside the component
  const handleSelectLocation = (location: LocationData) => {
    dispatch({
      type: "SET_SELECTED_LOCATION",
      payload: {
        id: location._id,
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow overflow-y-auto z-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">✧ Location List</h2>
        <button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <i className="fas fa-download mr-2"></i> Download Data
        </button>
      </div>
      {state.locations.length > 0 ? (
        <ul className="space-y-4 cursor-pointer">
          {state.locations.map((location) => (
            <LocationListItem
              key={location._id}
              location={location}
              onSelect={handleSelectLocation}
              isSelected={state.selectedLocation?.id === location._id}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No locations saved yet.</p>
      )}
    </div>
  );
};

export default LocationList;
