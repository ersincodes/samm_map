import { LocationData } from "../types/types";

// Adjust BASE_URL based on the environment
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-production-url.com/api/location"
    : "http://localhost:3001/api/location";

// Helper function to handle response
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || "An error occurred with the request");
  }
  return response.json();
};
export type NewLocationData = Omit<LocationData, "_id">;

// Function to save a location
export const saveLocation = async (
  locationData: NewLocationData
): Promise<LocationData> => {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(locationData),
  });
  return handleResponse<LocationData>(response);
};

// Function to get all locations
export const getLocations = async (): Promise<LocationData[]> => {
  const response = await fetch(`${BASE_URL}`, {
    method: "GET",
  });
  return handleResponse<LocationData[]>(response);
};

// Function to delete a location
export const deleteLocation = async (locationId: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${locationId}`, {
    method: "DELETE",
  });
  await handleResponse<void>(response);
};
