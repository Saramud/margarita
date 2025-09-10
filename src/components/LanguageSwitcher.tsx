"use client";
import { useRouter } from "next/router";

interface LanguageSwitcherProps { }

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
    const router = useRouter();
    const { locale } = router;

    const toggleLanguage = () => {
        const newLocale = locale === "ru" ? "en" : "ru";
        router.push(router.pathname, router.asPath, { locale: newLocale });
    };

    return (
        <button
            onClick={toggleLanguage}
            className="px-3 py-1 border rounded hover:bg-gray-200"
        >
            {locale === "ru" ? "EN" : "RU"}
        </button>
    );
}
