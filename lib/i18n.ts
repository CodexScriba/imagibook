// src/lib/i18n.ts
import type { AvailableLanguageTag } from "@/paraglide/runtime";
import { PrefixStrategy, Navigation, Middleware } from "@inlang/paraglide-next";

const strategy = PrefixStrategy<AvailableLanguageTag>({ prefixDefault: "never" });

export const { Link, useRouter, usePathname, redirect, permanentRedirect } = Navigation({ 
    strategy,
    pathnames: {
        "/": {
            en: "/", 
            es: "/", 
        },
        "/about": {
            en: "/about",  
            es: "/acerca", 
        },
    }
});

export const middleware = Middleware({ strategy });