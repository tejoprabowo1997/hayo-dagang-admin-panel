import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.min.css'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const customTheme = {
    dark: false,
    colors: {
      primary: '#42A5F5',
      secondary: '#B2EBF2',
      success: '#00BCD4',
      info: '#4DB6AC',
      warning: '#FF5722',
      error: '#DD2C00',
    },
  }

  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'customTheme',
      themes: {
        customTheme,
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
