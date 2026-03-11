import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Linkedin, ExternalLink } from "lucide-react";

const founders = [
  {
    name: "Shardul Sheth",
    title: "Co-Founder & CEO",
    bio: "Shardul's passion for agriculture and technology led him to co-found AgroStar in 2013. A graduate of Cornell University and IIM Ahmedabad, he has spent over a decade building India's most farmer-centric agri-tech platform.",
    img: "https://api.dicebear.com/7.x/notionists/svg?seed=Shardul&backgroundColor=b6e3f4",
    linkedin: "https://www.linkedin.com/in/shardulsheth/",
    tags: ["CEO", "Strategy", "Agri-Tech"],
    color: "from-emerald-50 dark:from-emerald-950/20"
  },
  {
    name: "Sitanshu Sheth",
    title: "Co-Founder & COO",
    bio: "Sitanshu brings deep expertise in supply chain and rural distribution. A graduate of IIT Bombay and Stanford GSB, he architected AgroStar's omnichannel Saathi Store network across India.",
    img: "https://api.dicebear.com/7.x/notionists/svg?seed=Sitanshu&backgroundColor=c0aede",
    linkedin: "https://www.linkedin.com/in/sitanshusheth/",
    tags: ["COO", "Operations", "Supply Chain"],
    color: "from-blue-50 dark:from-blue-950/20"
  },
];

const team = [
  { name: "Amol Borkar", title: "Chief Technology Officer", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Amol&backgroundColor=ffd5dc", dept: "Engineering" },
  { name: "Sushil Bhatt", title: "Chief Business Officer", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Sushil&backgroundColor=d1d4f9", dept: "Business" },
  { name: "Payal Shah", title: "Chief Marketing Officer", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Payal&backgroundColor=b6e3f4", dept: "Marketing" },
  { name: "Rohit Verma", title: "VP – Farmer Success", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Rohit&backgroundColor=c0aede", dept: "Customer" },
  { name: "Meera Nair", title: "Head of People & Culture", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Meera&backgroundColor=ffd5dc", dept: "HR" },
  { name: "Anupam Gupta", title: "VP – Kimaye Output Business", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Anupam&backgroundColor=b6e3f4", dept: "Kimaye" },
  { name: "Priya Desai", title: "Head of Data Science & AI", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya&backgroundColor=d1d4f9", dept: "AI/ML" },
  { name: "Vikram Singh", title: "Regional Director – North India", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Vikram&backgroundColor=ffd5dc", dept: "Operations" },
];

export default function Leadership() {
  const { t } = useLanguage();
  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 to-slate-700 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600"
            alt="Leadership team"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-400">#HelpingFarmersWin</p>
            <h1 className="text-5xl lg:text-6xl font-black text-white">{t("leadershipPageTitle")}</h1>
            <p className="text-white/60 text-xl max-w-xl mx-auto">{t("leadershipPageSubtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2">{t("foundersTitle")}</p>
            <h2 className="text-3xl font-black">{t("foundersTitle")}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`bg-gradient-to-br ${f.color} to-transparent rounded-3xl p-8 border border-primary/5 shadow-sm`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-xl">
                      <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-black text-foreground">{f.name}</h3>
                      <a href={f.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-primary font-bold text-sm mt-0.5">{f.title}</p>
                    <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{f.bio}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {f.tags.map((tag) => (
                        <span key={tag} className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Team Photo */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[3/1]">
            <img
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=1600"
              alt="AgroStar team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">{t("executiveTeamTitle")}</p>
            <h2 className="text-3xl font-black">{t("executiveTeamTitle")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-white/5 rounded-3xl p-6 border border-primary/5 shadow-sm text-center"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-muted mx-auto mb-4 shadow-md">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-black text-foreground text-sm leading-tight">{member.name}</h4>
                <p className="text-muted-foreground text-xs mt-1 leading-snug">{member.title}</p>
                <span className="inline-block mt-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wide">
                  {member.dept}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
