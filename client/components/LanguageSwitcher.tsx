import React from "react";
import { useTranslation } from "react-i18next";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Languages, Check, Globe } from "lucide-react";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'mr', name: 'मराठी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
];

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
  };

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 rounded-full px-4 bg-primary/10 hover:bg-primary/20 transition-all border border-primary/20 shadow-sm"
        >
          <Globe className="h-4 w-4 text-emerald-600" />
          <span className="hidden md:inline font-bold text-[11px] uppercase tracking-wider text-emerald-700">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 bg-background/95 backdrop-blur-xl border-primary/10 shadow-2xl">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer hover:bg-primary/10 focus:bg-primary/10 transition-colors"
          >
            <span className="font-bold text-sm">{lang.name}</span>
            {i18n.language === lang.code && <Check className="h-4 w-4 text-emerald-600" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
