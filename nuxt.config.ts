// https://nuxt.com/docs/api/configuration/nuxt-config

const baseUrlApp = process.env.NODE_ENV === 'production' ? '/AppNuxt': ''

export default defineNuxtConfig({
  app:{
    baseURL: baseUrlApp,
    head:{
      title: 'App',
      script : [
        {
          src: baseUrlApp+'/js/pathUrl.js',
          type: 'text/javascript',
          async: true
        }
      ]
    }
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
      baseURL: process.env.BASE_URL || 'http://api.fact.com:81/api'
    }
  }
})
