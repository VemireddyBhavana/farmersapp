import { LocationData } from "@shared/api";

export interface CropRecommendation {
  crop: string;
  suitability: "High" | "Medium" | "Low";
  reason: string;
  bestMonths: string[];
}

export const getCropRecommendations = (location: LocationData): CropRecommendation[] => {
  const { country, state, district } = location;

  if (country === "India") {
    if (state === "Andhra Pradesh") {
      if (district === "Guntur") {
        return [
          { crop: "Chili", suitability: "High", reason: "Famous for Guntur Sannam variety, ideal soil and climate.", bestMonths: ["August", "September"] },
          { crop: "Cotton", suitability: "High", reason: "Black cotton soil predominant in this region.", bestMonths: ["June", "July"] },
          { crop: "Tobacco", suitability: "Medium", reason: "Traditional crop, good for specific soil pockets.", bestMonths: ["October", "November"] }
        ];
      }
      return [
        { crop: "Rice", suitability: "High", reason: "Abundant water from Krishna/Godavari basins.", bestMonths: ["June", "July"] },
        { crop: "Maize", suitability: "Medium", reason: "Suitable for upland areas.", bestMonths: ["October", "November"] }
      ];
    }
    if (state === "Punjab") {
      return [
        { crop: "Wheat", suitability: "High", reason: "Granary of India, ideal winter climate.", bestMonths: ["November"] },
        { crop: "Rice", suitability: "High", reason: "Extensive irrigation support.", bestMonths: ["June"] }
      ];
    }
  }

  if (country === "USA") {
    if (state === "California" && (district === "Fresno" || district === "Tulare")) {
      return [
        { crop: "Almonds", suitability: "High", reason: "Central Valley climate is world-best for almonds.", bestMonths: ["February", "March"] },
        { crop: "Grapes", suitability: "High", reason: "Ideal for wine and table grape production.", bestMonths: ["March", "April"] }
      ];
    }
  }

  // Default fallback
  return [
    { crop: "Vegetables", suitability: "Medium", reason: "General suitability for mixed farming.", bestMonths: ["Year-round"] }
  ];
};
