import Image from "next/image";
import Link from "next/link";

export default function ActivityCard({ activity }) {
    if (!activity) return null;

    return (
        <Link
            href={`/aktiviteter/${activity.id}`}
            aria-labelledby={`activity-card-${activity.id}`}
        >
            <article className="relative mb-4">
                {activity.asset?.url && (
                    <img
                        src={activity.asset.url}
                        alt={activity.name}
                        loading="lazy"
                        className="w-full aspect-square object-cover rounded-4xl rounded-br-none"
                    />
                )}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-blue-900/50 rounded-tr-4xl rounded-bl-4xl px-4 py-2">
                    <p className="font-bold" id={`activity-card-${activity.id}`}>{activity.name}</p>
                    <p className="text-xs">
                        {activity.minAge}
                        {activity.maxAge === 100 ? '+' : ` - ${activity.maxAge}`} år
                    </p>
                </div>
            </article>
        </Link>
    );
}