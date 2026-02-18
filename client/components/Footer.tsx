import { Link } from "react-router-dom";
import { Tractor, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="rounded-xl bg-primary p-1.5 shadow-lg shadow-primary/20">
                <Tractor className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                Smart Farmer
              </span>
            </Link>
            <p className="max-w-xs text-muted-foreground">
              Empowering farmers with smart tools, equipment rentals, and AI-driven agricultural insights.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary/80">
              Services
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <Link to="/rent" className="hover:text-primary">Tractor Rental</Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-primary">AI Farming Help</Link>
              </li>
              <li>
                <Link to="/market" className="hover:text-primary">Market Rates</Link>
              </li>
              <li>
                <Link to="/weather" className="hover:text-primary">Weather Forecast</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary/80">
              Company
            </h3>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-primary/80">
              Contact Us
            </h3>
            <div className="flex items-start space-x-3 text-muted-foreground">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span>123 Agri Lane, Farm District, Rural State, India</span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
              <span>support@smartfarmer.com</span>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Smart Farmer & Tractor Rental App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
