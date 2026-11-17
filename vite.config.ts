import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { createRoutes } from './src/routes/carPartSearchRoutes.js'

const searchRoutes = createRoutes()

function searchApi() {
  return {
    name: 'autoparts-search-api',
    configureServer(server: { middlewares: { use: (handler: (req: unknown, res: unknown, next: () => void) => void) => void } }) {
      server.middlewares.use((req: unknown, res: unknown, next: () => void) => {
        const request = req as { method?: string; url?: string }
        const response = res as {
          statusCode: number
          setHeader: (name: string, value: string) => void
          end: (body: string) => void
        }

        if (!request.url?.startsWith('/api/parts/search')) {
          next()
          return
        }

        const route = searchRoutes.find(
          (item) => item.method === request.method && request.url?.startsWith(item.path)
        )

        if (!route) {
          response.statusCode = 405
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ results: [], error: 'Method not allowed.' }))
          return
        }

        const url = new URL(request.url, 'http://localhost')
        void route
          .handler({ query: url.searchParams.get('q') ?? '' })
          .then((result) => {
            response.statusCode = result.status
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify(result.body))
          })
          .catch(() => {
            response.statusCode = 500
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({ results: [], error: 'Unable to search auto parts.' }))
          })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    searchApi(),
  ],
})
