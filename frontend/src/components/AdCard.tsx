import Link from "next/link";

export type AdCardProps = {
    title: string;
    imgUrl: string;
    price: number;
    link: string;
}

export default function AdCard({ title, imgUrl, price, link }: AdCardProps) {
    return (
        <>
        <div className="ad-card-container">
            <Link className="ad-card-link" href={link}>
                <img className="ad-card-image" src={imgUrl} />
                <div className="ad-card-text">
                    <div className="ad-card-title">{title}</div>
                    <div className="ad-card-price">{price} €</div>
                </div>
            </Link>
        </div>
        </>
    )
}