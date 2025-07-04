import React from "react";
import { Platform } from "react-native";

export interface HeaderProps {
  appName?: string;
  logoIcon?: string;
  showThemeToggle?: boolean;
  className?: string;
  logoClassName?: string;
  titleClassName?: string;
}

let HeaderComponent: React.ComponentType<HeaderProps>;

if (Platform.OS === "web") {
  HeaderComponent = require("./header.web").HeaderWeb;
} else {
  HeaderComponent = require("./header.native").HeaderNative;
}

export const Header = HeaderComponent;
