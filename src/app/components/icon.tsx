import React, { type JSX } from "react";
import { StickyNote, Users, Drill, Package, WalletMinimal, HardHat } from "lucide-react";

const routeIcons: Record<string, JSX.Element> = {
  StickyNote: <StickyNote className="size-4" />,
  Users: <Users className="size-4" />,
  Drill: <Drill className="size-4" />,
  Package: <Package className="size-4" />,
  WalletMinimal: <WalletMinimal className="size-4" />,
  HardHat: <HardHat className="size-4" />,
};

interface IconProps {
  iconName: keyof typeof routeIcons; 
}

const IconComponent: React.FC<IconProps> = ({ iconName }) => {
  return routeIcons[iconName] || null;
};

export default IconComponent;
