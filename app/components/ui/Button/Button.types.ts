import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  height?: number;
  width?: number;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
