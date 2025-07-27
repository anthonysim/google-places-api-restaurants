export interface ISearchBarProps {
  placeholder: string;
  value: string;
  name: string;
  iconTitle?: string;
  iconAlt?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNames?: string;
}
