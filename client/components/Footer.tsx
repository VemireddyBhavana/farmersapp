import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Leaf, Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary/80">
              {t('contactUs')}
            </h3>
            <div className="flex items-start space-x-3 text-muted-foreground">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>{t("officeAddressFull")}</span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
              <span>+91 80 4040 4040</span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
              <span>support@teachspark.ai</span>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: Linkedin, href: "#", label: t("linkedinLabel") },
                { icon: Facebook, href: "#", label: t("facebookLabel") },
                { icon: Youtube, href: "#", label: t("youtubeLabel") },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>



          {/* Services */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary/80">
              {t('services')}
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <Link to="/chat" className="hover:text-primary transition-colors">{t('aiFarmingHelp')}</Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-primary">{t('farmingCalendarLabel')}</Link>
              </li>
              <li>
                <Link to="/pests" className="hover:text-primary">{t('pestControl')}</Link>
              </li>
              <li>
                <Link to="/weather" className="hover:text-primary">{t("weatherForecast")}</Link>
              </li>
              <li>
                <Link to="/whatsapp-bot" className="hover:text-primary">{t("whatsappAdvisory")}</Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-primary">{t("supportPortalTitle")}</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary/80">
              {t('company')}
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">{t('aboutUs')}</Link>
              </li>
              <li>
                <Link to="/about#vision" className="hover:text-primary transition-colors">{t("ourVision")}</Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-primary transition-colors">{t("ourImpact")}</Link>
              </li>
              <li>
                <Link to="/join-us" className="hover:text-primary transition-colors">{t("joinUs")}</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">{t('contactUs')}</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary">{t('privacyPolicy')}</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Brand */}
        <div className="mt-16 border-t pt-12 flex flex-col items-center justify-center text-center space-y-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="rounded-xl bg-primary p-2 shadow-lg shadow-primary/20">
              <Leaf className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary">
              {t("brandName")}
            </span>
          </Link>
          <p className="max-w-md text-muted-foreground text-sm">
            {t("empowerFarmersDescFooter")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-muted-foreground">
            <span className="bg-muted px-3 py-1 rounded-full">{t("farmersEmpoweredPill")}</span>
            <span className="bg-muted px-3 py-1 rounded-full">{t("villagesReachedPill")}</span>
            <span className="bg-muted px-3 py-1 rounded-full">{t("languagesSupportedPill")}</span>
            <span className="bg-muted px-3 py-1 rounded-full">{t("saathiStoresPill")}</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground font-medium pt-2">
            <Link to="/privacy" className="hover:text-primary transition-colors underline underline-offset-4">{t('privacyPolicy')}</Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-primary transition-colors underline underline-offset-4">{t('termsOfService')}</Link>
          </div>
        </div>

        <div className="mt-8 border-t border-primary/10 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {t('copyrightText')} {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
