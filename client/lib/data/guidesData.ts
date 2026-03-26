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
            simpleExplanation: "Drying and treating the pond bottom to eradicate harmful bacteria and parasites.",
            detailedExplanation: "Before stocking Vannamei shrimp, the pond bottom must be completely oxidized. The black sludge (organic matter) from previous cycles harbors lethal pathogens like EHP and Vibrio. By allowing the pond bottom to bake in the sun until cracks appear (about 2-3 inches deep), you effectively sterilize the habitat. Liming (Calcium Carbonate/Quicklime) is then applied to neutralize acidic soils and raise alkalinity to supportive levels.",
            materials: ["Quicklime (CaO)", "Tractors for tilling", "Sludge pumps", "pH testing strips"],
            instructions: [
              "Pump out all remaining water and black sludge from the pond.",
              "Sun-dry the pond bottom for 15-20 days until 5cm deep cracks appear.",
              "Till the top soil lightly to oxidize deeper layers.",
              "Apply Agricultural lime at 1-2 tons per hectare depending on soil pH.",
              "Fill with filtered water through a 60-micron mesh."
            ],
            proTips: ["Apply lime at sunset for maximum soil penetration.", "Test soil pH every 4 days during drying."],
            mistakes: ["Stocking seeds without gradual salinity acclimatization.", "Leaving wet patches in the center of the pond."],
            bestPractices: ["Ensure a central drainage point (sludge pit) is perfectly maintained.", "Use probiotics immediately after filling water to establish good algae blooms."],
            example: "A farmer in Andhra Pradesh boosted survival rates from 60% to 85% simply by extending the sun-drying phase by an extra 10 days, completely eliminating early-mortality syndrome."
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
            title: "SPF Seed Selection & Release",
            simpleExplanation: "Buying disease-free baby shrimps and slowly mixing them with pond water.",
            detailedExplanation: "Vannamei seeds (Post-Larvae, PL10 to PL12) are extremely sensitive to temperature and salinity shocks. They must be sourced exclusively from CAA-approved SPF hatcheries. The acclimatization process balances the temperature in the transport bags with the pond water, followed by mixing pond water into the bags gradually to adjust the osmotic pressure in the shrimp's biological systems.",
            materials: ["SPF PL12 seeds", "Salinity refractometer", "Floating transport bags", "Oxygen tanks"],
            instructions: [
              "Float the sealed seed bags in the pond for 30 minutes to equalize temperature.",
              "Open bags and gradually add 1 cup of pond water every 5 minutes.",
              "Test salinity in bag vs pond; it must be within a 2ppt margin.",
              "Gently tilt the bags and let the PLs swim out against the current.",
              "Stock during the early morning or late evening when water is cool."
            ],
            proTips: ["Run aerators at full speed for 2 hours before stocking.", "Stock seeds at the windward side of the pond so they drift safely."],
            mistakes: ["Pouring seeds directly into the pond from a height.", "Stocking in direct mid-day sunlight."],
            bestPractices: ["Maintain stocking density strictly at 40-60 PL/sq.meter for standard ponds.", "Send a sample of 100 seeds for a PCR test before accepting delivery."],
            example: "Ramesh, a coastal farmer, lost 40% of his crop in week 1 because he skipped salinity balancing. Now, taking 2 hours to balance salinity ensures him a 95% initial survival rate."
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
            title: "Check Tray Feed Monitoring",
            simpleExplanation: "Using submerged trays to physically check if shrimps are eating the given feed.",
            detailedExplanation: "Feed accounts for 60% of shrimp farming costs. Overfeeding rots at the bottom, creating lethal ammonia. Underfeeding leads to stunted growth and cannibalism. By placing 4 check trays across a 1-acre pond and observing feed consumption after 2 hours, farmers can dynamically adjust the daily ration. Feed containing 35-40% protein is broadcasted 4-5 times a day to match their fast metabolism.",
            materials: ["High-protein pelleted feed", "4 Check-trays per pond", "Boat/Coracle for broadcasting", "Vitamin C supplements"],
            instructions: [
              "Calculate base daily feed as 3% of estimated total biomass.",
              "Divide feed into 4 doses: 6am, 10am, 2pm, and 6pm.",
              "Place 1% of the feed dose into the check trays.",
              "Lift trays after 2 hours. If empty, increase next dose by 5%.",
              "If feed remains, decrease next dose by 10% and check water quality."
            ],
            proTips: ["Mix feed with Vitamin C and liver tonics to boost immunity against White Spot syndrome.", "Switch off aerators for 30 mins during feeding to prevent feed from scattering into the sludge area."],
            mistakes: ["Following a fixed feed chart indiscriminately regardless of weather.", "Ignoring leftover feed in trays and continuing standard doses."],
            bestPractices: ["Use automated acoustic feeders for large ponds.", "Stop feeding during heavy rains or molting phases."],
            example: "Implementing strict check-tray protocols reduced a commercial farm's Feed Conversion Ratio (FCR) from 1.8 down to 1.3, saving ₹2 Lakhs in feed costs per hectare."
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
            title: "Night Harvest Protocol",
            simpleExplanation: "Harvesting when it's cool and immediately icing to preserve the meat quality.",
            detailedExplanation: "Shrimp meat degrades rapidly after harvest if exposed to heat. Harvesting is planned when the average body weight hits 25-30g (around 120 days). It is done exclusively at night or early morning. A bag-net harvest is preferred for partial harvests, while a full harvest requires dropping the water level and using drag nets. Shrimps must be submersed in an ice-slurry immediately to kill them instantly without stress, preserving the firm texture exporters demand.",
            materials: ["Drag nets", "Ice slurry vats (1:1 ratio)", "Plastic crates", "Weighing scales"],
            instructions: [
              "Conduct a test harvest a week prior to check average weight and molting percentage.",
              "Do not harvest if more than 5% of shrimps are in a soft-shell (molting) stage.",
              "Drain 50% of the pond water through a filtered outlet the evening before.",
              "Drag the net slowly to avoid crushing the shrimp at the bottom.",
              "Immediately transfer the catch into an ice slurry (water at 0°C) within 2 minutes."
            ],
            proTips: ["Add a handful of salt to the ice slurry to drop the temperature faster without freezing.", "Starve the shrimp for 6 hours prior to harvest so their digestive tracts are clean."],
            mistakes: ["Harvesting during a soft-shell molting cycle, rendering the catch unsellable to exporters.", "Delaying the icing process, leading to 'black gills' or soft meat."],
            bestPractices: ["Pre-book the processing plant trucks to wait at the farm edge with active chillers.", "Wash the shrimp with clean, chlorinated water before icing."],
            example: "A farm achieved an 'A-Grade' export rating yielding a ₹50/kg premium simply by enforcing a 2-minute 'net-to-ice' rule, locking in peak freshness."
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
        id: 1, title: "Pond Design & Construction", image: "https://images.unsplash.com/photo-1606900223709-ae9fb5d7daee?auto=format&fit=crop&q=80&w=600", description: "Excavate a rectangular pond with sloping banks to ensure uniform depth.",
        subSteps: [
          {
            title: "Geometric Pond Excavation",
            simpleExplanation: "Digging a pond that holds water perfectly without bank erosion.",
            detailedExplanation: "A standard fish pond should be rectangular with a 3:1 slope on the banks to prevent soil collapse. The ideal depth is 1.5 to 2.0 meters, which allows sunlight penetration for natural algae growth while keeping deeper waters cool in the summer. Clay soils are perfect because they hold water; if the soil is sandy, a geo-membrane sheet or heavy bentonite clay must be laid to prevent seepage.",
            materials: ["JCB Excavator", "Clay/Bentonite", "Inlet/Outlet PVC pipes", "Mesh screens"],
            instructions: [
              "Mark the rectangular perimeter leaving 3 meters of bund margin.",
              "Excavate soil ensuring a gentle gradient towards the outlet pipe for easy draining.",
              "Compact the bunds heavily using a roller.",
              "Install screens on inlets to prevent wild predatory fish from entering.",
              "Line the bottom with 5cm of agricultural lime if the soil is highly acidic."
            ],
            proTips: ["Plant binding grass explicitly over the bunds to prevent monsoon erosion.", "Ensure the water inlet is at the opposite end of the outlet to force circulation."],
            mistakes: ["Building vertical walls which collapse and kill fish.", "Digging deeper than 2.5 meters, creating dead zones with zero oxygen."],
            bestPractices: ["Conduct a soil percolation test before digging to confirm water retention."],
            example: "A farm in West Bengal stopped losing 20% of its water volume purely by tamping down bentonite clay into the floor before filling."
          }
        ]
      },
      {
        id: 2, title: "Water Preparation & Plankton", image: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34af?auto=format&fit=crop&q=80&w=600", description: "Developing a natural food chain in the pond before introducing the fish.",
        subSteps: [
          {
            title: "Algae Bloom Cultivation",
            simpleExplanation: "Adding organic manure to turn the water green with nutritious fish food.",
            detailedExplanation: "Fish fry (babies) survive primarily on zooplankton and phytoplankton. If you stock fish in clear water, they will starve. We induce an 'algae bloom' by applying organic fertilizers (cow dung) and chemical fertilizers (Urea and Superphosphate). The water should turn a rich greenish-brown within 7 to 10 days, indicating a thriving microscopic ecosystem.",
            materials: ["Raw cow dung (10,000 kg/ha)", "Urea (200 kg/ha)", "Single Super Phosphate (250 kg/ha)", "Secchi disk"],
            instructions: [
              "Fill the pond with 1 meter of water.",
              "Broadcast the organic cow dung evenly across the pond surface.",
              "After 3 days, apply the dissolved Urea and Superphosphate.",
              "Wait approximately 1 week. The water should significantly green up.",
              "Measure transparency with a Secchi disk; 30-45 cm visibility is perfect."
            ],
            proTips: ["If the water turns dark green or smells foul, massive algae death is occurring; immediately add fresh water.", "Use a Secchi disk: If you can see it below 45cm, add more manure."],
            mistakes: ["Stocking fish immediately after filling tap water.", "Applying heavy manure on a cloudy day, leading to oxygen crashes at night."],
            bestPractices: ["Apply initial fertilizers strictly between 9 AM and 11 AM.", "Test ammonia levels before stocking."],
            example: "Farmers who established a strong plankton base before stocking noticed a 40% jump in fish weight within the first month compared to clear-water tanks."
          }
        ]
      },
      {
        id: 3, title: "Stocking Fingerlings", image: "https://images.unsplash.com/photo-1534043464124-3be32fe000c9?auto=format&fit=crop&q=80&w=600", description: "Introducing mixed species of fingerlings to maximize pond utilization.",
        subSteps: [
          {
            title: "Composite Fish Culture",
            simpleExplanation: "Mixing top, middle, and bottom feeding fish so no food is wasted.",
            detailedExplanation: "A pond is 3-dimensional. To maximize yield, we use Indian Major Carps (Catla, Rohu, Mrigal). Catla feeds on the surface, Rohu securely grazes in the middle column, and Mrigal dominates the bottom mud. Stocking ratio is generally 30% Surface, 30% Middle, 40% Bottom. The fingerlings should be 10-15cm long to rapidly outgrow any remaining predatory insects.",
            materials: ["Catla fingerlings", "Rohu fingerlings", "Mrigal fingerlings", "Potassium Permanganate dip"],
            instructions: [
              "Transport fingerlings in oxygenated polythene bags during early morning.",
              "Float the bags for 30 minutes in the pond water.",
              "Open the bags and gently dip the fish in a 2% Potassium Permanganate solution for 1 minute.",
              "Release them slowly into the pond.",
              "Stocking density: 5000 to 7000 fish per hectare total."
            ],
            proTips: ["Release fish against the wind so the waves push them gently into the pond.", "Never stock stressed or sluggish fish."],
            mistakes: ["Overstocking beyond 10,000 fish per hectare without aerators, leading to mass suffocation.", "Skipping the Potassium Permanganate dip, inviting external parasites."],
            bestPractices: ["Fasting the fingerlings 24 hours prior to transport reduces ammonia buildup in their transport bags."],
            example: "Using the 30-30-40 composite ratio yields three distinct fish harvests holding the exact same water volume, effectively tripling income."
          }
        ]
      },
      {
        id: 4, title: "Supplemental Feeding", image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=600", description: "Providing artificial feed to accelerate growth and weight gain.",
        subSteps: [
          {
            title: "Floating Pellet Regimen",
            simpleExplanation: "Feeding the fish directly using floating pellets packed with protein.",
            detailedExplanation: "Natural plankton only supports initial growth. To reach market size (1-1.5kg) in 7 months, supplemental feed is essential. A mixture of Rice Bran and Mustard Oil Cake (1:1) is the traditional cheap feed, but commercial floating pellets (24-28% protein) produce significantly faster scaling. Pellets float on the surface, allowing the farmer to physically verify the stock is actively eating and healthy.",
            materials: ["Floating fish feed (24% protein)", "Feeding rings (PVC hoops)", "Mustard oil cake"],
            instructions: [
              "Calculate daily feed at 2-3% of the total estimated body weight of the fish.",
              "Place feeding rings in specifically fixed spots across the pond.",
              "Pour feed strictly inside the rings between 10 AM and 4 PM.",
              "Observe feeding behavior; slow eating indicates low oxygen or disease.",
              "Reduce feed by 50% during heavy overcast winter days."
            ],
            proTips: ["Mix mustard oil cake with water 24 hours prior to feeding to neutralize its toxicity.", "Use feeding rings to stop the wind from blowing feed onto the mud banks."],
            mistakes: ["Feeding right before dawn when oxygen is at its absolute lowest.", "Throwing raw, un-soaked oil cake which causes internal fish bloat."],
            bestPractices: ["Check the bottom soil periodically; if it smells foul and black, immediately halt feeding for 2 days."],
            example: "Transitioning from sinking dough to floating pellets reduced feed waste by 30%, keeping the pond water significantly cleaner."
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
        id: 1, title: "Brooder Preparation", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600", description: "Providing a heavily heated, protected ring for newborn Day-Old Chicks (DOC).",
        subSteps: [
          {
            title: "Thermal Hover Setup",
            simpleExplanation: "Creating a giant, warm nest inside the shed for baby chicks using heat lamps.",
            detailedExplanation: "Day-Old Chicks cannot regulate their own body temperature. A 'brooder' is a controlled micro-environment. Before chicks arrive, cover a section of the shed with clean wood shavings, block drafts with tarpaulins, and set up a circular cardboard chick-guard. Suspend heat lamps (or gas brooders) in the center. The temperature at bird level must be strictly 32-35°C (90-95°F) on Day 1.",
            materials: ["Cardboard chick guards", "Wood shavings (2 inches thick)", "Gas/Electric Brooder lamps", "Thermometers", "Newspaper layer"],
            instructions: [
              "Fumigate and sanitize the entire shed 3 days before chick arrival.",
              "Spread a tight 2-inch layer of dry wood shavings.",
              "Cover the shavings entirely with old newspapers for the first 3 days to prevent chicks eating sawdust.",
              "Construct a 2-foot high circular cardboard ring to keep chicks close to the heat.",
              "Switch on the brooder 24 hours BEFORE chicks arrive to pre-warm the litter."
            ],
            proTips: ["Form a perfect circle. Corners in the guard will cause frightened chicks to pile up and smother each other.", "Observe chick behavior: if huddled directly under the lamp, they are cold. If pushed to the edges, they are too hot."],
            mistakes: ["Using thick sawdust instead of wood shavings, causing deadly respiratory issues.", "Turning off the brooder at night to save electricity."],
            bestPractices: ["Dip the beak of the first 100 chicks into sugar-water immediately upon arrival to kickstart energy and hydration."],
            example: "Setting up the brooder a full day early drops first-week chick mortality from a standard 4% to under 0.5%."
          }
        ]
      },
      {
        id: 2, title: "Feeding & Hydration", image: "https://images.unsplash.com/photo-1582769923195-c6e60dc1d8bc?auto=format&fit=crop&q=80&w=600", description: "Executing a precise 3-phase feeding plan for maximum weight gain.",
        subSteps: [
          {
            title: "Phase-Feeding Strategy",
            simpleExplanation: "Switching the type of feed three times as the birds grow rapidly over 40 days.",
            detailedExplanation: "Broilers grow incredibly fast, reaching 2kg+ in just 40 days. Their nutritional needs shift wildly. Week 1 is 'Pre-Starter' (crumbled, high protein 23% to build organs and frame). Weeks 2-3 are 'Starter' (pellets, 21% protein, focusing on meat growth). Weeks 4-6 are 'Finisher' (larger pellets, 19% protein, high fat to build heavy breast meat and finish). Fresh, cool water is more critical than feed—birds drink twice as much as they eat.",
            materials: ["Pre-Starter crumbs", "Starter Pellets", "Finisher Pellets", "Bell drinkers", "Linear feeders"],
            instructions: [
              "Day 1-10: Provide strictly Pre-Starter crumbs on flat trays mixed with newspaper.",
              "Day 11-21: Transition gradually smoothly combining with Starter pellets in hanging feeders.",
              "Day 22-40: Exclusively use Finisher pellets for maximum weight gain.",
              "Wash all water drinkers rigorously every morning using a mild acidifier.",
              "Adjust the height of the hanging feeders weekly so it matches the height of the bird's back."
            ],
            proTips: ["Add Vitamin B-complex and electrolytes to the water on Days 1, 2, and 3 to relieve transport stress.", "Leave the lights on 24 hours a day so they eat continuously."],
            mistakes: ["Placing feeders so low that birds scrape feed out onto the floor with their beaks (massive feed waste).", "Letting the water tanks heat up under the sun; birds refuse hot water."],
            bestPractices: ["For every 100 birds, ensure at least 3 hanging feeders and 3 drinkers.", "Check crop fill after 24 hours; 95% of chicks must have full, soft crops."],
            example: "A farm implementing automatic nipple drinkers saw a 10% faster weight gain simply because the water remained perfectly uncontaminated by feces."
          }
        ]
      },
      {
        id: 3, title: "Vaccination & Medical", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600", description: "Preventing massive viral wipeouts via precise eyedrop and water vaccines.",
        subSteps: [
          {
            title: "Newcastle & Gumboro Protocol",
            simpleExplanation: "Giving life-saving viral vaccines through the eyes and drinking water.",
            detailedExplanation: "In broiler farming, a viral infection like Ranikhet (Newcastle Disease) or IBD (Gumboro) will wipe out 90% of a shed in 48 hours. Treatment is impossible. Prevention via vaccination is mandatory. The F1/LaSota strain for Newcastle is administered via an eyedrop into every single bird on Day 5-7. Gumboro is administered via drinking water on Day 14. Live vaccines are extremely delicate and must remain strictly refrigerated until the second they are used.",
            materials: ["Lasota Vaccine vials", "IBD Vaccine vials", "Skimmed milk powder", "Ice box / Thermos"],
            instructions: [
              "Day 6: Reconstitute Lasota vaccine gently in distilled water on ice.",
              "Hold each chick gently and drop exactly 1 drop into the eye. Wait for them to blink to absorb it.",
              "Day 14: Prepare for water vaccination by stopping the main water supply for 2 hours.",
              "Mix skimmed milk powder (2g/Liter) into cool, chlorine-free water. Add the IBD vaccine to stabilize it.",
              "Open the water line to allow the extremely thirsty birds to consume the vaccine water within 1 hour."
            ],
            proTips: ["Never use tap water with chlorine/bleach for vaccines; it instantly kills the live virus.", "Vaccinate only during the coolest hours (early morning) to prevent stress."],
            mistakes: ["Storing vaccines in the freezer compartment (it destroys them).", "Shaking the vaccine vial violently instead of rolling it gently."],
            bestPractices: ["Destroy empty vaccine glass vials immediately via deep burial or incineration.", "Administer liver tonics for 2 days following a vaccine to jumpstart metabolism."],
            example: "A farmer saved his entire flock during a brutal regional Gumboro outbreak simply by ensuring he mixed skim milk powder as a stabilizer during the oral water vaccine."
          }
        ]
      },
      {
        id: 4, title: "Ventilation & Litter Mgmt", image: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?auto=format&fit=crop&q=80&w=600", description: "Managing the critical deadly gas levels and wet bedding in the shed.",
        subSteps: [
          {
            title: "Ammonia Control via Raking",
            simpleExplanation: "Turning the floor sawdust daily so the bird poop dries out and toxic gases escape.",
            detailedExplanation: "By Day 20, the amount of feces deposited on the floor is massive. If the litter (wood shavings/husks) becomes wet or caked, it acts as a bio-reactor, releasing lethal Ammonia gas. Ammonia burns the birds' eyes, damages their respiratory systems, and drastically limits their weight gain. The shed curtains must be adjusted dynamically based on outside wind, and the floor litter must be literally raked (turned over) every single day.",
            materials: ["Heavy-duty rakes", "Hydrated lime powder", "Exhaust fans", "Adjustable side tarps/curtains"],
            instructions: [
              "Day 1-10: Keep side curtains partially closed to trap heat, dropping from the top for fresh air.",
              "Day 20+: Open curtains entirely. Install heavy exhaust fans pulling air through the length of the shed.",
              "Starting Day 15, rake the wood shavings deeply every morning.",
              "If a distinct wet patch forms around a leaky drinker, remove the wet heavily caked litter immediately.",
              "Sprinkle hydrated lime powder lightly over damp areas before placing fresh dry shavings to kill bacteria."
            ],
            proTips: ["Walk into the shed at 6 AM. If your own eyes burn, ammonia levels are lethal and you must forcefully ventilate instantly.", "Use a 1-foot high brick wall at the base of the mesh to prevent strong drafts hitting the birds directly."],
            mistakes: ["Closing the curtains entirely at night when the birds are big; they will suffocate from lack of oxygen.", "Tossing wet litter outside directly next to the shed; the smell will draw predators and flies back in."],
            bestPractices: ["Install large 50-inch industrial tunnel-ventilation fans if stocking density is high."],
            example: "By merely implementing a strict daily morning raking protocol, respiratory disease occurrence plummeted and total batch weight yield increased by 400kg."
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
        id: 1, title: "Layer Housing & Battery Cages", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600", description: "Constructing specialized elevated systems to house commercial layers efficiently.",
        subSteps: [
          {
            title: "California Cage System Design",
            simpleExplanation: "Setting up slanted wire cages so eggs roll out safely and droppings fall below.",
            detailedExplanation: "Commercial egg production relies on the Battery or 'California' A-frame cage system. Unlike broilers on the floor, layers are housed 3-4 per cage, suspended over a deep pit. This isolates them entirely from their own droppings (preventing massive disease outbreaks like coccidiosis). The cage floor is steeply angled at 12 to 15 degrees, allowing freshly laid eggs to instantly roll out into a safe collection gutter away from pecking birds.",
            materials: ["A-Frame galvanized cages", "Automatic nipple drinkers", "PVC feed troughs", "Egg collection trays"],
            instructions: [
              "Construct a raised shed with the floor minimum 3 feet above ground level for the manure pit.",
              "Install the A-frame cages in long rows, leaving a 3-foot walking aisle between rows.",
              "Ensure the sloped cage floor is completely smooth without sharp wire barbs.",
              "Attach the PVC feed trough outside the front of the cage.",
              "Run the automated nipple water line through the top center of the cages at head height."
            ],
            proTips: ["Keep the shed axis East-West so sunlight doesn't hit the birds directly, which causes cannibalism.", "Paint the roof white using heat-reflective paint to drastically lower interior temps."],
            mistakes: ["Using cheap un-galvanized wire cages that rust within 1 year, cutting the birds' feet.", "Incorrect cage floor slope (too steep = cracked eggs; too flat = eggs get dirty and pecked)."],
            bestPractices: ["Ensure the manure pit underneath has large side-door accesses for easy weekly tractor cleanouts."],
            example: "Setting the cage floor slope perfectly at 14 degrees eliminated egg-pecking completely, dropping the number of daily damaged un-sellable eggs from 45 down to zero."
          }
        ]
      },
      {
        id: 2, title: "Pullet Rearing & Photoperiod", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600", description: "Raising chicks and using precise lighting to trigger unstoppable egg production.",
        subSteps: [
          {
            title: "Light Stimulation Protocol",
            simpleExplanation: "Tricking the bird's brain with artificial lights to force them to start laying eggs.",
            detailedExplanation: "A layer chicken's reproductive system is entirely controlled by light entering its eye, stimulating the pituitary gland. From weeks 1 to 18 (the 'Pullet' growing phase), light must be kept constant or decreasing. At week 18, when body weight hits exactly 1.3kg, you 'stimulate' them. By artificially increasing light by 30 minutes every week using LED bulbs until reaching 16 hours of daily total light, you forcefully trigger peak ovulatory maturation.",
            materials: ["Automatic light timers", "Warm-white LED bulbs (10-15 Lux)", "Weighing scales", "Blackout curtains (optional)"],
            instructions: [
              "Week 1-17: Rely mostly on natural daylight. Do NOT increase light duration.",
              "Week 18: Weigh 5% of the flock. If 80% have hit target weight (1.3kg), begin light stimulation.",
              "Set the automatic timer to turn lights on at 4:30 AM before sunrise.",
              "Increase light by 15-30 minutes every subsequent week until you reach 16 total hours of light.",
              "Hold absolute 16 hours of light constant for the rest of their 72-week life."
            ],
            proTips: ["Clean the dust off the light bulbs weekly; dust significantly reduces light Lux reaching the birds' eyes.", "Ensure completely uniform lighting; shadows will cause birds in darker cages to stop laying."],
            mistakes: ["Starting light stimulation too early (Week 15). The birds will start laying tiny 'peewee' eggs permanently, suffering organ prolapse.", "Accidentally decreasing light duration mid-cycle; the flock will immediately crash and molt."],
            bestPractices: ["Use a digital lux meter at the bottom cage level to ensure a minimum of 10-20 Lux of brightness."],
            example: "Using automatic digital timers instead of manual switches prevented human error, resulting in a perfectly sustained 95% peak lay rate for an incredible 12 solid weeks."
          }
        ]
      },
      {
        id: 3, title: "Layer Nutrition Formulation", image: "https://images.unsplash.com/photo-1582769923195-c6e60dc1d8bc?auto=format&fit=crop&q=80&w=600", description: "Providing heavy calcium diets specifically formulated for hard eggshells.",
        subSteps: [
          {
            title: "Calcium & Phosphorus Loading",
            simpleExplanation: "Feeding shell-grit and limestone to prevent thin-shelled broken eggs.",
            detailedExplanation: "A layer bird's calcium demand is staggering—it literally builds a solid limestone shell every 24 hours. The primary feed is 'Layer Mash'. If the diet drops below 3.5% calcium, the bird will pull calcium rapidly from her own skeleton, resulting in 'Cage Layer Fatigue' (paralysis and death). A precise mixture of fine limestone powder (for rapid daylight absorption) and coarse shell grit (for slow overnight release) ensures thick, uncrackable eggshells.",
            materials: ["Layer Mash (16-18% Protein)", "Coarse Limestone/Oyster shell grit", "Dicalcium phosphate (DCP)", "Toxin binders"],
            instructions: [
              "Transition to 'Pre-Lay Mash' (2.5% Calcium) two weeks before the first expected egg.",
              "At 5% production, switch entirely to 'Layer Phase 1 Mash' containing 3.5-4.0% Calcium.",
              "Provide the main feed ration in the late afternoon (4 PM) so calcium is digesting at night when shell formation occurs.",
              "Mix in toxin binders to ensure any fungal aflatoxins in the maize do not poison the flock.",
              "Add coarse oyster shell as a top-dressing twice a week."
            ],
            proTips: ["If you see thin, pimpled, or soft-shelled eggs, immediately top-dress the feed with liquid calcium and Vitamin D3.", "Ensure phosphorus levels are tightly balanced with calcium (usually 1/10th ratio)."],
            mistakes: ["Feeding high-calcium layer feed to young pullets (Week 10); it destroys their developing kidneys.", "Using very fine powdered limestone exclusively, which digests too fast and leaves the bird deficient at 2 AM."],
            bestPractices: ["Send a sample feed batch to a lab monthly to test for actual crude protein and calcium percentage."],
            example: "Shifting 60% of the feeding schedule to 4:00 PM drastically increased shell thickness for a farmer, cutting transit breakages from 3% down to 0.2%."
          }
        ]
      },
      {
        id: 4, title: "Egg Harvesting & Grading", image: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?auto=format&fit=crop&q=80&w=600", description: "Collecting, grading, and storing eggs rapidly to prevent quality loss.",
        subSteps: [
          {
            title: "Hygienic Collection & Storage",
            simpleExplanation: "Gathering eggs multiple times a day and keeping them cool and unwashed.",
            detailedExplanation: "Eggs must be collected a minimum of three times a day. Leaving eggs in the collection gutter leads to dirtying, pecking, and rapid internal temperature rise. Eggs look smooth but possess thousands of microscopic pores. They are protected by a natural invisible 'bloom' cuticle. If you wash an egg, you strip this cuticle, inviting immediate bacterial rotting. Eggs are graded manually or mechanically by weight (Small, Medium, Large) and placed point-side down.",
            materials: ["Pulp/Plastic egg trays (30 count)", "Trolley carts", "Sandpaper/Dry brush", "Cool storage room (< 20°C)"],
            instructions: [
              "Conduct bulk collections at 9 AM, 11 AM, and 3 PM strictly.",
              "Gently lift eggs from the gutters directly onto standard 30-egg trays.",
              "For slightly dirty eggs, dry-wipe them heavily with a piece of dry sandpaper or steel wool.",
              "Never wash eggs in water unless they are heavily soiled and can be sold immediately.",
              "Store the full trays in a well-ventilated cool room."
            ],
            proTips: ["Always pack eggs with the pointed end down; this keeps the air cell at the top intact, extending freshness by weeks.", "Use colored plastic trays to separate pullet eggs, large eggs, and jumbo twin-yolks mechanically."],
            mistakes: ["Using a wet sponge to quickly wipe off manure, forcing salmonella straight through the shell pores.", "Leaving egg carts sitting out under the blazing sun for hours after collection."],
            bestPractices: ["Hold back severely cracked 'leaker' eggs as they will contaminate the entire tray and attract massive flies."],
            example: "A farm implemented simple dry-brushing instead of wet-sponging, doubling the shelf-life of their eggs and securing a contract with a premier supermarket chain."
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
        id: 1, title: "Modern Loose Housing", image: "https://images.unsplash.com/photo-1596733430284-f74370603092?auto=format&fit=crop&q=80&w=600", description: "Designing a stress-free environment for maximum cow comfort.",
        subSteps: [
          {
            title: "Free-Stall Architecture",
            simpleExplanation: "Ditching the rope. Let cows walk around freely so they produce more milk.",
            detailedExplanation: "Traditional farming ties cows closely to a peg all day, causing massive stress and lameness. A 'Loose Housing' or Free-Stall design creates defined zones: a feeding alley, a walking alley, and sand-bedded resting stalls. Cows naturally separate their eating, walking, and sleeping areas. By allowing 24/7 freedom of movement, cortisol (stress hormone) drops, and milk yield increases identically by 10-15%. Provide individual resting stalls measuring 4x8 feet to prevent cows from stepping on each other's udders.",
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
          }
        ]
      },
      {
        id: 2, title: "Fodder & TMR Nutrition", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600", description: "Mixing customized scientifically calculated rations for high-yield animals.",
        subSteps: [
          {
            title: "Total Mixed Ration (TMR)",
            simpleExplanation: "Blending dry grass, green grass, and grains perfectly so cows eating every bite get balanced nutrition.",
            detailedExplanation: "Cows are notorious for 'sorting' their food—they will eat the tasty grains and push the dry roughage aside. This massive imbalance causes acute rumen acidosis (cow indigestion), dropping fat % and milk yield to zero. Total Mixed Ration (TMR) solves this. By mechanically chopping green fodder (corn silage, Napier grass), dry fodder (wheat straw), and concentrated feed (minerals, corn, soya cake) into a uniform moist blend, every single bite taken is nutritionally identical. The blend must be exactly 50% moisture.",
            materials: ["TMR Mixing Wagon / Chaff Cutter", "Corn Silage", "Dry Wheat Straw", "Concentrate pelleted feed"],
            instructions: [
              "Harvest green fodder (like Super Napier) and chop it mechanically to 1-2 inch lengths.",
              "Weigh out dry straw: roughly 1.5kg per 100kg of cow body weight.",
              "Add the custom concentrate mix based on milk yield (roughly 1kg concentrate per 2.5 Liters of milk produced).",
              "Combine all ingredients in the TMR wagon, adding water slowly until the mix feels like a damp sponge.",
              "Distribute evenly along the feed manger twice a day, pushing it closer to the cows every 2 hours."
            ],
            proTips: ["The 'Squeeze Test': Grab a handful of TMR and squeeze tightly. If water drips out, it's too wet. If it crumbles instantly, it's too dry. It should hold shape.", "Always feed cows right after milking when their appetite is highest."],
            mistakes: ["Feeding pure concentrate first thing in the morning, creating an instant lethal acid spike in the cow's stomach.", "Chopping straw too fine (under 0.5 inches) completely destroying the 'scratch factor' needed for cow digestion/cud-chewing."],
            bestPractices: ["Ensure 5-10% 'refusals' (leftover feed) the next morning to guarantee the cows were fed to their absolute maximum limit."],
            example: "Implementing TMR raised a farm's average milk fat content from 3.2% to 4.1% in just two weeks because rumen digestion was finally stabilized."
          }
        ]
      },
      {
        id: 3, title: "Heat Detection & Breeding", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600", description: "Perfecting the crucial 21-day breeding cycle to ensure one calf per year.",
        subSteps: [
          {
            title: "Artificial Insemination (AI) Timing",
            simpleExplanation: "Spotting when a cow is ready to breed and calling the vet at the exact right hour.",
            detailedExplanation: "A dairy cow must have a calf to produce milk. Finding out exactly when a cow is in 'heat' (estrus) is the hardest part of dairy farming. The heat window only lasts 12-18 hours every 21 days. If missed, you lose 21 days of milk for the next year. Cows in heat will try to mount other cows, bellow loudly, drop milk yield sharply, and discharge clear mucus. The AM-PM Rule dictates: If a cow demonstrates standing heat in the morning, breed her in the afternoon. If in the afternoon, breed her early next morning.",
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
            bestPractices: ["Use Sex-Sorted Semen on heifers (first-time breeders) specifically to rapidly expand your herd's genetics without buying outside cows."],
            example: "A farm improved their conception rate from 35% to 60% merely by implementing a dedicated 9 PM 'Silent Heat Walk' with a flashlight."
          }
        ]
      },
      {
        id: 4, title: "Machine Milking Hygiene", image: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?auto=format&fit=crop&q=80&w=600", description: "Harvesting pure, extremely clean milk without causing udder infections.",
        subSteps: [
          {
            title: "Pre & Post Teat Dipping",
            simpleExplanation: "Cleaning the udder before milking and sealing the holes after to stop bacteria.",
            detailedExplanation: "Mastitis (udder infection) destroys the udder, dropping milk output permanently and spiking Somatic Cell Count (SCC). When a cow is milked—by hand or machine—the teat sphincter opens fully and remains open for 30 minutes. If she lies down in manure during this window, bacteria rush straight up into the udder. A strict protocol consisting of 'Pre-dipping' (cleaning before) and 'Post-dipping' (iodine barrier after) completely locks down the udder's defenses.",
            materials: ["Iodine-based teat dip solutions", "Dip cups/spray bottles", "Single-use disposable paper towels", "Portable milking machine"],
            instructions: [
              "Dip each teat specifically into a foaming pre-dip antibacterial solution.",
              "Wait 30 seconds for the chemical to lift dirt and kill bacteria.",
              "Wipe each teat completely dry using ONE individual disposable paper towel per cow.",
              "Attach the milking machine cups. Milk for roughly 5-7 minutes.",
              "Disconnect vacuum before pulling off the cups to prevent tissue damage.",
              "Immediately immerse the entire teat in a thick post-dip Iodine solution."
            ],
            proTips: ["Throw completely fresh feed into the manger precisely when cows return from milking. This forces them to stand and eat for 45 minutes, allowing their teat sphincters to fully close.", "Check vacuum pressure daily; fluctuating vacuum injects bacteria reverse-up into the udder."],
            mistakes: ["Using the same wet cloth to wipe down 10 different cows, spreading mastitis instantly to the entire herd.", "Washing the whole udder with a water hose before milking. Water runs down, carrying dirt directly into the teat cups."],
            bestPractices: ["Strip the first 3 squirts of milk from each quarter onto a black plate. If clots are visible, mastitis is starting."],
            example: "Implementing mandatory use of individual paper towels for drying udders slashed clinical mastitis rates by 85% within a single month."
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
        id: 1, title: "Clean Milk Production", image: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?auto=format&fit=crop&q=80&w=600", description: "Executing strict sanitary milking procedures to extend shelf life.",
        subSteps: [
          {
            title: "Sanitary Milking Protocol",
            simpleExplanation: "Washing hands and udders deeply so milk stays fresh and doesn't spoil quickly.",
            detailedExplanation: "Raw milk is sterile inside the healthy udder. The moment it exits, it is highly susceptible to bacterial contamination from the air, the milker's hands, the cow's skin, and dirty buckets. High bacterial counts cause milk to sour rapidly. A 'Clean Milk' protocol ensures zero physical contact between dirt and milk, utilizing narrow-mouthed stainless-steel domes instead of wide-open plastic buckets.",
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
          }
        ]
      },
      {
        id: 2, title: "Calf Rearing", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600", description: "Ensuring survival and explosive growth of the newborn replacement herd.",
        subSteps: [
          {
            title: "Colostrum & Navel Care",
            simpleExplanation: "Feeding the absolutely vital first milk and stopping infections at the belly-button.",
            detailedExplanation: "A calf is born with absolutely zero immune system. It receives 100% of its initial antibodies from 'Colostrum'—the cow's very first deeply yellowish milk after birth. The calf's stomach can only absorb these giant antibody proteins for the first 12-24 hours. If colostrum is delayed, the calf will almost certainly die from diarrhea (scours) or pneumonia within 3 weeks. Similarly, the wet umbilical cord acts like an open straw directly into the calf's liver for bacteria.",
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
            bestPractices: ["Weigh calves weekly; aim for a minimum of 500-700 grams of daily permanent weight gain."],
            example: "Ensuring every calf receives 4 Liters of colostrum within the first 6 hours slashed one farmer's calf mortality from a devastating 30% to zero."
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
        id: 1, title: "Elevated Slatted Housing", image: "https://images.unsplash.com/photo-1596733430284-f74370603092?auto=format&fit=crop&q=80&w=600", description: "Building wooden or plastic raised floors to eliminate goat pneumonia and foot rot.",
        subSteps: [
          {
            title: "Machaan System Formulation",
            simpleExplanation: "Putting goats on a raised wooden deck so their poop falls through the cracks, keeping them perfectly dry.",
            detailedExplanation: "Goats are highly susceptible to moisture-related diseases. Ammonia from their urine damages their lungs (Pneumonia), and standing in wet feces rots their hooves (Foot Rot). The 'Machaan' or Elevated Slatted Floor system places the goats 3 to 4 feet off the ground on wooden slats or heavy plastic grids. Gravity pulls urine and pellets instantly into the pit below, ensuring the goats remain permanently dry. Goats love high places, which reduces stress and fighting.",
            materials: ["Hardwood slats or heavy-duty plastic grids", "Wooden/Concrete support pillars", "Corrugated roofing sheets", "Outer mesh wire"],
            instructions: [
              "Construct support pillars keeping the floor exactly 3 to 4 feet off the ground.",
              "Install the wooden slats, leaving exactly a 1.5 cm gap between each slat.",
              "Slope the ground underneath the shed slightly to allow urine to drain into an outer gutter.",
              "Build a heavy, rain-proof roof with deep overhangs so driving rain cannot enter the sides.",
              "Attach V-shaped feeding mangers on the outside perimeter of the shed so goats poke their heads out to eat."
            ],
            proTips: ["If the slat gap is less than 1cm, poop gets stuck. If it is more than 2cm, baby goat hooves will get trapped and break.", "V-shaped external feeders stop goats from walking and pooping inside their own food."],
            mistakes: ["Using smooth slippery flooring where goats slip and break legs.", "Creating an airtight shed; goats need massive ventilation across the top to remove smells."],
            bestPractices: ["Sprinkle lime powder in the manure pit below every week to instantly kill flies and neutralize odors."],
            example: "A farm struggling with 15% pneumonia mortality transitioned to elevated slatted flooring and saw respiratory diseases drop completely to zero within two weeks."
          }
        ]
      },
      {
        id: 2, title: "Feeding & Grazing Mgmt", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=600", description: "Optimizing stall-feeding combinations for maximum daily weight gain.",
        subSteps: [
          {
            title: "Stall-Fed Nutrition Strategy",
            simpleExplanation: "Bringing cut grass and grains directly to the goats instead of letting them wander.",
            detailedExplanation: "While free-grazing is cheap, goats waste 40% of their energy walking. 'Zero Grazing' or Stall Feeding forces all energy entirely into meat weight-gain. Goats are 'browsers', meaning they naturally prefer eating leaves and brush at eye-level rather than grass on the ground. A balanced high-growth diet consists of roughly 60% green fodder (Subabul, Lucerne, Jackfruit leaves), 30% dry fodder (Gram husk, wheat straw), and 10% concentrated pelleted feed with minerals.",
            materials: ["Green Fodder (Subabul/Moringa)", "Dry Straw/Husk", "Concentrate pellet feed", "Mineral salt licks"],
            instructions: [
              "Hang bundles of green leafy branches high up on the shed walls to mimic natural browsing.",
              "Provide dry fodder in the morning to stabilize their sensitive rumens.",
              "Provide the chopped green fodder during the hot afternoon.",
              "Provide concentrated feed (approx 200g per adult goat) in the evening.",
              "Hang large Himalayan mineral salt blocks inside the shed exactly at head height."
            ],
            proTips: ["Never feed freshly cut wet grass (especially with morning dew) as it causes instantly fatal bloating. Let it wilt in the sun for 2 hours.", "Goats heavily prefer variety; entirely changing the leaf type every 3 days massively increases consumption."],
            mistakes: ["Feeding concentrated grain instantly to a hungry goat, causing acute acidosis and death.", "Mixing the feed directly on the floor where they walk."],
            bestPractices: ["Ensure clean water is changed twice a day. Goats are notoriously picky and will dehydrate rather than drink dirty water."],
            example: "Switching from 10km daily grazing to intensive strict stall-feeding doubled the daily weight gain of Boer-cross kids from 80g/day to 160g/day."
          }
        ]
      },
      {
        id: 3, title: "Breeding & Genetic Lineage", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600", description: "Managing bucks carefully to produce heavy kids and avoid dangerous inbreeding.",
        subSteps: [
          {
            title: "Buck Rotation & Kidding",
            simpleExplanation: "Changing the male goat every two years so he doesn't mate with his own daughters.",
            detailedExplanation: "Inbreeding is the silently lethal killer of profitable goat farms. When a 'Buck' (male goat) mates with his daughters or granddaughters, the offspring suffer from stunted growth, weak immune systems, and massive infant mortality. A strict breeding protocol mandates changing the primary farm Buck every 1.5 to 2 years. Goats breed readily; the gestation period is exactly 145-150 days. By timing the breeding properly, a skilled farmer can achieve 3 'kiddings' (batches of babies) every 2 years.",
            materials: ["High-pedigree Breeder Buck", "Colored neck tags", "Weight scales", "Iodine for newborn navels"],
            instructions: [
              "Keep the main Buck completely isolated in a separate, highly reinforced pen away from females.",
              "Introduce the Buck to the female herd for precisely 30 days during the breeding season, then remove him entirely.",
              "Record the exact mating date to predict the kidding date (mating + 150 days).",
              "Isolate heavily pregnant females into a dedicated, deeply bedded 'Kidding Pen' 1 week before delivery.",
              "Change the Buck entirely by selling him and buying a new pedigree Buck from a completely different region every 18 months."
            ],
            proTips: ["To synchronize heat across all females, keep the Buck utterly out of smell/sight for 2 months, then suddenly introduce him into the pen (The 'Buck Effect').", "Feed the females an extra 100g of concentrate daily 3 weeks before breeding (called 'Flushing') to dramatically increase twins/triplets."],
            mistakes: ["Leaving the Buck with the females year-round, resulting in random unpredictable births and severe inbreeding.", "Breeding weak females that weigh under 20kg; they will die during delivery."],
            bestPractices: ["Tag every single newborn ear and log the mother/father ID in a ledger instantly."],
            example: "By implementing strict 18-month Buck rotation, a farm entirely eliminated the 'stunted growth' syndrome that was plaguing 30% of their kids."
          }
        ]
      },
      {
        id: 4, title: "Disease & Deworming", image: "https://images.unsplash.com/photo-1529511582893-2d7e684dd128?auto=format&fit=crop&q=80&w=600", description: "Executing aggressive preventative medical regimes to defend against parasitic wipedouts.",
        subSteps: [
          {
            title: "Strategic Deworming & Vaccination",
            simpleExplanation: "Giving medicines down the throat and under the skin to kill internal pests and viruses.",
            detailedExplanation: "Goats are highly vulnerable to internal stomach worms and major viral plagues like PPR (Goat Plague) and ET (Enterotoxemia / Overeating Disease). Internal worms drain blood, causing extreme anemia (indicated by pale white inner eyelids) and 'bottle-jaw' (fluid swelling under the chin). Dewormers (Anthelmintics) must be rotated to prevent the parasites from building genetic immunity. The ET vaccine is critical because healthy, fast-growing goats eating rich diets are the most likely to die suddenly from it.",
            materials: ["Deworming suspensions (Albendazole/Ivermectin)", "Oral drenching gun", "PPR & ET Vaccines", "Cold thermos for vaccines"],
            instructions: [
              "Perform a 'FAMACHA' check every month: pull down the lower eyelid; if it's pale white/yellow, the goat is severely wormy.",
              "Administer oral liquid dewormer precisely based on body weight right before the monsoon starts.",
              "Rotate the chemical family of the dewormer every single year.",
              "Vaccinate all goats older than 3 months against ET (Enterotoxemia) annually.",
              "Vaccinate against PPR strictly once in the goat's lifetime (it provides lifelong immunity)."
            ],
            proTips: ["Always fast the goats for 12 hours before administering oral dewormers to maximize the chemical's contact with the stomach lining.", "After deworming, do not let them out to graze for 24 hours to prevent contaminating the pasture with expelled worm eggs."],
            mistakes: ["Underdosing the dewormer; this doesn't kill the worms, it only trains them to become absolutely immune to the drug.", "Vaccinating pregnant goats in their last trimester; the stress causes instant abortions."],
            bestPractices: ["Isolate and heavily deworm any newly purchased goat for 14 full days before letting it touch your main herd."],
            example: "A farm losing robust, healthy adults instantly to 'overeating disease' (ET) stopped the sudden deaths entirely by implementing a strict 6-month booster vaccine mandate."
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
        id: 1, title: "Pasture Management", image: "https://images.unsplash.com/photo-1606900223709-ae9fb5d7daee?auto=format&fit=crop&q=80&w=600", description: "Managing land strategically to feed the flock efficiently year-round.",
        subSteps: [
          {
            title: "Rotational Grazing Systems",
            simpleExplanation: "Moving sheep between small fenced fields so the grass always grows back perfectly.",
            detailedExplanation: "Unlike goats, which browse high leaves, sheep are low-grazers holding their heads entirely down, biting grass extremely close to the soil. If left in one massive field permanently, they will overgraze the most delicious grass to absolute death, leaving only toxic weeds. 'Rotational Grazing' solves this. The large farm is split into 4 to 6 smaller fields (paddocks) using electric or mesh fencing. The massive flock is packed densely into one paddock for exactly 3-5 days to eat everything evenly, then moved entirely to the next, giving the first paddock 20 days of total rest to regenerate completely.",
            materials: ["Portable electric fencing", "Solar fencers", "Drought-resistant grass seeds (Rhodes/Stylo)", "Portable water troughs"],
            instructions: [
              "Divide the overall grazing land into 6 equal paddocks using fencing.",
              "Seed the paddocks with high-protein legumes/grasses right before the monsoons.",
              "Release the entire heavy flock into Paddock 1. Provide an easily movable water trough.",
              "On day 4, open the gate and herd the entire flock directly into Paddock 2.",
              "Do not allow a single sheep back into Paddock 1 until exactly 20-30 days have passed."
            ],
            proTips: ["Never graze sheep early in the morning while dew is still heavy on the grass; the moisture holds millions of live parasite larvae near the tips.", "Allow the grass to grow to at least 6 inches before moving sheep into the paddock."],
            mistakes: ["Leaving sheep in one paddock for 14 days. The grass will try to shoot up new highly nutritious leaves, which the sheep immediately bite off, killing the root systems.", "Forgetting to move the water trough, forcing sheep to walk miles daily and lose critical fat cover."],
            bestPractices: ["If you also own cattle, graze the cattle first, then move the sheep in behind them a day later to clean up the lower grasses."],
            example: "Implementing highly dense rotational grazing allowed a farmer to precisely double his sheep carrying capacity from 10 sheep/acre to 20 sheep/acre on the exact same land layout."
          }
        ]
      },
      {
        id: 2, title: "Health & Hoof Care", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=600", description: "Aggressively preventing extreme lameness and devastating fly-strike.",
        subSteps: [
          {
            title: "Hoof Trimming & Dipping",
            simpleExplanation: "Cutting the over-grown toenails of the sheep and making them walk through absolute chemical baths to kill foot rot.",
            detailedExplanation: "Sheep hooves grow continuously exactly like human fingernails. In soft, muddy, or wet pasture, they do not wear down naturally. The outer hoof wall curls powerfully underneath the pad, trapping massive amounts of mud and highly contagious bacteria. This causes 'Foot Rot', dissolving the hoof and leaving the sheep entirely crippled and unable to graze. Routine aggressive physical trimming with heavy shears, combined with passing the entire massive flock through a chemical footbath, is non-negotiable.",
            materials: ["Heavy-duty hoof shears", "Walk-through footbath trough", "Zinc Sulphate / Copper Sulphate solution"],
            instructions: [
              "Gather the flock in a tight, highly restrictive chute area twice a year minimum.",
              "Flip the sheep safely onto its rump to immobilize it.",
              "Using shears, aggressively cut away all the overlapping folded horn material until the hoof pad is perfectly flat.",
              "Set up a long, narrow waterproof trough specifically at the exit gate of the yard.",
              "Mix a 10% Zinc Sulphate chemical solution powerfully in the trough.",
              "Force the flock to slowly walk entirely through the bath, ensuring every hoof gets completely soaked."
            ],
            proTips: ["Trim hooves a day after heavy rain when the massive horn material is soft and drastically easier to cut.", "Keep sheep standing safely on dry concrete for 1 hour exactly after the footbath so the chemical absolutely dries in."],
            mistakes: ["Trimming aggressively too deep and drawing massive blood, creating a massive new entry point for deadly infections.", "Leaving the heavily infected hoof clippings entirely on the pen floor, instantly re-infecting completely healthy sheep."],
            bestPractices: ["Instantly isolate severely limping sheep into a 'Hospital Pen'. Foot rot is highly contagious to the entire flock."],
            example: "Installing a permanent heavy concrete footbath at the entrance of the main shed slashed the massive incidence of lameness across a 200-head flock to zero."
          }
        ]
      }
    ]
  }
];
