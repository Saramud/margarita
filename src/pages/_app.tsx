import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "../styles/globals.css"; // Tailwind стили
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <main>
                <Component {...pageProps} />
            </main>
        </>
    );
}

// Оборачиваем приложение в i18n
export default appWithTranslation(MyApp);