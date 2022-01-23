/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATOCMS_API_TOKEN: string
  readonly VITE_DATOCMS_ENVIRONMENT: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
