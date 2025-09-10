import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Header from "../components/Header";
import ContactForm from "../components/Forms/ContactForm";

export default function Contacts() {
    const { t } = useTranslation("common");
    return (
        <div className="p-4">
            <Header />
            <h1 className="text-3xl font-bold p-4">{t("contacts")}</h1>
            <ContactForm />
            <div className="mt-6 space-y-2">
                <p>Телефон: +7 999 123-45-67</p>
                <p>
                    WhatsApp: <a href="https://wa.me/79991234567" className="text-blue-600">Написать</a>
                </p>
                <p>
                    Telegram: <a href="https://t.me/username" className="text-blue-600">Написать</a>
                </p>
                <p>Email: <a href="mailto:example@mail.com" className="text-blue-600">example@mail.com</a></p>
                <p>Instagram: <a href="https://instagram.com/username" className="text-blue-600">Перейти</a></p>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale || "ru", ["common"])),
    },
});
