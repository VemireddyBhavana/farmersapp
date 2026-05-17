import React, { useState } from "react";
import { FiMenu, FiSearch, FiSun, FiShare2, FiTarget, FiPlay, FiChevronRight, FiMessageCircle, FiCloud, FiCloudLightning, FiGlobe, FiTrendingUp, FiThermometer, FiX } from "react-icons/fi";

const Weather: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white font-['Open_Sans'] pt-2">
      {/* Header */}
      <nav className="bg-[#126b8e] relative h-16 rounded-tl-[1.5rem] rounded-tr-[2px] mx-2 flex flex-col justify-center overflow-visible z-20">
        {/* Topographic Background Overlay */}
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
              placeholder="Weather in ..."
              className="w-full h-full bg-white border-none rounded-l-sm pl-4 pr-12 text-sm text-[#333] focus:outline-none"
            />
            <button type="submit" className="absolute -right-5 h-10 w-10 bg-[#ffcc00] rounded-full flex items-center justify-center text-white hover:bg-[#e6b800] transition-colors shadow-md">
              <FiSearch className="text-lg" />
            </button>
          </form>
        </div>
        
        {/* Bottom Yellow Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ffb300] z-20"></div>
      </nav>

      {/* Sidebar Drawer */}
      <div className="relative z-50">
        {/* Overlay */}
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-black/50 transition-opacity z-40" onClick={() => setIsDrawerOpen(false)}></div>
        )}
        
        {/* Drawer Panel */}
        <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
           <div className="flex items-center justify-between p-4 bg-[#126b8e] text-white">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setIsDrawerOpen(false)} className="p-1 hover:bg-black/10 rounded-full">
                 <FiX className="text-2xl" />
              </button>
           </div>
           <div className="flex-1 overflow-y-auto py-2">
              <ul className="flex flex-col text-slate-700 font-medium text-sm">
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-[#ffcc00] bg-slate-50 text-[#126b8e]">Home</li>
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">Weather</li>
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">WeatherRadar</li>
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">RainRadar</li>
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">TemperatureRadar</li>
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">WindRadar</li>
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">LightningRadar</li>
                 <div className="my-2 border-t border-slate-200"></div>
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">Weather News</li>
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">Editor's Pick</li>
                 <div className="my-2 border-t border-slate-200"></div>
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent text-[#126b8e] font-bold">Discover the app</li>
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">Weather widget</li>
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">Contact us</li>
                 <li className="px-6 py-3 hover:bg-slate-100 cursor-pointer border-l-4 border-transparent">Apps</li>
              </ul>
           </div>
        </div>
      </div>

      {/* City Cards Section */}
      <div className="container mx-auto px-2 py-4">
         <div className="flex gap-2 overflow-x-auto pb-4 snap-x hide-scrollbar justify-start md:justify-center">
            {[
              { name: 'Hyderabad', temp: 36, bg: 'bg-gradient-to-r from-[#296898] to-[#4c92ba]' },
              { name: 'Delhi', temp: 38, bg: 'bg-gradient-to-r from-[#a7b0b6] to-[#99a2a8]' },
              { name: 'Mumbai', temp: 34, bg: 'bg-gradient-to-r from-[#20679b] to-[#458bba]' },
              { name: 'Bengaluru', temp: 30, bg: 'bg-gradient-to-r from-[#8ba0af] to-[#a2b3bf]' },
            ].map((city, i) => (
              <div key={i} className={`flex-shrink-0 w-48 h-14 rounded-md ${city.bg} p-3 flex items-center justify-between text-white shadow-md snap-start cursor-pointer hover:opacity-90 transition-opacity`}>
                 <span className="text-sm font-medium drop-shadow-sm">{city.name}</span>
                 <div className="flex items-center gap-1">
                    <FiSun className="text-white/40 text-xs" />
                    <span className="text-xl font-light drop-shadow-sm">{city.temp}°</span>
                 </div>
              </div>
            ))}
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
        <div className="w-full rounded-md overflow-hidden relative h-40 md:h-48 shadow-md flex cursor-pointer hover:shadow-lg transition-shadow">
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
              <div className="bg-[#126b8e] text-white rounded-md overflow-hidden shadow-md flex flex-col h-72">
                 {/* Header */}
                 <div className="px-3 py-2 flex items-center justify-between text-sm font-semibold">
                    <div className="flex items-center gap-2">
                       <FiTarget className="text-[#ffcc00] text-lg" />
                       <span>WeatherRadar</span>
                    </div>
                    <FiShare2 className="text-white hover:text-white/80 cursor-pointer" />
                 </div>
                 {/* Map Area */}
                 <div className="flex-1 bg-green-800 relative w-full h-full border-t border-[#0f5a7a]">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map background" className="w-full h-full object-cover opacity-60" />
                    {/* Overlays to simulate map */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       {/* Simulate map pins */}
                       <div className="absolute top-1/4 left-1/4 flex flex-col items-center">
                          <span className="text-white text-[10px] font-bold drop-shadow-md">Dubai</span>
                          <span className="text-red-500 text-[10px] font-bold drop-shadow-md">37</span>
                          <FiSun className="text-[#ffcc00] text-2xl drop-shadow-lg" />
                       </div>
                       <div className="absolute top-1/2 left-1/3 flex flex-col items-center">
                          <span className="text-white text-[10px] font-bold drop-shadow-md">Mumbai</span>
                          <span className="text-red-500 text-[10px] font-bold drop-shadow-md">34</span>
                          <FiSun className="text-[#ffcc00] text-3xl drop-shadow-lg" />
                       </div>
                       <div className="absolute top-1/3 right-1/2 flex flex-col items-center">
                          <span className="text-white text-[10px] font-bold drop-shadow-md">New Delhi</span>
                          <span className="text-red-500 text-[10px] font-bold drop-shadow-md">38</span>
                          <FiSun className="text-[#ffcc00] text-2xl drop-shadow-lg" />
                       </div>
                    </div>
                    
                    {/* Bottom Controls */}
                    <div className="absolute bottom-2 left-2 flex gap-1">
                       <button className="bg-[#126b8e] text-white text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm hover:bg-[#0f5a7a]">now</button>
                       <button className="bg-[#1b7f9c] text-white/80 text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm hover:bg-[#126b8e]">today</button>
                       <button className="bg-[#1b7f9c] text-white/80 text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm hover:bg-[#126b8e]">tomorrow</button>
                    </div>
                    
                    <button className="absolute bottom-2 right-2 bg-[#126b8e] text-white p-2 rounded-sm shadow-md hover:bg-[#0f5a7a]">
                       <FiPlay className="text-sm ml-0.5" />
                    </button>
                 </div>
              </div>
              
              {/* Forecast Map */}
              <div className="bg-[#126b8e] text-white rounded-md overflow-hidden shadow-md flex flex-col h-[400px] mt-4">
                 {/* Header */}
                 <div className="px-3 py-2 flex items-center justify-between text-sm font-semibold border-b-[3px] border-[#ffcc00]">
                    <div className="flex items-center gap-2">
                       <div className="relative flex items-center justify-center w-6 h-6">
                           <FiSun className="text-[#ffcc00] text-lg absolute -top-1 -left-1" />
                           <FiCloud className="text-white text-lg absolute bottom-0 right-0" />
                       </div>
                       <span>Forecast Map</span>
                    </div>
                    <FiChevronRight className="text-white/80" />
                 </div>
                 {/* Map Area */}
                 <div className="flex-1 bg-[#b3c4cc] relative w-full h-full overflow-hidden">
                    {/* Placeholder map shape or image */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Relief_Map_of_India.png/640px-Relief_Map_of_India.png" alt="India Map" className="w-full h-full object-cover opacity-30 mix-blend-multiply" />
                    
                    {/* Today Button */}
                    <button className="absolute top-3 left-3 bg-[#1b7f9c] text-white text-xs font-bold px-4 py-1.5 rounded-sm shadow-sm hover:bg-[#126b8e] border border-white/20">
                       today
                    </button>
                    
                    {/* Globe Icon */}
                    <div className="absolute bottom-2 left-2 bg-white/40 rounded-full p-1 backdrop-blur-sm shadow-sm">
                       <FiGlobe className="text-white text-lg" />
                    </div>
                    
                    {/* City Pins */}
                    <div className="absolute inset-0 pointer-events-none">
                       <div className="absolute top-[25%] left-[55%] flex flex-col items-center">
                          <FiSun className="text-[#ffcc00] text-3xl drop-shadow-md z-10" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="text-slate-800 text-[11px] font-medium drop-shadow-sm">New Delhi</span>
                             <span className="bg-white text-red-600 border border-slate-300 px-1 font-bold text-[10px] shadow-sm">40</span>
                          </div>
                       </div>
                       
                       <div className="absolute top-[55%] left-[38%] flex flex-col items-center">
                          <FiSun className="text-[#ffcc00] text-3xl drop-shadow-md z-10" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="text-slate-800 text-[11px] font-medium drop-shadow-sm">Mumbai</span>
                             <span className="bg-white text-red-600 border border-slate-300 px-1 font-bold text-[10px] shadow-sm">34</span>
                          </div>
                       </div>

                       <div className="absolute top-[65%] left-[55%] flex flex-col items-center">
                          <FiSun className="text-[#ffcc00] text-3xl drop-shadow-md z-10" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="text-slate-800 text-[11px] font-medium drop-shadow-sm">Hyderabad</span>
                             <span className="bg-white text-red-600 border border-slate-300 px-1 font-bold text-[10px] shadow-sm">37</span>
                          </div>
                       </div>

                       <div className="absolute top-[45%] left-[75%] flex flex-col items-center">
                          <FiSun className="text-[#ffcc00] text-3xl drop-shadow-md z-10" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="bg-white text-red-600 border border-slate-300 px-1 font-bold text-[10px] shadow-sm">37</span>
                             <span className="text-slate-800 text-[11px] font-medium drop-shadow-sm">Kolkata</span>
                          </div>
                       </div>

                       <div className="absolute top-[75%] left-[60%] flex flex-col items-center">
                          <FiCloudLightning className="text-[#ffcc00] text-3xl drop-shadow-md z-10" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="text-slate-800 text-[11px] font-medium drop-shadow-sm">Chennai</span>
                             <span className="bg-white text-red-600 border border-slate-300 px-1 font-bold text-[10px] shadow-sm">35</span>
                          </div>
                       </div>
                       
                       <div className="absolute top-[10%] left-[45%] flex flex-col items-center">
                          <FiSun className="text-[#ffcc00] text-3xl drop-shadow-md z-10" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="text-slate-800 text-[11px] font-medium drop-shadow-sm">Srinagar</span>
                             <span className="bg-white text-red-600 border border-slate-300 px-1 font-bold text-[10px] shadow-sm">27</span>
                          </div>
                       </div>
                       
                       <div className="absolute top-[48%] left-[52%] flex flex-col items-center">
                          <FiSun className="text-[#ffcc00] text-4xl drop-shadow-md z-10" />
                          <div className="flex items-center gap-1 -mt-1 z-20">
                             <span className="text-slate-800 text-[11px] font-medium drop-shadow-sm">Nagpur</span>
                             <span className="bg-white text-red-600 border border-slate-300 px-1 font-bold text-[10px] shadow-sm">43</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* News (Right Column) */}
           <div className="md:col-span-1 bg-white border border-slate-200 rounded-md shadow-md overflow-hidden flex flex-col h-[328px]">
              {/* Header */}
              <div className="bg-[#126b8e] px-3 py-2 flex items-center justify-between text-sm font-semibold text-white">
                 <div className="flex items-center gap-2">
                    <FiMessageCircle className="text-white text-lg" />
                    <span>News</span>
                 </div>
                 <FiChevronRight className="text-white hover:text-white/80 cursor-pointer" />
              </div>
              
              {/* News Item */}
              <div className="flex-1 flex flex-col relative group cursor-pointer border-b border-slate-100">
                 <div className="h-36 bg-slate-200 relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400" alt="Heatwave" className="w-full h-full object-cover" />
                    {/* Simulated Warning Triangle */}
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
                 <button className="flex items-center gap-1 bg-[#f4f7f9] text-[#126b8e] px-4 py-1.5 rounded-md text-[12px] font-bold hover:bg-[#e2e8f0] transition-colors border border-slate-200 shadow-sm">
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
           <div className="px-4 pt-4 pb-2 text-[#3b7396] text-xl font-medium">
              Hyderabad
           </div>
           
           {/* Chart Area */}
           <div className="relative w-full h-[280px] px-2 flex flex-col">
              {/* Background bands for weekends */}
              <div className="absolute inset-0 flex pointer-events-none z-0">
                 {/* Su Mo Tu We Th Fr Sa Su Mo Tu We Th Fr Sa */}
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

              {/* Chart Data (Simulated with absolute positioning and SVGs) */}
              <div className="relative flex-1 z-10">
                 <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    {/* Max Temp Line */}
                    <path d="M 15 50 Q 50 30 85 40 T 155 40 T 225 30 T 295 40 T 365 30 T 435 50 T 505 80" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
                    {/* Min Temp Line */}
                    <path d="M 15 150 Q 50 150 85 150 T 155 140 T 225 140 T 295 150 T 365 160 T 435 170 T 505 170" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
                 </svg>
                 
                 {/* Data Points (Approximated positions for a responsive-like feel) */}
                 <div className="absolute inset-0 flex justify-between px-[10px]">
                    {[37, 38, 39, 39, 39, 40, 39, 39, 40, 39, 39, 37, 36, 35].map((temp, i) => (
                       <div key={`max-${i}`} className="relative h-full flex flex-col items-center" style={{ width: '7.14%' }}>
                          {/* The top offset would normally be calculated, here it's simulated visually */}
                          <div className="absolute flex flex-col items-center" style={{ top: `${(45 - temp) * 6}px` }}>
                             <span className="text-red-500 text-[13px] font-medium">{temp}</span>
                             <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shadow-sm"></div>
                          </div>
                       </div>
                    ))}
                 </div>
                 
                 <div className="absolute inset-0 flex justify-between px-[10px]">
                    {[28, 28, 28, 28, 29, 28, 29, 28, 28, 28, 27, 27, 26, 26].map((temp, i) => (
                       <div key={`min-${i}`} className="relative h-full flex flex-col items-center" style={{ width: '7.14%' }}>
                          <div className="absolute flex flex-col items-center" style={{ top: `${130 + (30 - temp) * 6}px` }}>
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mb-1 shadow-sm"></div>
                             <span className="text-blue-600 text-[13px] font-medium">{temp}</span>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
           
           {/* Rain/Sun Bottom Indicators */}
           <div className="flex w-full h-8 mt-2 text-xs opacity-70">
              {/* Su Mo Tu We Th Fr Sa Su Mo Tu We Th Fr Sa */}
              {['rain', 'sun', 'sun', 'sun', 'sun', 'sun', 'sun', 'rain', 'sun', 'rain', 'sun', 'rain', 'sun', 'sun'].map((type, i) => (
                 <div key={i} className={`w-[7.14%] h-full flex items-center justify-center ${type === 'sun' ? 'bg-[#ffeb99]' : 'bg-[#e5eedd]'} ${type === 'sun' && i === 4 ? 'bg-[#ffcc00]' : ''}`}>
                    {type === 'rain' && (
                       <div className="w-1.5 h-2.5 bg-[#4c92ba] rounded-full rounded-tr-none transform rotate-45"></div>
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
                 <div className="flex rounded overflow-hidden">
                    <button className="bg-[#ffcc00] px-3 py-1 text-slate-800">more</button>
                    <button className="bg-slate-200 px-3 py-1">less</button>
                 </div>
              </div>
           </div>
           
           {/* Carousel dots */}
           <div className="flex justify-center gap-3 pb-4">
              <div className="w-2 h-2 rounded-full bg-[#ffcc00]"></div>
              <div className="w-2 h-2 rounded-full bg-[#126b8e]"></div>
              <div className="w-2 h-2 rounded-full bg-[#126b8e]"></div>
              <div className="w-2 h-2 rounded-full bg-[#126b8e]"></div>
              <div className="w-2 h-2 rounded-full bg-[#126b8e]"></div>
           </div>
        </div>

        {/* TemperatureRadar */}
        <div className="bg-[#126b8e] text-white rounded-md overflow-hidden shadow-md flex flex-col h-[400px] mt-4 w-full md:max-w-[700px]">
           {/* Header */}
           <div className="px-3 py-2 flex items-center justify-between text-sm font-semibold border-b-[3px] border-[#ffcc00]">
              <div className="flex items-center gap-2">
                 <div className="relative flex items-center justify-center w-6 h-6 border border-[#ffcc00] rounded-full border-dashed">
                     <FiThermometer className="text-[#ffcc00] text-sm" />
                 </div>
                 <span>TemperatureRadar</span>
              </div>
              <FiShare2 className="text-white hover:text-white/80 cursor-pointer" />
           </div>
           
           {/* Map Area */}
           <div className="flex-1 bg-[#1e3a5f] relative w-full h-full overflow-hidden">
              {/* Heat map placeholder */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Relief_Map_of_India.png/640px-Relief_Map_of_India.png" alt="Heat Map" className="w-full h-full object-cover opacity-80" style={{ filter: 'hue-rotate(300deg) saturate(3) brightness(0.8) contrast(1.5)' }} />
              
              {/* Overlays to simulate map pins */}
              <div className="absolute inset-0 pointer-events-none">
                 {/* New Delhi */}
                 <div className="absolute top-[28%] left-[50%] flex flex-col items-center">
                    <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">New Delhi</span>
                    <div className="flex items-center gap-1">
                       <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                       <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">39</span>
                    </div>
                 </div>
                 
                 {/* Mumbai */}
                 <div className="absolute top-[55%] left-[42%] flex flex-col items-center">
                    <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Mumbai</span>
                    <div className="flex items-center gap-1">
                       <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                       <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">34</span>
                    </div>
                 </div>

                 {/* Bengaluru */}
                 <div className="absolute top-[70%] left-[48%] flex flex-col items-center">
                    <div className="flex items-center gap-1">
                       <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">30</span>
                       <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                    </div>
                    <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Bengaluru</span>
                 </div>

                 {/* Kolkata */}
                 <div className="absolute top-[48%] left-[65%] flex flex-col items-center">
                    <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Kolkata</span>
                    <div className="flex items-center gap-1">
                       <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                       <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">35</span>
                    </div>
                 </div>

                 {/* Dubai */}
                 <div className="absolute top-[38%] left-[18%] flex flex-col items-center">
                    <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Dubai</span>
                    <div className="flex items-center gap-1">
                       <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                       <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">38</span>
                    </div>
                 </div>
                 
                 {/* Colombo */}
                 <div className="absolute top-[82%] left-[52%] flex flex-col items-center">
                    <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Colombo</span>
                    <div className="flex items-center gap-1">
                       <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">30</span>
                       <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                    </div>
                 </div>
                 
                 {/* Bangkok */}
                 <div className="absolute top-[65%] left-[82%] flex flex-col items-center">
                    <div className="flex items-center gap-1">
                       <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">34</span>
                       <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                    </div>
                    <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Bangkok</span>
                 </div>
                 
                 {/* Chengdu */}
                 <div className="absolute top-[25%] left-[82%] flex flex-col items-center">
                    <span className="text-white text-[11px] font-bold drop-shadow-md shadow-black">Chengdu</span>
                    <div className="flex items-center gap-1">
                       <div className="w-1 h-1 bg-white rounded-full shadow-sm"></div>
                       <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">29</span>
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
                       <span className="text-white font-bold text-[11px] drop-shadow-md shadow-black">31</span>
                    </div>
                 </div>
              </div>
              
              {/* Bottom Controls */}
              <div className="absolute bottom-3 left-3 flex gap-1">
                 <button className="bg-[#0d4f6a] text-white text-[11px] font-bold px-4 py-1.5 rounded-sm shadow-md hover:bg-[#0f5a7a]">now</button>
                 <button className="bg-[#1b7f9c] text-white/90 text-[11px] font-bold px-4 py-1.5 rounded-sm shadow-md hover:bg-[#126b8e]">today</button>
                 <button className="bg-[#1b7f9c] text-white/90 text-[11px] font-bold px-4 py-1.5 rounded-sm shadow-md hover:bg-[#126b8e]">tomorrow</button>
              </div>
              
              <button className="absolute bottom-3 right-3 bg-[#1b7f9c] text-white p-2.5 rounded-sm shadow-md hover:bg-[#126b8e]">
                 <FiPlay className="text-sm ml-0.5" />
              </button>
           </div>
        </div>
      </div>

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
