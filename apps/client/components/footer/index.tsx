import React from "react";
import { Platform } from "react-native";

export interface FooterLink {
  title: string;
  onPress: () => void;
}

export interface FooterProps {
  appName?: string;
  copyright?: string;
  links?: FooterLink[];
  className?: string;
  appNameClassName?: string;
  copyrightClassName?: string;
  linkClassName?: string;
}

let FooterComponent: React.ComponentType<FooterProps>;

if (Platform.OS === "web") {
  FooterComponent = require("./footer.web").FooterWeb;
} else {
  FooterComponent = require("./footer.native").FooterNative;
}

export const Footer = FooterComponent;
