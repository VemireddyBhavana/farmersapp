import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { BookOpen, Leaf, Fish, Bird, Landmark, ArrowRight, Tractor as TractorIcon, Clock, Calendar, User, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
    title: string; summary: string; date: string; readTime: string; author: string; tags: string[];
    fullContent: { heading: string; body: string }[];
}

const KNOWLEDGE_DATA: Record<string, { title: string; icon: any; color: string; headerBg: string; desc: string; articles: Article[] }> = {
    agriculture: {
        title: "Agriculture & Cropping", icon: TractorIcon,
        color: "bg-emerald-100 text-emerald-700 border-emerald-200", headerBg: "bg-emerald-700",
        desc: "Detailed guides on crop cultivation, soil management, and modern farming techniques.",
        articles: [
            {
                title: "Understanding Soil pH and Its Impact on Crop Yield",
                summary: "Soil acidity affects nutrient availability. A pH of 6–7 is ideal. Discover how lime and sulfur can correct imbalances.",
                date: "Dec 10, 2023", readTime: "5 min", author: "Agri Expert Team", tags: ["Soil Science", "Cropping"],
                fullContent: [
                    { heading: "What is Soil pH?", body: "Soil pH measures the hydrogen ion concentration on a scale of 0-14. A pH below 7 is acidic, above 7 is alkaline, and 7 is neutral. Most Indian crops prefer a slightly acidic to neutral range (6.0–7.0) for optimal nutrient uptake." },
                    { heading: "Why pH Matters for Your Crop", body: "When soil pH is outside the ideal range, essential nutrients like Nitrogen, Phosphorus, and Potassium become 'locked up' and unavailable to plant roots even if you've applied plenty of fertilizer. This leads to deficiency symptoms and poor yields despite high fertilizer expenditure." },
                    { heading: "How to Test Soil pH", body: "Get a soil testing kit from your nearest Krishi Vigyan Kendra (KVK) or use a digital pH meter. Collect samples from 15 cm depth, 5 spots per acre. Mix samples, dry, and test. Repeat every 2-3 years." },
                    { heading: "Correcting Acidic Soil (pH below 6)", body: "Apply agricultural lime (calcium carbonate) at 1–2 tons per acre. Use dolomitic lime if magnesium is also needed. Apply 2–3 months before sowing to allow full integration. Wood ash is a low-cost organic alternative." },
                    { heading: "Correcting Alkaline Soil (pH above 7.5)", body: "Apply elemental sulfur at 100–200 kg/acre. Gypsum (calcium sulfate) is effective for sodic soils. Incorporate organic matter like compost, which naturally lowers pH over time. Acidifying fertilizers like ammonium sulfate also help." },
                    { heading: "Crop-wise Ideal pH Guide", body: "Rice: 5.5–6.5 | Wheat: 6.0–7.5 | Maize: 5.5–7.0 | Tomato: 5.5–7.0 | Potatoes: 4.8–5.5 | Soybean: 6.0–7.0 | Cotton: 5.5–8.0. Match your crop to your soil or amend accordingly." },
                ]
            },
            {
                title: "Drip Irrigation: Cost, Setup, and Benefits",
                summary: "Drip irrigation reduces water consumption by up to 50%. This guide covers system costs, subsidies, and installation steps.",
                date: "Nov 28, 2023", readTime: "8 min", author: "Dr. K. Reddy", tags: ["Irrigation", "Technology"],
                fullContent: [
                    { heading: "What is Drip Irrigation?", body: "Drip irrigation delivers water directly to the plant root zone through a network of pipes, tubes and emitters. It is the most water-efficient irrigation method available, reducing water use by 30–50% compared to flood irrigation." },
                    { heading: "Cost of Installation", body: "For a 1-acre drip system: Main pipe (₹2,000–4,000), Sub-main pipes (₹1,500–3,000), Lateral pipes with drippers (₹3,000–6,000), Filter unit (₹2,000–4,000), Control valve & fittings (₹1,000–2,000). Total estimated cost: ₹10,000–20,000 per acre before subsidies." },
                    { heading: "Government Subsidies Available", body: "Under PMKSY (Pradhan Mantri Krishi Sinchayee Yojana), small & marginal farmers receive 55% subsidy. Other farmers receive 45% subsidy. Subsidies are available through your State Horticulture Department. Apply via the National Agriculture Market portal or at your local agriculture office." },
                    { heading: "Step-by-Step Installation Guide", body: "1. Design the layout mapping your field. 2. Install the pump and filtration unit at the water source. 3. Lay main and sub-main lines. 4. Connect lateral lines with drippers spaced at plant intervals (30–60 cm typically). 5. Test the system for pressure uniformity. 6. Set an automated timer for irrigation schedules." },
                    { heading: "Key Benefits", body: "Water savings of 30–50% | Fertilizer savings via fertigation (20–30%) | Reduced weed growth | Lower labor costs | Up to 30–40% higher crop yields reported in trials | Suitable for irregular terrain." },
                ]
            },
            {
                title: "Integrated Pest Management (IPM): A Complete Guide",
                summary: "IPM combines biological, cultural, and chemical methods to manage pests with the least environmental damage.",
                date: "Sep 18, 2023", readTime: "12 min", author: "Dr. M. Sharma", tags: ["Pest Control", "IPM"],
                fullContent: [
                    { heading: "What is IPM?", body: "Integrated Pest Management (IPM) is a science-based, decision-making process that combines preventive tactics, biological controls, cultural practices, and targeted pesticide use to manage pest populations in an economically and environmentally sound manner." },
                    { heading: "Step 1: Monitoring and Scouting", body: "Walk your fields every 3–5 days and record pest populations. Use sticky traps and pheromone traps to monitor adult insect populations. Set an Economic Threshold Level (ETL)—the pest density at which damage justifies control action. Act only when ETL is reached." },
                    { heading: "Step 2: Biological Controls", body: "Introduce or conserve natural enemies: Trichogramma egg parasitoids control stem borers | Chrysoperla (lacewings) eat aphids and whiteflies | Bacillus thuringiensis (Bt) sprays control caterpillars | Neem-based formulations (Azadirachtin 0.03%) disrupt insect growth." },
                    { heading: "Step 3: Cultural Controls", body: "Deep summer plowing (breaks pest life cycles) | Crop rotation (disrupts host-specific pests) | Removal and burning of infected crop debris | Resistant/tolerant variety selection | Light traps for nocturnal moths (1 trap per acre)." },
                    { heading: "Step 4: Chemical Controls (Last Resort)", body: "Use narrow-spectrum, low-toxicity pesticides. Follow labels strictly. Rotate chemical groups to prevent resistance. Avoid spraying during flowering to protect pollinators. Use recommended dosages—more is not better and risks groundwater contamination." },
                ]
            },
        ]
    },
    livestock: {
        title: "Livestock & Dairy", icon: Bird,
        color: "bg-amber-100 text-amber-700 border-amber-200", headerBg: "bg-amber-700",
        desc: "Best practices for animal husbandry, milk production, and profitable dairy farming.",
        articles: [
            {
                title: "Setting Up a Profitable 10-Cow Dairy Farm",
                summary: "A complete financial model for starting a small dairy farm, covering shed costs, feed expenses, milk yield, and revenue projections.",
                date: "Dec 08, 2023", readTime: "15 min", author: "Dairy Biz India", tags: ["Dairy Farming", "Business Plan"],
                fullContent: [
                    { heading: "Initial Investment Breakdown", body: "Land preparation & shed construction (1000 sq ft): ₹2,50,000 | 10 HF/Jersey cows @ ₹60,000 each: ₹6,00,000 | Milking equipment & storage: ₹80,000 | Water & electricity setup: ₹30,000 | Working capital (3 months feed): ₹1,20,000. Total: ~₹10,80,000. Expect 25–35% NABARD subsidy under Dairy Entrepreneurship Development Scheme (DEDS)." },
                    { heading: "Daily Feed Requirements Per Cow", body: "Roughage (green fodder like Napier grass): 25–30 kg/day. Dry fodder (hay/straw): 5–7 kg/day. Concentrate feed (protein-rich pellets): 1 kg per 2.5 liters of milk produced. Salt & mineral mixture: 50–80 grams/day. Total feed cost per cow: ₹150–200/day." },
                    { heading: "Expected Revenue", body: "A good HF cross cow produces 20–25 liters/day. At ₹35–40/liter (co-operative price), revenue per cow/day: ₹700–1,000. For 10 cows, total daily milk revenue: ₹7,000–10,000. Monthly milk revenue: ₹2,10,000–3,00,000. Subtract monthly operating costs (₹1,20,000–1,50,000). Net monthly profit: ₹60,000–1,50,000." },
                    { heading: "Important Subsidies", body: "DEDS (Dairy Entrepreneurship Development Scheme) via NABARD: 25% subsidy for general, 33.33% for SC/ST. State Milk Federation support for cooperative registration. PM Kisan scheme for feed crop cultivation on your farm land." },
                    { heading: "Key Success Factors", body: "Source quality cross-bred animals with high milk records. Maintain hygiene strictly—mastitis alone reduces yield by 20%. Ensure green fodder availability (cultivate Napier grass or Co-4 fodder). Join the nearest dairy cooperative for guaranteed price and veterinary support." },
                ]
            },
            {
                title: "Top 5 Indigenous Cow Breeds for High Milk Production",
                summary: "Gir, Sahiwal, Red Sindhi, Rathi, and Tharparkar compared by yield, fat percentage, and climate adaptability.",
                date: "Nov 20, 2023", readTime: "6 min", author: "NDDB Expert", tags: ["Cow Breeds", "Dairy"],
                fullContent: [
                    { heading: "1. Gir (Native to Gujarat)", body: "Average milk yield: 1,200–2,000 liters per lactation (6–7 liters/day). Fat content: 4.5–5.5%. Excellent for hot, arid conditions. Disease resistant. Exported globally—used in Brazil's cattle industry. Best for: Gujarat, Rajasthan, Maharashtra." },
                    { heading: "2. Sahiwal (Native to Punjab/Pakistan border)", body: "Average milk yield: 2,000–3,000 liters per lactation (8–10 liters/day). Fat content: 4.5–5%. Most productive indigenous breed. Tick-resistant and heat-tolerant. Crosses with HF produce outstanding yields. Best for: Punjab, Haryana, UP." },
                    { heading: "3. Red Sindhi (Originally from Sindh)", body: "Milk yield: 1,500–2,500 liters per lactation. Fat: 4.5–5%. Excellent adaptability to hot, humid conditions. Heavy milker for a zebu breed. Being promoted under conservation programs. Best for: Tamil Nadu, Kerala, Andhra Pradesh." },
                    { heading: "4. Rathi (Native to Rajasthan)", body: "Milk yield: 1,062–1,800 liters per lactation. Fat: 4.5–5.2%. Dual-purpose (milk and draft). Excellent in semi-arid conditions. Known for easy calving and good maternal traits. Best for: Rajasthan, western India." },
                    { heading: "5. Tharparkar (Desert breed)", body: "Milk yield: 1,400–1,800 liters per lactation. Fat: 4.5–5.5%. Supreme adaptability to extreme heat and scarce water. Long survival without water. Government conservation programs active. Best for: Rajasthan, Gujarat, Kutch region." },
                ]
            },
            {
                title: "Common Cattle Diseases and Prevention",
                summary: "FMD, Brucellosis, and Black Quarter are major threats. Learn vaccination schedules and isolation protocols.",
                date: "Oct 14, 2023", readTime: "7 min", author: "Dr. S. Nair (Vet)", tags: ["Animal Health", "Vaccination"],
                fullContent: [
                    { heading: "1. Foot and Mouth Disease (FMD)", body: "Symptoms: High fever, blisters on mouth, tongue, and hooves. Causes severe production loss. Vaccination: Mandatory vaccination every 6 months using trivalent FMD vaccine. Government provides free vaccination under National Animal Disease Control Programme (NADCP). Quarantine infected animals immediately." },
                    { heading: "2. Brucellosis (Contagious Abortion)", body: "Symptoms: Abortions in last trimester, retained placenta, reduced fertility. Zoonotic—dangerous for humans handling infected animals. Control: Vaccinate all calves (4–8 months age) with Brucella abortus Strain 19 vaccine. Use gloves when handling aborted material. Report to veterinary authorities." },
                    { heading: "3. Black Quarter (BQ)", body: "Symptoms: Sudden high fever, swelling in hind quarter muscles, severe lameness, crackling sound. Rapid death (24–48 hours). Prevention: Annual BQ vaccine before monsoon. No effective treatment once advanced. Bury/burn dead animals at least 2 meters deep with lime." },
                    { heading: "4. Mastitis (Udder Infection)", body: "Symptoms: Hard, hot, swollen udder, clots or watery milk, cow refusing milking. Causes 20–30% milk production loss. Prevention: Clean udder before milking, teat disinfection, dry cow therapy with antibiotics. Treatment: Intra-mammary antibiotic tubes (consult vet)." },
                    { heading: "Vaccination Calendar", body: "January: FMD vaccine | March: HS (Hemorrhagic Septicemia) | May: BQ vaccine | July: FMD booster | September: Brucellosis (calves) | November: Theileriosis vaccine in endemic areas." },
                ]
            },
        ]
    },
    aquaculture: {
        title: "Aquaculture & Fishing", icon: Fish,
        color: "bg-blue-100 text-blue-700 border-blue-200", headerBg: "bg-blue-700",
        desc: "Expert advice on fish farming, shrimp breeding, and pond management.",
        articles: [
            {
                title: "Biofloc Fish Farming: A Complete Step-by-Step Setup Guide",
                summary: "Biofloc technology uses beneficial microbes to clean water and provide supplemental feed, reducing costs by up to 30%.",
                date: "Dec 01, 2023", readTime: "12 min", author: "Aqua Research India", tags: ["Biofloc", "Technology"],
                fullContent: [
                    { heading: "What is Biofloc Technology (BFT)?", body: "Biofloc technology creates a controlled environment where beneficial microorganisms (bacteria, algae, fungi) aggregate into dense 'flocs.' These flocs serve as a biological water treatment system AND a supplemental feed source rich in protein (25–40%), significantly reducing feed costs and water exchange needs." },
                    { heading: "Pond/Tank Setup", body: "Can be set up in earthen ponds OR Round tanks (HDPE). Optimal depth: 1-1.5 meters. Aeration is critical: Install paddlewheel aerators or air blowers at 1 HP per 1,000 sqm. Maintain dissolved oxygen above 5 mg/L at all times. Shade 30–40% of water surface in summer to reduce algae overgrowth." },
                    { heading: "Carbon-to-Nitrogen Ratio (C:N)", body: "BFT works by maintaining a C:N ratio of 15:1 or higher. Feed provides Nitrogen; add Carbon sources (molasses, tapioca flour, jaggery) to balance. Rule: For every 1 kg of feed given, add 200–250g of molasses (80% C) to maintain the ratio and promote healthy biofloc formation." },
                    { heading: "Stocking and Species", body: "Best species for BFT: Tilapia (Oreochromis niloticus) – 1.5–3 kg/m³. Catfish – 2–4 kg/m³. Vannamei shrimp – 300–400 PL/m². Harvest tilapia at 500–700g (5–6 months). Perform partial water exchange (10–20%) only when TAN (Total Ammonia Nitrogen) exceeds 3 ppm." },
                    { heading: "Economics (Per 1 Acre)", body: "Setup cost: ₹3–5 lakhs. Feed cost reduction: 20–30% vs. traditional. Production: 6,000–10,000 kg tilapia/crop. Revenue (₹80–100/kg): ₹4.8–10 lakhs. Profit per crop: ₹1.5–3 lakhs. Payback period: 2–3 crops (1–1.5 years)." },
                ]
            },
            {
                title: "Vannamei Shrimp Farming: Complete Beginner's Guide",
                summary: "Litopenaeus Vannamei is India's most profitable shrimp. Learn pond prep, stocking, and achieving 3 crops per year.",
                date: "Nov 15, 2023", readTime: "10 min", author: "Dr. P. Coastal Labs", tags: ["Shrimp", "Vannamei"],
                fullContent: [
                    { heading: "Why Vannamei?", body: "Pacific White Shrimp (Vannamei) accounts for 85% of India's shrimp exports. Fast growth (harvest in 90–100 days), euryhaline (tolerates 0.5–45 ppt salinity), high FCR efficiency (1.3–1.5:1), and resistance to most local shrimp diseases make it ideal for coastal Andhra Pradesh, Tamil Nadu, Odisha, and Gujarat." },
                    { heading: "Pond Preparation", body: "Drain and dry pond for 10–15 days. Remove organic sludge and apply agricultural lime at 500–1000 kg/ha. Fill to 1–1.5m with filtered seawater (15–25 ppt salinity). Fertilize with urea (25 kg/ha) + single super phosphate (50 kg/ha) for plankton bloom. Check phytoplankton bloom (Secchi disc reading 30–40cm) before stocking." },
                    { heading: "Stocking Density & PL Quality", body: "Semi-intensive: 40–60 PL/m². Intensive: 80–120 PL/m². Source SPF (Specific Pathogen Free) certified post-larvae from licensed hatcheries only. Conduct acclimatization to pond water temperature and salinity over 30–60 minutes before release." },
                    { heading: "Feeding Management", body: "Use 4-tray feeding method: Install 4 check trays per acre. Feed what disappears from trays in 90 minutes. Feed 5–6 times/day. Use quality 35% protein pellets. Reduce feed if trays have leftover—prevents water fouling." },
                    { heading: "Water Quality Targets", body: "DO > 5 ppm | pH 7.5–8.5 | Salinity 15–25 ppt | Temperature 28–32°C | Ammonia < 0.1 ppm | Nitrite < 0.1 ppm. Maintain with aeration, probiotics (weekly), and water exchange (max 20%/week) only for correction." },
                    { heading: "Harvest & Revenue", body: "Harvest at 90–100 days @ 20–25g/shrimp. Expected yield: 5,000–8,000 kg/ha per crop. At ₹350–400/kg (count-30), revenue: ₹17.5–32 lakhs/ha per crop. 3 crops/year possible in warm coastal areas. Net profit after expenses: ₹6–12 lakhs/crop." },
                ]
            },
            {
                title: "White Spot Syndrome Virus (WSSV): Prevention & Response",
                summary: "WSSV can wipe out an entire crop in days. Learn biosecurity measures and emergency response protocols.",
                date: "Sep 22, 2023", readTime: "7 min", author: "Coastal Disease Lab", tags: ["Shrimp Disease", "Biosecurity"],
                fullContent: [
                    { heading: "What is WSSV?", body: "White Spot Syndrome Virus is the most devastating shrimp pathogen globally. Infected shrimp show white spots on the shell (calcium deposits), reddish coloration, and stop eating. Mortality can reach 100% within 3–10 days. There is NO effective treatment—only prevention." },
                    { heading: "How WSSV Spreads", body: "Infected live feed (wild artemia, copepods) | Wild crustaceans entering ponds (crabs, wild shrimp) | Contaminated pond water or equipment | Infected post-larvae from poor-quality hatcheries | Birds carrying infected shrimp between ponds." },
                    { heading: "Biosecurity Measures (Prevention)", body: "1. Source only SPF-certified PL from reputable hatcheries. 2. Install bird netting over all ponds. 3. Screen intake water through 60–100 micron filter mesh. 4. Disinfect all equipment (nets, buckets) with 200 ppm chlorine before use. 5. Restrict farm access—use footbaths with 5% lime at entry. 6. Test water source for viral load periodically via PCR test." },
                    { heading: "Early Warning Signs", body: "Shrimp gathering at pond edges (unusual behavior). Reduction in feed consumption by >30% overnight. Reddish coloration of affected shrimp. White spots visible under the carapace. If these appear, immediately stop feeding and collect samples for PCR testing." },
                    { heading: "Emergency Response Protocol", body: "1. Stop all water exchange immediately. 2. Harvest whatever you can if shrimp exceed 12g (even at distress sale price). 3. Treat remaining pond with Saponin (100 ppm) to destroy all crustaceans. 4. Drain, dry, and apply lime (2,000 kg/ha). 5. Do NOT drain infected water into canals/sea—disinfect first with bleach (25 ppm chlorine, 30 min contact time). 6. Report to State Fisheries Department." },
                ]
            },
        ]
    },
    horticulture: {
        title: "Horticulture & Gardening", icon: Leaf,
        color: "bg-lime-100 text-lime-700 border-lime-200", headerBg: "bg-lime-700",
        desc: "Insights into growing fruits, vegetables, flowers, and ornamental plants using modern horticultural techniques.",
        articles: [
            {
                title: "High-Density Apple Orchards: Profitability Guide",
                summary: "High-density orchards using M-9 rootstocks yield 60–80 tons/ha vs 20–25 tons traditionally. Understand the setup cost and payback period.",
                date: "Dec 05, 2023", readTime: "10 min", author: "HPKV Orchard Experts", tags: ["Apple", "High Density"],
                fullContent: [
                    { heading: "Traditional vs. High-Density System", body: "Traditional orchards plant 100–200 trees/ha using vigorous rootstocks. They start producing at 8–10 years and yield 20–25 tons/ha. High-density orchards plant 1,250–3,300 trees/ha on dwarfing rootstocks (M-9, M-26). Production begins at year 3–4 and yields 60–80+ tons/ha. Premium quality, uniform-size fruit commands higher market prices." },
                    { heading: "Best Varieties for India", body: "Himachali: Fuji, Gala, Red Delicious. Kashmir: Ambri, Razakwadi. Cold-zone HD systems: Gala Must, Brookfield Gala, Fuji Kiku. Choose self-fertile varieties or plant pollinizers (1:8 ratio) to ensure fruit set." },
                    { heading: "Rootstock Selection", body: "M-9: Most dwarfing, highest density possible, requires full trellising support, best production. M-26: Semi-dwarfing, less support needed, good for hillsides. MM-106: Semi-vigorous, useful in poorer soils. Select based on soil depth and water availability." },
                    { heading: "Trellis and Training System", body: "Install wooden or concrete posts at 6m intervals, 3m tall. Use 3 lines of 12-gauge galvanized wire at 60cm, 120cm, 180cm heights. Train trees in a vertical axis or tall spindle shape. Annual pruning to maintain light penetration is critical for color and quality." },
                    { heading: "Investment and Returns", body: "Setup cost (per acre): Plants + rootstocks: ₹2,00,000 | Trellis system: ₹1,50,000 | Irrigation: ₹80,000 | Labor: ₹50,000/year. Total 5-yr investment: ~₹8 lakhs. From year 4, revenue at 15 tons/acre × ₹50/kg = ₹7.5 lakhs/yr. Break even by year 6–7. Steady profit ₹3–5 lakhs/acre/year thereafter." },
                ]
            },
            {
                title: "Indoor Saffron Farming: Costs, Profit, and Training",
                summary: "Indoor saffron grows in 500 sq ft. At ₹300–500/gram, 300–500 grams per season is achievable.",
                date: "Nov 08, 2023", readTime: "9 min", author: "AgriTech Magazine", tags: ["Saffron", "Indoor Farming"],
                fullContent: [
                    { heading: "Why Indoor Saffron?", body: "Traditional Kashmiri saffron cultivation is constrained by geography. Indoor hydroponic saffron farming allows anyone to grow this incredibly valuable spice (₹2–3 lakh/kg retail) using vertical shelf systems in climate-controlled rooms, with 2 crops per year instead of 1." },
                    { heading: "Setup Requirements", body: "Room size: 500–1000 sqft (controlled). LED grow lights: Full-spectrum, 12–16 hrs during vegetative; short day (8 hrs) to trigger flowering. Temperature: 15–20°C for vegetative; 6–12°C for flowering trigger (simulates winter). Humidity: 60–80%. Trays with coconut coir substrate." },
                    { heading: "Corm Sourcing and Planting", body: "Source Crocus sativus corms from Pampore (Kashmir) or certified suppliers. Use corms of 10g+ weight for best yield. Plant dense: 50–60 corms per sqft in trays. Spacing: 4–5cm. Plant at 5–7cm depth. Expect flowers in 6–8 weeks." },
                    { heading: "Harvesting Saffron", body: "Flowers bloom for just 1–2 days. Each flower has 3 red stigmas. Harvest flowers in morning before they fully open. Pluck stigmas by hand carefully. Dry immediately at 40°C for 30–45 min. One corm yields 1 flower with just 0.006g of dried saffron." },
                    { heading: "Economics", body: "500 sqft with 25,000 corms → ~25,000 flowers → 150g saffron (year 1). Improves as corms multiply. Retail price: ₹300–500/g. Revenue: ₹45,000–75,000 per crop. Setup cost: ₹1.5–2 lakh. Break-even: 2–3 crops. From year 2 (corms multiply 3–5x), revenue potential: ₹2–5 lakhs/year." },
                ]
            },
            {
                title: "Protected Cultivation: Build a Low-Cost Polyhouse Under ₹5 Lakhs",
                summary: "A 500 sqm naturally-ventilated polyhouse can be built for ₹1–2 lakhs under 50% government subsidy.",
                date: "Oct 02, 2023", readTime: "11 min", author: "NCADEN Extension Team", tags: ["Polyhouse", "Protected Farming"],
                fullContent: [
                    { heading: "What is Protected Cultivation?", body: "Protected cultivation involves growing crops inside structures (polyhouses, net houses, shade houses) that provide a controlled microclimate. This allows off-season production, year-round cultivation, 30–50% water savings, and near-elimination of external pest pressure." },
                    { heading: "Polyhouse Types and Costs", body: "Naturally ventilated polyhouse (NVP): ₹700–900 per sqm. Fan-and-pad cooled: ₹1,200–1,500 per sqm. Low-cost bamboo polyhouse: ₹350–500 per sqm (short lifespan). For 500 sqm NVP before subsidy: ₹3.5–4.5 lakhs. After 50% NHM/MIDH subsidy: ₹1.75–2.25 lakhs." },
                    { heading: "Subsidy Application Process", body: "1. Apply to your State Horticulture Department (online or district office). 2. Get site inspection from a horticulture officer. 3. Receive approved estimate. 4. Construct structure through empanelled agency. 5. Claim subsidy after photo documentation. Schemes: NHM, MIDH, RKVY. National Horticulture Board also provides assistance for commercial ventures." },
                    { heading: "Best Crops for Polyhouse", body: "Cucumber (off-season): 20–25 kg/sqm/crop. Capsicum: 8–12 kg/sqm/crop. Tomato: 18–25 kg/sqm/crop. Gerbera (floriculture): 100–150 flowers/sqm/year. Rose: 100–200 stems/sqm/year. Floriculture in polyhouses is highly profitable for export markets." },
                    { heading: "Return on Investment", body: "For 500 sqm polyhouse: Running cost (seeds, fertilizer, labor): ₹1.5 lakhs/year. Revenue from 2 tomato crops: ₹3–4 lakhs/year. Net annual profit: ₹1.5–2.5 lakhs. Payback period: 2–3 years. Structure lifespan: 8–12 years providing a long-term stable income stream." },
                ]
            },
        ]
    },
    business: {
        title: "Agri Business & Project Reports", icon: Landmark,
        color: "bg-purple-100 text-purple-700 border-purple-200", headerBg: "bg-purple-700",
        desc: "Comprehensive business plans, subsidy details, loan applications, and financial strategies for agri-entrepreneurs.",
        articles: [
            {
                title: "PM KUSUM Solar Pump Subsidy: Apply Online & Eligibility",
                summary: "Under PM-KUSUM Component B, farmers get 60% subsidy on solar pumps. Learn how to apply and required documents.",
                date: "Dec 12, 2023", readTime: "8 min", author: "Govt. Yojana Team", tags: ["PM-KUSUM", "Subsidy"],
                fullContent: [
                    { heading: "Scheme Overview", body: "PM-KUSUM (Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan) was launched to help 25 lakh farmers shift to solar-powered irrigation. Component B: Standalone solar agriculture pumps of 2–7.5 HP capacity." },
                    { heading: "Subsidy Breakdown", body: "Central government subsidy: 30% of benchmark cost. State government subsidy: 30% of benchmark cost. Farmer contribution: 40% (can avail bank loan for this). Effective out-of-pocket: Only 10% if bank loan taken for farmer's share. Example: 3 HP pump benchmark cost ₹2.5 lakhs → Farmer pays ₹25,000 only." },
                    { heading: "Eligibility Criteria", body: "Individual farmer with cultivable land | Should not have existing grid-connected electricity for pump | Farmer whose DISCOM area has announced the scheme | Priority to small & marginal farmers, SC/ST farmers, and women farmers. Banks prefer collateral of land documents." },
                    { heading: "Documents Required", body: "Aadhaar Card | Land ownership documents (7/12 or Patta) | Bank account linked to Aadhaar | Caste certificate (for SC/ST priority) | Photograph | Electricity bill (showing no existing agricultural connection)." },
                    { heading: "How to Apply", body: "1. Visit your State Nodal Agency website (e.g., upnedasolar.com for UP, mahaurja.com for Maharashtra). 2. Register online with Aadhaar. 3. Select pump capacity needed. 4. Upload documents. 5. Get registration number and wait for approval. 6. After approval, empanelled vendors install the pump. 7. Subsidy released directly to vendor. Alternatively, visit your local Krishi Vigyan Kendra or District Collector's office for offline assistance." },
                ]
            },
            {
                title: "NABARD Loans for Agriculture: Types, Eligibility & How to Apply",
                summary: "NABARD offers KCC, Agricultural Term Loans, and Warehouse Receipt Financing at 7% per annum.",
                date: "Oct 28, 2023", readTime: "9 min", author: "NABARD Finance Cell", tags: ["NABARD", "Agri Loans"],
                fullContent: [
                    { heading: "About NABARD", body: "National Bank for Agriculture and Rural Development (NABARD) is India's apex development bank for agriculture. NABARD doesn't lend directly to farmers—it refinances loans given by Cooperative Banks, Regional Rural Banks (RRBs), and Commercial Banks, making credit accessible in rural areas at subsidized rates." },
                    { heading: "Kisan Credit Card (KCC)", body: "Provides short-term (12-month) revolving credit for crop production expenses. Limit based on land holding and crop type. Interest rate: 7% per annum (4% effective with Government's interest subvention). No collateral required up to ₹1.6 lakh. Apply at nearest PACS, RRB, or nationalized bank. Linked to a RuPay debit card for easy access." },
                    { heading: "Short-Term Crop Loans", body: "For seasonal crops from sowing to harvest. Amount: ₹50,000–5 lakhs per acre depending on crop. Duration: Up to 12 months. Interest: 7% with subvention (2% prompt repayment rebate = effective 5%). Apply with land records, sowing certificate, and village survey data." },
                    { heading: "Agricultural Term Loans", body: "For capital expenditure: borewell, tractor, polyhouse, cold storage, orchard development. Duration: 3–15 years. Loan amount: Up to ₹50 lakhs for individuals. Collateral: Land, assets, or third-party guarantee. Interest rate: 8.5–10.5%. Under DEDS, ABF, and NHM, subsidy amounts reduce effective principal." },
                    { heading: "Step-by-Step Application", body: "1. Visit nearest branch of your cooperative bank or RRB. 2. Get KCC/Term Loan application form. 3. Submit land documents (7/12, Aadhaar, recent bank statement). 4. Bank officer does field visit + land valuation. 5. Loan sanctioned typically in 15–30 days. 6. For subsidy-linked schemes, bank submits subsidy claim to NABARD on your behalf after completion of the investment." },
                ]
            },
            {
                title: "Small-Scale Mushroom Farming Income: A Realistic Guide",
                summary: "500 sq ft controlled mushroom room produces 80–120 kg/month, generating ₹10,000–18,000/month.",
                date: "Oct 05, 2023", readTime: "7 min", author: "Mushroom Biz India", tags: ["Mushroom", "Low-Investment"],
                fullContent: [
                    { heading: "Why Mushroom Farming?", body: "Mushrooms require no sunlight, minimal water, and can be grown in unused buildings, garages, or sheds. The crop cycle is just 45–60 days and profit margins are excellent. Button mushrooms sell at ₹80–150/kg wholesale and ₹200–300/kg retail in urban markets. Oyster mushrooms are even easier to grow organically." },
                    { heading: "Types of Mushrooms to Grow", body: "Button Mushroom (Agaricus bisporus): Most popular, requires 12–18°C. Oyster Mushroom (Pleurotus): Grows on paddy straw, easier, good for beginners, 20–28°C. Milky Mushroom (Calocybe indica): Ideal for South India, tropical, 25–35°C. Shiitake: Premium variety, higher price (₹500–800/kg), more complex. Start with Oyster or Milky mushrooms." },
                    { heading: "500 sqft Button Mushroom Setup", body: "Spawn (seed): ₹5,000/cycle | Compost (wheat straw/paddy): ₹3,000/cycle | Polythene bags: ₹1,000 | Fumigation chemicals: ₹500 | Cooling/heater for temp control: ₹15,000 (one-time). Total recurring cost per 45-day cycle: ₹10,000–12,000." },
                    { heading: "Expected Income", body: "500 sqft room can hold approx 500 kg of compost in bags. Biological efficiency of button mushroom: 18–22%. Expected yield per cycle: 90–110 kg. Revenue at ₹150/kg (wholesale): ₹13,500–16,500. Net profit per cycle: ₹3,500–6,500. Running 6 cycles/year = ₹21,000–39,000 net profit per year from one room. Scale up for more rooms." },
                    { heading: "Marketing Your Mushrooms", body: "Local hotel and restaurant direct supply (best price). Vegetable market vendor tie-ups. Zomato/Swiggy supplier connection for daily delivery. Dry mushroom export (Oyster and Shiitake): ₹800–1,500/kg dry weight. Join Farmer Producer Organizations (FPO) for collective bargaining. Online selling via WhatsApp Business is very effective for home-based setups." },
                ]
            },
        ]
    },
};

