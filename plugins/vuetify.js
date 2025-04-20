import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: 'dark',
      themes: {
        dark: {
          dark: true,
          colors: {
            primary: '#E50914',
            secondary: '#141414',
            background: '#141414',
            surface: '#1F1F1F',
            error: '#CF6679',
            'on-primary': '#FFFFFF',
            'on-secondary': '#FFFFFF',
            'on-background': '#FFFFFF',
            'on-surface': '#FFFFFF',
            'on-error': '#000000',
          },
        },
      },
    },
  })

  app.vueApp.use(vuetify)
})
