import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiSearch, FiSun, FiShare2, FiTarget, FiPlay, FiPause, FiChevronRight, FiMessageCircle, FiCloud, FiCloudLightning, FiGlobe, FiTrendingUp, FiThermometer, FiX, FiCopy, FiCheck, FiWind, FiDroplet, FiAlertTriangle, FiInfo, FiBookOpen } from "react-icons/fi";
import { toast } from "sonner";

interface CityWeatherData {
  name: string;
  temp: number;
  maxTemps: number[];
  minTemps: number[];
  weatherTypes: ('rain' | 'sun')[];
}

const cityDataMap: Record<string, CityWeatherData> = {
  Hyderabad: {
    name: "Hyderabad",
    temp: 36,
    maxTemps: [37, 38, 39, 39, 39, 40, 39, 39, 40, 39, 39, 37, 36, 35],
    minTemps: [28, 28, 28, 28, 29, 28, 29, 28, 28, 28, 27, 27, 26, 26],
    weatherTypes: ['rain', 'sun', 'sun', 'sun', 'sun', 'sun', 'sun', 'rain', 'sun', 'rain', 'sun', 'rain', 'sun', 'sun']
  },
  Delhi: {
    name: "Delhi",
    temp: 38,
    maxTemps: [39, 40, 41, 42, 42, 42, 41, 42, 43, 44, 45, 46, 46, 44],
    minTemps: [30, 31, 30, 30, 31, 31, 30, 30, 31, 32, 32, 32, 32, 30],
    weatherTypes: ['sun', 'sun', 'sun', 'sun', 'sun', 'sun', 'sun', 'sun', 'sun', 'sun', 'sun', 'sun', 'sun', 'rain']
  },
  Mumbai: {
    name: "Mumbai",
    temp: 34,
    maxTemps: [33, 34, 34, 33, 34, 34, 33, 34, 33, 34, 34, 33, 34, 33],
    minTemps: [27, 27, 28, 27, 28, 28, 27, 27, 28, 28, 27, 27, 28, 27],
    weatherTypes: ['rain', 'rain', 'sun', 'rain', 'rain', 'sun', 'rain', 'rain', 'sun', 'rain', 'rain', 'sun', 'rain', 'rain']
  },
  Bengaluru: {
    name: "Bengaluru",
    temp: 30,
    maxTemps: [30, 31, 31, 30, 31, 31, 30, 29, 30, 31, 31, 30, 30, 29],
    minTemps: [21, 22, 21, 21, 22, 22, 21, 20, 21, 22, 22, 21, 21, 20],
    weatherTypes: ['sun', 'sun', 'rain', 'sun', 'sun', 'rain', 'sun', 'sun', 'rain', 'sun', 'sun', 'rain', 'sun', 'sun']
  }
};

const getCityData = (cityName: string): CityWeatherData => {
  const normalized = cityName.trim();
  const lower = normalized.toLowerCase();
  
  if (cityDataMap[normalized]) {
    return cityDataMap[normalized];
  }
  
  const matchedKey = Object.keys(cityDataMap).find(k => k.toLowerCase() === lower);
  if (matchedKey) {
    return cityDataMap[matchedKey];
  }
  
  let hash = 0;
  for (let i = 0; i < lower.length; i++) {
    hash = lower.charCodeAt(i) + ((hash << 5) - hash);
  }
  const baseTemp = 25 + Math.abs(hash % 15);
  
  const maxTemps = Array.from({ length: 14 }, (_, idx) => {
    const variation = Math.sin(idx + hash) * 3;
    return Math.round(baseTemp + variation);
  });
  
  const minTemps = Array.from({ length: 14 }, (_, idx) => {
    const variation = Math.cos(idx + hash) * 2;
    return Math.round(baseTemp - 8 + variation);
  });
  
  const weatherTypes = Array.from({ length: 14 }, (_, idx) => {
    return (idx + Math.abs(hash)) % 3 === 0 ? 'rain' : 'sun';
  });
  
  return {
    name: normalized.charAt(0).toUpperCase() + normalized.slice(1),
    temp: Math.round(baseTemp),
    maxTemps,
    minTemps,
    weatherTypes
  };
};

const generatePath = (temps: number[], isMax: boolean) => {
  const points = temps.map((temp, i) => {
    const x = 15 + i * (460 / 13);
    const y = isMax 
      ? 70 - (temp - 25) * 2.5
      : 180 - (temp - 15) * 2.5;
    return { x, y };
  });
  
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const xc = (curr.x + next.x) / 2;
    const yc = (curr.y + next.y) / 2;
    path += ` Q ${curr.x} ${curr.y}, ${xc} ${yc}`;
  }
  path += ` L ${points[points.length - 1].x} ${points[points.length - 1].y}`;
  return path;
};