type CategoryKey = keyof typeof KNOWLEDGE_DATA;

const AgriKnowledge = () => {
    const [searchParams] = useSearchParams();
    const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
    const categoryKey = (searchParams.get("category") || "agriculture") as CategoryKey;
    const data = KNOWLEDGE_DATA[categoryKey] || KNOWLEDGE_DATA.agriculture;
    const Icon = data.icon;

    const handleToggle = (idx: number) => {
        setExpandedArticle(expandedArticle === idx ? null : idx);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="container mx-auto max-w-5xl space-y-8">

                {/* Page Header */}
                <motion.div key={categoryKey} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                    className={`rounded-xl p-8 text-white flex items-start gap-6 ${data.headerBg}`}>
                    <div className="p-4 bg-white/20 rounded-xl shrink-0">
                        <Icon className="h-10 w-10" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">{data.title}</h1>
                        <p className="mt-2 text-lg opacity-90 max-w-2xl">{data.desc}</p>
                    </div>
                </motion.div>

                {/* Category Quick Nav */}
                <div className="flex flex-wrap gap-2">
                    {(Object.keys(KNOWLEDGE_DATA) as CategoryKey[]).map((key) => {
                        const cat = KNOWLEDGE_DATA[key];
                        const CatIcon = cat.icon;
                        const isActive = key === categoryKey;
                        return (
                            <a key={key} href={`/knowledge?category=${key}`}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all duration-200 ${isActive ? cat.color + " shadow" : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"}`}>
                                <CatIcon className="h-4 w-4" /> {cat.title}
                            </a>
                        );
                    })}
                </div>

                {/* Articles */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-3">
                        <BookOpen className="h-5 w-5 text-emerald-600" /> Latest Insights
                    </h2>
                    {data.articles.map((article, idx) => (
                        <motion.div key={`${categoryKey}-${idx}`}
                            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }}
                            className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-400 transition-all overflow-hidden">
                            {/* Article Header */}
                            <div className="p-6 flex flex-col md:flex-row gap-4">
                                <div className="flex-1 space-y-3">
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags.map((tag) => (
                                            <span key={tag} className={`px-2 py-0.5 rounded text-[10px] font-black tracking-widest uppercase ${data.color}`}>{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-black text-slate-800 leading-snug">{article.title}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{article.summary}</p>
                                    <div className="flex items-center gap-4 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-400">
                                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {article.author}</span>
                                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span>
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime} read</span>
                                    </div>
                                </div>
                                <div className="flex items-start shrink-0">
                                    <Button
                                        onClick={() => handleToggle(idx)}
                                        className={`flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-lg transition-all ${expandedArticle === idx ? "bg-slate-700 hover:bg-slate-800 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}>
                                        {expandedArticle === idx ? (<><X className="h-4 w-4" /> Close</>) : (<>Read Full Guide <ArrowRight className="h-4 w-4" /></>)}
                                    </Button>
                                </div>
                            </div>

                            {/* Full Article Content */}
                            <AnimatePresence>
                                {expandedArticle === idx && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 border-t border-slate-100 space-y-6 pt-6 bg-slate-50/50">
                                            {article.fullContent.map((section, sIdx) => (
                                                <motion.div key={sIdx}
                                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: sIdx * 0.08 }}
                                                    className="flex gap-4">
                                                    <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${data.color}`}>
                                                        {sIdx + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-black text-slate-800 mb-1 flex items-center gap-2">
                                                            <CheckCircle className="h-4 w-4 text-emerald-500" /> {section.heading}
                                                        </h4>
                                                        <p className="text-sm text-slate-600 leading-relaxed">{section.body}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AgriKnowledge;
