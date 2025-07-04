import { Platform } from "react-native";
import tw from '../../lib/tailwind';

export interface LoginProps {
  onNavigate?: (page: "login" | "home") => void;
  appName?: string;
  logoIcon?: any;
  onSignIn?: () => void;
  onSignUp?: () => void;
  className?: string;
  logoClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

let LoginComponent;
if (Platform.OS === 'web') {
  LoginComponent = require("./login.web").LoginWeb;
} else {
  LoginComponent = require("./login.native").LoginNative;
}

export const Login = LoginComponent;
