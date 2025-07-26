export interface CardProps {
  title: string;
  description: string;
  rating: number;
  classNames?: string;
  imageUrl?: string;
  imageAlt?: string;
  iconName?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
