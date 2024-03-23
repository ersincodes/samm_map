import React, { useState, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useLocations } from "../context/LocationsContext";
import { LocationData } from "../types/types";
import { saveLocation } from "../api/locationApi";

const MapComponent: React.FC = () => {
  const { state, dispatch } = useLocations();
  const mapRef = useRef<L.Map | null>(null);

  // useEffect
  useEffect(() => {
    if (
      mapRef.current &&
      state.selectedLocation &&
      state.selectedLocation.latitude !== null &&
      state.selectedLocation.longitude !== null
    ) {
      mapRef.current.flyTo([
        state.selectedLocation.latitude,
        state.selectedLocation.longitude,
      ]);
    }
  }, [state.selectedLocation]);

  const handleSaveLocation = async () => {
    if (mapRef.current) {
      const latitude = mapRef.current.getCenter().lat;
      const longitude = mapRef.current.getCenter().lng;
      const date = new Date().toISOString();
      const newLocation: Omit<LocationData, "_id"> = {
        latitude,
        longitude,
        date,
      };

      try {
        const savedLocation = await saveLocation(newLocation);
        dispatch({
          type: "ADD_LOCATION",
          payload: savedLocation as LocationData,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[40.84542092095687, 29.422845840454105]}
        zoom={14}
        style={{ height: "77vh", width: "100%" }}
        ref={mapRef}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {state.locations.map((location) => (
          <Marker
            key={location._id}
            position={[location.latitude, location.longitude]}>
            <Popup>
              Latitude: {location.latitude} <br /> Longitude:{" "}
              {location.longitude}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="absolute top-4 right-2" style={{ zIndex: 400 }}>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          onClick={handleSaveLocation}>
          <i className="fas fa-save mr-2"></i>
          Save Location
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
