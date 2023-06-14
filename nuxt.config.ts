// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    baseURL: '/ClientCMPSITE'
  },
  devtools: { enabled: true },
  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css",
    "@/assets/styles.scss"
  ],
  build: {
    transpile: ['primevue']
  },
  modules:[
    '@nuxtjs/tailwindcss'
  ],
  ssr: false,
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:5207/api'
    }
  }
})
