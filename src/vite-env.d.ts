/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_YOUTRACK_PERM_TOKEN: string;
    readonly VITE_YOUTRACK_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
