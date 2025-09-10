import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "../components/Header";
import Gallery from "../components/Gallery/Gallery";
import prisma from "../lib/prisma";
import { Photo } from "./design";

interface PhotographyProps {
    photos: Photo[];
}

export default function Photography({ photos }: PhotographyProps) {
    const { t } = useTranslation("common");
    return (
        <div>
            <Header />
            <h1 className="text-3xl font-bold p-4">{t("photography")}</h1>
            <Gallery photos={photos} />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const photos = await prisma.photo.findMany({ where: { page: "photography" } });
    return {
        props: {
            photos: JSON.parse(JSON.stringify(photos)),
            ...(await serverSideTranslations(locale || "ru", ["common"])),
        },
    };
};
