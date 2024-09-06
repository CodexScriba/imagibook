"use client";
import React from 'react';
import { useRouter, usePathname } from "@/lib/i18n";
import { languageTag, type AvailableLanguageTag } from "@/paraglide/runtime";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const languages: Record<AvailableLanguageTag, string> = {
  en: "English",
  es: "Español",
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
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {(Object.entries(languages) as [AvailableLanguageTag, string][]).map(([lang, name]) => (
          <SelectItem key={lang} value={lang}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}