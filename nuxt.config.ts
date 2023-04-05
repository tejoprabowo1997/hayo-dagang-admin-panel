export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1',
      title: 'HayoDagang',
      meta: [
        {
          name: 'description',
          content: 'HayoDagang',
        },
      ],
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: '/assets/images/jpg/logo.jpg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Work+Sans&display=swap',
        },
      ],
    },
  },
  css: ['~/assets/styles/css/custom.css'],
  build: {
    transpile: ['vuetify'],
  },
})
