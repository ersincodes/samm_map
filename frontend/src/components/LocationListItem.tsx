import React from "react";
import { LocationData } from "../types/types";
import { useLocations } from "../context/LocationsContext";
import { deleteLocation as deleteLocationApi } from "../api/locationApi";

interface LocationListItemProps {
  location: LocationData;
  onSelect: (location: LocationData) => void;
  isSelected: boolean;
}

const LocationListItem: React.FC<LocationListItemProps> = ({
  location,
  onSelect,
  isSelected,
}) => {
  const { dispatch } = useLocations();

  const deleteLocation = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await deleteLocationApi(location._id);
      dispatch({ type: "REMOVE_LOCATION", payload: location._id });
    } catch (error) {
      console.error("Failed to delete location:", error);
    }
  };

  const handleSelect = () => {
    onSelect(location);
  };

  const itemClass = isSelected
    ? "flex items-center justify-between bg-white rounded-lg p-4 shadow border-2 border-blue-500"
    : "flex items-center justify-between bg-white rounded-lg p-4 shadow";

  return (
    <li className={itemClass} onClick={handleSelect}>
      <div>
        <p className="text-sm text-gray-600">Lat: {location.latitude}</p>
        <p className="text-sm text-gray-600">Lng: {location.longitude}</p>
        <p className="text-sm text-gray-600">Date: {location.date}</p>
      </div>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        onClick={deleteLocation}>
        <i className="fas fa-trash mr-2"></i>
        Delete
      </button>
    </li>
  );
};

export default LocationListItem;
