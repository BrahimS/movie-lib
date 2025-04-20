// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Movie App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'A modern movie app built with Nuxt 3',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'vuetify-nuxt-module',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },

  vuetify: {
    moduleOptions: {
      /* module specific options */
      styles: { configFile: 'assets/vuetify.scss' },
    },
    vuetifyOptions: {
      /* vuetify options */
      theme: {
        defaultTheme: 'dark',
      },
      display: {
        mobileBreakpoint: 'sm',
      },
      icons: {
        defaultSet: 'mdi',
      },
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
    shim: false,
  },

  runtimeConfig: {
    public: {
      tmdbBaseURL: process.env.NUXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
      tmdbApiKey: process.env.NUXT_PUBLIC_TMDB_API_KEY,
      apiBase: 'https://api.themoviedb.org/3',
      apiKey: '',
    },
  },

  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/css/tailwind.css',
  ],

  build: {
    transpile: [
      'vuetify',
      '@tiptap/vue-3',
      '@tiptap/pm',
      '@tiptap/starter-kit',
    ],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  nitro: {
    storage: {
      comments: {
        driver: 'fs',
        base: './data/comments',
      },
    },
  },

  components: {
    dirs: ['~/components', '~/components/ui', '~/components/movie'],
  },

  imports: {
    dirs: ['stores'],
  },

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2025-04-18',
})
