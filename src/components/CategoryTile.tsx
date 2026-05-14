import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type CategoryTileProps = {
  title: string;
  copy: string;
  image: string;
  href: string;
};

export default function CategoryTile({ title, copy, image, href }: CategoryTileProps) {
  return (
    <Link className="category-tile" to={href}>
      <img src={image} alt="" />
      <span>
        <strong>{title}</strong>
        <small>{copy}</small>
      </span>
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
