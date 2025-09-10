export interface PhotoCardProps {
    url: string;
    author: string;
    description?: string;
}

export default function PhotoCard({ url, author, description }: PhotoCardProps) {
    return (
        <div className="relative border rounded overflow-hidden">
            <img
                src={url}
                alt={description || "Photo"}
                className="w-full h-64 object-cover"
                onContextMenu={(e) => e.preventDefault()} // защита от скачивания
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full text-sm">
                {author}
            </div>
        </div>
    );
}
