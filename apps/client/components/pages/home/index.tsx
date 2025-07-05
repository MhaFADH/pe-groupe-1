import { Platform } from "react-native"

import { HomeNative } from "./home.native"
import { HomeWeb } from "./home.web"

export const Home = Platform.OS === "web" ? HomeWeb : HomeNative
