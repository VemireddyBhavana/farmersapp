import { LocationData } from "@shared/api";

export interface WeatherAdvisory {
  condition: string;
  severity: "Normal" | "Warning" | "Critical";
  advice: string;
  icon: string;
}

export const getWeatherAdvisory = (location: LocationData, weather: any): WeatherAdvisory[] => {
  const advisories: WeatherAdvisory[] = [];
  
  if (!weather) return advisories;

  const temp = weather.main?.temp;
  const clouds = weather.clouds?.all;
  const wind = weather.wind?.speed;

  if (temp > 40) {
    advisories.push({
      condition: "Extreme Heatwave",
      severity: "Critical",
      advice: "Avoid direct sun between 12 PM - 4 PM. Increase irrigation frequency for sensitive crops.",
      icon: "ThermometerSun"
    });
  } else if (temp < 10) {
    advisories.push({
      condition: "Cold Wave Forecast",
      severity: "Warning",
      advice: "Frost protection needed for horticulture crops. Use light irrigation to maintain soil temp.",
      icon: "CloudSnow"
    });
  }

  if (clouds > 80) {
    advisories.push({
      condition: "Heavy Overcast",
      severity: "Normal",
      advice: "Potential rain expected. Delay fertilizer application to avoid runoff.",
      icon: "CloudRain"
    });
  }

  if (wind > 20) {
    advisories.push({
      condition: "High Wind Speed",
      severity: "Warning",
      advice: "Check greenhouse structures. Avoid spraying pesticides as it may drift.",
      icon: "Wind"
    });
  }

  if (advisories.length === 0) {
    advisories.push({
      condition: "Fair Weather",
      severity: "Normal",
      advice: "Optimal conditions for all farm activities. Good time for weeding and fertilization.",
      icon: "Sun"
    });
  }

  return advisories;
};
