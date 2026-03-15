import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Mail, Heart, Zap, Award, TrendingUp, Code, Users, Bot, Sprout, BarChart2, HeartHandshake } from "lucide-react";

const coreValues = [
  { icon: Users, title: "Customer Success", desc: "Every decision starts with what's best for the farmer.", color: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
  { icon: Award, title: "Ownership", desc: "We own outcomes, not just tasks. Every team member leads.", color: "bg-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
  { icon: Heart, title: "Humility", desc: "We learn from farmers, from data, and from each other.", color: "bg-amber-500", bg: "bg-amber-50 dark:bg-amber-950/20" },
];

const departments = [
  { icon: Code, name: "Engineering", roles: 18, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  { icon: Sprout, name: "Agri Science", roles: 9, color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" },
  { icon: Bot, name: "Data Science & AI", roles: 7, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
  { icon: BarChart2, name: "Business", roles: 14, color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
  { icon: HeartHandshake, name: "Farmer Success", roles: 22, color: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300" },
  { icon: Users, name: "People & Culture", roles: 5, color: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300" },
  { icon: TrendingUp, name: "Marketing", roles: 8, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300" },
  { icon: Award, name: "Kimaye Output", roles: 11, color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300" },
];

const openRoles = [
  { title: "Senior Software Engineer – Backend (Node.js)", dept: "Engineering", location: "Pune / Remote", type: "Full-time" },
  { title: "Mobile App Developer (React Native)", dept: "Engineering", location: "Pune", type: "Full-time" },
  { title: "Agri-Advisory Specialist – Tamil Nadu", dept: "Agri Science", location: "Chennai", type: "Full-time" },
  { title: "Data Scientist – Crop Intelligence", dept: "Data Science & AI", location: "Bangalore / Remote", type: "Full-time" },
  { title: "Saathi Store Operations Manager – Maharashtra", dept: "Business", location: "Nashik", type: "Full-time" },
  { title: "Farmer Success Lead – Karnataka", dept: "Farmer Success", location: "Hubli", type: "Full-time" },
];

export default function JoinUs() {
  const { t } = useLanguage();
  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative py-32 bg-gradient-to-br from-emerald-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/saathi_store.png"
            alt="Team working"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Join Our Mission</p>
            <h1 className="text-5xl lg:text-7xl font-black text-white">{t("joinUsTitle")}</h1>
            <p className="text-xl text-white/60 max-w-xl mx-auto">{t("joinUsSubtitle")}</p>
            <a href="mailto:careers@agrostar.in" className="inline-flex items-center gap-2 bg-emerald-500 text-white font-black px-8 py-4 rounded-2xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/30 mt-6">
              <Mail className="h-5 w-5" /> careers@agrostar.in
            </a>
          </motion.div>
        </div>
      </section>

      {/* Culture Photo */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 rounded-3xl overflow-hidden">
            <div className="col-span-2 aspect-[4/3]">
              <img src="/history_2013.png" alt="Office culture" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <img src="/impact_community.png" alt="Team" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <img src="/saathi_store.png" alt="Collaboration" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2">{t("coreValuesTitle")}</p>
            <h2 className="text-3xl font-black">{t("coreValuesTitle")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {coreValues.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${val.bg} rounded-3xl p-8 border border-primary/5`}
              >
                <div className={`h-12 w-12 rounded-2xl ${val.color} flex items-center justify-center text-white mb-4`}>
                  <val.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-foreground">{val.title}</h3>
                <p className="text-muted-foreground mt-2">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2">{t("departmentsTitle")}</p>
            <h2 className="text-3xl font-black">{t("departmentsTitle")}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {departments.map((dept, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className={`${dept.color} rounded-2xl p-5 flex flex-col items-center text-center gap-3`}
              >
                <dept.icon className="h-7 w-7" />
                <div>
                  <p className="font-black text-sm">{dept.name}</p>
                  <p className="text-xs opacity-70 font-bold">{dept.roles} open roles</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2">{t("currentOpenings")}</p>
            <h2 className="text-3xl font-black">{t("currentOpenings")}</h2>
          </div>
          <div className="space-y-4">
            {openRoles.map((role, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-primary/5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-black text-foreground">{role.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">{role.dept}</span>
                    <span className="bg-muted text-muted-foreground text-xs font-bold px-3 py-1 rounded-full">📍 {role.location}</span>
                    <span className="bg-muted text-muted-foreground text-xs font-bold px-3 py-1 rounded-full">⏱ {role.type}</span>
                  </div>
                </div>
                <a
                  href={`mailto:careers@agrostar.in?subject=Application: ${role.title}`}
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all"
                >
                  <Mail className="h-4 w-4" /> {t("applyNowBtn")}
                </a>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-muted-foreground">
              Don't see your role? Email us at{" "}
              <a href="mailto:careers@agrostar.in" className="text-primary font-bold underline underline-offset-4">careers@agrostar.in</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
