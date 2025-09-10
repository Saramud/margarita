import PhotoCard from "./PhotoCard";

type GalleryProps = {
    photos: { url: string; author: string; description?: string }[];
};

export default function Gallery({ photos }: GalleryProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {photos.map((photo, index) => (
                <PhotoCard key={index} {...photo} />
            ))}
        </div>
    );
}
