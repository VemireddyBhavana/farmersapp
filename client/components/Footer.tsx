import { Link } from "react-router-dom";
import { Tractor, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Leaf } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="rounded-xl bg-primary p-1.5 shadow-lg shadow-primary/20">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                TechSpark AI
              </span>
            </Link>
            <p className="max-w-xs text-muted-foreground">
              {t('footerDesc')}
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary/80">
              {t('services')}
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <Link to="/agri-schemes" className="hover:text-primary transition-colors">{t('govSchemes')}</Link>
              </li>
              <li>
                <Link to="/chat" className="hover:text-primary">{t('aiFarmingHelp')}</Link>
              </li>
              <li>
                <Link to="/market" className="hover:text-primary">{t('marketRatesLabel')}</Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-primary">{t('farmingCalendarLabel')}</Link>
              </li>
              <li>
                <Link to="/pests" className="hover:text-primary">{t('pestControl')}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary/80">
              {t('information')}
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary">{t('aboutUs')}</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">{t('contactUs')}</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary">{t('privacyPolicy')}</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary">{t('termsOfService')}</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary/80">
              {t('contactUs')}
            </h3>
            <div className="flex items-start space-x-3 text-muted-foreground">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>{t('officeAddress')}</span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
              <span>{t('phoneNumber')}</span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
              <span>{t('supportEmail')}</span>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {t('copyrightText')} {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
