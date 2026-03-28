import { Leaf, BookOpen, Calculator, Play, Star, AlertCircle, Info, TrendingUp, Bird, Fish, Landmark, Sprout, Sun } from "lucide-react";

export interface SubStep {
  title: string;
  simpleExplanation: string;
  detailedExplanation: string;
  materials: string[];
  instructions: string[];
  proTips: string[];
  mistakes: string[];
  bestPractices: string[];
  example: string;
}

export interface GuideStep {
  id: number;
  title: string;
  description: string;
  image: string;
  subSteps: SubStep[];
}

export interface AgriGuide {
  id: string;
  name: string; // Used for translation key e.g "shrimpFarmingTitle"
  category: "Agriculture" | "Poultry" | "Aquaculture" | "Horticulture" | "Subsidies" | "Gardening" | "Dairy" | "Livestock";
  image: string;
  featured?: boolean;
  tag: string;
  icon: any;
  difficulty?: "Beginner" | "Intermediate" | "Expert";
  videoUrl?: string;
  realWorldData?: {
    cost: string;
    profit: string;
    duration: string;
    resources: string[];
  };
  farmerTips?: {
    dos: string[];
    donts: string[];
  };
  steps: GuideStep[];
}

export const GUIDES_DATA: AgriGuide[] = [
  {
    id: "vannamei-shrimp",
    name: "shrimpFarmingTitle",
    category: "Aquaculture",
    tag: "tagExpert",
    icon: Fish,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrho1VB3WThsItYUa1WLYOugvC4LCfv7mAg&s",
    difficulty: "Expert",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    realWorldData: {
      cost: "₹ 10-15 Lakhs / Hectare",
      profit: "₹ 5-8 Lakhs / crop",
      duration: "100-120 Days",
      resources: ["Aerators", "SPF Seeds", "Quality Feed", "Water Testing Kits"]
    },
    farmerTips: { dos: ["Test water dissolved oxygen daily", "Use bio-floc technology"], donts: ["Overfeed the shrimp", "Ignore ammonia spikes"] },
    steps: [
      {
        id: 1, 
        title: "Pond Preparation", 
        image: "https://images.unsplash.com/photo-1599940824399-b87980ba9715?auto=format&fit=crop&q=80&w=600", 
        description: "Prepare, clean, and lime the aquaculture ponds for shrimp stocking.",
        subSteps: [
          {
            title: "Advanced Pond Sterilization",
            simpleExplanation: "Removing old sludge and bacteria using extreme heat and cleaning.",
            detailedExplanation: "Before any new cycle, the pond bottom must be scraped to remove the 'black soil'—a thick layer of organic waste, uneaten feed, and decomposed matter from the previous crop. This sludge is the primary breeding ground for deadly pathogens like Vibrio and parasites that cause Early Mortality Syndrome (EMS). Professional sterilization involves high-pressure water jets and heavy-duty sludge pumps to eliminate every trace of this waste. Once the soil is exposed, it must be sun-dried until deep cracks appear, allowing oxygen to reach the lower layers and oxidize harmful anaerobic bacteria. This oxidation process converts toxic hydrogen sulfide into harmless sulfates. Without complete sterilization, the next crop is at a 70% higher risk of disease outbreak within the first 30 days. High-quality biosecurity starts with a perfectly clean pond bottom, ensuring a sterile environment for the fragile post-larvae to grow without competition from heritage pathogens.",
            materials: ["High-pressure water jets", "Sludge removing pumps", "Personal protective gear"],
            instructions: [
              "Drain the pond completely following the previous harvest.",
              "Use pressure pumps to wash away the accumulated organic sludge.",
              "Scrape the top 2-3 inches of black soil and move it to a designated waste area.",
              "Ensure the central drainage pit is thoroughly scrubbed and disinfected."
            ],
            proTips: ["Work during the hottest part of the day for faster soil oxidation.", "Check for any plastic or metal debris that could puncture liners."],
            mistakes: ["Leaving small wet patches in the center where bacteria can survive.", "Dumping sludge near the water intake channel."],
            bestPractices: ["Use a mild chlorine solution (30ppm) for the final wash-down if disease was present in the last crop."],
            example: "Farmers in Nellore found that a 3-day extension in sludge removal led to zero 'Early Mortality Syndrome' cases in the next cycle."
          },
          {
            title: "Liming Process",
            simpleExplanation: "Applying agricultural lime to balance soil pH and improve water quality.",
            detailedExplanation: "Liming is a foundational chemical process required to neutralize acidic soil conditions and establish a stable alkaline environment for the shrimp. When agricultural lime (CaCO3) or dolomite is applied, it reacts with the soil to increase its base saturation, which in turn raises the alkalinity of the incoming pond water. High alkalinity acts as a massive 'pH buffer', preventing the dangerous swings between day and night that occur due to photosynthesis and respiration cycles. Young shrimp have very thin shells and are highly sensitive to even minor pH fluctuations, which can lead to molting failures and death. The application must be precise; too little lime leaves the pond vulnerable to acid rain, while too much can lead to calcium scale on equipment. By maintaining a target pH of 7.5 to 8.5 through calculated liming, farmers ensure that minerals like phosphorus are available for beneficial plankton growth, creating a healthy natural ecosystem from day one.",
            materials: ["Agricultural Lime (CaCO3)", "pH testing kit", "Gloves and masks"],
            instructions: [
              "Test the soil pH at 5 different points in the pond.",
              "Spread lime evenly across the dry pond bottom using a broadcast method.",
              "Apply at a rate of 1 ton per hectare for every 0.5 unit pH increase needed.",
              "Focus extra lime in area where water tends to stagnate."
            ],
            proTips: ["Apply lime at sunset for maximum soil penetration.", "Avoid applying lime during windy conditions to prevent waste."],
            mistakes: ["Using industrial lime instead of agricultural grade.", "Skipping soil pH tests and applying 'standard' amounts."],
            bestPractices: ["Use a mix of Dolomite and Agricultural lime for better magnesium balance."],
            example: "A balanced liming approach corrected an acidic pond (pH 6.2) to an optimal 8.1, resulting in 20% faster initial growth."
          },
          {
            title: "Pond Drying Method",
            simpleExplanation: "Baking the pond bottom in the sun to eliminate any remaining pathogens.",
            detailedExplanation: "Sun-drying, often called 'baking the pond,' is the most effective and natural way to sterilize large-scale aquaculture environments. Ultraviolet (UV) radiation from high-intensity sunlight penetrates the top layers of the soil, effectively 'frying' bacterial colonies and viral particles that high-pressure washing might miss. As the pond dries, the soil begins to shrink and crack, a physical phenomenon that exposes deep-seated anaerobic pockets to the air. This exposure triggers the decomposition of remaining organic matter through aerobic oxidation, which is much cleaner and safer for the next crop. The objective is to achieve a universal 'light grey' or 'tan' color across the entire pond floor, indicating that all moisture has been eliminated. This stage is crucial for the mineral enrichment of the soil, as it resets the nitrogen cycle and prepares the ground for the introduction of beneficial probiotic bacteria that will eventually support the shrimp.",
            materials: ["Strong direct sunlight", "Tractor (for tilling)"],
            instructions: [
              "Allow the pond to sit empty for 15-20 days minimum.",
              "Wait until cracks appear that are at least 2 inches deep.",
              "Tilt the soil halfway through the drying process to expose lower layers.",
              "Verify that the bottom smells 'earthy' rather than like rotten eggs (H2S)."
            ],
            proTips: ["Maintain a clear log of the number of sun-exposure hours.", "Use this period to repair bunds and fences."],
            mistakes: ["Rushing the process due to market pressure.", "Ignoring shaded corners of the pond."],
            bestPractices: ["The drying phase is complete only when the soil color changes from dark grey to light brown."],
            example: "Extending the drying period by 7 days during a cloudy monsoon break saved a farm from a potential White Spot virus breakout."
          },
          {
            title: "Soil Testing Protocols",
            simpleExplanation: "A scientific check to ensure the land is ready for healthy shrimp life.",
            detailedExplanation: "Laboratory testing of the soil provides deep scientific data on organic carbon, nitrogen, phosphorus, and trace heavy metals. This data allows for precise fertilization and mineral supplementation, ensuring the pond's 'natural productivity' is at its peak before water is introduced. Soil testing is a preventive measure; for instance, high iron levels can cause 'red gill' disease in shrimp, while low magnesium can lead to skeletal deformities. By identifying these issues before stocking, farmers can apply specific soil conditioners to neutralize heavy metals or enrich the land with required minerals. A balanced soil profile supports a healthy bloom of beneficial algae (phytoplankton) which serves as the primary natural food source for young post-larvae. This reduces the dependency on expensive artificial feed in the first three weeks of the crop, significantly lowering the overall cost of production while improving early-stage survival rates through superior natural nutrition.",
            materials: ["Soil sampling tubes", "Sample bags", "Markers and lab forms"],
            instructions: [
              "Collect top-soil samples from 10 different random spots in a 'Z' pattern.",
              "Mix samples thoroughly in a clean bucket to get a representative average.",
              "Send to a government or certified private lab for minerals and organic carbon analysis.",
              "Adjust the application of manure or fertilizers based on lab recommendations."
            ],
            proTips: ["Sample soil when it is slightly damp for easier extraction.", "Identify 'hotspots' where previous crop waste was highest."],
            mistakes: ["Taking samples only from the pond edges.", "Using dirty containers that contaminate the sample results."],
            bestPractices: ["Perform soil testing every 2 cycles to track long-term health trends."],
            example: "Soil testing revealed a Manganese deficiency that was causing slow molting; correcting this increased harvest uniformity by 15%."
          }
        ]
      },
      {
        id: 2, 
        title: "Seed Stocking & Acclimatization", 
        image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=600", 
        description: "Selecting and introducing Specific Pathogen Free (SPF) seeds carefully into the water.",
        subSteps: [
          {
            title: "SPF Seed Selection",
            simpleExplanation: "Ordering high-quality, disease-free baby shrimps from certified hatcheries.",
            detailedExplanation: "Success in modern intensive shrimp farming starts with the seed. SPF (Specific Pathogen Free) seeds are bred in high-security hatcheries to be guaranteed free from major devastating viruses like White Spot (WSSV) and IHHNV. High-quality seeds are not just about health; they are selected for 'superior growth genetics,' meaning they convert feed into muscle more efficiently than wild varieties. When selecting seeds, look for PL10-PL12 age groups, as they have developed the necessary gill structures for pond survival. A professional hatchery inspection involves checking for gut fullness (indicating active feeding) and a strong muscle-to-gut ratio under a high-power microscope. Seeds should also show a strong 'phototactic' response—swimming vigorously toward light—which is a key indicator of high neurological health and energy reserves. Avoiding 'cheap' or uncertified seeds is the single most important decision a farmer makes to prevent catastrophic crop failure mid-season.",
            materials: ["PCR Test Reports", "Magnifying glass", "Certified Hatchery List"],
            instructions: [
              "Verify that the hatchery is CAA-approved.",
              "Request latest PCR (Polymerase Chain Reaction) negative reports for all major viruses.",
              "Visually inspect that seeds are active and swimming against the current in the bag.",
              "Check that seed gut is full and dark, indicating healthy feeding."
            ],
            proTips: ["Always visit the hatchery personally if ordering large quantities.", "Ensure the transport bags have sufficient pure oxygen for the journey."],
            mistakes: ["Buying 'cheap' seeds from uncertified sources.", "Ignoring the hatchery’s salinity levels, leading to massive transport stress."],
            bestPractices: ["Avoid stocking seeds that are less than PL10, as they are too fragile for pond life."],
            example: "switching to SPF-certified seeds improved a farmer's survival rate from 40% to 92% in a single season."
          },
          {
            title: "Temperature & Salinity Acclimatization",
            simpleExplanation: "Gradually matching the water conditions of the bag to the pond water.",
            detailedExplanation: "Shrimp are poikilothermic (cold-blooded) and highly sensitive to the osmotic pressure of their environment. Sudden changes in water temperature or salinity trigger 'physiological shock,' causing the shrimp's immune system to collapse and leading to immediate or 'silent' delayed mortality. Acclimatization is the vital process of slowly merging the water chemistry from the transport bags with the pond water. This involves floating the closed bags in the pond to equalize temperature through the plastic barrier, followed by the slow, incremental addition of pond water to the bags over a period of 60 to 120 minutes. This allows the post-larvae's internal gills to adjust to the new salinity and pH without stress. A successful transition is evidenced by the seeds actively exploring the bag rather than huddling in corners. Skipping this step, even by a few minutes, can result in a 30% loss within the first 48 hours, often attributed incorrectly to poor seed quality.",
            materials: ["Floating thermometers", "Refractometer (Salinity tester)", "Buckets for mixing"],
            instructions: [
              "Float the closed transport bags in the pond for 30-45 minutes until temperatures match.",
              "Check salinity in the bag and the pond; the difference should not exceed 2ppt.",
              "If the difference is high, slowly add pond water into the bags every 10 minutes.",
              "Monitor the activity level of the post-larvae during this transition."
            ],
            proTips: ["Conduct the process in a shaded area of the pond.", "Check water quality (pH and DO) in both environments before starting."],
            mistakes: ["Pouring bags immediately into the pond.", "Skipping the salinity check on a hot afternoon."],
            bestPractices: ["The acclimatization rate should be no faster than 1ppt change every 15 minutes."],
            example: "A farm in Gujarat reduced 'stocking day mortality' to zero by using an on-site nursery tank for a 2-hour slow acclimatization."
          },
          {
            title: "Safe Release Protocol",
            simpleExplanation: "Gently letting the seeds out into the pond at the right time and place.",
            detailedExplanation: "The final release of the post-larvae is the transition from a controlled environment to a semi-natural ecosystem. To maximize survival, stocking should only occur during the coolest hours—specifically dawn or dusk—to avoid the metabolic stress caused by high afternoon solar radiation. The release must be conducted on the 'windward' side of the pond. This allows the gentle surface current created by the wind to carry the tiny shrimp across the entire pond area, preventing overcrowding in one corner. Crowding leads to competition for dissolved oxygen and increases the risk of cannibalism among the small post-larvae. Using clean, disinfected buckets and soft-mesh nets ensures that the delicate shells and appendages of the seeds are not damaged during handling. A professional release protocol ensures that the shrimp settle onto the pond floor in an 'unstressed' state, ready to begin their growth cycle in the nutrient-rich bottom soil.",
            materials: ["Clean buckets", "Hand-nets (soft mesh)"],
            instructions: [
              "Submerge the bag fully and let the seeds swim out naturally.",
              "Do not throw or dump the seeds from a height.",
              "Stock at a density of 30-60 PL per square meter for intensive ponds.",
              "Observe the pond for 30 minutes post-release to check for any sinking or dead seeds."
            ],
            proTips: ["Run aerators at full speed for 2 hours BEFORE and AFTER stocking.", "Place 'stocking check-cages' to monitor 24-hour survival rates."],
            mistakes: ["Stocking during mid-day heat (11 AM to 3 PM).", "Stocking in areas with low water circulation."],
            bestPractices: ["Wait 6 hours before the first official feed so the seeds can explore the bottom."],
            example: "Using the 'gentle release' method on the windward side improved overall spatial distribution, leading to more uniform growth."
          }
        ]
      },
      {
        id: 3, 
        title: "Feeding Management", 
        image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=600", 
        description: "Optimizing the feed cycles to promote massive growth while avoiding pond pollution.",
        subSteps: [
          {
            title: "Check Tray Monitoring",
            simpleExplanation: "Using small floating trays to see if the shrimp have finished their food.",
            detailedExplanation: "Check trays, often called 'feeding trays' or 'monitoring pans,' are the most essential sensory tools for a shrimp farmer. Since shrimp feed at the bottom of the pond, it is impossible to see their feeding activity directly from the surface. By placing a small, representative percentage of the total feed directly into several trays and lowering them to the pond floor, a farmer can accurately gauge the appetite and health of the entire crop. After a precise interval—usually 90 to 120 minutes depending on the shrimp's age—the trays are lifted for inspection. If the trays are completely clean, it indicates that the shrimp are hungry and the feeding rate should be increased by 5-10%. If significant leftovers remain, it is a critical warning sign of either overfeeding, water quality deterioration, or a potential disease outbreak, requiring an immediate 25-50% reduction in the next meal. Monitoring check trays also allows for the physical inspection of the shrimp's gut color and shell hardness, providing a comprehensive 'health check' that automated systems often miss. Consistent tray monitoring is the golden rule for maintaining low Feed Conversion Ratios (FCR) and preventing the accumulation of toxic sludge on the pond bottom.",
            materials: ["Square mesh trays", "Feed markers", "Ropes and weights"],
            instructions: [
              "Place 4 check trays in different corners of a 1-acre pond.",
              "Add 1% of the total meal ration to each tray.",
              "Lower the trays to the pond bottom carefully.",
              "Lift trays after 2 hours: if empty, increase feed; if leftovers remain, reduce feed."
            ],
            proTips: ["Observe the color of the shrimp gut while they are on the tray.", "Clean the trays daily to prevent algae buildup."],
            mistakes: ["Ignoring the check trays during rainy weather.", "Using trays that are too small or with too large mesh holes."],
            bestPractices: ["Always adjust feed based on the tray with the MOST leftovers, not the least."],
            example: "A farm saved 15% on feed costs by implementing a strict '2-hour tray check' rule, preventing bottom sludge accumulation."
          },
          {
            title: "Feed Schedule & Broadcasting",
            simpleExplanation: "Distributing the right amount of food evenly across the pond throughout the day.",
            detailedExplanation: "Shrimp are continuous feeders with very small digestive tracts, meaning they require multiple small meals throughout the day rather than a single large one. A professional feeding schedule typically involves 4 to 5 precisely timed meals—usually at 6 AM, 10 AM, 2 PM, 6 PM, and a late-night feed at 10 PM. Broadcasting is the technique of evenly distributing sinking pellets across the 'feeding zone,' which is the clean, firm area located 3 to 5 meters from the pond dykes. It is critical to avoid broadcasting feed into the center of the pond, known as the 'dead zone,' where anaerobic sludge and hydrogen sulfide accumulate. During the broadcasting process, aerators should be temporarily repositioned or turned off to prevent the feed from being swept into the sludge pile. Even distribution prevents competition among the shrimp, ensuring that both smaller and larger individuals have equal access to nutrition, which leads to higher size uniformity at harvest. Advanced farmers use 'auto-feeders' synchronized with dissolved oxygen sensors to optimize this process, but manual broadcasting remains the standard for high-precision growth management in intensive ponds.",
            materials: ["High-protein sinking pellets", "Broadcasting boat or hand scoops", "Feed storage bins"],
            instructions: [
              "Calculate dose based on biomass (Current count x Average weight).",
              "Spread pellets evenly within the feeding zone (3-5 meters from the dyke).",
              "Turn off aerators during the broadcasting to allow pellets to sink vertically.",
              "Ensure feed is stored in a cool, dry place to prevent vitamin degradation."
            ],
            proTips: ["The 6 PM feed is usually the heaviest as shrimp are most active at night.", "Use different pellet sizes (Crumbles to Adult Pellets) as they grow."],
            mistakes: ["Broadcasting into the central part of the pond where waste accumulates.", "Using damp or moldy feed."],
            bestPractices: ["Maintain an 'FCR' (Feed Conversion Ratio) of 1.2 to 1.5 for maximum profitability."],
            example: "Switching from 3 to 5 meals a day resulted in a 10% increase in final harvest weight for a South Indian farm."
          },
          {
            title: "Growth & Biomass Assessment",
            simpleExplanation: "Regularly weighing the shrimp to track progress and adjust management.",
            detailedExplanation: "Weekly growth assessment is the backbone of data-driven aquaculture management. By catching a representative sample of 100 to 200 shrimp using a cast net from multiple locations, a farmer can calculate the Average Body Weight (ABW). This figure is the most important variable in the 'Feeding Equation.' When the ABW is multiplied by the estimated survival rate and the total number of seeds stocked, the farmer arrives at the 'Total Biomass' currently present in the pond. This biomass calculation determines the exact quantity of feed required for the coming week, ensuring the shrimp receive enough nutrients for maximum growth without wasting expensive resources. Beyond weight, this assessment serves as a weekly physical exam where the farmer checks for signs of 'molting' (shedding of the shell), gill health, and the presence of external parasites or 'black spot' disease. If growth slows down unexpectedly—a phenomenon called a 'growth plateau'—it often signals an underlying issue with water minerals or dissolved oxygen, allowing the farmer to intervene before the problem becomes critical. High-precision weighing and recording are what separate profitable commercial ventures from traditional hobby farming.",
            materials: ["Sample nets", "Sensitive electronic scales", "Recording logbook"],
            instructions: [
              "Cast a net in 3 different locations to get a diverse sample.",
              "Weigh the total sample and divide by the number of shrimp to get ABW.",
              "Check for signs of molting or physical damage during the weighing.",
              "Update the feeding chart immediately based on the new biomass estimate."
            ],
            proTips: ["Conduct sampling at the same time every week (early morning).", "Perform a 'visual count' of the sample to check for uniformity in size."],
            mistakes: ["Sampling only from one spot near the feeder.", "Stressing the shrimp by keeping them out of water too long during weighing."],
            bestPractices: ["Growth should be at least 1.5 to 2.0 grams per week during the peak growth phase."],
            example: "Weekly sampling helped a farmer detect a growth plateau early, which was solved by increasing aeration, leading to a successful harvest."
          }
        ]
      },
      {
        id: 4, 
        title: "Harvesting & Cold Chain", 
        image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80&w=600", 
        description: "Properly catching and icing the shrimp to maximize market value.",
        subSteps: [
          {
            title: "Pre-harvest Molt Check",
            simpleExplanation: "Checking if the shrimp's shells are hard enough for selling.",
            detailedExplanation: "Soft-shell shrimp, often called 'molters,' have very low market value because their meat is watery and they are extremely fragile during transport. Shrimp molt regularly as they grow, and immediately after shedding their old shell, the new one is papery and soft. Harvesting during this phase leads to massive physical damage and rapid spoilage, as the internal organs are not properly protected. A professional pre-harvest molt check involves catching a random sample of 100 individuals 24 to 48 hours before the scheduled harvest. If more than 5% of the sample feels soft or 'papery' when gently pressed, the harvest must be postponed for 2-3 days until the shells harden through mineral absorption. This process can be accelerated by supplementing the pond with calcium and magnesium salts. Precision in timing ensures that the farmer delivers 'A-Grade' firm-shell shrimp to the buyer, which command the highest export price and withstand the rigors of the cold chain without losing weight or texture.",
            materials: ["Sampling net", "Testing basin"],
            instructions: [
              "Catch a random sample of 50-100 shrimp 24 hours before harvest.",
              "Gently press the head and body shell to check for firmness.",
              "Verify shell color; it should be translucent and bright.",
              "Postpone harvest if shells feel papery or soft."
            ],
            proTips: ["Apply minerals like Magnesium and Calcium 48 hours before harvest to encourage shell hardening.", "Avoid harvesting during full moon or new moon (peak molting times)."],
            mistakes: ["Harvesting immediately after a heavy rain, which triggers molting.", "Ignoring the molt check due to transporter pressure."],
            bestPractices: ["Record the molt percentage in the harvest log for future timing reference."],
            example: "Waiting just 48 hours for the shell to harden increased a farmer's price by ₹40 per Kilogram."
          },
          {
            title: "Night Harvest Protocol",
            simpleExplanation: "Catching the shrimp when it's cool to keep them at peak freshness.",
            detailedExplanation: "In the tropical climate of major shrimp-producing regions, ambient daytime heat is the single greatest threat to post-harvest quality. Commercial harvesting is strictly a night-time or pre-dawn operation, typically starting at 2 AM and concluding before the first sun rays hit the water. Keeping the shrimp cool prevents 'melanosis'—the enzymatic reaction that causes the head and shell to turn black—which is a major quality rejection factor in the international market. The process begins by gradually lowering the pond water level to concentrate the biomass. Then, professional harvesting teams use heavy-duty drag nets to pull the shrimp toward the outlet or a central collection point. The cooler water temperature at night also lowers the shrimp's metabolic rate, reducing the 'stress-induced' buildup of lactic acid in the meat, which keeps the texture firm and the flavor sweet. A rapid, well-coordinated night harvest ensures that the first crate of shrimp is iced down within minutes of leaving the water, preserving the 'live-fresh' quality through to the processing plant.",
            materials: ["Drag nets", "Submersible lights", "Plastic crates"],
            instructions: [
              "Start the operation around 2 AM to finish before sunrise.",
              "Lower the pond water level by 30-40% to concentrate the shrimp.",
              "Pull the drag net slowly across the pond bottom.",
              "Transfer shrimp immediately from the net to the washing area."
            ],
            proTips: ["Have a dedicated team of at least 10 people for a fast harvest.", "Keep backup battery lights ready."],
            mistakes: ["Harvesting in direct sunlight, which causes immediate meat degradation.", "Cramming too many shrimp into one crate."],
            bestPractices: ["The entire harvest should be completed within 4-5 hours to ensure uniformity."],
            example: "Enforcing the 'Night Harvest' rule helped a farm achieve 'A-Grade' export status consistently for 3 years."
          },
          {
            title: "Ice Slurry Preservation",
            simpleExplanation: "Using an ice-cold water mix to instantly preserve the shrimp's quality.",
            detailedExplanation: "To lock in peak freshness and prevent enzymatic degradation, shrimp must be 'shock chilled' immediately upon leaving the net. The industry standard for this is the 'Ice Slurry,' a semi-liquid mixture of crushed flake ice and clean water, often enhanced with salt to lower the freezing point below 0°C. When shrimp are submerged in this sub-zero slurry, their core temperature drops almost instantly, stopping all bacterial growth and enzymatic activity. This preservation method is far superior to simply layering shrimp on top of dry ice, as the liquid slurry ensures 100% surface contact, cooling the shrimp uniformly and preventing 'hot spots' within the transport tubs. The slurry must be prepared in insulated, food-grade vats well before the harvest begins. Maintaining a strict 1:1 ice-to-shrimp ratio ensures that even after a long transport journey to the processing facility, the shrimp remains at a stable temperature of 2°C to 4°C. This 'cold-chain' rigor is what defines premium aquaculture exports and ensures maximum shelf-life for the consumer.",
            materials: ["Flake ice", "Insulated tubs (vats)", "Salt"],
            instructions: [
              "Prepare the ice slurry in the tubs before the first net comes out.",
              "Submerge the harvested shrimp completely in the slurry.",
              "Maintain a ratio of 1kg ice for 1kg of shrimp.",
              "Cover the tubs with insulated lids for transport."
            ],
            proTips: ["Add salt to the slurry to lower the freezing point even further.", "Use clean, chlorinated water for the ice to ensure food safety."],
            mistakes: ["Using block ice instead of flake ice (blocks can crush the shrimp).", "Waiting too long between the net and the ice."],
            bestPractices: ["Check the core temperature of the shrimp regularly; it must stay below 4°C."],
            example: "A tracking test showed that 'Slurry Chilled' shrimp had 48 hours more shelf life compared to dry-iced shrimp."
          }
        ]
      }
    ]
  },
  {
    id: "fish-farming",
    name: "fishFarmingTitle",
    category: "Aquaculture",
    tag: "tagNew",
    icon: Fish,
    image: "https://images.unsplash.com/photo-1544473244-f6895e69da8e?auto=format&fit=crop&q=80&w=800",
    difficulty: "Intermediate",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    realWorldData: {
      cost: "₹ 5-8 Lakhs / Hectare",
      profit: "₹ 3-5 Lakhs / crop",
      duration: "6-8 Months",
      resources: ["Fish Fingerlings (Rohu/Katla)", "Floating Feed", "Nets", "Probiotics"]
    },
    farmerTips: { dos: ["Use polyculture (multiple species)", "Manure pond 2 weeks before stocking"], donts: ["Overcrowd the pond", "Overfeed in winter"] },
    steps: [
      {
        id: 1, 
        title: "Pond Design & Construction", 
        image: "https://images.unsplash.com/photo-1606900223709-ae9fb5d7daee?auto=format&fit=crop&q=80&w=600", 
        description: "Excavate a rectangular pond with sloping banks to ensure uniform depth.",
        subSteps: [
          {
            title: "Geometric Pond Excavation",
            simpleExplanation: "Digging a pond that holds water perfectly without bank erosion.",
            detailedExplanation: "A standard commercial fish pond must be engineered with a precise rectangular geometry and a specific 3:1 bank slope (side-slope) to prevent catastrophic soil collapse during heavy monsoons. The ideal operational depth of 1.5 to 2.0 meters is a scientific compromise; it is deep enough to provide a stable temperature for the fish during extreme summer heat, yet shallow enough for sunlight to reach the bottom and stimulate the growth of beneficial green algae. A rectangular shape is essential for efficient 'drag-net' harvesting, as it eliminates corner 'dead-zones' where fish can hide and uneven current flows. The excavation process must also involve the careful removal of all tree roots and rocks from the pond floor to prevent damage to expensive harvesting equipment later. By creating a uniform bottom with a subtle 5-degree tilt toward the central drainage point, farmers ensure that the pond can be evacuated quickly and completely during the harvest or for sterilization between crops.",
            materials: ["JCB Excavator", "Measuring tape", "Marking chalk"],
            instructions: [
              "Mark the rectangular perimeter for 1 hectare (10,000 sq.m).",
              "Excavate soil ensuring a 3:1 slope (for every 3 feet width, go 1 foot deep).",
              "Maintain a uniform bottom level with a slight tilt toward the outlet.",
              "Compact the side bunds (banks) using soil from the center."
            ],
            proTips: ["Plant binding grass on the bunds to prevent monsoon erosion.", "Align the pond length with the wind direction for natural aeration."],
            mistakes: ["Building vertical walls which always collapse during heavy rains.", "Digging too deep (>3m) where sunlight cannot reach the bottom."],
            bestPractices: ["Ensure a 10% slope from the inlet side to the outlet side for easy draining."],
            example: "A farm in Odisha avoided bank collapse by adopting the 3:1 slope rule, saving ₹50,000 in annual repair costs."
          },
          {
            title: "Water Retention Layers",
            simpleExplanation: "Treating the pond bottom to ensure water doesn't leak into the ground.",
            detailedExplanation: "In land that has high sand or silt content, water retention is the most significant operational challenge. To overcome this, the process of 'puddling' and 'clay-sealing' is used to create an impermeable barrier at the pond bottom. This involves the application of a 6-inch to 1-foot layer of heavy primary clay or 'Bentonite,' which is then physically compacted using heavy sheep-foot rollers until the soil becomes rock-hard and air-tight. This compaction process closes the 'capillary pores' in the soil that normally allow water to seep into the underground aquifers. A properly sealed pond maintains its water level regardless of the local groundwater table, significantly reducing the energy cost of continuous pumping during the dry season. Testing for seepage is a critical final step—any loss of more than 2 inches per day indicates a failure in the compaction layer that must be repaired immediately before stocking sensitive fingerlings. This foundation work is what determines the long-term feasibility and profit margins of a commercial fish farm in regions with porous soil.",
            materials: ["Bentonite clay", "Sheep-foot roller", "Seepage testing kit"],
            instructions: [
              "Spread a 6-inch layer of heavy clay over the dry pond bottom.",
              "Use a heavy roller to compact the clay until it is rock-hard.",
              "Test for seepage: Fill 1 foot of water and check the level after 24 hours.",
              "If water drops more than 2 inches, apply another layer of clay."
            ],
            proTips: ["Mix agricultural lime with the clay to prevent it from cracking when dry.", "Perform compaction when the clay is slightly damp for best sealing."],
            mistakes: ["Filling the pond immediately without compaction.", "Ignoring sandy 'hotspots' in the pond floor."],
            bestPractices: ["Use a geomembrane plastic liner if the soil is 100% sandy."],
            example: "Applying a bentonite seal reduced water pumping costs by 40% for a fish farm in a drought-prone area."
          },
          {
            title: "Inlet & Outlet Setup",
            simpleExplanation: "Installing pipes and screens to control water flow and keep out wild fish.",
            detailedExplanation: "Plumbing design is often overlooked but is central to both biosecurity and water management. An efficient inlet and outlet system allows for 'controlled water exchange'—the replacement of 10-20% of stale water to remove toxic ammonia and replenish oxygen. The inlet should be positioned at the highest point, while the outlet must be at the lowest drainage point on the opposite side to ensure a cross-current that cleans the entire pond area. High-density nylon mesh screens (60-mesh or finer) must be installed at the inlet to stop 'wild' predatory fish, such as snakeheads or catfish, from entering the pond. These wild fish carry parasites and will consume 20-30% of your expensive commercial fingerlings if left unchecked. The use of 'monk-style' or vertical stand-pipe outlets allows the farmer to drain water from the bottom—where the highest concentration of organic waste exists—rather than the cleaner surface layers, maintaining a healthier overall ecosystem for the growing fish stock.",
            materials: ["PVC pipes (6-inch diameter)", "Nylon mesh screens", "Concrete for pipe fixing"],
            instructions: [
              "Install the inlet pipe at the top edge of one pond side.",
              "Install the outlet pipe at the lowest point of the opposite side.",
              "Attach a fine nylon mesh (60-mesh) to the inlet mouth.",
              "Secure both pipes with concrete to prevent leaks around the edges."
            ],
            proTips: ["Use a 'gravity-flow' system to save on pumping power bills.", "Keep the outlet mouth clear of underwater weeds."],
            mistakes: ["Installing the inlet and outlet on the same side, causing zero water circulation.", "Using screens that are too large, allowing wild fish eggs inside."],
            bestPractices: ["Maintain a 1:1000 slope for the drainage pipe to ensure total pond evacuation."],
            example: "A simple mesh screen on the inlet saved a 1-acre farm from a 'snakehead' infestation that would have eaten 30% of their stock."
          }
        ]
      },
      {
        id: 2, 
        title: "Seed Stocking", 
        image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&q=80&w=600", 
        description: "Selecting and introducing fingerlings to maximize pond utilization.",
        subSteps: [
          {
            title: "Fingerling Selection",
            simpleExplanation: "Buying healthy, active baby fish (Rohu, Katla, Mrigal) from a trusted nursery.",
            detailedExplanation: "The success of your commercial harvest is directly proportional to the quality of the fingerlings selected during the stocking phase. In Indian inland aquaculture, the 'Polyculture' of Indian Major Carps (IMC)—specifically Katla, Rohu, and Mrigal—is the gold standard. Selecting fingerlings that are 4 to 6 inches long (approximately 80 to 100 grams) is a critical survival strategy, as smaller 'fry' are highly vulnerable to aquatic insects and predatory frogs common in large ponds. Fingerlings must be sourced from certified hatcheries that can guarantee the purity of the breed; cross-bred or 'stunted' seeds will not reach the target 1kg weight within the 8-month window. A visual inspection of the stock is mandatory—health should be evidenced by clear eyes, untattered fins, and an absence of white spots (Ich) or red lesions. A professional 'stress-test' involves placing a few fish in a bucket and spinning the water; healthy fingerlings will immediately orient themselves and swim against the current, indicating strong muscle development and high energy reserves.",
            materials: ["Oxygen bags", "Transport buckets", "Quality seed source"],
            instructions: [
              "Choose fingerlings that are active and have no visible spots or fin damage.",
              "Confirm the species: Katla (Surface), Rohu (Middle), Mrigal (Bottom).",
              "Transport in the early morning to avoid heat stress.",
              "Sanitize with a mild salt-dip before releasing into the pond."
            ],
            proTips: ["Always buy fingerlings instead of 'fry' as they have much higher survival rates.", "Observe the fish in a bucket; they should swim against the rotating water current."],
            mistakes: ["Buying cheap, stunted seeds from unverified vendors.", "Transporting too many fish in a small tank without oxygen."],
            bestPractices: ["The fish should be of equal size (uniform) to prevent smaller ones from being bullied."],
            example: "Using 5-inch fingerlings instead of 1-inch fry increased first-month survival rates from 60% to 95%."
          },
          {
            title: "Stocking Density Optimization",
            simpleExplanation: "Calculating how many fish to put in your pond based on its size.",
            detailedExplanation: "Determining the correct stocking density is a scientific balance between water volume and the 'carrying capacity' of the ecosystem. Overcrowding is the most common cause of crop failure, as it leads to rapid dissolved oxygen depletion and the fast spread of bacterial infections. For a standard 1-hectare pond relying on natural aeration, a density of 5,000 to 7,000 fingerlings ensures that each individual has enough space and natural food to reach its maximum genetic growth potential. This density also ensures that the ammonia levels from fish waste do not exceed the 'nitrification capacity' of the pond water. If mechanical aerators are installed, the density can be increased to 12,000 or 15,000 per hectare. The stocking should also follow a 'Stratified Ratio' to maximize food utilization: 30% Surface Feeders (Katla), 30% Column Feeders (Rohu), and 40% Bottom Feeders (Mrigal). This vertical distribution ensures that every water layer is productive and no section of the pond's natural food resources is left unutilized.",
            materials: ["Pond area map", "Density chart", "Weighing scale"],
            instructions: [
              "Calculate the total water surface area (Length x Width).",
              "Maintain a ratio of 30% Katla, 30% Rohu, and 40% Mrigal.",
              "Stock no more than 1 fish per 2 square meters of area for standard ponds.",
              "If using aerators, you can double the density to 15,000 per hectare."
            ],
            proTips: ["Under-stocking is better than over-stocking for beginners.", "Adjust density based on the water depth (deeper ponds can hold slightly more fish)."],
            mistakes: ["Stocking 20,000+ fish in a 1-acre pond, thinking more fish equals more profit.", "Ignoring the species ratio, leading to food competition in one water layer."],
            bestPractices: ["Stocking should be completed within a single day to ensure uniform growth."],
            example: "Reducing density from 10,000 to 7,000 per hectare actually increased the total harvest weight by 2 tons because the fish grew twice as fast."
          },
          {
            title: "Natural Feed Induction",
            simpleExplanation: "Preparing the pond water so it's full of green algae for the fish to eat.",
            detailedExplanation: "In the first 30 to 60 days of a fish's life, natural food is far superior and more cost-effective than artificial pellets. Natural feed induction, or 'pond fertilization,' is the process of stimulating a massive bloom of both phytoplankton (microscopic plants) and zooplankton (microscopic animals). By applying a balanced mix of organic manure (cow dung) and inorganic fertilizers (Urea and SSP), the farmer triggers an explosion of these microscopic organisms. This 'living soup' is packed with highly digestible proteins and essential fatty acids that ensure rapid skeletal development and strong immune systems in fingerlings. A successful bloom is characterized by a vibrant 'leaf-green' water color; if the water is clear, the fish will starve or turn to cannibalism. However, if the water turns dark brown or pea-soup green, it indicates an overgrowth that could lead to a night-time oxygen crash. Maintaining this delicate biological balance through regular, small-dose fertilization is the key to achieving a massive weight gain in the early phase of the crop without spending a fortune on commercial feed.",
            materials: ["Urea fertilizer", "Raw cow dung", "Single Super Phosphate (SSP)"],
            instructions: [
              "Apply 10,000 kg of cow dung per hectare 10 days BEFORE stocking.",
              "Apply 200 kg Urea and 250 kg SSP per hectare 5 days later.",
              "Wait for the water to turn 'light green' (not dark green).",
              "Check transparency with a Secchi disk: 1.5 feet is perfect."
            ],
            proTips: ["Stop fertilizing during rainy or cloudy days as it can kill the oxygen.", "Maintain the green color throughout the season with monthly top-ups."],
            mistakes: ["Stocking fish in clear blue water (they will starve).", "Over-fertilizing, causing a thick green 'scum' that chokes the fish."],
            bestPractices: ["Dissolve chemicals in a bucket of water before broadcasting over the pond."],
            example: "Establishing a strong plankton bloom saved a farm ₹1 Lakh in expensive commercial feed costs during the first 2 months."
          }
        ]
      },
      {
        id: 3, 
        title: "Feeding & Water Quality", 
        image: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34af?auto=format&fit=crop&q=80&w=600", 
        description: "Providing nutrition and maintaining a clean environment for fast growth.",
        subSteps: [
          {
            title: "Floating Feed Protocol",
            simpleExplanation: "Using professional high-protein pellets to ensure the fish reach market weight fast.",
            detailedExplanation: "While natural plankton is excellent for starters, it cannot support the energy requirements of fish as they grow beyond 200 grams. Supplementing with professional 'Floating Pellets' is mandatory for secondary growth phases. Floating feed is scientifically formulated with 24% to 28% crude protein and fortified with vitamins and minerals to ensure the fish reach their 1kg market weight within the 8-month window. The 'floating' nature of the feed is a critical management advantage—it allows the farmer to visually observe the feeding response. If the fish swim vigorously to the surface to consume the pellets within 20 minutes, the dosage is correct. If pellets remain floating after 30 minutes, it is a clear sign of overfeeding, which leads to expensive waste and the sinking of organic matter that eventually decomposes into toxic ammonia at the pond bottom. By using 'Feeding Rings' to contain the pellets, farmers prevent wind-drift, ensuring that the feed remains accessible to the fish and the pond banks stay clean.",
            materials: ["Floating fish pellets", "Feeding rings (PVC hoops)", "Feed bucket"],
            instructions: [
              "Fix 5-10 feeding rings (hoops) in different parts of the pond.",
              "Calculate daily feed as 2-3% of total body weight.",
              "Feed twice a day: once at 9 AM and once at 4 PM.",
              "Stop feeding if the rings aren't empty after 30 minutes."
            ],
            proTips: ["Mix feed with multivitamins once a week for stronger immunity.", "Feed in the same spots every day; the fish will 'learn' where to gather."],
            mistakes: ["Broadcasting feed everywhere, which rots on the banks.", "Feeding in the dark when you cannot see if the fish are eating."],
            bestPractices: ["Switch to large pellet sizes as the fish cross the 500-gram mark."],
            example: "Switching from sinking 'rice bran' to floating pellets reduced the harvest time by 2 months."
          },
          {
            title: "Dissolved Oxygen Management",
            simpleExplanation: "Making sure there is enough air in the water so the fish don't suffocate.",
            detailedExplanation: "Dissolved Oxygen (DO) is the most critical life-support parameter in intensive inland aquaculture. DO levels naturally fluctuate throughout the day due to photosynthesis and respiration; they are highest in the late afternoon and reach a dangerous minimum in the pre-dawn hours (4 AM to 6 AM). If levels drop below 3.0 mg/L, the fish experience 'hypoxia,' leading to surface gulping, immune suppression, and eventually mass mortality. Professional management requires the use of paddle-wheel aerators or venturi injectors to physically agitate the water surface, facilitating the exchange of atmospheric oxygen. Mechanical aeration is not just for emergencies; it is a growth-accelerant that allows for higher stocking densities and better feed conversion. By maintaining a stable DO level above 5.0 mg/L, farmers ensure that the fish's metabolism remains at peak efficiency, allowing them to digest feed faster and reach market weight several weeks earlier than in non-aerated ponds.",
            materials: ["Paddle-wheel aerators", "Dissolved Oxygen (DO) test kit", "Backup generator"],
            instructions: [
              "Test DO levels at 5 AM weekly. It should be above 5.0 mg/L.",
              "Run aerators for 4 hours every night (1 AM to 5 AM).",
              "Stop aerators during the day when the sun is bright (algae produce oxygen then).",
              "Immediately stop feeding if DO levels drop below 3.0 mg/L."
            ],
            proTips: ["If the weather is cloudy all day, run the aerators for longer at night.", "Splashing water with a boat or pump is a good emergency way to add oxygen."],
            mistakes: ["Thinking aerators are only for 'sick' fish.", "Ignoring 'gulping' behavior in the early morning."],
            bestPractices: ["Place aerators where they create a 'circular' water current in the pond."],
            example: "A farm in Andhra Pradesh saved its entire stock during a heatwave by running aerators 24/7, while neighbors lost 80% of their fish."
          },
          {
            title: "Plankton Bloom Control",
            simpleExplanation: "Managing the algae density to keep the water healthy.",
            detailedExplanation: "The productivity of an inland pond is determined by its 'planktonic density,' but too much of a good thing can be catastrophic. A 'hyper-bloom' of dark green algae (cyanobacteria) is dangerous because while it produces oxygen during the day, it consumes massive amounts at night, leading to an oxygen crash. Managing the bloom requires regular transparency checks using a Secchi disk. If visibility drops below 25cm (10 inches), it indicates a dangerously thick bloom that must be thinned by exchanging 10-15% of the pond water with fresh, clear water. This 'flushing' reduces the nutrient concentration (phosphates and nitrates) that fuels the algae. Alternatively, introducing 'filter-feeding' fish like Silver Carp can help graze the excess algae naturally. Achieving a stable 'greenish-brown' water color ensures that the sunlight can penetrate deep into the water column, preventing the 'bottom rot' caused by decaying organic matter in shaded, oxygen-poor zones.",
            materials: ["Secchi disk", "Fresh water pump", "Copper sulfate (only for emergencies)"],
            instructions: [
              "Dip a Secchi disk twice a week to check visibility.",
              "If visibility is less than 1 foot (30cm), pump out 10% water and add fresh water.",
              "Stop fertilization immediately if water becomes deep green.",
              "Ensure sunlight reaches as deep as possible to prevent bottom rotting."
            ],
            proTips: ["Add 50 Silver Carp fish per acre; they eat excess algae naturally.", "Liming also helps clear up muddy or overly green water."],
            mistakes: ["Allowing a thick 'green mat' to cover the pond surface.", "Waiting for a fish kill before testing water transparency."],
            bestPractices: ["The ideal water color is 'greenish-brown' like weak tea."],
            example: "Weekly Secchi disk checks helped a farm maintain 100% survival during the humid monsoon when algae blooms are most volatile."
          }
        ]
      },
      {
        id: 4, 
        title: "Harvesting & Market", 
        image: "https://images.unsplash.com/photo-1544473244-f6895e69da8e?auto=format&fit=crop&q=80&w=800", 
        description: "Efficiently catching and preparing the fish for sale.",
        subSteps: [
          {
            title: "Netting Techniques",
            simpleExplanation: "Using 'drag nets' to catch all the fish at once without hurting them.",
            detailedExplanation: "Commercial harvesting for large-scale inland ponds is a high-coordinated team operation requiring the use of 'drag-nets' (Maha-jaal). The timing is critical; the harvest must begin around 2 AM to 3 AM and conclude before the ambient temperature rises above 25°C at sunrise. This prevents the fish from becoming stressed and overheated in the concentrated net-pocket, which would otherwise ruin the texture of the meat and cause rapid post-harvest spoilage. The net is slowly pulled across the rectangular pond by a team of 8 to 12 people, ensuring that 'lead lines' stay firmly on the bottom to prevent fish from diving under. As the net area shrinks, the fish are concentrated into a 'hauling pocket' near the bank. To ensure maximum market value, the fish should be handled gently to avoid scale loss or bruising. A professional netting protocol ensures that the entire stock is gathered efficiently, minimizing the time between the water and the 'cold-chain' transportation crates.",
            materials: ["Drag net (large mesh)", "Floating lead lines", "Stout bamboo poles"],
            instructions: [
              "Do not feed the fish for 24 hours before harvesting.",
              "Drop the water level by 50% the night before to make catching easier.",
              "Pull the net slowly; do not rush or the fish will jump over the net.",
              "Gather the fish in the 'net-pocket' near the bank."
            ],
            proTips: ["Harvest in the early morning when the air is cool.", "Use a 'partial harvest' strategy: catch only the 1kg+ fish and let the others grow."],
            mistakes: ["Using a net with holes that are too small, which creates too much resistance.", "Harvesting on a hot afternoon, which kills the fish instantly in the net."],
            bestPractices: ["Wet the net thoroughly before it touches the fish to protect their skin/scales."],
            example: "Switching to 'cool morning harvests' reduced post-harvest mortality by 90% during transport."
          },
          {
            title: "Size Grading & Cleaning",
            simpleExplanation: "Sorting the fish by weight to get the best price from buyers.",
            detailedExplanation: "Size uniformity is a major pricing factor in the regional Mandi (market). Buyers consistently pay higher premiums for 'A-Grade' fish that weigh exactly 1.0kg to 1.5kg, as they are ideal for restaurant and retail segments. Grading involves the rapid sorting of the harvest into 'Size Tiers'—Small (under 750g), Medium (750g-1kg), and Large (1kg+). This must be done on specialized 'sorting tables' using clean, chilled water to keep the fish's protective 'slime layer' intact. This slime layer contains natural antimicrobial properties that prevent the fish from rotting during the journey to market. Each fish is rinsed in a final tank of chlorinated (5ppm) water to remove the typical 'pond smell' caused by geosmin-producing algae. By delivering clean, sorted, and uniform fish in designated crates, the farmer builds a reputation for quality that ensures long-term buyer contracts and better fiscal returns on the harvest.",
            materials: ["Plastic crates", "Grading table", "Clean water tanks"],
            instructions: [
              "Sort fish immediately after they are pulled out of the net.",
              "Rinse the fish in a tank of clean, aerated water to remove scales/mud.",
              "Weigh the sorted batches for accurate billing.",
              "Discard or quarantine any fish with sores or damaged fins."
            ],
            proTips: ["Group the 1.5kg+ fish separately; they often fetch a 'premium' price.", "Keep the fish in the shade during the entire grading process."],
            mistakes: ["Selling a 'mixed bag' of sizes, which allows buyers to underpay for the whole batch.", "Leaving the fish on the hot ground while sorting."],
            bestPractices: ["Always use clean plastic crates; never wooden boxes which harbor bacteria."],
            example: "Grading the harvest into 'export' and 'local' sizes increased the total revenue by 20%."
          },
          {
            title: "Transport Logistics",
            simpleExplanation: "Moving the fish to the market in oxygen-tanks to keep them alive and fresh.",
            detailedExplanation: "Fish lose value the moment they die. Live-transport trucks with oxygen tanks are the gold standard. For dead-fish transport, they must be layered with crushed ice in insulated boxes at a 1:1 ratio.",
            materials: ["Insulated boxes", "Flaked ice", "Oxygen cylinders (for live)"],
            instructions: [
              "For live transport, stock tanks at 10kg of fish per 100 liters of water.",
              "For iced transport, put a 2-inch layer of ice at the bottom of the box.",
              "Alternate layers of fish and ice until the box is full.",
              "Seal the boxes tightly to maintain the cold temperature."
            ],
            proTips: ["Add salt to the ice during transport to keep it from melting fast.", "Do not overpack the iced boxes or the bottom fish will be crushed."],
            mistakes: ["Using 'block ice' which doesn't touch all the fish surface.", "Transporting live fish without a backup oxygen cylinder."],
            bestPractices: ["Pre-chill the transport water to 15°C; cold fish use less oxygen and stay calm."],
            example: "Using insulated 'ice-boxes' instead of open crates allowed a farmer to reach a city market 300km away with 0% spoilage."
          }
        ]
      }
    ]
  },
  {
    id: "broiler-farming",
    name: "broilerFarmingTitle",
    category: "Poultry",
    tag: "tagExpert",
    icon: Bird,
    image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&q=80&w=600",
    difficulty: "Beginner",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    realWorldData: {
      cost: "₹ 1-3 Lakhs / batch",
      profit: "₹ 50,000 - 80,000 / month",
      duration: "40-45 Days / batch",
      resources: ["Day Old Chicks (Cobb/Ross)", "Pre-Starter/Starter Feed", "Brooders", "Vaccines"]
    },
    farmerTips: { dos: ["Maintain strict biosecurity footbaths", "Use proper red-light brooders"], donts: ["Allow wild birds inside shed", "Overcrowd the chicks"] },
    steps: [
      {
        id: 1, 
        title: "Brooder Preparation", 
        image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600", 
        description: "Providing a heavily heated, protected ring for newborn Day-Old Chicks (DOC).",
        subSteps: [
          {
            title: "Thermal Hover Setup",
            simpleExplanation: "Creating a giant, warm nest inside the shed for baby chicks using heat lamps.",
            detailedExplanation: "Day-Old Chicks (DOCs) are poikilothermic for the first 14 days of life, meaning they lack the physiological capacity to regulate their own internal body temperature. Without an external heat source, their metabolic rate slows down, leading to poor yolk sac absorption, stunted growth, and high mortality due to 'huddling' (where they crush each other for warmth). A professional 'Thermal Hover' setup uses infrared heat lamps or gas brooders to maintain a precise surface temperature of 32°C to 34°C at the floor level. The layout must be strictly circular to eliminate corners, which are 'trap zones' where chicks huddle and suffocate during temperature drops. Pre-warming the shed for 6 to 12 hours before arrival is essential to ensure the litter (floor bedding) is warm to the touch, as cold feet are the primary cause of early-stage respiratory infections. Proper brooding is the most critical phase of poultry farming; the weight achieved by Day 7 is the strongest predictor of the final 45-day harvest weight, making temperature management a high-stakes operational priority.",
            materials: ["Infrared heat lamps (250W)", "Chain-link mesh", "Tarpaulin sheets", "Digital thermometer"],
            instructions: [
              "Fumigate the shed with potassium permanganate and formalin 48 hours before chicks arrive.",
              "Spread a 2-inch layer of dry wood shavings or rice husk across the floor.",
              "Suspend heat lamps exactly 1.5 feet above the litter surface.",
              "Switch on the heaters 6 hours before arrival to pre-warm the floor."
            ],
            proTips: ["Observe chick behavior: if they huddle under the light, it's too cold. If they move away to the edges, it's too hot.", "Use 1 watt of heat per bird as a general rule of thumb."],
            mistakes: ["Using sawdust instead of wood shavings (chicks might eat sawdust and die).", "Placing the brooder in a drafty area where wind hits the birds directly."],
            bestPractices: ["Ensure the circular chick guard is made of smooth material like cardboard or plastic."],
            example: "A farm in Ludhiana reduced its winter mortality from 10% to 1.5% by using double-layered tarpaulins around the brooder zone."
          },
          {
            title: "Chick Guard Construction",
            simpleExplanation: "Building a small wall to keep the chicks close to the warmth and food.",
            detailedExplanation: "A 'Chick Guard' is a strategic temporary barrier designed to restrict the movement of newborn chicks, keeping them within the 'Comfort Zone' of the brooder's heat and nutrition sources. In a large poultry house, a tiny chick can easily wander away from the heater, become chilled, and lose the energy required to find its way back to the feeders. The guard, usually made of corrugated cardboard or flexible plastic, creates a manageable 5-to-10 foot diameter circle that ensures every bird is always within sight of food and water. This enclosure is vital for the 'socialization' of the birds, as it encourages them to eat and drink in groups. As the chicks grow and their mobility increases, the guard must be expanded by 1 to 2 feet every 48 hours to prevent overcrowding. By Day 10, the birds are typically strong enough to navigate the entire shed, and the guard can be removed. Using a circular design is non-negotiable; square or rectangular guards create 90-degree corners where birds can pile up and 'smother' the ones at the bottom during the night.",
            materials: ["Corrugated cardboard roles", "Bamboo stakes", "Heavy-duty tape"],
            instructions: [
              "Cut cardboard into 24-inch high strips.",
              "Form a perfect circle around the brooder lamp.",
              "Secure the circle with bamboo stakes pushed into the litter.",
              "Expand the circle by 1 foot every 2 days as the chicks grow."
            ],
            proTips: ["Make sure there are NO corners. Chicks will 'pile up' in corners and crush the bottom ones.", "Keep the guard about 3-4 feet away from the heat source."],
            mistakes: ["Using a square guard which leads to 'smothering' deaths in the corners.", "Leaving the guard on for too long (beyond 10 days) which restricts movement."],
            bestPractices: ["Sanitize the guard material before use even if it's new cardboard."],
            example: "Using circular guards instead of square ones saved 50 chicks per batch for a small-scale poultry farmer."
          },
          {
            title: "Liter Management",
            simpleExplanation: "Keeping the floor bedding dry and clean to prevent disease.",
            detailedExplanation: "In poultry production, the floor bedding or 'Litter' is the primary interface between the bird and its environment. Litter management is essentially 'moisture management.' If the litter becomes damp (above 25% moisture), it reacts with the nitrogen in bird droppings to release ammonia gas. Ammonia is a corrosive gas that burns the fragile respiratory linings of the chicks and causes 'conjunctivitis' (eye inflammation), which leads to reduced feeding and slow growth. To prevent this, a 2-to-3 inch layer of dry wood shavings or rice husk must be maintained and 'raked' (turned over) daily to facilitate evaporation and oxygenation. Raking also prevents the formation of 'wet cakes'—hard crusts of manure that harbor deadly bacteria like Coccidiosis and E. coli. Properly managed litter should feel dry, friable, and 'bouncy' underfoot. In colder climates or during the monsoon, adding a small amount of hydrated lime can help absorb excess moisture and neutralize the pH of the floor, creating a biosecure foundation for the broiler's rapid 45-day growth cycle.",
            materials: ["Wood shavings", "Hand rake", "Hydrated lime"],
            instructions: [
              "Maintain a depth of 2-3 inches of dry wood shavings.",
              "Rake the litter every morning to bring dry layers to the top.",
              "Remove any wet 'cakes' around the water drinkers immediately.",
              "Sprinkle a handful of lime on damp spots to kill bacteria."
            ],
            proTips: ["If the litter smells like ammonia when you enter the shed, the ventilation is poor.", "Add fresh shavings once a week to maintain a clean top layer."],
            mistakes: ["Using damp or moldy wood shavings which cause 'Aspergillosis' (respiratory fungal infection).", "Ignoring wet patches near drinkers, leading to foot sores."],
            bestPractices: ["The litter is perfect if it feels dry and bouncy when you walk on it."],
            example: "Daily raking of the litter improved the growth rate by 15% because the birds were breathing cleaner air."
          }
        ]
      },
      {
        id: 2, 
        title: "Housing & Biosecurity", 
        image: "https://images.unsplash.com/photo-1582769923195-c6e60dc1d8bc?auto=format&fit=crop&q=80&w=600", 
        description: "Setting up a safe, clean, and well-ventilated home for the birds.",
        subSteps: [
          {
            title: "Ventilation Specs",
            simpleExplanation: "Designing a shed that allows fresh air to flow through constantly.",
            detailedExplanation: "Poultry shed ventilation is the science of maintaining air quality by removing excess heat, moisture, and gasses without creating harmful 'chilling' drafts. In hot climates, 'Tunnel Ventilation' is the gold standard, where high-capacity exhaust fans at one end of the shed pull air through the entire length of the building. This creates a 'wind-chill effect' that makes the birds feel 5°C cooler than the actual ambient temperature, preventing heat-stroke. The shed must be oriented East-to-West to avoid direct solar radiation on the side walls. For natural ventilation, the side mesh should be at least 6 to 8 feet high to allow the prevailing breeze to carry away the massive amount of metabolic heat generated by fast-growing broilers. Proper ventilation is also a life-saving biosecurity measure; it continuously dilutes the airborne concentration of dust and pathogens. During the night, managing the 'Curtains' (side tarpaulins) is a delicate act—they must be lowered enough to retain warmth but remain open at the top to allow the escape of carbon dioxide and ammonia, ensuring the birds breathe oxygen-rich air for maximum heart and lung health.",
            materials: ["Wire mesh (1-inch holes)", "Side curtains", "High-speed exhaust fans"],
            instructions: [
              "Build the shed in an East-West direction to prevent direct sun at noon.",
              "The side walls should be only 1-2 feet high, topped with 6-8 feet of mesh.",
              "Install curtains that can be rolled up from the bottom (to let in air) or down (to block rain).",
              "Maintain a minimum distance of 50 feet between two poultry sheds."
            ],
            proTips: ["Hot air rises; ensure the roof has a 'ridge vent' (a gap at the peak) for heat escape.", "Plant tall trees around the shed for natural cooling but keep them 20 feet away."],
            mistakes: ["Building a wide shed (over 30 feet) which has poor air circulation in the center.", "Keeping curtains fully closed at night, causing oxygen depletion."],
            bestPractices: ["The air speed inside should be at least 2 meters per second during hot afternoons."],
            example: "Installing two axial fans reduced the internal temperature by 4°C, preventing heat-stroke deaths during a heatwave."
          },
          {
            title: "Footbath Protocols",
            simpleExplanation: "A cleaning step at the door to stop outside germs from entering.",
            detailedExplanation: "Biosecurity is the first and only line of defense against devastating viral outbreaks like Avian Influenza (Bird Flu) or Newcastle Disease. A 'Footbath' or 'Dip-Tank' is a non-negotiable gateway that separates the 'clean' interior of the poultry shed from the 'dirty' outside world. Every person entering the shed carries millions of microscopic pathogens on the soles of their shoes, which can be instantly transferred to the litter. A professional footbath uses a strong oxidizing disinfectant, such as Potassium Permanganate or Virkon-S, kept at a concentration that kills 99% of pathogens within a 10-second soak. The solution must be changed daily, as organic matter (mud) quickly neutralizes the chemical's effectiveness. Beyond the feet, biosecurity also involves 'vehicle-dipping' at the farm gate and 'hand-sanitization' before touching equipment. By enforcing a 100% compliance rule for footbaths, farmers ensure that the thousands of dollars invested in the flock are not wiped out by a single person's careless entry into the production unit.",
            materials: ["Plastic tray (2x2 feet)", "Potassium Permanganate or Virkon-S", "Safety signs"],
            instructions: [
              "Place the footbath at the ONLY entrance to the poultry shed.",
              "Fill with 2 inches of water mixed with a strong disinfectant.",
              "Change the solution daily or whenever it becomes muddy.",
              "Ensure all visitors and workers use it without exception."
            ],
            proTips: ["Keep a separate pair of 'shed-only' boots inside the door for even better safety.", "Use a broom to scrub the soles while they are in the footbath."],
            mistakes: ["Having a footbath but forgetting to add disinfectant to the water.", "Walking around the side of the footbath to avoid getting wet shoes."],
            bestPractices: ["Post a 'NO ENTRY' sign at the gate for unauthorized persons."],
            example: "A farm in Pune remained bird-flu free while neighbors were hit, credited to their 100% strict footbath use."
          }
        ]
      },
      {
        id: 3, 
        title: "Feeding & Vaccination", 
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600", 
        description: "Providing the right nutrition and life-saving vaccines on time.",
        subSteps: [
          {
            title: "Pre-starter Nutrition",
            simpleExplanation: "Special high-protein food for the first week to grow small chicks fast.",
            detailedExplanation: "In the high-speed lifecycle of a broiler chicken, the first seven days—the 'Pre-starter' phase—are the most critical for future profitability. During this week, the chicks are focused on 'skeletal and organ development,' particularly the heart, lungs, and digestive tract. Pre-starter feed is a highly specialized crumble containing 23% crude protein and extra levels of essential amino acids like Lysine and Methionine. Scientific studies have shown that every 1 gram of body weight gained during this first week correlates to a 5-to-7 gram increase in final weight at Day 45. To encourage maximum consumption, feed should be spread on textured surfaces like crumbly newspapers rather than deep feeders, as baby chicks are naturally programmed to peck at the ground. Water must be supplemented with a high-energy 'Day One' electrolyte and vitamin mix to offset the stress of transport from the hatchery. A successful pre-starter phase is verified by checking the 'Crop Fill' of the chicks at dusk; 100% of the birds should have a soft, full-feeling crop, indicating they have successfully transitioned to solid feed and are on track for rapid growth.",
            materials: ["Pre-starter crumble feed", "Flat feeding trays", "Clean drinking water"],
            instructions: [
              "Provide fresh feed 4-6 times a day in small quantities.",
              "Spread feed on newspapers for the first 3 days within the chick guard.",
              "Ensure the water is cool and treated with electrolytes on Day 1.",
              "Check 'crop fill': the chick's neck should feel soft and full after 2 hours."
            ],
            proTips: ["Never let the feeders run completely empty.", "Use red-colored feeders; chicks are naturally attracted to red and will eat more."],
            mistakes: ["Using large pellets for small chicks (they cannot swallow them).", "Allowing feed to get damp and moldy in the trays."],
            bestPractices: ["Target weight at Day 7 should be at least 4.5 to 5 times the initial chick weight."],
            example: "Switching to high-quality Pre-starter crumbs improved the final harvest weight by an average of 250 grams per bird."
          },
          {
            title: "Vaccine Schedule",
            simpleExplanation: "Life-saving drops given in the eyes or water to prevent viral outbreaks.",
            detailedExplanation: "In the high-density environment of a commercial broiler house, viral pathogens like Newcastle Disease (Ranikhet) and Infectious Bursal Disease (Gumboro) can spread through the entire flock in less than 24 hours. Vaccination is the only effective preventative measure, acting as a controlled exposure that 'primes' the bird's immune system to recognize and attack real viruses. Professional vaccine management requires a strict 'Cold Chain' protocol; vaccines are live biological agents that lose all potency if exposed to temperatures above 8°C for even a few minutes. Administration typically involves ocular (eye) drops for Day 5-7 (Lasota) and drinking water administration for Day 12-14 (Gumboro). When using the water-delivery method, the use of skimmed milk powder is mandatory to neutralize any residual chlorine in the water that would otherwise kill the vaccine virus. Successful vaccination is evidenced by 'immunity titers' in blood tests, but at a farm level, the benchmark is simple—the total absence of respiratory clicking or sudden mortality spikes during the high-growth secondary phase. A single lapse in the vaccination schedule can lead to a 100% loss of the capital invested in the flock.",
            materials: ["Vaccine vials", "Droppers", "Ice box", "Skimmed milk powder (for water vaccine)"],
            instructions: [
              "Day 5-7: Give one drop of Lasota vaccine in the eye of every bird.",
              "Day 12-14: Give Gumboro vaccine via drinking water.",
              "For water vaccines: Stop water for 2 hours before, then provide vaccine-water with skim milk.",
              "Ensure birds consume the vaccine water within 1-2 hours."
            ],
            proTips: ["Vaccinate only in the early morning or late night when it is cool.", "Never use chlorinated tap water for vaccines; chlorine kills the live vaccine virus."],
            mistakes: ["Keeping the vaccine at room temperature, which makes it useless.", "Skipping a few birds in the flock; the virus will hide in them and mutate."],
            bestPractices: ["Burn all empty vaccine vials after use to prevent accidental spread."],
            example: "A perfectly followed vaccine schedule saved a farm from a Gumboro outbreak that killed 80% of birds on the adjacent farm."
          }
        ]
      },
      {
        id: 4, 
        title: "Weight Tracking & Sales", 
        image: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?auto=format&fit=crop&q=80&w=600", 
        description: "Monitoring growth and preparing for a successful harvest.",
        subSteps: [
          {
            title: "Weekly Growth Checks",
            simpleExplanation: "Weighing 10% of the birds every week to see if they are growing properly.",
            detailedExplanation: "In the poultry industry, 'if you don't measure it, you can't manage it.' Weekly growth checks are the primary diagnostic tool for assessing the efficiency of your feed program and the health of the flock. By catching and weighing a random, representative sample of 5% to 10% of the birds from different locations in the shed, a farmer can calculate the 'Average Body Weight' (ABW). This figure is more than just a number; it is used to calculate the Feed Conversion Ratio (FCR)—the amount of food consumed versus the amount of meat produced. An FCR of 1.5 to 1.7 is the target for modern broiler breeds. If the weekly weight gain is more than 10% below the 'Standard Breed Chart' for that age, it is an immediate early warning sign of either sub-clinical disease, poor ventilation, or low-quality feed. These checks must be performed at the same time and day each week to ensure data consistency. Recording these weights in a digital or paper logbook allows the farmer to track 'Growth Curves' and predict the exact day the batch will reach 'Market Weight,' optimizing the farm's financial turnover and resource planning.",
            materials: ["Electronic weighing scale", "Catching crate", "Recording book"],
            instructions: [
              "Catch 5% of birds from different corners of the shed.",
              "Weigh them and record each weight on a chart.",
              "Calculate the Average Body Weight (Total weight / Number of birds).",
              "Compare the actual weight to the 'Standard Breed Chart' for that age."
            ],
            proTips: ["Sample the birds at the same time and day every week for accurate comparison.", "Catching birds at night is easier and causes less stress/injury."],
            mistakes: ["Weighing only the biggest-looking birds (this gives a false high average).", "Stressing the birds during day-time weighing, which stops them from eating for hours."],
            bestPractices: ["Target FCR for modern broilers should be between 1.5 and 1.7."],
            example: "Weekly weighing helped a farmer detect a hidden Gumboro infection 3 days before symptoms appeared, allowing for early treatment."
          },
          {
            title: "Batch Liquidation",
            simpleExplanation: "Catching and loading the birds into trucks for sale at the right weight.",
            detailedExplanation: "The final harvest, or 'Batch Liquidation,' is the most physically demanding phase and requires the highest level of coordination to prevent post-production quality loss. Broilers are typically harvested between Day 35 (1.8kg) and Day 42 (2.5kg) depending on the market segment. The catching process must be conducted in near-darkness or under 'blue/dim light' to prevent the birds from becoming panicked and flying into walls or each other. Panicking leads to 'bruising' and 'internal bleeding' (hematomas), which are the primary reasons for carcass rejection and price deductions by industrial buyers. Professional catching teams must hold birds by both legs to prevent 'dislocated wings' and 'breast blisters.' Loading into plastic transport crates should be standardized to 10-12 adult birds per crate to prevent 'smothering' deaths during the transit to the processing plant. A successful liquidation ensures that the maximum number of live birds reaches the buyer in 'A-Grade' condition, securing the full profit margin calculated at the beginning of the 45-day cycle.",
            materials: ["Plastic transport crates", "Catching team (4-6 people)", "Loading ramp"],
            instructions: [
              "Remove all feeders and drinkers 6 hours before catching.",
              "Dim the lights or use blue lights so the birds stay calm and don't fly around.",
              "Hold birds by both legs; never by the wings or neck.",
              "Do not overstuff the crates; 10-12 adult birds per crate is standard."
            ],
            proTips: ["Always harvest during the night or early dawn to minimize transport heat stress.", "Place some tarpaulin over the truck during transport to prevent strong wind-chill."],
            mistakes: ["Catching birds roughly, causing internal bleeding/bruising.", "Harvesting in the heat of the day (12pm to 4pm), leading to high transport mortality."],
            bestPractices: ["Wash and disinfect the transport crates before they leave the farm."],
            example: "Adopting a 'night-catching' strategy reduced bird bruises by 80% and saved 15 birds from dying during the transport to the market."
          }
        ]
      }
    ]
  },
  {
    id: "egg-production",
    name: "eggProductionTitle",
    category: "Poultry",
    tag: "tagGuide",
    icon: Bird,
    image: "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?auto=format&fit=crop&q=80&w=800",
    difficulty: "Intermediate",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    realWorldData: {
      cost: "₹ 2-5 Lakhs (Initial Shed Setup)",
      profit: "₹ 40,000 - 60,000 / month",
      duration: "Ongoing (72+ weeks lifecycle)",
      resources: ["Layer Birds (BV380 / Leghorn)", "Layer Feed", "Cages & Feeders", "Vaccines"]
    },
    farmerTips: { dos: ["Implement strict bio-security measures at entry points", "Provide 14-16 hours of daily light in the shed"], donts: ["Never skip the vaccination schedule", "Do not feed stale or fungus-affected feed"] },
    steps: [
      {
        id: 1, 
        title: "Housing & Lighting", 
        image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600", 
        description: "Setting up the ideal environment and lighting schedule for egg layers.",
        subSteps: [
          {
            title: "Battery Cage vs Deep Litter",
            simpleExplanation: "Choosing the right housing system to keep birds healthy and eggs clean.",
            detailedExplanation: "Commercial layer farming relies on two primary housing systems: Battery Cages and Deep Litter. The Battery Cage system is the global commercial preference because it provides superior biosecurity by separating the birds from their own droppings, which are the primary source of parasites like Coccidiosis. In a cage system, eggs roll out automatically onto a collection belt or tray, keeping them 100% clean and reducing breakages to below 1%. Deep Litter systems, where birds live on the floor, are more 'animal-friendly' but require intense floor management to prevent dampness and 'floor-eggs' (eggs laid in the dirt). For high-output commercial ventures, galvanized wire cages with nipple drinkers and automatic feeding troughs are the gold standard for efficiency, as they allow for higher bird density per square foot and make disease monitoring significantly easier. Choosing the right system is a balance between your initial capital investment and the long-term goal of high-quality, clean egg production for the premium retail market.",
            materials: ["Galvanized wire cages", "Automatic nipple drinkers", "Dropping trays", "Nesting boxes (for deep litter)"],
            instructions: [
              "Choose Battery Cages with a 15-degree floor slope for automatic egg rolling.",
              "Ensure each bird has 450 sq. cm of space inside the cage.",
              "In Deep Litter, use 1 nesting box for every 5 birds to prevent floor eggs.",
              "Install automatic nipple drinkers to ensure water stays 100% clean."
            ],
            proTips: ["Elevated cages reduce the risk of diseases like Coccidiosis and Worms.", "Paint the shed roof white to keep it cool during peak summer."],
            mistakes: ["Using floor-feeding in layer farms, which makes eggs extremely dirty and unsellable.", "Overcrowding the cages, leading to bird stress and pecking."],
            bestPractices: ["Orient the shed East-West to avoid direct sunlight inside."],
            example: "A farm in Namakkal switched to Battery Cages and reduced their broken egg percentage from 5% to 0.5%."
          },
          {
            title: "Light Stimulation Program",
            simpleExplanation: "Using precise artificial light to tell the bird's brain to start laying eggs.",
            detailedExplanation: "The reproductive cycle of a layer bird is controlled by its 'photoperiod'—the total number of hours of light it receives in a 24-hour cycle. Light stimulates the hypothalamus in the bird's brain, which in turn triggers the release of hormones (FSH and LH) necessary for follicle development and egg laying. From Week 18, when the birds reach Point-of-Lay (POL), a professional 'Light Stimulation Program' must be implemented. This involves gradually increasing the daily light duration from 12 hours to a stable 16 hours of combined natural and artificial light by Week 26. This increase mimics the transition into summer, signaling the bird's body to enter its peak production phase. Any sudden drop in light duration—even by 1 hour—can cause a 'silent moult' and a catastrophic drop in egg production that can take 3-4 weeks to recover. Using LED bulbs with a specific 20-Lux intensity at the bird's eye level ensures that the hormone levels stay optimized for a consistent 90% to 95% peak lay rate.",
            materials: ["LED bulbs (9 watts)", "Automatic light timer", "Reflectors"],
            instructions: [
              "Start with 12 hours of light and increase by 30 minutes every week from Week 18.",
              "Reach a maximum of 16 hours of light (natural + artificial) by Week 26.",
              "Ensure lights are placed uniformly across the shed to avoid dark corners.",
              "Use a digital timer to turn lights on at 5 AM and off after sunset."
            ],
            proTips: ["Light intensity should be about 20 Lux at the bird's eye level.", "Clean the bulbs weekly; dust reduces light output by 30%."],
            mistakes: ["Decreasing light duration during the production cycle (this will stop the birds from laying).", "Using very dim or flickering lights which stress the birds."],
            bestPractices: ["Always keep a backup generator for the lighting system."],
            example: "Installing an automatic light timer ensured the birds got exactly 16 hours of light, resulting in a 95% peak lay rate."
          }
        ]
      },
      {
        id: 2, 
        title: "Pullet Management", 
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600", 
        description: "Preparing young birds (pullets) to become high-yielding layers.",
        subSteps: [
          {
            title: "Point-of-Lay Transition",
            simpleExplanation: "Switching from the growing phase to the laying phase at 18 weeks.",
            detailedExplanation: "The 'Point-of-Lay' (POL) transition is the most stressful physical event in a layer bird's life. It involves the physical relocation from the adolescent 'grower shed' to the adult 'production cage' exactly between Week 16 and Week 18. During this short window, the bird's skeletal system is undergoing massive changes; she is shifting from bone growth to 'medullary bone' development, which serves as a calcium reservoir for the massive demand of daily egg-making. If the move is delayed beyond Week 20, the stress of moving can cause internal egg ruptures (peritonitis) if the birds have already started laying. A professional transition requires the administration of anti-stress electrolytes and a dietary shift to a 'Pre-lay Mash' which is enriched with 2.5% calcium. Weighing the birds during this transition is critical—they must hit a target weight of 1.4kg to 1.6kg (depending on the breed) to ensure they have the physical stamina to sustain a 72-week laying cycle without burning out prematurely.",
            materials: ["POL transport crates", "Stress-relief vitamins", "Pre-lay mash"],
            instructions: [
              "Transport pullets in the early morning to minimize stress.",
              "Provide electrolytes in the water for 48 hours after moving.",
              "Switch from 'Grower' feed to 'Pre-lay' feed which is higher in calcium.",
              "Weigh the birds weekly; they must hit 1.3kg to 1.5kg before the first egg."
            ],
            proTips: ["Handle birds gently during transfer to avoid internal injuries.", "Ensure birds find the water nipples immediately in their new home."],
            mistakes: ["Moving birds too late (after 20 weeks) when they have already started laying.", "Ignoring low body weight, leading to small eggs for the entire cycle."],
            bestPractices: ["Sort the pullets by weight and place similar-sized birds together."],
            example: "A farm in Hyderabad improved its uniformity by 90% by weighing birds every week during the pullet stage."
          },
          {
            title: "Beak Trimming",
            simpleExplanation: "Gently trimming the sharp tip of the beak to prevent birds from pecking each other.",
            detailedExplanation: "High-yielding commercial layer breeds can exhibit natural aggression, which manifests as feather-pecking and 'cannibalism'—specifically 'vent pecking.' Beak trimming, or debeaking, is a vital behavioral management strategy performed between 10 days and 14 weeks of age. By gently removing the sharp, needle-like tip of the upper beak, the birds are prevented from causing fatal injuries to their flock-mates. Beyond bird welfare, professional beak trimming is an economic necessity; it significantly reduces 'feed wastage' as it prevents the birds from 'flicking' or sorting through the mash with their beaks. The procedure must be done using an specialized electric debeaker with a red-hot blade to ensure immediate cauterization of the cut, preventing any bleeding or infection. Supplementing the birds with Vitamin K for 48 hours pre- and post-procedure is standard practice to promote blood clotting. Properly debeaked birds are calmer, show higher uniformity, and have a 15% better Feed Conversion Ratio because they consume their balanced ration more efficiently without selective picking.",
            materials: ["Electric debeaker", "Vitamin K supplement", "Expert operator"],
            instructions: [
              "Perform beak trimming at 10-14 days of age and again at 12-14 weeks if needed.",
              "Provide Vitamin K in water 2 days before and after trimming to prevent bleeding.",
              "Only trim the tip (one-third) of the upper beak.",
              "Ensure the blade is red-hot to cauterize the cut instantly."
            ],
            proTips: ["Add extra feed in the troughs for 2 days after trimming to avoid painful pecking at the bottom.", "Minimize noise and stress during the procedure."],
            mistakes: ["Trimming too deep, which prevents the bird from eating forever.", "Using a cold blade, which causes excessive bleeding."],
            bestPractices: ["Avoid debeaking during very hot weather or if the birds are sick."],
            example: "Professional beak trimming reduced mortality from 'Vent Pecking' to nearly 0% in a large flock."
          }
        ]
      },
      {
        id: 3, 
        title: "Feeding & Calcium", 
        image: "https://images.unsplash.com/photo-1582769923195-c6e60dc1d8bc?auto=format&fit=crop&q=80&w=600", 
        description: "Providing the specialized diet needed to build strong eggshells.",
        subSteps: [
          {
            title: "Layer Mash Formulation",
            simpleExplanation: "Feeding a precise mix of grains, minerals, and protein for maximum egg output.",
            detailedExplanation: "A modern commercial layer is a biological engineering marvel, requiring a hyper-precise nutrient balance to sustain a production rate of over 300 eggs per year. 'Layer Mash' is a coarse-textured diet specifically formulated with 17% to 18.5% crude protein and high levels of Metabolisable Energy (2850 kcal/kg). The mash must have a coarse 'grist' size rather than being a fine powder; coarse particles of maize and soya stay in the bird's digestive 'gizzard' for 5-7 hours, providing a steady, continuous release of amino acids into the bloodstream. This is vital because egg yolk is formed throughout the day, whereas the white and shell are formed during the night. The feed must also be fortified with a 'mineral premix' containing high levels of Manganese and Zinc to ensure the internal quality of the egg, specifically the strength of the yolk membrane. Any contamination of the feed with fungal toxins (mycotoxins) is lethal and can stop egg production in as little as 48 hours, making the use of high-quality 'Toxin Binders' and proper storage in dry, moisture-proof bins a non-negotiable requirement for farm biosecurity.",
            materials: ["Maize", "Soybean meal", "Mineral premix", "Limestone powder"],
            instructions: [
              "Provide 100-110 grams of feed per bird per day.",
              "Ensure the feed is fresh and free from mold (Fungal toxins kill layers fast).",
              "Check the 'Feed Conversion Ratio' (FCR): target is less than 2.0 per dozen eggs.",
              "Clean feeders daily to prevent stale food buildup at the bottom."
            ],
            proTips: ["Provide the main feed ration in the early morning and late afternoon.", "Add a 'toxin binder' to the feed if the maize is not 100% dry."],
            mistakes: ["Feeding low-protein grain alone, which drops egg production instantly.", "Allowing feed to get wet, leading to aflatoxin poisoning."],
            bestPractices: ["Conduct a lab test of your feed once a month to verify nutrient levels."],
            example: "Switching to a balanced mash increased egg production from 75% to 92% for a small-scale farm."
          },
          {
            title: "Calcium Supplementation",
            simpleExplanation: "Adding shell grit or limestone to ensure the eggs are hard and don't break.",
            detailedExplanation: "In the lifecycle of a high-yielding layer, calcium is the single most important mineral for both productivity and bird welfare. An average eggshell contains approximately 2 grams of pure calcium; if the bird's daily intake is insufficient, her body will automatically extract calcium from her own skeletal structure (medullary bone) to form the shell. This lead to a condition known as 'Cage Layer Fatigue,' where the bird becomes paralyzed and eventually dies. Professional 'Calcium Supplementation' involves providing coarse limestone grit or crushed oyster shells (2-4mm size) specifically during the late afternoon. Unlike fine calcium powder which is absorbed quickly and excreted, these coarse particles sit in the bird's gizzard and dissolve slowly throughout the night. This ensures a steady 'time-release' of calcium into the bloodstream exactly when the shell is being formed in the oviduct. Proper supplementation not only prevents bird mortality but also significantly reduces the percentage of cracked and broken eggs, which is the difference between a profitable farm and a loss-making one.",
            materials: ["Oyster shells", "Coarse limestone grit", "Drinking water calcium"],
            instructions: [
              "Add 5-8 grams of coarse shell grit per bird per day in the afternoon.",
              "Provide liquid calcium in the water during peak summer or if shells are thin.",
              "Ensure the calcium and phosphorus ratio in the feed is roughly 2:1.",
              "Monitor for 'soft-shelled eggs' which are a sign of calcium deficiency."
            ],
            proTips: ["Feeding coarse grit in the evening provides 'peak' calcium during the night when the shell is built.", "Sunlight exposure helps birds absorb calcium better via Vitamin D."],
            mistakes: ["Using only very fine limestone powder, which is absorbed too quickly and wasted.", "Ignoring thin shells, which lead to a loss of 30% of profits due to breakages."],
            bestPractices: ["Always have a bag of oyster shells ready for emergency supplementation."],
            example: "Adding coarse grit reduced the 'cracked egg' rate by 70% in a farm with aging birds."
          }
        ]
      },
      {
        id: 4, 
        title: "Egg Collection & Grading", 
        image: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?auto=format&fit=crop&q=80&w=600", 
        description: "Handling eggs with care from collection to the final sale.",
        subSteps: [
          {
            title: "Collection Frequency",
            simpleExplanation: "Picking up eggs multiple times a day to prevent them from getting broken or dirty.",
            detailedExplanation: "Egg collection is a high-precision logistical task that must be synchronized with the birds' natural laying cycle. Most commercial layers lay their eggs in the morning hours, between 7 AM and 11 AM. A professional collection protocol requires at least 3 to 4 rounds of collection per day to minimize the risk of 'egg-eating'—a destructive behavioral trait that develops when birds are exposed to broken eggs for too long. Frequent collection also prevents the eggs from being contaminated by manure or dust in the cage trays. During collection, eggs must be handled with extreme care to avoid 'hairline cracks' which are invisible to the naked eye but cause rapid spoilage. Using clean, plastic 30-count trays is the industry standard, as they can be easily disinfected between uses. Proper collection frequency ensures that the eggs remain in 'pristine' condition, preserving the natural 'bloom' (a protective protein coating) on the shell which acts as a barrier against bacterial penetration, ensuring a longer shelf-life for the end consumer.",
            materials: ["Plastic egg trays (30 count)", "Collection trolley", "Clean hands"],
            instructions: [
              "Collect eggs at 9 AM, 11 AM, 1 PM, and 4 PM.",
              "Place eggs point-side down in the trays for better freshness.",
              "Remove any cracked or 'leaking' eggs immediately to avoid mess.",
              "Avoid bumping trays against walls or other trays."
            ],
            proTips: ["Maintain a digital log of eggs collected daily to track flock health.", "Use different colored trays for different sized eggs during collection."],
            mistakes: ["Collecting only once a day, leading to pilling and breakage.", "Letting dirty eggs sit on the trays for days before cleaning."],
            bestPractices: ["Always wash hands before and after collection for personal hygiene."],
            example: "Frequent collection reduced egg-eating habits in a flock that was previously stressed."
          },
          {
            title: "Candling & Quality Storage",
            simpleExplanation: "Checking eggs for internal cracks and storing them in a cool place.",
            detailedExplanation: "In the final stage of the production chain, 'Candling' is the essential quality-assurance process that protects the farmer's reputation and ensures food safety. By holding each egg against a high-intensity LED light source in a darkened room, a farmer can see through the shell to identify 'hairline cracks,' 'blood spots,' or enlarged 'air cells'—all of which are reasons for rejection. Perfect eggs are then immediately moved to a climate-controlled storage room maintained at 10°C to 15°C with a relative humidity of 70%. This cool environment slow downs the natural thinning of the egg white and keeps the yolk centered, preserving the 'AA-Grade' quality required for premium hospitality and retail contracts. Storing eggs with the 'blunt end up' (where the air cell is located) is a critical technical detail; it prevents the air cell from rupturing and keeps the yolk away from the shell, significantly extending the shelf-life. Proper candling and cold-storage are what separate commercial-grade industrial eggs from common backyard produce, allowing for longer-distance transport and higher consumer trust.",
            materials: ["Egg candler (bright LED)", "Cool storage room", "Insulated boxes"],
            instructions: [
              "Candle every egg in a dark room to find hidden shell cracks.",
              "Discard eggs with large blood spots or yolk abnormalities.",
              "Store eggs with the blunt end up (air cell at the top).",
              "Keep the storage room well-ventilated and free from strong odors like onions."
            ],
            proTips: ["Eggs can stay fresh for 3-4 weeks if kept below 15°C.", "Do not wash eggs unless they are heavily soiled; water removes the natural protective layer (cuticle)."],
            mistakes: ["Storing eggs near chemical fertilizers or pesticides (shells are porous and absorb smells).", "Washing eggs under cold water, which sucks bacteria into the egg."],
            bestPractices: ["Rotate stock: Sell the oldest eggs first (FIFO - First In, First Out)."],
            example: "Candling saved a farmer from a bad reputation by removing invisible cracked eggs that would have broken during customer delivery."
          }
        ]
      }
    ]
  },
  {
    id: "dairy-farm-setup",
    name: "dairyFarmSetupTitle",
    category: "Dairy",
    tag: "tagNew",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800",
    difficulty: "Expert",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    realWorldData: {
      cost: "₹ 15-20 Lakhs (10 Cows)",
      profit: "₹ 50,000 - 80,000 / month",
      duration: "Ongoing",
      resources: ["Holstein Friesian Cows", "Loose Housing Shed", "Chaff Cutter", "Milking Machine"]
    },
    farmerTips: { dos: ["Ensure 24/7 unlimited access to fresh water", "Grow your own green fodder"], donts: ["Tie the cows by their necks constantly", "Feed moldy silage"] },
    steps: [
      {
        id: 1,
        title: "Modern Loose Housing",
        image: "https://images.unsplash.com/photo-1596733430284-f74370603092?auto=format&fit=crop&q=80&w=600",
        description: "Designing a stress-free environment for maximum cow comfort.",
        subSteps: [
          {
            title: "Free-Stall Architecture",
            simpleExplanation: "Ditching the rope. Let cows walk around freely so they produce more milk.",
            detailedExplanation: "The traditional method of tethering dairy cows to a peg for 24 hours a day is the primary cause of chronic stress, hoof lameness, and reduced milk yield in high-yielding breeds like Holstein Friesians. Modern 'Loose Housing' or 'Free-Stall' architecture is based on the science of animal behavior, providing the cow with 24/7 freedom of movement between three functional zones: the feeding alley, the walking alley, and the resting stalls. By allowing a cow to express her natural instinct to walk and lie down whenever she chooses, her internal cortisol levels drop significantly, which directly correlates to a 10% to 15% increase in daily milk production. The resting stalls must be bedded with deep river sand or organic compost, which provides a 'cushion effect' that protects the cow's knees and hocks from bruising. A cow that is comfortable and unstressed spends 12-14 hours a day lying down and ruminating (chewing the cud), which is the biochemical foundation of milk synthesis and long-term herd health.",
            materials: ["Galvanized steel stall dividers", "River sand (for bedding)", "Rubber mats for walking alleys", "High-volume roof fans"],
            instructions: [
              "Orient the long axis of the shed North-South to block direct morning/evening sun.",
              "Construct a raised central feeding manger with a smooth epoxy finish so cow tongues don't scrape.",
              "Install individual stall dividers (metal loops) separated by 4 feet.",
              "Fill the resting stalls with exactly 6 inches of washed river sand (best inorganic bedding).",
              "Leave a 10-foot wide walking alley covered in grooved rubber mats behind the stalls."
            ],
            proTips: ["Sand bedding is anti-bacterial because it drains moisture perfectly, drastically reducing mastitis.", "Ensure the roof height at the center is a minimum of 15 feet to allow hot air to escape completely."],
            mistakes: ["Using hard concrete in the resting stalls, causing swollen knees and permanent hock lesions.", "Making the walking alleys too narrow, which leads to dominant cows bullying weaker ones during heat."],
            bestPractices: ["Rake the sand beds twice a day to remove manure and keep the stall perfectly dry."],
            example: "Converting from tie-stalls to a sand-bed free-stall layout eliminated clinical mastitis entirely for a 50-cow herd in Punjab, saving ₹2 Lakhs in veterinary bills annually."
          },
          {
            title: "Climate Control Ventilation",
            simpleExplanation: "Keeping the shed cool with fans and misting systems so cows don't stop eating in the heat.",
            detailedExplanation: "High-yield dairy breeds like Holstein Friesians and Jerseys are genetically optimized for milk production in cool temperate climates, making them extremely vulnerable to 'Heat Stress' in tropical regions. When the ambient temperature rises above 25°C or the humidity exceeds 70%, a cow's internal core temperature begins to climb, triggering a metabolic defensive response. She will reduce her dry matter intake (eating less) to lower the 'heat of fermentation' in her rumen, which leads to an immediate 20% to 30% crash in milk yield. Professional climate control requires the installation of high-velocity 36-inch fans and high-pressure misting nozzles. The fans create a 'wind-chill' effect across the cow's back, while the misters provide fine water particles that evaporate directly off the cow's skin, drawing out internal body heat through evaporative cooling. This system must be automated using a Temperature Humidity Index (THI) sensor to ensure that the fans are running exactly when the cows need them. Maintaining a stable, cool micro-climate in the shed is the single most important factor for sustaining high milk production during the grueling summer months.",
            materials: ["36-inch high-velocity fans", "Pressure misting nozzles", "Control sensors", "Open-side ventilation mesh"],
            instructions: [
              "Install fans every 20 feet along the feeding alley and resting stalls.",
              "Tilt the fans at a 30-degree angle to point directly at the cows' backs.",
              "Only turn on the misters when humidity is below 70% to avoid making the shed soggy.",
              "Ensure the shed sides are completely open (net only) for free airflow."
            ],
            proTips: ["A cow's natural 'cooling window' is her lungs. High airflow helps her breathe out the heat.", "During the night, keep the fans on to help cows recover from daytime heat."],
            mistakes: ["Closing the shed walls with bricks, which traps ammonia and heat like an oven.", "Pointing fans too high, where the air never hits the animal."],
            bestPractices: ["Use a digital THI (Temperature Humidity Index) sensor to automate fan switching."],
            example: "Installing high-velocity fans reduced the summer 'milk crash' from 5 liters per cow to just 0.5 liters in a farm in Rajasthan."
          }
        ]
      },
      {
        id: 2,
        title: "Fodder & TMR Nutrition",
        image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600",
        description: "Mixing customized scientifically calculated rations for high-yield animals.",
        subSteps: [
          {
            title: "Total Mixed Ration (TMR)",
            simpleExplanation: "Blending dry grass, green grass, and grains perfectly so cows eating every bite get balanced nutrition.",
            detailedExplanation: "Cows are naturally 'selective' eaters; if given a choice, they will pick out the tasty, calorie-dense grains and leave the essential dry roughage (fiber) behind. This behavior leads to a chemical imbalance in the rumen called 'Acidosis,' which kills beneficial bacteria and causes a rapid drop in both milk fat percentage and the animal's overall health. 'Total Mixed Ration' (TMR) is the nutritional solution to this problem. It involves the mechanical blending of chopped green fodder, dry straw, and concentrated grain pellets into a single, uniform, moist mixture that is impossible for the cow to sort or separate. By ensuring that every single bite taken is nutritionally identical, the farmer stabilizes the rumen pH, allowing for maximum bacterial fermentation and nutrient absorption. A perfect TMR should have a moisture content of exactly 50%—damp enough to hold together but dry enough to stay fresh. This scientific feeding method ensures the herd receives 100% of their calculated energy and mineral requirements, which is the baseline for achieving 30+ liters of milk per day in commercial operations.",
            materials: ["TMR Mixing Wagon / Chaff Cutter", "Corn Silage", "Dry Wheat Straw", "Concentrate pelleted feed"],
            instructions: [
              "Harvest green fodder (like Super Napier) and chop it mechanically to 1-2 inch lengths.",
              "Weigh out dry straw: roughly 1.5kg per 100kg of cow body weight.",
              "Add the custom concentrate mix based on milk yield (roughly 1kg concentrate per 2.5 Liters of milk produced).",
              "Combine all ingredients in the mixing wagon, adding water slowly until the mix feels like a damp sponge.",
              "Distribute evenly along the feed manger twice a day, pushing it closer to the cows every 2 hours."
            ],
            proTips: ["The 'Squeeze Test': Grab a handful of TMR and squeeze tightly. If water drips out, it's too wet. If it crumbles instantly, it's too dry. It should hold shape.", "Always feed cows right after milking when their appetite is highest."],
            mistakes: ["Feeding pure concentrate first thing in the morning, creating an instant lethal acid spike in the cow's stomach.", "Chopping straw too fine (under 0.5 inches) completely destroying the 'scratch factor' needed for cow digestion/cud-chewing."],
            bestPractices: ["Ensure 5-10% 'refusals' (leftover feed) the next morning to guarantee the cows were fed to their absolute maximum limit."],
            example: "Implementing TMR raised a farm's average milk fat content from 3.2% to 4.1% in just two weeks because rumen digestion was finally stabilized."
          },
          {
            title: "Silage Pit Management",
            simpleExplanation: "Storing green fodder in an airtight pit to preserve it for the dry summer months.",
            detailedExplanation: "Silage is essentially 'pickled' green fodder, preserved through a natural anaerobic fermentation process that converts plant sugars into lactic acid. In large-scale dairy farming, silage is the key to 'fodder security,' allowing farmers to harvest high-quality maize or Napier grass during the peak growing season and store it for use during the dry summer when green grass is unavailable. The process requires packing the chopped fodder into an airtight pit or bag and compacting it with heavy machinery to remove all oxygen. Once sealed, a specific group of bacteria (Lactobacillus) thrives, lowering the pH of the feed to around 4.0, which prevents spoilage and mold growth for up to two years. Feeding high-quality silage provides the herd with a consistent source of energy and protein every day of the year, eliminating the seasonal 'milk crashes' common in traditional farming. Managing the 'Silage Face'—the exposed area of the pit—is a critical daily task; removing a clean 6-inch vertical layer every morning prevents the remaining feed from re-heating and losing its nutritional value upon exposure to the air.",
            materials: ["Silage bags / Bunker pit", "Tractor for compaction", "Silage inoculants", "Plastic UV-resistant tarp"],
            instructions: [
              "Harvest maize when the grain's 'milk line' is at the 50% mark.",
              "Chop the maize plants into 1cm pieces including the cobs.",
              "Pack the material into the pit or bag in layers, driving a tractor over it to squeeze out ALL air.",
              "Seal the pit with heavy plastic and weigh it down with old tires or sandbags.",
              "Wait minimum 45 days for fermentation to complete before opening."
            ],
            proTips: ["If the silage smells like vinegar or tobacco, it's great. If it smells like rotten eggs, it's dangerous.", "Once opened, remove a 6-inch vertical 'face' every day to prevent the rest from spoilers."],
            mistakes: ["Leaving air pockets in the pit (this allows white mold to grow which is toxic to cows).", "Harvesting fodder that is too wet, leading to foul-smelling silage that cows won't eat."],
            bestPractices: ["Always build the silage pit on high ground so rainwater doesn't enter the bottom."],
            example: "A farm in Maharashtra survived a 6-month drought without losing any milk production because they had 200 tons of corn silage stored."
          }
        ]
      },
      {
        id: 3,
        title: "Heat Detection & Breeding",
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600",
        description: "Perfecting the crucial 21-day breeding cycle to ensure one calf per year.",
        subSteps: [
          {
            title: "Artificial Insemination (AI) Timing",
            simpleExplanation: "Spotting when a cow is ready to breed and calling the vet at the exact right hour.",
            detailedExplanation: "The economic survival of a dairy farm depends on the 'Calving Interval'—the goal of one calf per cow every 12 to 13 months. Success requires the high-precision detection of 'Estrus' (heat), a biological window that lasts a mere 12 to 18 hours every 21 days. Missing a single heat cycle delays the next lactation by three weeks, resulting in a significant financial loss in potential milk revenue. Professional heat detection involves the 'AM-PM Rule' and the observation of 'Standing Heat,' where the cow stands perfectly still while being mounted by other herd members. This physical behavior is the most reliable indicator that she is ready for Artificial Insemination (AI). Advanced farmers use 'Heat-Detection Patches' or tail-chalk that rubs off when mounting occurs, providing a visual confirmation even when no one is watching. Inseminating at exactly 8 to 12 hours after the first sign of standing heat ensures the highest conception rates. By using 'Sex-Sorted Semen' from high-pedigree proven bulls, farmers can ensure a 90% chance of a female calf, allowing for rapid internal herd growth and the replacement of older, less-productive animals without buying expensive outside stock.",
            materials: ["Heat detection patches/chalk", "Sex-sorted semen straws (frozen)", "Liquid nitrogen AI flask", "AI guns"],
            instructions: [
              "Observe the herd intensely for 30 minutes twice a day—specifically away from feeding times.",
              "Apply brightly colored chalk or 'scratch-off' patches to the tail-head of all open cows.",
              "If the chalk is rubbed off or the cow stands completely still while being mounted by another cow, she is in true 'standing heat'.",
              "Contact the AI technician immediately to prepare the sex-sorted semen (ensuring 90% chance of a female calf).",
              "Rest the cow quietly in an isolation pen for 2 hours post-AI to maximize conception rates."
            ],
            proTips: ["Keep absolute detailed records of every heat cycle on a calendar. Even if you don't breed her, write down exactly when she comes into heat.", "Heat signs vanish quickly on hot days. Nighttime observation reveals 70% of heats."],
            mistakes: ["Inseminating entirely based on mucus discharge rather than 'standing to be mounted'.", "Using cheap, unproven semen instead of high-pedigree proven bull semen."],
            bestPractices: ["Always check the internal temperature of the frozen bull semen straw before insemination."],
            example: "Using 'Sexed Semen' allowed a new farmer to grow their herd from 10 cows to 18 female heifers in just two years without buying more animals."
          }
        ]
      },
      {
        id: 4,
        title: "Milking & Hygiene",
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600",
        description: "Executing precise milking routines to ensure 100% bacteria-free milk.",
        subSteps: [
          {
            title: "Teat Dipping & Sanitization",
            simpleExplanation: "Cleaning the cow's teats with a special liquid to stop germs from entering the udder.",
            detailedExplanation: "The udder is the most sensitive and economically vital organ of a dairy cow, but it is also highly prone to Mastitis—a painful bacterial infection that can permanently destroy milk-producing tissue. Professional hygiene requires a strict 'Pre-Dip' and 'Post-Dip' procedure for every milking session. Pre-dipping involves immersion of the teats in a fast-acting sanitizer (like 0.5% Iodine) which kills bacteria present on the skin surface before the milking machine is attached. Once milking is complete, the 'Post-Dip' is even more critical; because the teat canal remains physically open for up to 30 minutes after milking, it is an open gateway for environmental pathogens found in mud or manure. The Post-Dip (usually 1% Iodine with skin conditioners) forms a viscous, protective film that seals the teat canal while it is still open, acting as a chemical barrier against infection. Supplementing this with a 'Strip Cup' test—where the first two streams of milk are checked for abnormalities—allows for the detection of clinical mastitis days before it becomes a visible emergency, ensuring the herd remains healthy and the milk remains Grade-A quality.",
            materials: ["Iodine-based teat dip", "Non-return dip cups", "Disposable paper towels", "Strip cup"],
            instructions: [
              "Clean each teat with a dry disposable paper towel to remove mud.",
              "Dip each teat in the antiseptic dip cup and wait for 30 seconds.",
              "Wipe the dip off with a clean towel (one towel per cow).",
              "Squeeze the first 2 strips of milk into a 'Strip Cup' to check for any flakes or blood (early mastitis check).",
              "After milking is finished, dip the teats again in 'Post-Dip' and don't wipe it off."
            ],
            proTips: ["Ensure cows stand up for at least 30 minutes after milking by providing fresh TMR at the manger.", "The 'Post-Dip' forms a protective film that is the #1 defense against udder disease."],
            mistakes: ["Using a common wet cloth for all cows, which spreads infection from a sick cow to the entire herd.", "Washing the whole udder with a hose, which causes water to drip bacteria into the milk cup."],
            bestPractices: ["Always milk the known 'sick' cows last to avoid contaminating the equipment."],
            example: "Strict teat-dipping protocols reduced the Somatic Cell Count (bacteria level) of a farm's milk so significantly that they received a 'Quality Bonus' of ₹2 extra per liter from the dairy company."
          },
          {
            title: "Machine Milking Maintenance",
            simpleExplanation: "Taking care of the milking machine so it doesn't hurt the cow's teats.",
            detailedExplanation: "A modern milking machine is a sophisticated piece of equipment designed to mimic the natural suckling rhythm of a calf. However, its efficiency and the safety of the cow's udder depend entirely on the precision of the vacuum pressure and the condition of the rubber 'liners' that touch the teats. If the vacuum pressure fluctuates or is set too high (above 42 kPa), it causes 'Teat End Hyperkeratosis'—a painful hardening of the teat tip that makes the cow refuse to be milked and increases infection rates. The internal rubber liners are the only part in direct contact with the animal; they must be replaced every 2,500 milkings or every six months, as they lose their elasticity and develop microscopic cracks that harbor lethal bacteria. Regular maintenance also involves a three-step cleaning cycle: an initial lukewarm rinse, a hot alkaline wash (70°C) to dissolve milk fat, and a weekly acid wash to remove 'milk stone' (calcium buildup) from the internal pipes. A perfectly maintained machine ensures that the milking process is fast, stress-free for the cow, and 100% sanitary for the final consumer.",
            materials: ["Vacuum gauge", "Replacement rubber liners", "Alkaline/Acid detergent", "Pulsator checking tool"],
            instructions: [
              "Check the vacuum gauge daily; it should be steady between 40-42 kPa for cows.",
              "Wash the entire machine after every milking using hot water (70°C) and an alkaline detergent.",
              "Run an 'Acid Wash' once a week to remove 'Milk Stone' (calcium buildup) inside the pipes.",
              "Replace the rubber liners every 6 months without exception.",
              "Listen to the 'Pulsator' rhythm; it should be a steady rhythmic 'tick-tock' sound."
            ],
            proTips: ["If the machine 'slips' or squeaks during milking, the liner is worn out or the vacuum is too low.", "Check the milk filter after every batch; if you see slime or grit, your cleaning routine is failing."],
            mistakes: ["Using cold water for cleaning, which doesn't dissolve milk fat, leading to huge bacterial growth.", "Leaving the machine attached after the cow is empty (over-milking), which causes internal udder tissue damage."],
            bestPractices: ["Have a technician calibrate the vacuum system twice a year."],
            example: "Regularly changing liners every 6 months prevented a 'hidden' mastitis outbreak that would have cost a 20-cow farm over ₹50,000 in lost milk."
          }
        ]
      }
    ]
  },
  {
    id: "milk-production",
    name: "milkProductionTitle",
    category: "Dairy",
    tag: "tagGuide",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=800",
    difficulty: "Beginner",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    realWorldData: {
      cost: "₹ 2-3 Lakhs (Small Scale)",
      profit: "₹ 15,000 - 25,000 / month",
      duration: "Ongoing",
      resources: ["1-2 High Yield Cows", "Clean Water Source", "Feed Troughs", "Milking Buckets"]
    },
    farmerTips: { dos: ["Milk at exactly the same time everyday", "Feed cows immediately after milking"], donts: ["Change feed abruptly", "Allow strangers into the milking shed"] },
    steps: [
      {
        id: 1, 
        title: "Clean Milk Production", 
        image: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?auto=format&fit=crop&q=80&w=600", 
        description: "Executing strict sanitary milking procedures to extend shelf life.",
        subSteps: [
          {
            title: "Sanitary Milking Protocol",
            simpleExplanation: "Washing hands and udders deeply so milk stays fresh and doesn't spoil quickly.",
            detailedExplanation: "In small-scale dairy operations, 'Clean Milk Production' is the most effective way to ensure a high market price and a long shelf-life for the product. While milk is naturally sterile inside a healthy udder, it is instantly exposed to bacterial contamination the moment it exits. A professional sanitary protocol is designed to eliminate every 'contamination point,' beginning with the milker's personal hygiene and ending with the design of the collection vessel. High bacterial counts (measured as TPC or SCC) are caused by dust in the air, dirty hands, and wide-mouthed buckets that catch falling manure or hair. By utilizing narrow-mouthed stainless-steel 'dome' buckets, farmers can reduce the surface area exposed to the air by 70%, significantly lowering the risk of contamination. Furthermore, the timing of the milking process is critical; once the cow's brain releases the hormone 'Oxytocin' (the milk let-down trigger), the milker has a maximum of 5 to 7 minutes to harvest the milk before the hormone level drops and the cow 'closes' her udder. Efficiency and sanitation together ensure that the raw milk remains fresh and free from off-flavors for the longest possible duration.",
            materials: ["Stainless Steel Dome Buckets (Narrow mouth)", "Warm water & Potassium Permanganate", "Muslin cloth filter", "Milker's apron"],
            instructions: [
              "Sweep the shed floors completely 30 minutes prior to milking to let dust settle.",
              "Wash the milker's hands up to the elbows with antibacterial soap.",
              "Wash the cow's udder with lukewarm water containing a pinch of Potassium Permanganate.",
              "Wipe the udder entirely dry using a clean cloth.",
              "Milk rapidly and continuously to take advantage of the 5-minute Oxytocin hormone let-down.",
              "Filter the harvested milk instantly through a double-layered sterile muslin cloth."
            ],
            proTips: ["Milk using the 'Full Hand' method (squeezing) rather than the 'Knuckling' or pulling method, which permanently tears the teat's internal tissues.", "Always milk healthy cows first, and sick/mastitis cows last to prevent cross-contamination."],
            mistakes: ["Dipping fingers into the fresh milk to lubricate the cow's teats during milking.", "Using cheap, scratched plastic buckets which harbor invisible bacteria in the microscopic grooves."],
            bestPractices: ["Boil the muslin filtering cloth in water after every single milking session."],
            example: "A small cooperative increased their village milk-grade bonus by simply switching every farmer from plastic buckets to seamless stainless-steel domes."
          },
          {
            title: "Milk Cooling & Storage",
            simpleExplanation: "Cooling the milk down to 4°C immediately to stop bacteria from growing.",
            detailedExplanation: "Fresh milk enters the bucket at the cow's internal body temperature of 37°C—the absolute perfect environment for rapid bacterial multiplication. At this temperature, a single bacterium can double every 20 minutes, leading to milk spoilage in less than four hours. The only way to stop this 'bacterial explosion' is through immediate cooling to 4°C (39°F) or below. Cooling acts as a 'biological pause button,' forcing the bacteria into a dormant state and preserving the nutritional integrity of the milk. For small-scale farmers, this is best achieved using an 'Ice-Bath' cooling method, where the milk cans are submerged in a tank of circulating ice-water. It is a scientific requirement that the milk temperature must drop below 4°C within 120 minutes of the final milking stroke. Using an electronic stirrer during the cooling process is highly recommended, as it prevents 'temperature pockets' and ensures that the entire batch is chilled uniformly. Properly cooled milk can remain fresh for up to 48 hours without any loss in quality, giving the farmer the flexibility to reach more distant and profitable urban markets.",
            materials: ["Ice-lined cooling tank", "Digital thermometer", "Stainless steel milk cans", "Cooling stirrers"],
            instructions: [
              "Transfer milk to stainless steel cans immediately after filtering.",
              "Place the cans in a tank filled with ice-water (Ice-bath cooling).",
              "Gently stir the milk with a sterile stirrer to ensure even cooling.",
              "Monitor the temperature: target is 4°C within 120 minutes.",
              "Keep the cans tightly sealed to prevent the milk from absorbing smells (like onions or fuel)."
            ],
            proTips: ["Stirring the milk during cooling reduces the cooling time by 50%.", "If you don't have ice, keep the cans in a constant flow of cold well-water."],
            mistakes: ["Mixing warm evening milk with cold morning milk (this warms up the cold milk and spoils the whole batch).", "Using copper or brass containers; they react with milk and make it taste metallic."],
            bestPractices: ["Sanitize all cooling equipment with hot water and detergent after every use."],
            example: "A group of farmers in Karnataka reduced their milk rejection rate from 12% to 0% by implementing a shared solar-powered milk cooler."
          }
        ]
      },
      {
        id: 2, 
        title: "Calf Rearing", 
        image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600", 
        description: "Ensuring survival and explosive growth of the newborn replacement herd.",
        subSteps: [
          {
            title: "Colostrum & Navel Care",
            simpleExplanation: "Feeding the absolutely vital first milk and stopping infections at the belly-button.",
            detailedExplanation: "A newborn calf is born with an 'open' immune system, meaning it has zero internal antibodies to fight off environmental pathogens. Its first and only line of defense is 'Colostrum'—the thick, yellowish first milk produced by the mother cow specifically for the first 24 hours. Colostrum is packed with Immunoglobulins (IgG) which the calf's stomach can only absorb through special 'open' pores that begin to close exactly 6 hours after birth. If the calf does not receive high-quality colostrum (specifically 4 liters within the first 6 hours), it will suffer from 'Failure of Passive Transfer' (FPT), leading to a 90% death rate from diarrhea (scours) or pneumonia. Alongside internal nutrition, external 'Navel Care' is the other critical survival step. The wet umbilical cord is effectively an open tube that leads directly into the calf's bloodstream; if not sanitized immediately with a deep soak in 7% Tincture of Iodine, bacteria will enter and cause 'Joint Ill' or fatal liver infections. These first few hours of life are the most high-stakes moments for the future of the farm's replacement herd.",
            materials: ["Feeding bottles with rubber nipples", "7% Tincture of Iodine", "Calf starter pellets", "Clean straw bedding"],
            instructions: [
              "Clear the mucus from the newborn calf's nostrils immediately after birth.",
              "Dip the entire umbilical cord stub into a small cup filled with 7% Tincture of Iodine.",
              "Milk the cow within 1 hour of birth and feed the calf 10% of its body weight in Colostrum.",
              "Keep the calf isolated in an absolutely dry, heavily-strawed pen away from older cows.",
              "Introduce premium 'Calf Starter' grain pellets and fresh water on Day 4 to jumpstart rumen development."
            ],
            proTips: ["Never force colostrum down a calf's throat; if it won't suckle, use an esophageal tube feeder to bypass the windpipe.", "Store extra colostrum from older cows in a freezer—it lasts a year and saves calves whose mothers die or produce poor colostrum."],
            mistakes: ["Tying the umbilical cord tightly with a dirty thread, causing tetanus.", "Feeding colostrum 2 days late and expecting it to provide immunity. It won't."],
            bestPractices: ["Weigh calves weekly; aim for a minimum of 500-700 grams of daily weight gain."],
            example: "Ensuring every calf receives 4 Liters of colostrum within the first 6 hours slashed one farmer's calf mortality from 30% to zero."
          },
          {
            title: "Milk Replacer vs Fresh Milk",
            simpleExplanation: "Deciding whether to feed the calf expensive fresh milk or a high-quality powder mix.",
            detailedExplanation: "Raising a replacement heifer is a long-term investment, and the 'Pre-Weaning' phase (the first 60 days) is the most expensive part. While fresh cow's milk is the natural food source, feeding it to calves represents a major 'opportunity cost' as it could otherwise be sold for profit. High-quality 'Milk Replacers' are powdered alternatives that can be 30% to 40% more cost-effective while providing a more consistent profile of vitamins and minerals. However, technical precision is paramount; the powder must be formulated with 'milk-based proteins' (whey/casein) rather than soy protein, which a young calf's stomach cannot digest. If the mixing temperature is too low (below 40°C), the powder won't dissolve, leading to 'Nutritional Scours' (indigestion-induced diarrhea). Conversely, if the temperature is too high, it destroys the sensitive proteins. The goal of any modern calf-rearing program is to transition the animal onto solid 'Calf Starter' pellets as quickly as possible—usually by Day 4—which stimulates the development of the 'Rumen' (the adult stomach). A successful weaning at 8-10 weeks creates a strong, healthy animal that is ready to become a high-yielding milking cow in just 24 months.",
            materials: ["Calf milk replacer powder", "Digital weighing scale", "Clean warm water (40°C)", "Whisk for mixing"],
            instructions: [
              "Mix the milk replacer powder at exactly the ratio on the bag (usually 125g per liter).",
              "Ensuring the water temperature is exactly 40-42°C for perfect powder dissolution.",
              "Feed the calf twice a day at the same time (e.g., 6 AM and 6 PM).",
              "Slowly reduce the milk volume as the calf starts eating more than 1kg of solid pellets per day.",
              "Wean the calf (stop milk entirely) at 8-10 weeks of age."
            ],
            proTips: ["Clean the feeding bottles with hot water and soap every single time; leftover milk rot kills calves.", "Always provide free-choice clean water next to the milk; calves need water to digest the dry pellets."],
            mistakes: ["Feeding cold milk (causes indigestion).", "Abruptly changing the milk brand, which causes severe diarrhea."],
            bestPractices: ["Always measure the powder by weight, never by 'scoops' as scoops are inaccurate."],
            example: "Switching to milk replacer allowed a farmer to sell an extra 8 liters of fresh milk per day, increasing their monthly profit by ₹12,000."
          }
        ]
      }
    ]
  },
  {
    id: "goat-farming",
    name: "goatFarmingTitle",
    category: "Livestock",
    tag: "tagNew",
    icon: Sprout,
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=800",
    difficulty: "Beginner",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    realWorldData: {
      cost: "₹ 50,000 - 1 Lakh (20 Does, 1 Buck)",
      profit: "₹ 1 - 1.5 Lakhs / year",
      duration: "10-12 Months per batch",
      resources: ["Goats (Boer / Sirohi / Beetal)", "Elevated Slatted Shed", "Dry Fodder", "De-worming kits"]
    },
    farmerTips: { dos: ["Keep the shed perfectly dry 24/7", "Vaccinate for PPR and ET annually"], donts: ["Graze goats on wet dew-covered grass", "Mate brothers with sisters"] },
    steps: [
      {
        id: 1, 
        title: "Shed & Housing", 
        image: "https://images.unsplash.com/photo-1596733430284-f74370603092?auto=format&fit=crop&q=80&w=600", 
        description: "Building wooden or plastic raised floors to eliminate goat pneumonia.",
        subSteps: [
          {
            title: "Machaan System Architecture",
            simpleExplanation: "Putting goats on a raised wooden deck so their poop falls through the cracks, keeping them dry.",
            detailedExplanation: "Goats are physiologically highly sensitive to environmental moisture and rising ammonia levels from their own waste. In traditional floor-based farming, the combination of wet urine and manure leads to a 30% mortality rate due to respiratory pneumonia and contagious foot rot (bacterial infection of the hoof). The 'Machaan' or Elevated Slatted Floor system is the modern engineering solution to this problem. By constructing a wooden or plastic deck 3-to-4 feet above the ground, gravity instantly removes 100% of the solid and liquid waste, keeping the goats' living area perfectly dry and odor-free. The slats must be precisely spaced at 1.5cm to allow pellets to pass through while preventing the tiny hooves of newborn kids from getting trapped and broken. This elevated design also provides superior 'cross-ventilation,' allowing the prevailing wind to carry away the heat and gasses that would otherwise build up at the ground level. A professional Machaan shed not only eliminates the need for daily floor washing but also creates a clean, parasite-free environment that is essential for the high-density stall-feeding of premium meat breeds like Boer and Beetal.",
            materials: ["Hardwood slats", "Concrete support pillars", "Corrugated roofing", "Outer mesh wire"],
            instructions: [
              "Construct support pillars keeping the floor 3-4 feet off the ground.",
              "Install wooden slats with exactly a 1.5cm gap between them.",
              "Slope the ground underneath for easy manure collection.",
              "Build a rain-proof roof with deep overhangs.",
              "Attach V-shaped feeding mangers on the outside so goats poke their heads out."
            ],
            proTips: ["A 1.5cm gap is perfect; any wider and kids' hooves will get trapped.", "Sprinkle lime powder below the shed weekly to kill flies and smells."],
            mistakes: ["Using slippery flooring where goats slip and break legs.", "Creating an airtight shed; goats need massive ventilation."],
            bestPractices: ["Build the shed facing East-West for natural sunlight and breeze."],
            example: "A farm with 15% pneumonia mortality saw it drop to 0% after switching to an elevated floor."
          },
          {
            title: "Fencing & Predator Control",
            simpleExplanation: "Building a strong boundary to keep goats in and stray dogs out.",
            detailedExplanation: "In many regions, the greatest threat to a goat farm's profitability is not disease, but predation from stray dogs, jackals, or leopards. Goats are defenseless prey animals, and a single stray dog can kill half a dozen goats in a few minutes of panic. A professional predator-protection system requires a double-barrier fence design. The primary outer boundary must be a 6-foot heavy-duty G.I. chain-link fence, which is buried at least 1 foot into a concrete 'kick-wall' at the base to prevent predators from digging underneath. The top of the fence should be reinforced with three strands of high-tensile barbed wire or a solar-powered electric offset wire that provides a non-lethal but deterrent shock. The internal shed must have a reinforced, lockable steel gate, as goats are highly intelligent and can often manipulate simple latches or slide-bolts with their mouths. By maintaining a 3-foot 'clear zone' (free from bushes or trees) around the entire perimeter, farmers can eliminate hiding spots for predators and ensure a clear line of sight for security monitoring during the night.",
            materials: ["G.I. Chain link mesh", "Stone/C-pillars", "Barbed wire", "Binding wire"],
            instructions: [
              "Dig 2-foot deep holes for pillars every 8 feet.",
              "Install the chain-link mesh and pull it tight using a stretcher.",
              "Run two strands of barbed wire across the top (6-inch gap).",
              "Bury the bottom edge of the mesh in a concrete 'kick-wall' at the base.",
              "Check for holes weekly; goats are experts at finding gaps to escape."
            ],
            proTips: ["Use 'Solar Fencing' (mild shock) for large pastures to effectively deter predators.", "Keep a 3-foot clear zone outside the fence (no bushes) to spot approaching animals."],
            mistakes: ["Using cheap plastic mesh that goats can chew through in days.", "Leaving the gate loose; goats can unlock simple latches with their mouths."],
            bestPractices: ["Plant thorny bushes like 'Cactus' or 'Ziziphus' along the outer fence as a natural buffer."],
            example: "A farm in Odisha stopped all goat losses (previously 4 per month) by adding a simple 1-foot concrete base to their chain-link fence."
          }
        ]
      },
      {
        id: 2, 
        title: "Feeding & Nutrition", 
        image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600", 
        description: "Optimizing stall-feeding combinations for maximum daily weight gain.",
        subSteps: [
          {
            title: "Stall-Fed Strategy",
            simpleExplanation: "Bringing cut grass and grains directly to the goats instead of letting them wander.",
            detailedExplanation: "Stall-feeding, also known as 'Zero Grazing,' is the core strategy for commercial goat farming where the objective is rapid weight gain for the meat market. Unlike free-range grazing, where goats burn 60% of their energy just walking in search of food, stall-fed goats remain in a controlled environment where high-quality nutrition is delivered directly to them. Goats are 'browsers' by nature, preferring tree leaves and shrubs over ground grass. A professional stall-feeding diet is scientifically balanced using the 60:30:10 rule: 60% green fodder (rich in protein like Moringa or Subabul), 30% dry roughage (for rumen health like Gram husk or pigeon pea straw), and 10% grain concentrates (maize, soya, and minerals for energy). To prevent 'feed sorting' and waste, all green fodder must be mechanically chopped into 1-inch lengths. Providing this diverse and energy-dense diet in three timed feedings per day ensures that the goats achieve their maximum genetic growth potential—reaching a market weight of 25-30kg in just 8-10 months, nearly twice as fast as traditional grazing methods.",
            materials: ["Chaff cutter", "Subabul/Napier grass", "Maize/Soya concentrate", "Mineral licks"],
            instructions: [
              "Chop green fodder into 1-inch pieces using a chaff cutter to avoid waste.",
              "Feed dry fodder in the morning to stabilize the stomach.",
              "Provide green leaves at noon and concentrates in the evening.",
              "Clean the feeding troughs after every meal to prevent mold.",
              "Provide 250g of concentrate per adult goat for fast growth."
            ],
            proTips: ["Never feed freshly cut wet grass; let it wilt in the sun for 2 hours to prevent fatal bloat.", "Add 1% common salt to the drinking water to increase thirst and digestion."],
            mistakes: ["Feeding pure grain alone (causes acid death).", "Feeding only one type of grass; goats will get bored and stop eating."],
            bestPractices: ["Always provide a Vitamin/Mineral block for goats to lick at all times."],
            example: "Switching to stall-feeding increased daily weight gain from 80g to 150g per day."
          },
          {
            title: "Mineral Block Usage",
            simpleExplanation: "Hanging vitamin 'salt-bricks' for goats to lick, ensuring strong bones and shiny hair.",
            detailedExplanation: "Commercial meat goats have a physiological demand for trace minerals—specifically Copper, Zinc, and Selenium—that is significantly higher than that of cattle or sheep. In most regions, the local soil and water are deficient in these elements, leading to 'slow-growth syndrome,' brittle bones, and the loss of the characteristic 'shiny' hair coat that indicates health. Professional 'Mineral Block Usage' involves hanging weather-resistant, hard-pressed mineral bricks at the goat's eye level throughout the shed. These blocks allow the animal to self-regulate its intake; a goat's body has a natural 'craving' mechanism that drives it to lick the block only when its blood mineral levels are low. A common mistake is using salt blocks meant for larger livestock, which often contain levels of copper that are either too low for goats or dangerously high for sheep. By ensuring a goat has 24/7 access to a specialized 'multi-mineral goat lick,' farmers prevent the development of 'pica' (where goats eat dirt or wood) and ensure that the herd maintains high fertility and a robust immune system to fight off seasonal viral infections.",
            materials: ["High-copper mineral blocks", "Hanging wires/holders"],
            instructions: [
              "Hang the mineral block exactly at the goat's head level.",
              "Protect the block from rain (it will dissolve).",
              "Position it away from the water bucket (so they don't drop salt into the water).",
              "Check weekly; replace the block as soon as it is licked down to a small nub.",
              "Ensure one block is available for every 20 goats."
            ],
            proTips: ["If you see goats licking the walls or eating dirt, they are severely mineral-deficient.", "Red-colored blocks usually indicate high iron, while brown blocks are better for general growth."],
            mistakes: ["Using blocks made for Cattle (sheep/goats have different copper needs).", "Leaving blocks on the floor where they get covered in poop."],
            bestPractices: ["Always keep a backup block in storage."],
            example: "Using mineral licks stopped the 'hair pulling' behavior in a flock that was previously stressed and deficient."
          }
        ]
      },
      {
        id: 3, 
        title: "Breeding & Breeding", 
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600", 
        description: "Managing bucks carefully to produce heavy kids and avoid inbreeding.",
        subSteps: [
          {
            title: "Buck Rotation",
            simpleExplanation: "Changing the male goat every 18 months so he doesn't mate with his daughters.",
            detailedExplanation: "Inbreeding is the most common cause of commercial goat farm failure, leading to 'genetic depression'—where kids are born with permanent stunted growth, low immunity, and congenital deformities. To prevent this, a professional 'Buck Rotation' protocol must be strictly enforced. A male goat (Buck) must never be allowed to mate with his own daughters or sisters. In a closed farm system, the Buck should be replaced with an unrelated, high-pedigree male from a different geographical area every 18 to 24 months. Managing the Buck's reproductive behavior is also key to productivity; by isolating the Buck in a separate pen where he is out of visual and scent range of the females, and then suddenly introducing him, a farmer can trigger the 'Buck Effect.' This pheromone-driven response brings 90% of the female herd into heat at the same time, leading to a 'synchronized kidding' season. Having all kids born within a single 2-week window simplifies vaccination, feeding, and marketing, making the farm significantly easier to manage and more profitable during the peak festival sales periods.",
            materials: ["Pedigree Buck", "Ear tags", "Breeding register"],
            instructions: [
              "Keep the Buck in a separate strong pen away from females.",
              "Introduce him only when females are in heat.",
              "Record the mating date to predict the birth date.",
              "Isolate pregnant females 1 week before they are due.",
              "Sell the Buck and buy a new one from a different area every 1.5 years."
            ],
            proTips: ["Keep the Buck out of sight for 2 months, then suddenly introduce him to bring all females into heat at once (The Buck Effect).", "A Buck should be older than 18 months before he starts breeding."],
            mistakes: ["Leaving the Buck with the females all year.", "Using a Buck born on your own farm (this is guaranteed inbreeding)."],
            bestPractices: ["Tag every newborn baby immediately and note its parents' IDs."],
            example: "Rotating the Buck eliminated 'stunted growth' syndrome in a farm with 50 goats."
          },
          {
            title: "Flushing Technique",
            simpleExplanation: "Giving extra food to females 3 weeks before breeding to ensure they have twins or triplets.",
            detailedExplanation: "In commercial goat production, the number of kids born per year is the primary driver of profit. 'Flushing' is a high-precision nutritional technique used to maximize the release of eggs (ovulation rate) in the female goat (Doe) just before breeding. Starting 21 days before the introduction of the Buck, the Does are given a 'flush' of high-energy grain concentrate (specifically crushed maize or bajra) at a rate of 250 grams per day, alongside ad-libitum access to high-protein green fodder like Lucerne or Berseem. This sudden increase in plane of nutrition sends a biological signal to the Doe's body that food is abundant, overriding the natural 'survival mode' and triggering the release of multiple eggs. Scientific studies show that correctly executed flushing can increase the rate of 'twins and triplets' from a standard 40% to over 75%. This technique works most effectively on Does that are in a 'lean but healthy' condition; if the goat is already obese, flushing will have minimal effect. By timing this spike in nutrition exactly with the breeding season, farmers can effectively double their annual kid production from the same number of adult females.",
            materials: ["Maize/Crushed grain", "Extra minerals", "Green Lucerne"],
            instructions: [
              "Identify the females intended for breeding.",
              "Increase their grain ration by 250g per day gradually over 3 weeks.",
              "Ensure they have access to high-quality green fodder like Lucerne or Berseem.",
              "Introduce the Buck only after this 3-week 'high-feed' period.",
              "Continue the extra feed for 2 weeks after mating to ensure the embryos stick."
            ],
            proTips: ["Flushing works best if the goat is in slightly 'lean' condition before starting.", "Don't overfeed after the first month of pregnancy as it won't help the babies yet."],
            mistakes: ["Flushing an already obese goat (she might get metabolic issues).", "Using low-quality, moldy grain which causes abortions."],
            bestPractices: ["Flush your goats during the onset of the cool season for best results."],
            example: "Implementing flushing increased the 'Twinning Rate' from 40% to 75% for a commercial goat farmer."
          }
        ]
      },
      {
        id: 4, 
        title: "Health & Disease", 
        image: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?auto=format&fit=crop&q=80&w=600", 
        description: "Executing preventative medical regimes to defend against parasites.",
        subSteps: [
          {
            title: "Strategic Deworming",
            simpleExplanation: "Giving oral medicine to kill internal worms that drink the goat's blood.",
            detailedExplanation: "Internal parasites, specifically Haemonchus contortus (The Barber Pole Worm), are the single greatest biological threat to commercial goat farming. These microscopic worms attach to the goat's stomach lining and consume its blood, leading to rapid anemia, 'Stunted Growth,' and eventual heart failure. Professional 'Strategic Deworming' moves away from the old practice of deworming the entire herd every month, which creates drug-resistant 'super-worms.' Instead, farmers use the FAMACHA eye-color chart to identify only the specific goats that are showing signs of anemia (pale/white inner eyelids). By treating only the affected 20% of the herd, the remaining 80% act as a 'refugia'—harboring non-resistant worms that dilute the resistant population. The deworming medicine (Anthelmintic) must be administered orally using a drenching syringe, ensuring the liquid reaches the back of the throat for maximum absorption. Rotating the chemical class of the dewormer every year and fasting the animal for 12 hours before treatment are essential technical steps to ensure 100% kill-rates and the long-term sustainability of the farm's health protocol.",
            materials: ["Deworming liquid", "Oral dosing syringe", "FAMACHA eye chart"],
            instructions: [
              "Check the lower eyelid color: White/Pale means the goat is dying from worms.",
              "Administer the correct dose based on the goat's weight.",
              "Deworm right before the monsoon starts.",
              "Repeat the dose after 21 days to kill any newly hatched eggs.",
              "Change the medicine brand every year."
            ],
            proTips: ["Fast the goat for 12 hours before giving the medicine for better results.", "Check for 'Bottle Jaw' (swelling under chin) as a sign of heavy worm load."],
            mistakes: ["Underdosing (this makes worms immune).", "Deworming only once a year."],
            bestPractices: ["Keep newly bought goats in isolation for 14 days and deworm them twice before mixing."],
            example: "A farm stopping adult deaths entirely by switching to a 3-month deworming cycle."
          },
          {
            title: "PPR Vaccination Protocol",
            simpleExplanation: "Giving a one-time injection to protect the goat from the 'Goat Plague' forever.",
            detailedExplanation: "Peste des Petits Ruminants (PPR), commonly known as 'Goat Plague,' is a highly contagious viral disease that can wipe out an entire farm in less than 72 hours. It is characterized by high fever, nasal discharge, and severe necrotic diarrhea. Because it is a virus, there is no medical cure once a goat is infected—prevention through vaccination is the only viable business strategy. A professional PPR Vaccination Protocol involves a single, one-time subcutaneous injection given to every goat older than three months. This single dose provides lifelong immunity, effectively shielding the animal from the virus for its entire productive life. Managing the 'Cold Chain' is the most critical technical requirement; the vaccine is extremely fragile and must be kept strictly at 2°C to 8°C in a specialized ice-box until the very second of injection. A single exposure to direct sunlight or room temperature for as little as 10 minutes will render the vaccine useless. By ensuring 100% flock vaccination coverage, farmers create a 'bio-shield' that prevents catastrophic financial losses and ensures the long-term stability of the farm's capital assets.",
            materials: ["PPR Vaccine", "Ice-box for storage", "Sterile syringes"],
            instructions: [
              "Buy the vaccine from a certified source and keep it strictly in ice.",
              "Vaccinate all goats older than 3 months.",
              "Give the injection under the skin (subcutaneous) on the neck.",
              "Mark the vaccinated goats with a permanent marker or tag.",
              "Never vaccinate a sick or very weak goat."
            ],
            proTips: ["The best time to vaccinate is before the winter or monsoon when diseases spread fast.", "Keep the vaccine shield away from direct sunlight; UV light kills the vaccine in seconds."],
            mistakes: ["Using a warm vaccine (it is useless and waste of money).", "Sharing the same needle for 50 goats."],
            bestPractices: ["Call a vet for the first round of vaccinations to ensure proper technique."],
            example: "A farm that lost 80% of its flock to PPR the previous year lost 0% this year after everyone was vaccinated."
          }
        ]
      }
    ]
  },
  {
    id: "sheep-farming",
    name: "sheepFarmingTitle",
    category: "Livestock",
    tag: "tagNew",
    icon: Sprout,
    image: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34af?auto=format&fit=crop&q=80&w=800",
    difficulty: "Intermediate",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    realWorldData: {
      cost: "₹ 1-2 Lakhs (30 Ewes, 1 Ram)",
      profit: "₹ 1.5 - 2 Lakhs / batch",
      duration: "6-8 Months per batch",
      resources: ["Desi/Cross Sheep", "Fenced Pasture", "Anti-parasitic Dips", "Shearing Clippers"]
    },
    farmerTips: { dos: ["Shear wool twice a year to prevent heat stress", "Perform hoof trimming routinely"], donts: ["Graze sheep near stagnant water snails", "House sheep in unventilated boxes"] },
    steps: [
      {
        id: 1, 
        title: "Pasture Management", 
        image: "https://images.unsplash.com/photo-1606900223709-ae9fb5d7daee?auto=format&fit=crop&q=80&w=600", 
        description: "Managing land strategically to feed the flock efficiently year-round.",
        subSteps: [
          {
            title: "Rotational Grazing Systems",
            simpleExplanation: "Moving sheep between small fenced fields so the grass always grows back perfectly.",
            detailedExplanation: "Sheep are 'selective grazers' with a unique mouth anatomy that allows them to bite grass extremely close to the soil surface—often damaging the growing point of the plant. If a flock is left in a single large pasture for more than seven days, they will overgraze the most nutritious grasses and leave the weeds, leading to permanent land degradation. 'Rotational Grazing' is the scientific management of land where the farm is divided into 6 to 8 smaller 'Paddocks' using portable electric fencing. The flock is moved into a fresh paddock every 3 to 4 days, ensuring they only eat the 'top half' of the grass where the nutrients are concentrated. This system allows the previously grazed paddock a 21-day 'Rest Period' to regenerate its leaf area and root depth without being trampled. Beyond land health, rotational grazing is a powerful parasite management tool; because the life cycle of common sheep worms is roughly 21 days, moving the sheep to fresh land prevents them from re-ingesting the larvae hatched from their own droppings, leading to a 50% reduction in the need for chemical deworming medicines.",
            materials: ["Portable electric fencing", "Solar fencers", "Drought-resistant seeds", "Portable water troughs"],
            instructions: [
              "Divide the grazing land into 6 equal paddocks.",
              "Seed the paddocks with high-protein grasses before the monsoon.",
              "Release the flock into Paddock 1 with a water trough.",
              "On day 4, move the entire flock to Paddock 2.",
              "Do not allow sheep back into Paddock 1 for at least 20 days."
            ],
            proTips: ["Never graze sheep early in the morning when dew is heavy; larvae live on the tips of wet grass.", "Wait for grass to reach 6 inches before grazing."],
            mistakes: ["Leaving sheep in one paddock for 14 days (kills the grass roots).", "Forgetting to move the water trough with the sheep."],
            bestPractices: ["Graze cattle first, then move sheep in a day later to clean up the lower grass."],
            example: "Rotational grazing precisely doubled a farmer's carrying capacity from 10 to 20 sheep per acre."
          },
          {
            title: "Parasite Identification",
            simpleExplanation: "Checking sheep for signs of internal worms without expensive lab tests.",
            detailedExplanation: "Sheep are essentially 'biological vacuum cleaners' for internal parasites, particularly the Barber Pole Worm (Haemonchus contortus), which is the leading cause of death in global sheep farming. This parasite thrives in warm, humid conditions and can cause a healthy-looking sheep to collapse from sudden anemia in less than 48 hours. Professional 'Parasite Identification' utilizes the internationally recognized FAMACHA system—a diagnostic tool that focuses on the color of the mucous membranes in the sheep's lower eyelid. A bright red or dark pink color indicates a healthy red-blood-cell count, whereas a pale pink or white color is a medical emergency indicating life-threatening anemia. Monitoring the flock every 14 days during the rainy season is a non-negotiable requirement. Furthermore, farmers must look for 'Bottle Jaw' (edema under the chin), which is a sign of protein loss caused by heavy worm loads. By training staff to perform these fast, visual health checks, a farm can move from 'blanket' medication to 'targeted' treatment, which saves money and prevents the dangerous development of drug-resistant parasite populations on the property.",
            materials: ["FAMACHA color card", "Disposable gloves", "Record book"],
            instructions: [
              "Halt the sheep and firmly pull down the lower eyelid.",
              "Compare the color of the pink tissue to the FAMACHA card.",
              "Score the sheep from 1 (Red) to 5 (White).",
              "Isolate and treat any sheep scoring 4 or 5 immediately.",
              "Record the scores to identify which sheep are naturally resistant to worms."
            ],
            proTips: ["Check scores every 2 weeks during the rainy season when worms are most active.", "Sheep with 'Bottle Jaw' (swelling under the chin) are always a score 5."],
            mistakes: ["Thinking a fat sheep can't have worms; they can crash and die in 48 hours.", "Ignoring the white-colored eyes, thinking it's just 'dust'."],
            bestPractices: ["Selective deworming: Only treat the sheep that need it (Scores 4/5) to prevent drug resistance."],
            example: "Using eye-color checks saved 20 lambs in a flock that was hit by a sudden worm outbreak after heavy rains."
          }
        ]
      },
      {
        id: 2, 
        title: "Breeding & Lambing", 
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600", 
        description: "Executing precise breeding cycles to ensure maximum lamb survival.",
        subSteps: [
          {
            title: "Ram Selection & Care",
            simpleExplanation: "Choosing the best male sheep to ensure all babies grow fast and heavy.",
            detailedExplanation: "In commercial sheep production, the Ram (male sheep) is responsible for 50% of the genetic potential of the entire future lamb crop. A high-quality Ram should be selected based on his 'Body Condition Score' (BCS), featuring muscular hindquarters, a broad chest, and large, symmetrical testicles—which are the primary physiological indicator of high sperm production. To prevent the reproductive failure associated with 'Inbreeding Depression,' a Ram must be replaced with an unrelated, high-pedigree male from a different lineage every 24 months. During the 35-day breeding season, the Ram requires 'Strategic Supplementation' with high-energy crushed grains to maintain his physical stamina, as he will be constantly active in the flock. Using a 'Marking Harness' or applying colored chalk (Raddle) to the Ram's chest is a professional requirement; it allows the farmer to visually identify which ewes have been mated and on what date. This data is essential for predicting the exact 'Lambing Window,' ensuring that the farmer is physically present to assist with births and maximize the survival rate of the newborn lambs.",
            materials: ["High-pedigree Ram", "Marking harness/Chalk", "Extra grain (Crushed Maize)"],
            instructions: [
              "Choose a Ram that is at least 18 months old.",
              "Check his hooves and teeth before the breeding season starts.",
              "Apply 'Raddle' (colored chalk) to the Ram's chest so he marks the females he mates with.",
              "Identify which females have been marked and record the date.",
              "Remove the Ram from the flock after 35 days to ensure all lambs are born in a short window."
            ],
            proTips: ["Change the raddle color every 17 days (the sheep heat cycle) to see if females are 're-cycling'.", "One Ram can service up to 50 females easily if he is healthy."],
            mistakes: ["Using a young 'lamb-ram' for a large flock.", "Buying a Ram without checking his mother's twinning record."],
            bestPractices: ["Keep the Ram in a separate pen during the off-season to give the females a rest."],
            example: "Investing in a pedigree Ram increased the average lamb weight at 6 months by 5kg per lamb."
          },
          {
            title: "Lambing Pen Management",
            simpleExplanation: "Creating a safe, warm 'hospital' room for mothers to give birth and bond with babies.",
            detailedExplanation: "The first two hours of a lamb's life are the most critical for survival and the establishment of the 'Maternal Bond.' Without a safe and private environment, a high-strung ewe may become stressed and 'reject' her lamb, leading to starvation or death from exposure. A 'Lambing Pen' or 'Jug' is a dedicated 4x4 foot enclosure that provides the pair with the necessary isolation to ensure the lamb successfully suckles the first colostrum. The pen should be situated in a draft-free corner of the shed and heavily bedded with clean, dry straw to prevent 'Hypothermia'—the leading cause of lamb mortality in cool climates. Proper hygiene is non-negotiable; between every birth, the old bedding must be removed and the floor sanitized with hydrated lime to prevent the buildup of 'Navel Ill' or 'Scours' bacteria. By keeping the mother and lamb in this controlled enclosure for the first 24 to 48 hours, the farmer ensures that the lamb is physically strong and has developed a unique scent-recognition bond with its mother before they rejoin the competitive main flock.",
            materials: ["Portable wooden panels", "Clean dry straw", "Disinfectant (Lime)", "Heat lamp"],
            instructions: [
              "Move the pregnant sheep into the pen as soon as she shows signs of labor.",
              "Provide fresh water and a small amount of high-quality hay.",
              "Allow the mother to lick the lamb dry; this creates the bond.",
              "Check that the lamb is drinking milk (look for a full belly).",
              "Keep the pair in the pen for 24-48 hours before letting them join the group."
            ],
            proTips: ["A full-bellied lamb will feel warm to the touch; a starving lamb will have a cold mouth.", "Sprinkle lime on the floor to absorb ammonia and kill bacteria between batches."],
            mistakes: ["Leaving the lambing pen wet or dirty.", "Interfering too much with the mother during birth (unless she is in trouble)."],
            bestPractices: ["Set up the pens in a draft-free corner of the shed."],
            example: "Using dedicated lambing pens reduced lamb 'rejection' rates from 10% to 0%."
          }
        ]
      },
      {
        id: 3, 
        title: "Wool & Health", 
        image: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34af?auto=format&fit=crop&q=80&w=600", 
        description: "Harvesting wool and maintaining healthy hooves to prevent lameness.",
        subSteps: [
          {
            title: "Professional Shearing",
            simpleExplanation: "Cutting the wool off the sheep once a year without cutting the skin.",
            detailedExplanation: "Shearing is not merely a method of harvesting wool; it is a vital health requirement for modern sheep breeds that have lost the ability to shed their coats naturally. Excessive wool growth in summer causes 'Heat Stress,' which significantly reduces fertility and weight gain. Furthermore, long, urine-soaked wool around the tail acts as a magnet for blowflies, leading to lethal 'Fly Strike' (maggot infestation). Professional shearing should be conducted by a skilled operator using electric clippers just before the onset of the hot season. The technical objective is to remove the wool in a single continuous piece, known as the 'Fleece,' without making 'Second Cuts' that reduce the fiber's commercial value. Before shearing, sheep must be fasted for 12 hours to reduce rumen pressure and make them more comfortable during the physical handling required. The final fleece should be rolled with the clean, internal side facing out and stored in breathable burlap bags to prevent the 'Fiber Rot' that occurs if wool is packed while damp or dirty.",
            materials: ["Electric shearing clippers", "Grinding stone", "Burlap bags for storage", "Antiseptic spray"],
            instructions: [
              "Fast the sheep for 12 hours before shearing (full bellies make them uncomfortable).",
              "Clear the floor of any straw or dirt.",
              "Shear the belly first, then the legs, then the body.",
              "Try to keep the fleece as one whole piece.",
              "Treat any small nicks or cuts with antiseptic spray immediately."
            ],
            proTips: ["Shear early in the morning when the sheep are cool and calm.", "Roll the fleece with the 'inside' (clean side) facing out to impress buyers."],
            mistakes: ["Shearing a wet sheep (the wool will rot in the bag).", "Cutting the teats or skin folds by rushing."],
            bestPractices: ["Separate the 'belly wool' from the 'main fleece' as it is less valuable."],
            example: "Professional shearing increased a farmer's wool price by 20% compared to 'rough' hand-clipping."
          },
          {
            title: "Foot Rot Prevention",
            simpleExplanation: "Giving the sheep a 'chemical footbath' to kill germs that cause limping.",
            detailedExplanation: "Sheep hooves are composed of keratin and grow continuously throughout the year. In wet or humid environments, the hoof wall can trap mud and manure, creating an anaerobic environment where the bacteria 'Dichelobacter nodosus'—the cause of Foot Rot—thrive. This infectious disease causes severe pain, resulting in sheep that graze on their knees because they cannot stand. Professional prevention requires a two-stage process: manual 'Hoof Trimming' to remove excess growth and the use of a 'Chemical Footbath.' A 10% Zinc Sulfate solution is the industry's gold standard because it effectively kills the bacteria and hardens the hoof tissue without the toxicity associated with traditional copper-based baths. After the sheep have stood in the therapeutic liquid for at least 5 minutes, they must be allowed to stand on a dry concrete surface for 30 minutes to ensure the chemical dries and bonds to the hoof. Consistently performing this routine every 7 to 10 days during the monsoon season is the only way to prevent widespread lameness and maintain the flock's productive mobility.",
            materials: ["Foot-trimming shears", "Plastic footbath trough", "Zinc Sulfate", "Dry concrete area"],
            instructions: [
              "Trim the excess hoof growth so the foot sits flat.",
              "Fill the trough with a 10% Zinc Sulfate solution.",
              "Force the sheep to walk through and stand in the liquid for 2-5 minutes.",
              "Let the sheep stand on a dry concrete floor for 30 minutes after the bath.",
              "Repeat every week during the rainy season."
            ],
            proTips: ["Add a little bit of detergent to the liquid; it helps the chemical penetrate the hoof cracks.", "Trim hooves twice a year at minimum."],
            mistakes: ["Using a footbath that is too shallow.", "Letting sheep go straight back onto wet grass after the bath."],
            bestPractices: ["Cull (sell) any sheep that continues to limp after 3 treatments; she has 'chronic' rot."],
            example: "A farm solved its lameness problem by installing a permanent concrete footbath at the entrance of the shed."
          }
        ]
      },
      {
        id: 4, 
        title: "Marketing & Sales", 
        image: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?auto=format&fit=crop&q=80&w=600", 
        description: "Preparing sheep for the market to get the highest possible price.",
        subSteps: [
          {
            title: "Meat Grading",
            simpleExplanation: "Feeling the sheep's back to see if it is fat enough for the butcher.",
            detailedExplanation: "In the sheep meat industry, visual appearance can be highly deceptive, especially in wooly breeds where a thick coat can hide a malnourished frame. Professional buyers and farmers use 'Body Condition Scoring' (BCS) to accurately assess the amount of muscle and fat on the animal's carcass. This involves a physical examination by placing the hand over the sheep's spine and loin area just behind the last rib. A score of 1 indicates an emaciated animal, whereas a score of 5 represents obesity. The 'Market Grade' target is a BCS of 3.0 to 3.5—where the bones are covered by a firm layer of fat and muscle that is palpable but not sharp. Selling sheep based strictly on this scoring, rather than just age or total weight, ensures that the farmer receives the highest possible price from commercial butchers who value 'high dressing percentages.' To achieve this peak grade, a period of 'Finishing'—where sheep are given extra grain concentrates (crushed maize) for 3-4 weeks before sale—is highly recommended to increase the fat cover and overall 'bloom' of the carcass.",
            materials: ["Weight scale", "Marking spray", "BCS Chart"],
            instructions: [
              "Place your hand over the sheep's spine just behind the last rib.",
              "Feel for the sharpness of the backbone and the fat cover over the loin.",
              "Score the sheep from 1 to 5.",
              "Separate the 'ready' sheep from those needing more feed.",
              "Record weights to ensure they are at least 30-35kg for the meat market."
            ],
            proTips: ["Always sell based on 'live weight' if possible.", "Give sheep extra grain 4 weeks before sale to increase fat cover."],
            mistakes: ["Selling thin sheep.", "Washing sheep right before sale."],
            bestPractices: ["Target sales during holidays when meat demand is highest."],
            example: "Condition-scoring allowed a farmer to sell only his 'Grade-A' sheep, earning ₹1,500 more per head."
          }
        ]
      }
    ]
  }
];