const Weather: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const navigate = useNavigate();

  // Premium Interactions State Hooks
  const [radarOverlay, setRadarOverlay] = useState<"weather" | "rain" | "wind" | "lightning">("weather");
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDetailedForecastOpen, setIsDetailedForecastOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Radar state controls
  const [radarTime, setRadarTime] = useState<"now" | "today" | "tomorrow">("now");
  const [isRadarPlaying, setIsRadarPlaying] = useState(false);
  
  // Dynamic list of cities at the top
  const [citiesList, setCitiesList] = useState([
    { name: 'Hyderabad', temp: 36, bg: 'bg-gradient-to-r from-[#296898] to-[#4c92ba]' },
    { name: 'Delhi', temp: 38, bg: 'bg-gradient-to-r from-[#a7b0b6] to-[#99a2a8]' },
    { name: 'Mumbai', temp: 34, bg: 'bg-gradient-to-r from-[#20679b] to-[#458bba]' },
    { name: 'Bengaluru', temp: 30, bg: 'bg-gradient-to-r from-[#8ba0af] to-[#a2b3bf]' },
  ]);

  const currentCityData = getCityData(selectedCity);

  // Auto-play interval for live simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRadarPlaying) {
      interval = setInterval(() => {
        setRadarTime(prev => {
          if (prev === "now") return "today";
          if (prev === "today") return "tomorrow";
          return "now";
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isRadarPlaying]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const query = searchQuery.trim();
    setSelectedCity(query);
    
    const exists = citiesList.some(c => c.name.toLowerCase() === query.toLowerCase());
    if (!exists) {
      const newCity = getCityData(query);
      const randomBg = [
        'bg-gradient-to-r from-[#296898] to-[#4c92ba]',
        'bg-gradient-to-r from-[#a7b0b6] to-[#99a2a8]',
        'bg-gradient-to-r from-[#20679b] to-[#458bba]',
        'bg-gradient-to-r from-[#8ba0af] to-[#a2b3bf]'
      ][Math.floor(Math.random() * 4)];
      
      setCitiesList(prev => [
        ...prev,
        { name: newCity.name, temp: newCity.temp, bg: randomBg }
      ]);
    }
    setSearchQuery("");
  };

  // Determine dynamic marker location for search results
  const isDefaultCity = ['hyderabad', 'delhi', 'new delhi', 'mumbai', 'kolkata', 'chennai', 'srinagar', 'nagpur'].includes(selectedCity.toLowerCase());
  
  let customTop = 40;
  let customLeft = 50;
  if (!isDefaultCity) {
    let hash = 0;
    const lowerCity = selectedCity.toLowerCase();
    for (let i = 0; i < lowerCity.length; i++) {
      hash = lowerCity.charCodeAt(i) + ((hash << 5) - hash);
    }
    customTop = 20 + Math.abs(hash % 60); // 20% to 80%
    customLeft = 25 + Math.abs((hash >> 4) % 50); // 25% to 75%
  }

  // Animation shift based on radar timeline
  const timeOffset = radarTime === "now" ? 0 : radarTime === "today" ? 6 : 14;

  return (
    <div className="min-h-screen bg-white font-['Open_Sans'] pt-2">
      {/* Header */}
      <nav className="bg-[#126b8e] relative h-16 rounded-tl-[1.5rem] rounded-tr-[2px] mx-2 flex flex-col justify-center overflow-visible z-20 shadow-md">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay rounded-tl-[1.5rem]"
          style={{ 
            backgroundImage: `url('https://www.transparenttextures.com/patterns/topography.png')`,
            backgroundSize: '400px'
          }}
        />
        
        <div className="container mx-auto px-4 flex items-center justify-between relative z-30">
          <div className="flex items-center gap-4">
             <button onClick={() => setIsDrawerOpen(true)} className="text-white text-xl hover:text-white/80 transition-colors cursor-pointer">
                <FiMenu />
             </button>
             <div className="text-white text-2xl flex items-center gap-0 font-sans tracking-tight">
                <span>weather</span>
                <span className="text-[#ffcc00] font-bold mx-[1px]">&</span>
                <span>radar</span>
             </div>
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative ml-auto mr-8 items-center h-10">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city (e.g. Nagpur, Srinagar)..."
              className="w-full h-full bg-white border-none rounded-l-sm pl-4 pr-12 text-sm text-[#333] focus:outline-none shadow-inner"
            />
            <button type="submit" className="absolute -right-5 h-10 w-10 bg-[#ffcc00] rounded-full flex items-center justify-center text-white hover:bg-[#e6b800] transition-colors shadow-md cursor-pointer">
              <FiSearch className="text-lg" />
            </button>
          </form>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ffb300] z-20"></div>
      </nav>

      {/* Sidebar Drawer */}
      <div className="relative z-50">
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-black/50 transition-opacity z-40" onClick={() => setIsDrawerOpen(false)}></div>
        )}
        
        <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <div className="flex items-center justify-between p-4 bg-[#126b8e] text-white">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setIsDrawerOpen(false)} className="p-1 hover:bg-black/10 rounded-full cursor-pointer">
                 <FiX className="text-2xl" />
              </button>
           </div>
           <div className="flex-1 overflow-y-auto py-2">
              <ul className="flex flex-col text-slate-700 font-medium text-sm">
                  <li onClick={() => { setIsDrawerOpen(false); navigate("/dashboard"); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-[#ffcc00] bg-slate-50 text-[#126b8e]">Home</li>
                  <li onClick={() => { setIsDrawerOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">Weather</li>
                  <li onClick={() => { setIsDrawerOpen(false); setRadarOverlay("weather"); document.getElementById("weather-radar-section")?.scrollIntoView({ behavior: "smooth" }); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">WeatherRadar</li>
                  <li onClick={() => { setIsDrawerOpen(false); setRadarOverlay("rain"); document.getElementById("weather-radar-section")?.scrollIntoView({ behavior: "smooth" }); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">RainRadar</li>
                  <li onClick={() => { setIsDrawerOpen(false); document.getElementById("temp-radar-section")?.scrollIntoView({ behavior: "smooth" }); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">TemperatureRadar</li>
                  <li onClick={() => { setIsDrawerOpen(false); setRadarOverlay("wind"); document.getElementById("weather-radar-section")?.scrollIntoView({ behavior: "smooth" }); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">WindRadar</li>
                  <li onClick={() => { setIsDrawerOpen(false); setRadarOverlay("lightning"); document.getElementById("weather-radar-section")?.scrollIntoView({ behavior: "smooth" }); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">LightningRadar</li>
                  <div className="my-2 border-t border-slate-200"></div>
                  <li onClick={() => { setIsDrawerOpen(false); document.getElementById("news-section")?.scrollIntoView({ behavior: "smooth" }); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">Weather News</li>
                  <li onClick={() => { setIsDrawerOpen(false); document.getElementById("news-section")?.scrollIntoView({ behavior: "smooth" }); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">{"Editor's Pick"}</li>
                  <div className="my-2 border-t border-slate-200"></div>
                  <li onClick={() => { setIsDrawerOpen(false); navigate("/explore"); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent text-[#126b8e] font-bold">Discover the app</li>
                  <li onClick={() => { setIsDrawerOpen(false); navigate("/explore"); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">Weather widget</li>
                  <li onClick={() => { setIsDrawerOpen(false); navigate("/contact"); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">Contact us</li>
                  <li onClick={() => { setIsDrawerOpen(false); navigate("/explore"); }} className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">Apps</li>
              </ul>
           </div>
        </div>
      </div>

      {/* City Cards Section */}
      <div className="container mx-auto px-2 py-4">
         {/* Mobile Search Bar */}
         <form onSubmit={handleSearch} className="flex md:hidden relative items-center h-10 mb-4 px-2">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city..."
              className="w-full h-full bg-slate-100 border border-slate-300 rounded-sm pl-4 pr-12 text-sm text-[#333] focus:outline-none"
            />
            <button type="submit" className="absolute right-3 h-10 w-10 bg-[#ffcc00] rounded-sm flex items-center justify-center text-white hover:bg-[#e6b800] transition-colors shadow-md cursor-pointer">
              <FiSearch className="text-lg" />
            </button>
         </form>

         <div className="flex gap-3 overflow-x-auto pb-4 snap-x hide-scrollbar justify-start md:justify-center px-2">
            {citiesList.map((city, i) => {
              const isActive = selectedCity.toLowerCase() === city.name.toLowerCase();
              return (
                <div 
                  key={i} 
                  onClick={() => setSelectedCity(city.name)}
                  className={`flex-shrink-0 w-48 h-14 rounded-md ${city.bg} p-3 flex items-center justify-between text-white shadow-md snap-start cursor-pointer hover:opacity-100 transition-all duration-300 ${isActive ? 'ring-4 ring-[#ffcc00] scale-105 opacity-100' : 'opacity-70'}`}
                >
                   <span className="text-sm font-semibold drop-shadow-sm">{city.name}</span>
                   <div className="flex items-center gap-1">
                      <FiSun className="text-white/40 text-xs" />
                      <span className="text-xl font-light drop-shadow-sm">{city.temp}°</span>
                   </div>
                </div>
              );
            })}
         </div>
         
         {/* Carousel dots */}
         <div className="flex justify-center gap-3 mt-1">
            <div className="w-2 h-2 rounded-full bg-[#ffcc00]"></div>
            <div className="w-2 h-2 rounded-full bg-[#126b8e]"></div>
         </div>
      </div>

      {/* Content Below Cards */}
      <div className="container mx-auto px-2 py-2 max-w-5xl space-y-4 pb-8">
        {/* Rain and Hails Card */}
        <div onClick={() => setIsSafetyModalOpen(true)} className="w-full rounded-md overflow-hidden relative h-40 md:h-48 shadow-md flex cursor-pointer hover:shadow-lg transition-shadow">
            <div className="w-1/3 bg-[#175b82] p-4 md:p-6 flex flex-col justify-center">
               <div className="text-[#ffcc00] text-sm md:text-base font-medium mb-2">Rain and Hails</div>
               <div className="text-white text-xl md:text-3xl font-medium leading-tight">Hailstorm Safety<br/>Guide</div>
            </div>
            <div className="w-2/3 relative">
               <img src="https://images.unsplash.com/photo-1542316527-3199bc451b03?auto=format&fit=crop&q=80&w=800" alt="Hail" className="w-full h-full object-cover" />
            </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid md:grid-cols-3 gap-4">
           {/* WeatherRadar (Left Column) */}
           <div className="md:col-span-2 flex flex-col gap-2">
              <div id="weather-radar-section" className="bg-[#126b8e] text-white rounded-md overflow-hidden shadow-md flex flex-col h-80 relative">
                  {/* Header */}
                  <div className="px-3 py-2 bg-[#0f5a7a] flex flex-col sm:flex-row gap-2 items-center justify-between text-xs border-b border-[#0d4f6a] relative z-20">
                     <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-100">
                        <FiTarget className="text-[#ffcc00] text-sm animate-pulse" />
                        <span>Interactive WeatherSphere ({radarOverlay})</span>
                     </div>
                     <div className="flex bg-[#126b8e] p-0.5 rounded border border-[#0d4f6a] text-[10px] font-bold">
                        <button 
                          onClick={() => { setRadarOverlay("weather"); toast.success("Weather overlay active."); }} 
                          className={`px-2.5 py-1 rounded-sm cursor-pointer transition-colors ${radarOverlay === "weather" ? 'bg-[#ffcc00] text-slate-800' : 'text-white hover:bg-[#1a7f9c]'}`}
                        >
                           Weather
                        </button>
                        <button 
                          onClick={() => { setRadarOverlay("rain"); toast.success("Rain overlay active."); }} 
                          className={`px-2.5 py-1 rounded-sm cursor-pointer transition-colors ${radarOverlay === "rain" ? 'bg-[#ffcc00] text-slate-800' : 'text-white hover:bg-[#1a7f9c]'}`}
                        >
                           Rain
                        </button>
                        <button 
                          onClick={() => { setRadarOverlay("wind"); toast.success("Wind overlay active."); }} 
                          className={`px-2.5 py-1 rounded-sm cursor-pointer transition-colors ${radarOverlay === "wind" ? 'bg-[#ffcc00] text-slate-800' : 'text-white hover:bg-[#1a7f9c]'}`}
                        >
                           Wind
                        </button>
                        <button 
                          onClick={() => { setRadarOverlay("lightning"); toast.success("Lightning overlay active."); }} 
                          className={`px-2.5 py-1 rounded-sm cursor-pointer transition-colors ${radarOverlay === "lightning" ? 'bg-[#ffcc00] text-slate-800' : 'text-white hover:bg-[#1a7f9c]'}`}
                        >
                           Lightning
                        </button>
                     </div>
                     <button onClick={() => { setIsShareModalOpen(true); toast.info("Opening weather sharing widget."); }} className="text-white hover:text-[#ffcc00] transition-colors cursor-pointer bg-white/10 p-1.5 rounded-full">
                        <FiShare2 className="text-sm" />
                     </button>
                  </div>
                  {/* Map Area */}
                  <div className="flex-1 bg-green-800 relative w-full h-full border-t border-[#0f5a7a]">
                     <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map background" className="w-full h-full object-cover opacity-60" />
                     
                     {/* Simulated live radar overlays */}
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Animated Radar Sweep */}
                        {isRadarPlaying && (
                          <div className="absolute inset-0 bg-blue-500/10 animate-pulse transition-all duration-300"></div>
                        )}

                        {/* Rain overlay */}
                        {radarOverlay === "rain" && (
                          <div className="absolute inset-0 pointer-events-none z-10 bg-blue-900/20 backdrop-blur-[0.5px] overflow-hidden flex flex-col justify-start">
                            <div className="flex flex-wrap gap-4 p-4 text-[#ffcc00] animate-bounce">
                               <FiCloud className="text-3xl animate-bounce" />
                               <FiCloud className="text-2xl animate-pulse" style={{ animationDelay: '0.4s' }} />
                               <FiCloud className="text-3xl animate-bounce" style={{ animationDelay: '0.8s' }} />
                            </div>
                            <div className="absolute inset-0 grid grid-cols-6 gap-2 p-4">
                               {Array.from({ length: 18 }).map((_, i) => (
                                 <div key={i} className="w-1 h-3 bg-[#4c92ba] rounded-full transform rotate-[15deg] mx-auto animate-[bounce_1s_infinite]" style={{ animationDelay: `${i * 0.1}s` }}></div>
                               ))}
                            </div>
                          </div>
                        )}

                        {/* Wind overlay */}
                        {radarOverlay === "wind" && (
                          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                            <svg className="w-full h-full opacity-70">
                               <path d="M 0 50 Q 150 20, 300 80 T 600 50" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="10, 15" className="animate-[dash_5s_linear_infinite]" style={{ strokeDashoffset: -timeOffset * 5 }} />
                               <path d="M 0 150 Q 200 120, 400 180 T 600 150" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="10, 15" className="animate-[dash_4s_linear_infinite]" style={{ strokeDashoffset: -timeOffset * 6 }} />
                            </svg>
                          </div>
                        )}

                        {/* Lightning overlay */}
                        {radarOverlay === "lightning" && (
                          <div className="absolute inset-0 pointer-events-none z-10 bg-yellow-500/10 flex items-center justify-center animate-pulse">
                            <div className="absolute top-1/4 left-1/3 text-yellow-400 animate-bounce">
                               <FiCloudLightning className="text-4xl filter drop-shadow-[0_0_10px_rgba(234,179,8,1)]" />
                            </div>
                            <div className="absolute bottom-1/3 right-1/4 text-yellow-400 animate-bounce" style={{ animationDelay: '0.5s' }}>
                               <FiCloudLightning className="text-3xl filter drop-shadow-[0_0_8px_rgba(234,179,8,1)]" />
                            </div>
                          </div>
                        )}

                        {/* Pins with dynamic shifts and increments when playing */}
                        <div className="absolute top-1/4 left-1/4 flex flex-col items-center transition-all duration-500 font-sans" style={{ transform: `translate(${timeOffset}px, ${-timeOffset}px)` }}>
                           <span className="text-white text-[10px] font-bold drop-shadow-md bg-slate-900/40 px-1 rounded-sm">Dubai</span>
                           <span className="text-red-500 text-[10px] font-bold drop-shadow-md bg-white px-0.5 rounded-sm">{37 + (radarTime === "now" ? 0 : radarTime === "today" ? 1 : 2)}°</span>
                           <FiSun className="text-[#ffcc00] text-2xl drop-shadow-lg animate-[spin_10s_linear_infinite]" />
                        </div>
                        
                        <div className="absolute top-1/2 left-1/3 flex flex-col items-center transition-all duration-500 font-sans" style={{ transform: `translate(${-timeOffset}px, ${timeOffset}px)` }}>
                           <span className="text-white text-[10px] font-bold drop-shadow-md bg-slate-900/40 px-1 rounded-sm">Mumbai</span>
                           <span className="text-red-500 text-[10px] font-bold drop-shadow-md bg-white px-0.5 rounded-sm">{34 + (radarTime === "now" ? 0 : radarTime === "today" ? 0 : 1)}°</span>
                           <FiSun className="text-[#ffcc00] text-3xl drop-shadow-lg animate-[spin_12s_linear_infinite]" />
                        </div>
                        
                        <div className="absolute top-1/3 right-1/2 flex flex-col items-center transition-all duration-500 font-sans" style={{ transform: `translate(${timeOffset / 2}px, ${timeOffset / 2}px)` }}>
                           <span className="text-white text-[10px] font-bold drop-shadow-md bg-slate-900/40 px-1 rounded-sm">New Delhi</span>
                           <span className="text-red-500 text-[10px] font-bold drop-shadow-md bg-white px-0.5 rounded-sm">{38 + (radarTime === "now" ? 0 : radarTime === "today" ? 2 : 4)}°</span>
                           <FiSun className="text-[#ffcc00] text-2xl drop-shadow-lg animate-[spin_8s_linear_infinite]" />
                        </div>
                     </div>
                     
                     {/* Bottom Controls */}
                     <div className="absolute bottom-2 left-2 flex gap-1 z-20">
                        <button onClick={() => setRadarTime("now")} className={`text-white text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm transition-colors cursor-pointer ${radarTime === "now" ? 'bg-[#0d4f6a]' : 'bg-[#1b7f9c] hover:bg-[#126b8e]'}`}>now</button>
                        <button onClick={() => setRadarTime("today")} className={`text-white text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm transition-colors cursor-pointer ${radarTime === "today" ? 'bg-[#0d4f6a]' : 'bg-[#1b7f9c] hover:bg-[#126b8e]'}`}>today</button>
                        <button onClick={() => setRadarTime("tomorrow")} className={`text-white text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm transition-colors cursor-pointer ${radarTime === "tomorrow" ? 'bg-[#0d4f6a]' : 'bg-[#1b7f9c] hover:bg-[#126b8e]'}`}>tomorrow</button>
                     </div>
                     
                     <button onClick={() => setIsRadarPlaying(!isRadarPlaying)} className="absolute bottom-2 right-2 bg-[#126b8e] text-white p-2 rounded-sm shadow-md hover:bg-[#0f5a7a] cursor-pointer transition-colors flex items-center justify-center z-20">
                        {isRadarPlaying ? <FiPause className="text-sm" /> : <FiPlay className="text-sm ml-0.5" />}
                     </button>
                  </div>
              </div>
              
              {/* Forecast Map */}
              <div className="bg-[#126b8e] text-white rounded-md overflow-hidden shadow-md flex flex-col h-[400px] mt-4">
                 {/* Header */}
                  <div 
                    onClick={() => toast.success("Switching to Global Weather Sphere view!")} 
                    className="px-3 py-2 flex items-center justify-between text-sm font-semibold border-b-[3px] border-[#ffcc00] cursor-pointer hover:bg-[#0f5a7a] transition-colors"
                  >
                     <div className="flex items-center gap-2">
                        <div className="relative flex items-center justify-center w-6 h-6">
                             <FiSun className="text-[#ffcc00] text-lg absolute -top-1 -left-1" />
                             <FiCloud className="text-white text-lg absolute bottom-0 right-0" />
                        </div>
                        <span>Forecast Map</span>
                     </div>
                     <FiChevronRight onClick={(e) => { e.stopPropagation(); toast.info("Displaying current 24-hour regional forecast map."); }} className="text-white/80 hover:text-white cursor-pointer text-lg" />
                  </div>
                  {/* Map Area */}
                  <div className="flex-1 bg-[#b3c4cc] relative w-full h-full overflow-hidden">
                     <img onClick={() => toast.success("Displaying regional meteorological relief map.")} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Relief_Map_of_India.png/640px-Relief_Map_of_India.png" alt="India Map" className="w-full h-full object-cover opacity-30 mix-blend-multiply cursor-pointer hover:opacity-40 transition-opacity" />
                     
                     <button onClick={() => toast.info("Switched to today's forecast timeline.")} className="absolute top-3 left-3 bg-[#1b7f9c] text-white text-xs font-bold px-4 py-1.5 rounded-sm shadow-sm hover:bg-[#126b8e] border border-white/20 cursor-pointer">
                        today
                     </button>
                     
                     <div onClick={() => toast.success("Connected to weather satellite feeds.")} className="absolute bottom-2 left-2 bg-white/40 rounded-full p-1 backdrop-blur-sm shadow-sm cursor-pointer hover:bg-white/60 transition-colors">
                        <FiGlobe className="text-white text-lg" />
                     </div>
                    
                    {/* Interactive City Pins */}
                    <div className="absolute inset-0">
                       {/* New Delhi Pin */}
                       <div onClick={() => setSelectedCity("Delhi")} className="absolute top-[25%] left-[55%] flex flex-col items-center cursor-pointer group z-20">
                          {selectedCity.toLowerCase() === 'delhi' && (
                             <span className="absolute -inset-2 rounded-full border-2 border-[#ffcc00] animate-ping opacity-75"></span>
                          )}
                          <FiSun className="text-[#ffcc00] text-3xl drop-shadow-md group-hover:scale-110 transition-transform" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="text-slate-800 text-[11px] font-bold drop-shadow-sm">New Delhi</span>
                             <span className={`bg-white border px-1 font-bold text-[10px] shadow-sm ${selectedCity.toLowerCase() === 'delhi' ? 'text-[#ffcc00] border-[#ffcc00]' : 'text-red-600 border-slate-300'}`}>40</span>
                          </div>
                       </div>
                       
                       {/* Mumbai Pin */}
                       <div onClick={() => setSelectedCity("Mumbai")} className="absolute top-[55%] left-[38%] flex flex-col items-center cursor-pointer group z-20">
                          {selectedCity.toLowerCase() === 'mumbai' && (
                             <span className="absolute -inset-2 rounded-full border-2 border-[#ffcc00] animate-ping opacity-75"></span>
                          )}
                          <FiSun className="text-[#ffcc00] text-3xl drop-shadow-md group-hover:scale-110 transition-transform" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="text-slate-800 text-[11px] font-bold drop-shadow-sm">Mumbai</span>
                             <span className={`bg-white border px-1 font-bold text-[10px] shadow-sm ${selectedCity.toLowerCase() === 'mumbai' ? 'text-[#ffcc00] border-[#ffcc00]' : 'text-red-600 border-slate-300'}`}>34</span>
                          </div>
                       </div>

                       {/* Hyderabad Pin */}
                       <div onClick={() => setSelectedCity("Hyderabad")} className="absolute top-[65%] left-[55%] flex flex-col items-center cursor-pointer group z-20">
                          {selectedCity.toLowerCase() === 'hyderabad' && (
                             <span className="absolute -inset-2 rounded-full border-2 border-[#ffcc00] animate-ping opacity-75"></span>
                          )}
                          <FiSun className="text-[#ffcc00] text-3xl drop-shadow-md group-hover:scale-110 transition-transform" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="text-slate-800 text-[11px] font-bold drop-shadow-sm">Hyderabad</span>
                             <span className={`bg-white border px-1 font-bold text-[10px] shadow-sm ${selectedCity.toLowerCase() === 'hyderabad' ? 'text-[#ffcc00] border-[#ffcc00]' : 'text-red-600 border-slate-300'}`}>37</span>
                          </div>
                       </div>

                       {/* Kolkata Pin */}
                       <div onClick={() => setSelectedCity("Kolkata")} className="absolute top-[45%] left-[75%] flex flex-col items-center cursor-pointer group z-20">
                          {selectedCity.toLowerCase() === 'kolkata' && (
                             <span className="absolute -inset-2 rounded-full border-2 border-[#ffcc00] animate-ping opacity-75"></span>
                          )}
                          <FiSun className="text-[#ffcc00] text-3xl drop-shadow-md group-hover:scale-110 transition-transform" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className={`bg-white border px-1 font-bold text-[10px] shadow-sm ${selectedCity.toLowerCase() === 'kolkata' ? 'text-[#ffcc00] border-[#ffcc00]' : 'text-red-600 border-slate-300'}`}>37</span>
                             <span className="text-slate-800 text-[11px] font-bold drop-shadow-sm">Kolkata</span>
                          </div>
                       </div>

                       {/* Chennai Pin */}
                       <div onClick={() => setSelectedCity("Chennai")} className="absolute top-[75%] left-[60%] flex flex-col items-center cursor-pointer group z-20">
                          {selectedCity.toLowerCase() === 'chennai' && (
                             <span className="absolute -inset-2 rounded-full border-2 border-[#ffcc00] animate-ping opacity-75"></span>
                          )}
                          <FiCloudLightning className="text-[#ffcc00] text-3xl drop-shadow-md group-hover:scale-110 transition-transform" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="text-slate-800 text-[11px] font-bold drop-shadow-sm">Chennai</span>
                             <span className={`bg-white border px-1 font-bold text-[10px] shadow-sm ${selectedCity.toLowerCase() === 'chennai' ? 'text-[#ffcc00] border-[#ffcc00]' : 'text-red-600 border-slate-300'}`}>35</span>
                          </div>
                       </div>
                       
                       {/* Srinagar Pin */}
                       <div onClick={() => setSelectedCity("Srinagar")} className="absolute top-[10%] left-[45%] flex flex-col items-center cursor-pointer group z-20">
                          {selectedCity.toLowerCase() === 'srinagar' && (
                             <span className="absolute -inset-2 rounded-full border-2 border-[#ffcc00] animate-ping opacity-75"></span>
                          )}
                          <FiSun className="text-[#ffcc00] text-3xl drop-shadow-md group-hover:scale-110 transition-transform" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="text-slate-800 text-[11px] font-bold drop-shadow-sm">Srinagar</span>
                             <span className={`bg-white border px-1 font-bold text-[10px] shadow-sm ${selectedCity.toLowerCase() === 'srinagar' ? 'text-[#ffcc00] border-[#ffcc00]' : 'text-red-600 border-slate-300'}`}>27</span>
                          </div>
                       </div>
                       
                       {/* Nagpur Pin */}
                       <div onClick={() => setSelectedCity("Nagpur")} className="absolute top-[48%] left-[52%] flex flex-col items-center cursor-pointer group z-20">
                          {selectedCity.toLowerCase() === 'nagpur' && (
                             <span className="absolute -inset-2 rounded-full border-2 border-[#ffcc00] animate-ping opacity-75"></span>
                          )}
                          <FiSun className="text-[#ffcc00] text-4xl drop-shadow-md group-hover:scale-110 transition-transform" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="text-slate-800 text-[11px] font-bold drop-shadow-sm">Nagpur</span>
                             <span className={`bg-white border px-1 font-bold text-[10px] shadow-sm ${selectedCity.toLowerCase() === 'nagpur' ? 'text-[#ffcc00] border-[#ffcc00]' : 'text-red-600 border-slate-300'}`}>43</span>
                          </div>
                       </div>

                       {/* Dynamic Custom Searched City Marker */}
                       {!isDefaultCity && (
                          <div className="absolute flex flex-col items-center z-30 transition-all duration-500" style={{ top: `${customTop}%`, left: `${customLeft}%` }}>
                             <span className="absolute -inset-3 rounded-full border-2 border-[#ffcc00] animate-ping opacity-80"></span>
                             <FiSun className="text-[#ffcc00] text-4xl drop-shadow-md scale-110" />
                             <div className="flex items-center gap-1 -mt-1 z-20">
                                <span className="text-slate-800 text-[12px] font-extrabold drop-shadow-sm bg-white/70 px-1 rounded-sm">{currentCityData.name}</span>
                                <span className="bg-white text-[#ffcc00] border border-[#ffcc00] px-1 font-bold text-[11px] shadow-sm">{currentCityData.temp}</span>
                             </div>
                          </div>
                       )}
                    </div>
                 </div>
              </div>
           </div>

           {/* News (Right Column) */}
           <div className="md:col-span-1 bg-white border border-slate-200 rounded-md shadow-md overflow-hidden flex flex-col h-[328px]">
              {/* Header */}
                <div 
                  onClick={() => setIsNewsModalOpen(true)}
                  className="bg-[#126b8e] px-3 py-2 flex items-center justify-between text-sm font-semibold text-white cursor-pointer hover:bg-[#0f5a7a] transition-colors"
                >
                  <div className="flex items-center gap-2">
                     <FiMessageCircle className="text-white text-lg" />
                     <span>News</span>
                  </div>
                  <FiChevronRight className="text-white hover:text-white/80 cursor-pointer" />
               </div>
               
               {/* News Item */}
               <div className="flex-1 flex flex-col relative group cursor-pointer border-b border-slate-100 overflow-hidden" onClick={() => setIsNewsModalOpen(true)}>
                  <div className="h-36 bg-slate-200 relative overflow-hidden">
                     <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400" alt="Heatwave" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-20 h-20 relative flex items-center justify-center">
                           <svg viewBox="0 0 24 24" fill="white" stroke="#cc0000" strokeWidth="1.5" className="w-full h-full">
                              <polygon points="12,2 22,20 2,20" strokeWidth="2" strokeLinejoin="round" />
                           </svg>
                           <div className="absolute inset-0 flex flex-col items-center justify-center mt-3">
                              <div className="w-1.5 h-6 bg-slate-800 rounded-full border-2 border-white"></div>
                              <div className="w-2.5 h-2.5 bg-slate-800 rounded-full mt-0.5 border-2 border-white"></div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="bg-[#175b82] p-4 flex-1 flex flex-col justify-center">
                     <div className="text-[#ffcc00] text-[11px] font-bold mb-1">Heatwave Alert!</div>
                     <div className="text-white text-sm font-medium leading-tight">Tips for Safe Driving During a Heatwave</div>
                  </div>
               </div>
               
               {/* More News Button */}
               <div className="p-3 flex justify-start bg-white">
                  <button onClick={() => setIsNewsModalOpen(true)} className="flex items-center gap-1 bg-[#f4f7f9] text-[#126b8e] px-4 py-1.5 rounded-md text-[12px] font-bold hover:bg-[#e2e8f0] border border-slate-200 shadow-sm cursor-pointer hover:shadow transition-all duration-300">
                     More News <FiChevronRight className="text-lg" />
                  </button>
               </div>
            </div>
         </div>

         {/* 14 Day Weather */}
         <div className="bg-white rounded-md shadow-md overflow-hidden border border-slate-200 mt-4 max-w-[500px]">
            {/* Header */}
            <div className="bg-[#126b8e] px-3 py-2 flex items-center justify-between text-sm font-semibold text-white border-b-[3px] border-[#ffcc00]">
               <div className="flex items-center gap-2">
                  <FiTrendingUp className="text-[#ffcc00] text-lg" />
                  <span>14 day weather</span>
               </div>
               <FiChevronRight className="text-white" />
            </div>
            
            {/* City Title */}
            <div className="px-4 pt-4 pb-2 text-[#3b7396] text-xl font-bold flex items-center gap-2">
               <span>{currentCityData.name}</span>
               <span className="text-xs font-semibold bg-[#ffcc00]/20 text-[#126b8e] px-2 py-0.5 rounded-full">Selected</span>
            </div>
            
            {/* Chart Area */}
            <div className="relative w-full h-[280px] px-2 flex flex-col">
               {/* Background bands for weekends */}
               <div className="absolute inset-0 flex pointer-events-none z-0">
                  <div className="w-[7.14%] h-full bg-slate-100/50"></div>{/* Su */}
                  <div className="w-[7.14%] h-full"></div>
                  <div className="w-[7.14%] h-full"></div>
                  <div className="w-[7.14%] h-full"></div>
                  <div className="w-[7.14%] h-full"></div>
                  <div className="w-[7.14%] h-full"></div>
                  <div className="w-[7.14%] h-full bg-slate-100/50"></div>{/* Sa */}
                  <div className="w-[7.14%] h-full bg-slate-100/50"></div>{/* Su */}
                  <div className="w-[7.14%] h-full"></div>
                  <div className="w-[7.14%] h-full"></div>
                  <div className="w-[7.14%] h-full"></div>
                  <div className="w-[7.14%] h-full"></div>
                  <div className="w-[7.14%] h-full"></div>
                  <div className="w-[7.14%] h-full bg-slate-100/50"></div>{/* Sa */}
               </div>
               
               {/* Days Header */}
               <div className="flex justify-between px-2 text-xs font-semibold text-slate-600 mb-6 z-10">
                  <span className="w-[7.14%] text-center">Su</span>
                  <span className="w-[7.14%] text-center">Mo</span>
                  <span className="w-[7.14%] text-center">Tu</span>
                  <span className="w-[7.14%] text-center">We</span>
                  <span className="w-[7.14%] text-center">Th</span>
                  <span className="w-[7.14%] text-center">Fr</span>
                  <span className="w-[7.14%] text-center">Sa</span>
                  <span className="w-[7.14%] text-center">Su</span>
                  <span className="w-[7.14%] text-center">Mo</span>
                  <span className="w-[7.14%] text-center">Tu</span>
                  <span className="w-[7.14%] text-center">We</span>
                  <span className="w-[7.14%] text-center">Th</span>
                  <span className="w-[7.14%] text-center">Fr</span>
                  <span className="w-[7.14%] text-center">Sa</span>
               </div>

               {/* Chart Data (Dynamic SVG generated from temperature arrays!) */}
               <div className="relative flex-1 z-10">
                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                     {/* Dynamic Max Temp Line */}
                     <path d={generatePath(currentCityData.maxTemps, true)} fill="none" stroke="#ff8c8c" strokeWidth="2.5" className="transition-all duration-500" />
                     {/* Dynamic Min Temp Line */}
                     <path d={generatePath(currentCityData.minTemps, false)} fill="none" stroke="#8cb4ff" strokeWidth="2.5" className="transition-all duration-500" />
                  </svg>
                  
                  {/* Dynamic Max Temperature Data Points */}
                  <div className="absolute inset-0 flex justify-between px-[10px]">
                     {currentCityData.maxTemps.map((temp, i) => {
                        const x = i * 7.14;
                        const y = 70 - (temp - 25) * 2.5;
                        return (
                           <div key={`max-${i}`} className="absolute flex flex-col items-center transition-all duration-500" style={{ left: `${x}%`, top: `${y}px`, width: '7.14%' }}>
                              <span className="text-red-500 text-[13px] font-bold drop-shadow-sm bg-white/40 rounded-sm px-0.5">{temp}</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shadow-md"></div>
                           </div>
                        );
                     })}
                  </div>
                  
                  {/* Dynamic Min Temperature Data Points */}
                  <div className="absolute inset-0 flex justify-between px-[10px]">
                     {currentCityData.minTemps.map((temp, i) => {
                        const x = i * 7.14;
                        const y = 180 - (temp - 15) * 2.5;
                        return (
                           <div key={`min-${i}`} className="absolute flex flex-col items-center transition-all duration-500" style={{ left: `${x}%`, top: `${y}px`, width: '7.14%' }}>
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mb-1 shadow-md"></div>
                              <span className="text-blue-600 text-[13px] font-bold drop-shadow-sm bg-white/40 rounded-sm px-0.5">{temp}</span>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </div>
            
            {/* Dynamic Rain/Sun Bottom Indicators */}
            <div className="flex w-full h-8 mt-2 text-xs opacity-75 transition-all duration-500">
               {currentCityData.weatherTypes.map((type, i) => (
                  <div key={i} className={`w-[7.14%] h-full flex items-center justify-center transition-colors duration-500 ${type === 'sun' ? 'bg-[#ffeb99]' : 'bg-[#e5eedd]'} ${type === 'sun' && i === 4 ? 'bg-[#ffcc00]' : ''}`}>
                     {type === 'rain' && (
                        <div className="w-1.5 h-2.5 bg-[#4c92ba] rounded-full rounded-tr-none transform rotate-45 animate-bounce"></div>
                     )}
                     {type === 'sun' && i !== 4 && (
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                     )}
                  </div>
               ))}
            </div>
            
            {/* Legend & Controls */}
            <div className="flex items-center justify-center gap-6 py-4 text-[11px] font-semibold text-slate-600 border-t border-slate-100">
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  <span>Max (°C)</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>Min (°C)</span>
               </div>
               
               <div className="flex items-center gap-2 ml-4">
                  <FiSun className="text-lg text-slate-400" />
                  <div className="flex rounded overflow-hidden text-[10px] font-bold">
                     <button 
                       onClick={() => { setIsDetailedForecastOpen(true); toast.success("Expanded detailed 14-day agricultural weather parameters."); }} 
                       className={`px-3 py-1 cursor-pointer transition-colors ${isDetailedForecastOpen ? 'bg-[#ffcc00] text-slate-800' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                     >
                        more
                     </button>
                     <button 
                       onClick={() => { setIsDetailedForecastOpen(false); toast.info("Collapsed detailed weather parameters."); }} 
                       className={`px-3 py-1 cursor-pointer transition-colors ${!isDetailedForecastOpen ? 'bg-[#126b8e] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                     >
                        less
                     </button>
                  </div>
               </div>
            </div>
            {isDetailedForecastOpen && (
               <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-sans text-slate-600 animate-[fadeIn_0.3s_ease-out]">
                  <div className="bg-white p-2.5 rounded shadow-sm border border-slate-100 flex flex-col gap-1">
                     <span className="font-bold text-[#126b8e]">Humidity Avg</span>
                     <span className="text-slate-800 font-extrabold text-xs">68% <span className="text-green-500 font-normal">(-2%)</span></span>
                  </div>
                  <div className="bg-white p-2.5 rounded shadow-sm border border-slate-100 flex flex-col gap-1">
                     <span className="font-bold text-[#126b8e]">Precipitation Prob</span>
                     <span className="text-slate-800 font-extrabold text-xs">15% <span className="text-blue-500 font-normal">(Low)</span></span>
                  </div>
                  <div className="bg-white p-2.5 rounded shadow-sm border border-slate-100 flex flex-col gap-1">
                     <span className="font-bold text-[#126b8e]">UV Index Max</span>
                     <span className="text-slate-800 font-extrabold text-xs">9 <span className="text-red-500 font-normal">(Extreme)</span></span>
                  </div>
                  <div className="bg-white p-2.5 rounded shadow-sm border border-slate-100 flex flex-col gap-1">
                     <span className="font-bold text-[#126b8e]">Wind Conditions</span>
                     <span className="text-slate-800 font-extrabold text-xs">18 km/h <span className="text-slate-400 font-normal">(E)</span></span>
                  </div>
               </div>
             )}
         </div>

         {/* TemperatureRadar */}
         <div className="bg-[#126b8e] text-white rounded-md overflow-hidden shadow-md flex flex-col h-[400px] mt-4 w-full md:max-w-[700px]">
            {/* Header */}
            <div className="px-3 py-2 flex items-center justify-between text-sm font-semibold border-b-[3px] border-[#ffcc00]">
               <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center w-6 h-6 border border-[#ffcc00] rounded-full border-dashed">
                      <FiThermometer className="text-[#ffcc00] text-sm" />
                  </div>
                  <span>TemperatureRadar ({currentCityData.name})</span>
               </div>
               <FiShare2 className="text-white hover:text-white/80 cursor-pointer" />
            </div>
            
            {/* Map Area */}
            <div className="flex-1 bg-[#1e3a5f] relative w-full h-full overflow-hidden">
               {/* Heat map background with hue-rotation */}
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Relief_Map_of_India.png/640px-Relief_Map_of_India.png" alt="Heat Map" className="w-full h-full object-cover opacity-80" style={{ filter: `hue-rotate(${300 + (radarTime === 'now' ? 0 : radarTime === 'today' ? 15 : 30)}deg) saturate(3) brightness(0.8) contrast(1.5)` }} />
               
               {/* Map Pins */}
               <div className="absolute inset-0 pointer-events-none">
                  {/* Highlight current selected city if matched on map */}
                  {selectedCity.toLowerCase() === 'delhi' && (
                     <div className="absolute top-[28%] left-[50%] -inset-4 border-2 border-dashed border-[#ffcc00] rounded-full animate-spin opacity-50 z-0"></div>
                  )}

                  {/* New Delhi */}
                  <div className="absolute top-[28%] left-[50%] flex flex-col items-center">
                     <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">New Delhi</span>
                     <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                        <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">{39 + (radarTime === 'now' ? 0 : radarTime === 'today' ? 1 : 2)}</span>
                     </div>
                  </div>
                  
                  {/* Mumbai */}
                  <div className="absolute top-[55%] left-[42%] flex flex-col items-center">
                     <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Mumbai</span>
                     <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                        <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">{34 + (radarTime === 'now' ? 0 : radarTime === 'today' ? 0 : 1)}</span>
                     </div>
                  </div>
 
                  {/* Bengaluru */}
                  <div className="absolute top-[70%] left-[48%] flex flex-col items-center">
                     <div className="flex items-center gap-1">
                        <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">{30 + (radarTime === 'now' ? 0 : radarTime === 'today' ? 1 : 1)}</span>
                        <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                     </div>
                     <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Bengaluru</span>
                  </div>
 
                  {/* Kolkata */}
                  <div className="absolute top-[48%] left-[65%] flex flex-col items-center">
                     <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Kolkata</span>
                     <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                        <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">{35 + (radarTime === 'now' ? 0 : radarTime === 'today' ? 1 : 3)}</span>
                     </div>
                  </div>

                  {/* Dubai */}
                  <div className="absolute top-[38%] left-[18%] flex flex-col items-center">
                     <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Dubai</span>
                     <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                        <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">{38 + (radarTime === 'now' ? 0 : radarTime === 'today' ? 2 : 3)}</span>
                     </div>
                  </div>
                  
                  {/* Colombo */}
                  <div className="absolute top-[82%] left-[52%] flex flex-col items-center">
                     <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Colombo</span>
                     <div className="flex items-center gap-1">
                        <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">{30 + (radarTime === 'now' ? 0 : radarTime === 'today' ? 0 : 0)}</span>
                        <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                     </div>
                  </div>
                  
                  {/* Bangkok */}
                  <div className="absolute top-[65%] left-[82%] flex flex-col items-center">
                     <div className="flex items-center gap-1">
                        <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">{34 + (radarTime === 'now' ? 0 : radarTime === 'today' ? 1 : 2)}</span>
                        <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                     </div>
                     <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Bangkok</span>
                  </div>
                  
                  {/* Chengdu */}
                  <div className="absolute top-[25%] left-[82%] flex flex-col items-center">
                     <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Chengdu</span>
                     <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                        <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">{29 + (radarTime === 'now' ? 0 : radarTime === 'today' ? 0 : 1)}</span>
                     </div>
                  </div>
                  
                  {/* Kathmandu */}
                  <div className="absolute top-[35%] left-[63%] flex flex-col items-center">
                     <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                        <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Kathmandu</span>
                     </div>
                  </div>
                  
                  {/* Kabul */}
                  <div className="absolute top-[20%] left-[38%] flex flex-col items-center">
                     <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                        <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Kabul</span>
                     </div>
                  </div>
                  
                  {/* Hanoi */}
                  <div className="absolute top-[50%] left-[84%] flex flex-col items-center">
                     <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Hanoi</span>
                     <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                        <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">{31 + (radarTime === 'now' ? 0 : radarTime === 'today' ? 1 : 2)}</span>
                     </div>
                  </div>
               </div>
               
               {/* Bottom Controls */}
               <div className="absolute bottom-3 left-3 flex gap-1 z-20">
                  <button onClick={() => setRadarTime("now")} className={`text-white text-[11px] font-bold px-4 py-1.5 rounded-sm shadow-md transition-colors cursor-pointer ${radarTime === "now" ? 'bg-[#0d4f6a]' : 'bg-[#1b7f9c] hover:bg-[#126b8e]'}`}>now</button>
                  <button onClick={() => setRadarTime("today")} className={`text-white text-[11px] font-bold px-4 py-1.5 rounded-sm shadow-md transition-colors cursor-pointer ${radarTime === "today" ? 'bg-[#0d4f6a]' : 'bg-[#1b7f9c] hover:bg-[#126b8e]'}`}>today</button>
                  <button onClick={() => setRadarTime("tomorrow")} className={`text-white text-[11px] font-bold px-4 py-1.5 rounded-sm shadow-md transition-colors cursor-pointer ${radarTime === "tomorrow" ? 'bg-[#0d4f6a]' : 'bg-[#1b7f9c] hover:bg-[#126b8e]'}`}>tomorrow</button>
               </div>
               
               <button onClick={() => setIsRadarPlaying(!isRadarPlaying)} className="absolute bottom-3 right-3 bg-[#1b7f9c] text-white p-2.5 rounded-sm shadow-md hover:bg-[#126b8e] cursor-pointer transition-colors z-20">
                  {isRadarPlaying ? <FiPause className="text-sm" /> : <FiPlay className="text-sm ml-0.5" />}
               </button>
            </div>
         </div>
      </div>

      {/* Hailstorm Safety Modal */}
      {isSafetyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
            <div className="bg-[#126b8e] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiAlertTriangle className="text-[#ffcc00] text-xl animate-bounce" />
                <span className="font-bold text-sm tracking-wide uppercase">Hailstorm Survival & Safety Guidelines</span>
              </div>
              <button 
                onClick={() => setIsSafetyModalOpen(false)}
                className="text-white hover:text-white/80 bg-white/10 hover:bg-white/20 p-1 rounded-full transition-colors cursor-pointer"
              >
                <FiX className="text-base" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto max-h-[60vh]">
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-xs">
                <FiInfo className="text-base shrink-0 mt-0.5" />
                <div>
                   <strong>Emergency Advisory:</strong> Hailstorms present instant threats of severe injury and heavy agricultural crop damage. Always follow the precautions listed below.
                </div>
              </div>

              <div className="space-y-3 text-slate-700 text-xs leading-relaxed">
                <h4 className="font-bold text-slate-800 text-sm">For Farmers in the Field:</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Seek Immediate Shelter:</strong> Discontinue all farming operations instantly. Run to the nearest solid concrete structure.</li>
                  <li><strong>Protect Livestock:</strong> Move cattle and birds inside covered barns immediately.</li>
                  <li><strong>Protect Crops:</strong> Set up high-durability anti-hail protective mesh nets over critical crop patches if advisory alerts permit.</li>
                </ul>

                <h4 className="font-bold text-slate-800 text-sm">For Individuals Indoors:</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Stay Indoors:</strong> Remain inside rooms and stay away from glass windows or balconies.</li>
                  <li><strong>Power Safety:</strong> Disconnect heavy electronic appliances to prevent surges from electrostatic lightning strokes.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => { setIsSafetyModalOpen(false); toast.success("Safety guidelines acknowledged."); }}
                className="bg-[#126b8e] hover:bg-[#0f5a7a] text-white font-bold text-xs px-6 py-2.5 rounded shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weather News Modal */}
      {isNewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            <div className="bg-[#126b8e] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiBookOpen className="text-[#ffcc00] text-xl animate-pulse" />
                <span className="font-bold text-base tracking-wide uppercase">Weather News & Agro-Alerts</span>
              </div>
              <button 
                onClick={() => setIsNewsModalOpen(false)}
                className="text-white hover:text-white/80 bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors cursor-pointer"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="relative h-48 rounded-lg overflow-hidden shadow-sm">
                <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800" alt="Heatwave Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
                  <div>
                     <span className="bg-red-500 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full">Severe Alert</span>
                     <h3 className="text-white text-lg font-bold mt-1.5 leading-tight">Agro-Survival: Tips for Harvesting During Intense Regional Heatwaves</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-slate-700 text-sm leading-relaxed">
                <p>Met-departments have issued severe alerts warning farmers against extended daytime operations as temperature figures touch record levels. Harvesting during high-intensity solar bands reduces crop quality due to rapid dehydration and risks field sunstrokes.</p>
                
                <h4 className="font-extrabold text-[#126b8e] text-base pt-2">Key Heatwave Measures:</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li><strong>Shift Operations:</strong> Complete all intense manual harvesting and soil tilling before 10:00 AM or after 5:00 PM.</li>
                  <li><strong>Reflective Coverings:</strong> Protect harvested yield by keeping it under reflective insulated sheets or within ventilated sheds.</li>
                  <li><strong>Hydration Protocols:</strong> Drink high-electrolyte fluids constantly. Set up temporary shade tents at key field intervals.</li>
                </ul>
              </div>

              {/* Newsletter Subscription */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-3">
                <div className="text-xs font-bold text-slate-700">Get Regional Weather Alerts & Newsletters:</div>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Successfully subscribed to real-time weather news alerts!");
                    setIsNewsModalOpen(false);
                  }}
                  className="flex gap-2"
                >
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter your email" 
                    defaultValue="bhavanavemireddy6@gmail.com"
                    className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded shadow-inner focus:outline-none focus:border-[#126b8e] text-slate-800 bg-white" 
                  />
                  <button 
                    type="submit"
                    className="bg-[#126b8e] hover:bg-[#0f5a7a] text-white font-bold text-xs px-4 py-2 rounded shadow transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setIsNewsModalOpen(false)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-5 py-2 rounded transition-colors cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Clipboard Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
            <div className="bg-[#126b8e] text-white px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiShare2 className="text-[#ffcc00] text-lg animate-pulse" />
                <span className="font-bold text-sm tracking-wide uppercase">Share Regional Forecast</span>
              </div>
              <button 
                onClick={() => setIsShareModalOpen(false)}
                className="text-white hover:text-white/80 bg-white/10 hover:bg-white/20 p-1 rounded-full transition-colors cursor-pointer"
              >
                <FiX className="text-base" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Copy the link below to share the current meteorological forecast of <strong>{currentCityData.name}</strong> with fellow farmers and partners.
              </p>

              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded p-2 text-slate-800 font-mono text-xs select-all shadow-inner overflow-x-auto whitespace-nowrap bg-white">
                {`${window.location.origin}/weather?city=${currentCityData.name}`}
              </div>

              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/weather?city=${currentCityData.name}`);
                  setCopied(true);
                  toast.success("Successfully copied link to clipboard!");
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="w-full bg-[#126b8e] hover:bg-[#0f5a7a] text-white font-bold text-xs py-3.5 rounded shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <FiCheck className="text-base text-[#ffcc00] animate-bounce" /> Copied Link!
                  </>
                ) : (
                  <>
                    <FiCopy className="text-base" /> Copy to Clipboard
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end text-[10px] text-slate-400 font-medium">
              Weather & Radar Sharing Hub
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#126b8e] text-white py-8 mt-8 border-t-[4px] border-[#ffcc00]">
         <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Company */}
               <div>
                  <h3 className="font-bold text-lg mb-4 text-[#ffcc00]">Company</h3>
                  <ul className="space-y-2 text-sm text-white/90">
                     <li><a href="#" className="hover:underline">Contact us</a></li>
                     <li><a href="#" className="hover:underline">Privacy policy</a></li>
                     <li><a href="#" className="hover:underline">Legal info</a></li>
                     <li><a href="#" className="hover:underline">Accessibility statement</a></li>
                  </ul>
               </div>
               
               {/* Services */}
               <div>
                  <h3 className="font-bold text-lg mb-4 text-[#ffcc00]">Services</h3>
                  <ul className="space-y-2 text-sm text-white/90">
                     <li><a href="#" className="hover:underline">Uploader</a></li>
                     <li><a href="#" className="hover:underline">Weather widget</a></li>
                     <li><a href="#" className="hover:underline">Apps</a></li>
                  </ul>
               </div>
               
               {/* App Download */}
               <div>
                  <h3 className="font-bold text-lg mb-2 text-[#ffcc00]">Weather & Radar is also available on</h3>
                  <div className="flex gap-2">
                     <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center hover:bg-white/30 cursor-pointer transition-colors">
                        <span className="font-bold text-[10px]">iOS</span>
                     </div>
                     <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center hover:bg-white/30 cursor-pointer transition-colors">
                        <span className="font-bold text-[10px]">Android</span>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/20 text-center text-xs text-white/60">
               &copy; {new Date().getFullYear()} Weather & Radar Clone. All rights reserved.
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Weather;
