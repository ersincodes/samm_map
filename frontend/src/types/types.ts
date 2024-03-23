//A type for the location data structure
export type LocationData = {
  _id: string;
  latitude: number;
  longitude: number;
  date: string;
};

//A type for the state of the Locations context
export type LocationsState = {
  locations: LocationData[];
  loading: boolean;
  error: string | null;
};

// Action types as a union of several type literals
export type LocationsAction =
  | { type: "SET_LOCATIONS"; payload: LocationData[] }
  | { type: "ADD_LOCATION"; payload: Omit<LocationData, "_id" | "name"> }
  | { type: "REMOVE_LOCATION"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

// Define props for the LocationsProvider component
export type LocationsProviderProps = {
  children: React.ReactNode;
};

export type AddLocationFunction = (location: Omit<LocationData, "_id">) => void;

export const enum LocationsActionTypes {
  SetLocations = "SET_LOCATIONS",
  AddLocation = "ADD_LOCATION",
  RemoveLocation = "REMOVE_LOCATION",
  SetLoading = "SET_LOADING",
  SetError = "SET_ERROR",
}

export type LocationsActionEnum = {
  type: LocationsActionTypes.SetLocations;
  payload: LocationData[];
};
