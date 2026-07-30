import createNextIntlPlugin from "next-intl/plugin";

// Plugin next-intl : connecte le fichier src/i18n/request.ts au build Next.js
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
