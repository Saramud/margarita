export interface ContentType {
    id: number;
    title: string;
    text: string | null;
    page: string;
    lang: string;
    createdAt: Date;
    updatedAt: Date;
}