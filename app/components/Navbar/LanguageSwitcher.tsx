"use client";
import type React from 'react';
import { useRouter, usePathname } from "@/lib/i18n";
import { languageTag, type AvailableLanguageTag } from "@/paraglide/runtime";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from 'lucide-react'; // Import icons from lucide-react

const languages: Record<AvailableLanguageTag, { name: string; icon: React.ReactNode }> = {
  en: { name: "English", icon: <Globe /> }, 
  es: { name: "Español", icon: <Globe /> },
  pt: { name: "Português", icon: <Globe /> },
  it: { name: "Italiano", icon: <Globe /> },
  fr: { name: "Français", icon: <Globe /> },
  de: { name: "Deutsch", icon: <Globe /> },
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLanguage = languageTag();
  const handleLanguageChange = (newLanguage: AvailableLanguageTag) => {
    router.push(pathname, { locale: newLanguage });
  };

  return (
    <Select defaultValue={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[150px] bg-transparent text-gray-500 text-base font-medium">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {(Object.entries(languages) as [AvailableLanguageTag, { name: string; icon: React.ReactNode }][]).map(([lang, { name, icon }]) => (
          <SelectItem key={lang} value={lang}>
            <span className="flex items-center gap-2">
              {icon}
              {name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
