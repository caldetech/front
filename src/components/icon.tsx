import React, { type JSX } from "react";
import { StickyNote, Users, Drill, Package, WalletMinimal, HardHat } from "lucide-react";

const routeIcons: Record<string, JSX.Element> = {
  StickyNote: <StickyNote />,
  Users: <Users />,
  Drill: <Drill />,
  Package: <Package />,
  WalletMinimal: <WalletMinimal />,
  HardHat: <HardHat />,
};

interface IconProps {
  iconName: keyof typeof routeIcons; 
}

const IconComponent: React.FC<IconProps> = ({ iconName }) => {
  return routeIcons[iconName] || null;
};

export default IconComponent;
