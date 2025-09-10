import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Header from '../components/Header';
import prisma from '../lib/prisma';

export default function Home({ content }) {
    const { t } = useTranslation('common');
    return (
        <div className="p-8">
            <Header />
            <h1 className="text-3xl font-bold">{content?.title || t('about')}</h1>
            <p className="mt-4">{content?.text}</p>

            <div className="flex space-x-4 mt-6">
                <a href="/design" className="border px-4 py-2 rounded">{t('design')}</a>
                <a href="/photography" className="border px-4 py-2 rounded">{t('photography')}</a>
                <a href="/clients" className="border px-4 py-2 rounded">{t('clients')}</a>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const content = await prisma.pageContent.findFirst({
        where: { page: 'about', lang: locale || 'ru' },
    });

    return {
        props: {
            content,
            ...(await serverSideTranslations(locale || 'ru', ['common'])),
        },
    };
};
