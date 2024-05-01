import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const config = {
  POSTGRES_URL: process.env.POSTGRES_RUL!,
  APP_ENV: process.env.APP_ENV!,
};

export default config;
