export interface ICardProps {
  title: string;
  description: string;
  placeId: string;
  rating: number;
  classNames?: string;
  imageUrl?: string;
  imageAlt?: string;
  iconName?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
