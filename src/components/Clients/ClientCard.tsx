type ClientCardProps = {
    name: string;
    project: string;
    description: string | null;
};

export default function ClientCard({ name, project, description }: ClientCardProps) {
    return (
        <div className="border rounded p-4 shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="italic">{project}</p>
            {description && <p className="mt-2">{description}</p>}
        </div>
    );
}
