import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "../components/Header";

interface PricingPageProps {
    // добавь любые пропсы
}

export default function PricingPage(props: PricingPageProps) {
    const { t } = useTranslation();

    return (
        <div>
            <Header />
            <h1 className="text-3xl font-bold p-4">{t("pricing")}</h1>
            {/* Остальная страница */}
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<PricingPageProps> = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "ru", ["common"])),
        },
    };
};