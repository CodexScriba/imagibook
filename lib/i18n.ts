// app /lib/i18n.ts
import { createI18n } from "@inlang/paraglide-js-adapter-next"
import type { AvailableLanguageTag } from "@/paraglide/runtime"

export const { Link, middleware, useRouter, usePathname, redirect, permanentRedirect, localizePath } =
    createI18n<AvailableLanguageTag>({
        pathnames: {
            "/": {
                en: "/",
                es: "/",
            },
            "/about": {
                en: "/about",
                es: "/acerca",
            },
            // Add more routes as needed
        },
        exclude: ["/not-translated"], // Add paths that should not be translated
    })