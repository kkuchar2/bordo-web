import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': '/src',
            'state': '/src/state',
            'components': '/src/components',
            'util': '/src/util',
            'tools': '/src/tools',
            'queries': '/src/queries',
            'pages': '/src/pages',
        },
    },
    server: {
        port: 3002,
    },
    plugins: [react()],
})
