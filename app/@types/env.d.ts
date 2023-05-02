declare namespace NodeJS {
  export interface ProcessEnv {
    MAIN_SERVICE_BASE_URL: string;
    SESSION_SECRET: string;
  }
}
