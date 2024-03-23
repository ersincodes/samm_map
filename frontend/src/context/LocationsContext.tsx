import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import { LocationData, LocationsProviderProps } from "../types/types";
import { getLocations } from "../api/locationApi";

interface LocationsState {
  locations: LocationData[];
  loading: boolean;
  error: string | null;
  selectedLocation: {
    id: string | null;
    latitude: number | null;
    longitude: number | null;
  };
}

type Action =
  | { type: "SET_LOCATIONS"; payload: LocationData[] }
  | { type: "ADD_LOCATION"; payload: LocationData }
  | { type: "REMOVE_LOCATION"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | {
      type: "SET_SELECTED_LOCATION";
      payload: { id: string; latitude: number; longitude: number } | null;
    };

// Initial state
const initialState: LocationsState = {
  locations: [],
  loading: false,
  error: null,
  selectedLocation: {
    id: null,
    latitude: null,
    longitude: null,
  },
};

const LocationsContext = createContext<
  | {
      state: LocationsState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

// Reducer function
const locationsReducer = (
  state: LocationsState,
  action: Action
): LocationsState => {
  switch (action.type) {
    case "SET_LOCATIONS":
      return { ...state, locations: action.payload, loading: false };
    case "ADD_LOCATION":
      return { ...state, locations: [...state.locations, action.payload] };
    case "REMOVE_LOCATION":
      const isRemovedLocationSelected =
        state.selectedLocation?.id === action.payload;
      return {
        ...state,
        locations: state.locations.filter((loc) => loc._id !== action.payload),
        selectedLocation: isRemovedLocationSelected
          ? { id: null, latitude: null, longitude: null }
          : state.selectedLocation,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_SELECTED_LOCATION":
      return {
        ...state,
        selectedLocation: action.payload
          ? {
              id: action.payload.id,
              latitude: action.payload.latitude,
              longitude: action.payload.longitude,
            }
          : {
              id: null,
              latitude: null,
              longitude: null,
            },
      };
    default:
      return state;
  }
};

// Provider component with added fetchLocations effect
export const LocationsProvider: React.FC<LocationsProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(locationsReducer, initialState);

  useEffect(() => {
    const fetchLocations = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const apiData = await getLocations();
        dispatch({ type: "SET_LOCATIONS", payload: apiData });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to load locations" });
      }
    };

    fetchLocations();
  }, []);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <LocationsContext.Provider value={contextValue}>
      {children}
    </LocationsContext.Provider>
  );
};

// Hook to use locations context(Custom)
export const useLocations = () => {
  const context = useContext(LocationsContext);
  if (!context) {
    throw new Error("useLocations must be used within a LocationsProvider");
  }
  return context;
};
