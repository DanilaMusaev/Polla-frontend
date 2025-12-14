// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    app: {
        head: {
            title: 'Polla',
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
            ],
        },
    },
    devtools: { enabled: true },
    css: ['~/assets/css/reset.css', '~/assets/css/global.css'],
    modules: ['@nuxt/image'],
});
