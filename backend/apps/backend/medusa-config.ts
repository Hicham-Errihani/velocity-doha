import { loadEnv, defineConfig } from '@medusajs/framework/utils'
loadEnv(process.env.NODE_ENV || 'development', process.cwd())
module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  modules: [
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/paytabs",
            id: "paytabs",
            options: {
              profileId: process.env.PAYTABS_PROFILE_ID,
              serverKey: process.env.PAYTABS_SERVER_KEY,
              clientKey: process.env.PAYTABS_CLIENT_KEY,
              region: process.env.PAYTABS_REGION,
            },
          },
        ],
      },
    },
  ],
})