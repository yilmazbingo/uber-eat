import { Platform } from "react-native";
const liveHost = "https://us-central1-restaurant-86b62.cloudfunctions.net";
// android does not have ability to read http local.
const localHost = "http://localhost:5001/restaurant-86b62/us-central1";

export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = false;
// export const host = !isDevelopment || isAndroid ? liveHost : localHost;
export const host =  liveHost 
