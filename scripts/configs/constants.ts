import path from "path";

export const PROJECT_ROOT = path.resolve(__dirname, "../../");
export const PROJECT_NAME = path.parse(PROJECT_ROOT).name;
export const DEV_HOST = "localhost";
export const DEV_PORT = 8080;
export const PUBLIC_PATH = "/";
