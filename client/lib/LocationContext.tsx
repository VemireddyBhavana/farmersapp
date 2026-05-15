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

  const setLocation = (data: LocationData) => {
    setLocationState(data);
    localStorage.setItem("farmer_location", JSON.stringify(data));
  };

  const detectLocation = React.useCallback(async () => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      setIsLoading(false);
      return;
    }

    return new Promise<void>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocode using Nominatim (OpenStreetMap)
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
            );
            const data = await response.json();
            
            if (data && data.address) {
              const detected: LocationData = {
                country: data.address.country || "India",
                state: data.address.state || "Andhra Pradesh",
                district: data.address.city || data.address.county || data.address.district || data.address.state_district || "Guntur",
                lat: latitude,
                lng: longitude
              };
              setLocation(detected);
            }
          } catch (error) {
            console.error("Error reverse geocoding:", error);
          } finally {
            setIsLoading(false);
            resolve();
          }
        },
        (error) => {
          console.error("Error detecting location:", error);
          setIsLoading(false);
          resolve();
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  }, []);

  // Load from localStorage on mount or detect if empty
  useEffect(() => {
    const savedLocation = localStorage.getItem("farmer_location");
    if (savedLocation) {
      try {
        setLocationState(JSON.parse(savedLocation));
      } catch (e) {
        console.error("Failed to parse saved location", e);
        detectLocation();
      }
    } else {
      detectLocation();
    }
  }, [detectLocation]);

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
