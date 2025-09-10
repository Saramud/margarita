import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "../components/Header";
import ClientCard from "../components/Clients/ClientCard";
import prisma from "../lib/prisma";

export interface ClientAdmin {
    id: number;
    name: string;
    project: string;
    description: string | null; // <- null вместо undefined
    createdAt: Date;
}

export interface AdminClientsProps {
    initialClients: ClientAdmin[];
}

export default function Clients({ initialClients }: AdminClientsProps) {
    const { t } = useTranslation("common");
    return (
        <div>
            <Header />
            <h1 className="text-3xl font-bold p-4">{t("clients")}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {initialClients.map((client) => (
                    <ClientCard key={client.id} {...client} />
                ))}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<AdminClientsProps> = async ({ locale }) => {
    const clients = await prisma.client.findMany();

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "ru", ["common"])),
            initialClients: clients,
        },
    };
};
