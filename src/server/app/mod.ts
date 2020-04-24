/**
 * @author Hans Oksendahl
 */
import {
  serve,
  createRouter,
  ServerRequest,
  readFileStr,
} from './deps.ts';

// Global references to index.html and bundle.js
let PAGE: string;
let BUNDLE: Uint8Array;

// Create a server on the specified port
const reqs = serve({ port: +Deno.env('DOCKER_PORT')! });
const router = createRouter();

// Serve the index.html page at root
router.get(/^\/$/, async (req) => {
  await req.respond({ body: PAGE });
});

// Serve the bundle.js file
router.get(/\/bundle.js$/, async (req) => {
  const headers = new Headers();
  headers.set('Content-Type', 'text/javascript')

  await req.respond({ headers, body: BUNDLE });
});

/**
 * Create a new HTTP server which serves the routes defined above.
 */
export default (async () => {
  // Read the index.html page and store it in memory
  PAGE = await readFileStr('./src/data/index.html', { encoding: 'utf-8' });

  // Build the bundle.js file and store it in memory
  {
    const [_, result] = await Deno.bundle('./src/client/app/main.ts');

    BUNDLE = new TextEncoder().encode(result);
  }

  // Loop
  for await (const req of reqs) {
    await router.run(req as ServerRequest);
  }
});
