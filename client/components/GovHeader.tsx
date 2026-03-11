import { Phone, Mail, Globe, CloudSun, ShieldCheck, ChevronDown } from "lucide-react";
import { useLanguage, Language } from "@/lib/LanguageContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const GovHeader = () => {
    const { language, setLanguage } = useLanguage();

    const languages: { name: Language; native: string }[] = [
        { name: "English", native: "English" },
        { name: "Hindi", native: "हिन्दी" },
        { name: "Telugu", native: "తెలుగు" },
        { name: "Tamil", native: "தமிழ்" },
        { name: "Marathi", native: "मराठी" },
        { name: "Gujarati", native: "ગુજરાતી" },
        { name: "Kannada", native: "ಕನ್ನಡ" },
        { name: "Malayalam", native: "മലയാളം" },
        { name: "Punjabi", native: "ਪੰਜਾਬੀ" },
        { name: "Bangla", native: "বাংলা" },
    ];

    return (
        <div className="w-full bg-[#106A3A] text-white">
            {/* Top Minimal Contact Bar */}
            <div className="container mx-auto px-4 py-1.5 flex flex-col sm:flex-row items-center justify-between text-xs font-medium border-b border-emerald-800/50">
                <div className="flex items-center gap-4 text-emerald-100/90">
                    <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                        <Globe className="w-3.5 h-3.5" /> ભારત સરકાર | Government of India
                    </span>
                    <span className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                        <ShieldCheck className="w-3.5 h-3.5" /> Ministry of Agriculture & Farmers Welfare
                    </span>
                </div>
                <div className="flex items-center gap-6 mt-2 sm:mt-0">
                    <span className="flex items-center gap-1.5 text-emerald-100 hover:text-white cursor-pointer transition-colors">
                        <Phone className="w-3.5 h-3.5" /> Kisan Helpline: 1800-180-1551
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-100 hover:text-white cursor-pointer transition-colors">
                        <Mail className="w-3.5 h-3.5" /> support@agri.gov.in
                    </span>
                    <div className="hidden sm:block h-4 w-px bg-emerald-800/60" />

                    {/* Language Toggler Moved to Gov Header */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-6 px-2 text-xs text-white hover:text-emerald-100 hover:bg-emerald-800/50 focus-visible:ring-0 focus-visible:ring-offset-0">
                                {language} <ChevronDown className="w-3 h-3 ml-1 opacity-70" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32 bg-white rounded-md shadow-xl border-emerald-100">
                            {languages.map((lang) => (
                                <DropdownMenuItem
                                    key={lang.name}
                                    onClick={() => setLanguage(lang.name)}
                                    className="text-emerald-900 font-medium cursor-pointer focus:bg-emerald-50 focus:text-emerald-700"
                                >
                                    {lang.native}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Live Pricing Marquee (e-NAM style) */}
            <div className="bg-[#0A4A28] border-b border-[#0A4A28] flex items-center h-10 overflow-hidden relative">
                <div className="bg-[#B46A14] text-white text-xs font-bold px-4 h-full flex items-center uppercase tracking-wider shrink-0 z-10 shadow-lg">
                    Live Mandi Rates
                </div>
                {/* Marquee Container */}
                <div className="flex-1 overflow-hidden relative h-full flex items-center">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-sm font-semibold text-emerald-100">
                        {/* Dummy Data for Marquee */}
                        <span className="flex items-center gap-2">🌾 Wheat (Delhi): <span className="text-[#34D399]">₹2,125/q</span> <span className="text-[10px] text-[#34D399]">↑₹12</span></span>
                        <span className="flex items-center gap-2">🍅 Tomato (Azadpur): <span className="text-[#F87171]">₹1,850/q</span> <span className="text-[10px] text-[#F87171]">↓₹40</span></span>
                        <span className="flex items-center gap-2">🌱 Soya Bean (Indore): <span className="text-[#34D399]">₹4,600/q</span> <span className="text-[10px] text-[#34D399]">↑₹25</span></span>
                        <span className="flex items-center gap-2">🧅 Onion (Lasalgaon): <span className="text-[#34D399]">₹1,200/q</span> <span className="text-[10px] text-[#34D399]">↑₹10</span></span>
                        <span className="flex items-center gap-2">🥔 Potato (Agra): <span className="text-white">₹850/q</span> <span className="text-[10px] text-white">-</span></span>

                        {/* Duplicated for seamless scrolling */}
                        <span className="flex items-center gap-2">🌾 Wheat (Delhi): <span className="text-[#34D399]">₹2,125/q</span> <span className="text-[10px] text-[#34D399]">↑₹12</span></span>
                        <span className="flex items-center gap-2">🍅 Tomato (Azadpur): <span className="text-[#F87171]">₹1,850/q</span> <span className="text-[10px] text-[#F87171]">↓₹40</span></span>
                        <span className="flex items-center gap-2">🌱 Soya Bean (Indore): <span className="text-[#34D399]">₹4,600/q</span> <span className="text-[10px] text-[#34D399]">↑₹25</span></span>
                        <span className="flex items-center gap-2">🧅 Onion (Lasalgaon): <span className="text-[#34D399]">₹1,200/q</span> <span className="text-[10px] text-[#34D399]">↑₹10</span></span>
                        <span className="flex items-center gap-2">🥔 Potato (Agra): <span className="text-white">₹850/q</span> <span className="text-[10px] text-white">-</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
