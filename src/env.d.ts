// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
    DEFAULTPASSWORD: string;
    GMAILEMAIL: string;
    GMAILPASSWORD: string;
    PUBLIC_DOMAIN: string;
  }
}
