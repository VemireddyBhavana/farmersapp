import fs from 'fs';

const filePath = "d:\\Desktop Data\\project\\farmersapp\\client\\pages\\AgriKnowledge.tsx";

const aiExpertContent = `// AI Expert Guidance Component
// ─────────────────────────────────────────────────────────────────────────────

const AiExpert = ({ onBack, t }: { onBack: () => void; t: any }) => {
    const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
    const navigate = useNavigate();

    const crops = KNOWLEDGE_SECTIONS.find(s => s.id === "crops")?.cards || [];

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12 pb-24"
        >
            <div className="flex items-center gap-6 px-4">
                <button onClick={onBack} className="h-12 w-12 rounded-2xl bg-white shadow-md flex items-center justify-center hover:bg-emerald-50 transition-colors">
                    <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <div className="space-y-1">
                    <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">AI Expert Guidance</h2>
                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> AI Assistant Online
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Chat-style Sidebar */}
                <div className="lg:col-span-1 premium-card p-6 bg-white border-t-8 border-violet-500 h-fit sticky top-24">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-12 w-12 rounded-full bg-violet-100 flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-violet-600" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900">AgriBot</p>
                            <p className="text-[10px] font-bold text-slate-400">Expert Consultant</p>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-2xl mb-8 border border-slate-100 italic">
                        <p className="text-xs font-bold text-slate-600 leading-relaxed">
                            "Hello! Choice a crop to receive a full AI-generated cultivation blueprint optimized for your region."
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest pl-2 mb-2">Select a Subject</p>
                        {crops.map((crop) => (
                            <button
                                key={crop.id}
                                onClick={() => setSelectedCrop(crop.id)}
                                className={cn(
                                    "w-full p-4 rounded-xl text-left font-black text-xs transition-with-all",
                                    selectedCrop === crop.id 
                                        ? "bg-violet-600 text-white shadow-lg" 
                                        : "bg-white text-slate-400 hover:bg-slate-50 border border-slate-100"
                                )}
                            >
                                {t(crop.titleKey)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Response Area */}
                <div className="lg:col-span-3 space-y-8">
                    {!selectedCrop ? (
                        <div className="h-[600px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                             <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                                <Search className="w-10 h-10 text-slate-200" />
                             </div>
                             <h3 className="text-2xl font-black text-slate-300 uppercase italic">Awaiting Subject</h3>
                             <p className="text-sm font-bold text-slate-300 max-w-xs mt-2">Choose a crop to receive a full AI-generated cultivation blueprint.</p>
                        </div>
                    ) : (
                        <motion.div 
                            key={selectedCrop}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {/* Header Card */}
                            <div className="premium-card p-10 bg-white shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-10 items-center border-b-8 border-violet-500">
                                <div className="h-48 w-48 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 group">
                                    <img 
                                        src={crops.find(c => c.id === selectedCrop)?.image} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        alt="crop"
                                    />
                                </div>
                                <div className="space-y-4 flex-1 text-center md:text-left">
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                        <span className="px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-violet-100">AI Verified Strategy</span>
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">High Yield Path</span>
                                    </div>
                                    <h3 className="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">
                                        {t(crops.find(c => c.id === selectedCrop)?.titleKey || "")} Blueprint
                                    </h3>
                                    <p className="text-sm font-bold text-slate-400 max-w-xl">
                                        This blueprint provides a comprehensive end-to-end strategy for {t(crops.find(c => c.id === selectedCrop)?.titleKey || "")} cultivation, optimized for your soil and climate.
                                    </p>
                                </div>
                            </div>

                            {/* Blueprint Sections */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: "Phase 1: Foundation", icon: Shovel, title: "Soil & Prep", color: "text-amber-600", bg: "bg-amber-50", steps: [1, 2, 3] },
                                    { label: "Phase 2: Management", icon: Droplets, title: "Water & Food", color: "text-blue-600", bg: "bg-blue-50", steps: [4, 5, 6, 7] },
                                    { label: "Phase 3: Finalization", icon: Sprout, title: "Pest & Harvest", color: "text-emerald-600", bg: "bg-emerald-50", steps: [8, 9, 10] },
                                ].map((phase, i) => (
                                    <div key={i} className={cn("p-8 rounded-[2.5rem] border-2 border-white shadow-sm space-y-6", phase.bg)}>
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-md">
                                                <phase.icon className={cn("w-5 h-5", phase.color)} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{phase.label}</p>
                                                <p className="text-lg font-black text-slate-900 tracking-tight">{phase.title}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            {phase.steps.map(stepNum => (
                                                <div key={stepNum} className="flex gap-4 group">
                                                    <span className="text-[10px] font-black text-slate-300 mt-1">{stepNum.toString().padStart(2, '0')}</span>
                                                    <div className="space-y-1">
                                                        <p className="text-[11px] font-black text-slate-800 uppercase group-hover:text-violet-600 transition-colors line-clamp-1">
                                                            {t(\`\${crops.find(c => c.id === selectedCrop)?.stepsPrefix}\${stepNum}Title\`)}
                                                        </p>
                                                        <p className="text-[10px] font-bold text-slate-400 leading-relaxed line-clamp-2 italic">
                                                            {t(\`\${crops.find(c => c.id === selectedCrop)?.stepsPrefix}\${stepNum}Body\`)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Expert Masterclass Tips */}
                            <div className="premium-card p-10 bg-slate-950 text-white relative overflow-hidden group shadow-3xl">
                                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                    <Star className="w-64 h-64 text-violet-400" />
                                </div>
                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 rounded-2xl bg-violet-600 flex items-center justify-center shadow-xl shadow-violet-500/20">
                                                <Zap className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-black uppercase tracking-tight italic">Expert Masterclass Tips</h4>
                                                <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Insider Knowledge for Maximum Yield</p>
                                            </div>
                                        </div>
                                        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-colors">
                                            Ask Custom Question
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[1, 2, 3, 4].map((n) => (
                                            <div key={n} className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/[0.07] transition-colors group/tip">
                                                <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0 group-hover/tip:scale-110 transition-transform">
                                                    <CheckCircle className="w-5 h-5 text-violet-400" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-bold text-slate-200 leading-relaxed italic">
                                                        "\${getFarmerTip(n + (crops.findIndex(c => c.id === selectedCrop)*3))}"
                                                    </p>
                                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">— {["Soil Scientist", "Master Farmer", "Agri Consultant", "Pest Expert"][n-1]}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
\n`;

try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const startMarker = "// AI Expert Guidance Component";
    const endMarker = "// Knowledge Grid Section";
    
    const startIndex = fileContent.indexOf(startMarker);
    const endIndex = fileContent.indexOf(endMarker);
    
    if (startIndex === -1 || endIndex === -1) {
        throw new Error("Markers not found");
    }
    
    const newContent = fileContent.substring(0, startIndex) + aiExpertContent + fileContent.substring(endIndex);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log("Successfully replaced AiExpert using markers.");
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
