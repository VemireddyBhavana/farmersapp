import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

import { LocationData } from "@shared/api";

interface LocationContextType {
  location: LocationData;
  setLocation: (data: LocationData) => void;
  detectLocation: () => Promise<void>;
  isLoading: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState<LocationData>({
    country: "India",
    state: "Andhra Pradesh",
    district: "Guntur",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("farmer_location");
    if (savedLocation) {
      try {
        setLocationState(JSON.parse(savedLocation));
      } catch (e) {
        console.error("Failed to parse saved location", e);
      }
    }
  }, []);

  const setLocation = (data: LocationData) => {
    setLocationState(data);
    localStorage.setItem("farmer_location", JSON.stringify(data));
  };

  const detectLocation = async () => {
    setIsLoading(true);
    // Simulate IP/GPS detection
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Mock detection result
        const detected: LocationData = {
          country: "India",
          state: "Andhra Pradesh",
          district: "Guntur",
        };
        setLocation(detected);
        setIsLoading(false);
        resolve();
      }, 1500);
    });
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, detectLocation, isLoading }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export const useFarmerLocation = () => {
  const context = useLocation();
  return { farmerLocation: context.location, ...context };
};
