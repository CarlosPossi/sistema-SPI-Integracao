import axios from "axios";
import { Platform } from "react-native";

function getBaseUrl(): string {
    if (Platform.OS === "android") {
        return "http://10.0.2.2:8080";
    }

    return "http://localhost:8080"
}

const BASE_URL = getBaseUrl();

const api = axios.create ({
    baseURL: BASE_URL,
    timeout: 10000,
    headers:{
        "Content-Type": "application/json",
    },
});

export default api;