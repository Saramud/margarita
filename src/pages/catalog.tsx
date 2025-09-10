import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "../components/Header";
import CatalogForm from "../components/Forms/CatalogForm";
import prisma from "../lib/prisma";

export default function Catalog({ catalogs }) {
    const { t } = useTranslation("common");
    return (
        <div className="p-4">
            <Header />
            <h1 className="text-3xl font-bold p-4">{t("catalog_request")}</h1>
            <CatalogForm />
            <p className="mt-6 text-gray-500">
                Все цены в каталоге предоставляются только по запросу.
            </p>
            <ul className="mt-4 space-y-2">
                {catalogs.map((c) => (
                    <li key={c.id}>
                        {c.name} - <a href={c.fileUrl} className="text-blue-600">Скачать</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const catalogs = await prisma.catalog.findMany();
    return {
        props: {
            catalogs: JSON.parse(JSON.stringify(catalogs)),
            ...(await serverSideTranslations(locale || "ru", ["common"])),
        },
    };
};
