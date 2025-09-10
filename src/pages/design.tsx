import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "../components/Header";
import Gallery from "../components/Gallery/Gallery";
import prisma from "../lib/prisma";

export interface Photo {
    id: number;
    url: string;
    author: string;
    description?: string;
}

interface DesignProps {
    photos: Photo[];
}

export default function Design({ photos }: DesignProps) {
    const { t } = useTranslation("common");
    return (
        <div>
            <Header />
            <h1 className="text-3xl font-bold p-4">{t("design")}</h1>
            <Gallery photos={photos} />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const photos = await prisma.photo.findMany({ where: { page: "design" } });
    return {
        props: {
            photos: JSON.parse(JSON.stringify(photos)),
            ...(await serverSideTranslations(locale || "ru", ["common"])),
        },
    };
};
