/**
 * Servidor estático mínimo para visualizar o build de produção (`out/`).
 * Uso: npm run build && npm run preview
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../out', import.meta.url));
const port = Number(process.env.PORT ?? 3000);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

async function resolveFile(pathname) {
  let filePath = normalize(join(root, pathname));
  if (!filePath.startsWith(root + sep) && filePath !== root) return null;

  try {
    const info = await stat(filePath);
    if (info.isDirectory()) filePath = join(filePath, 'index.html');
    else return filePath;
  } catch {
    // cleanUrls: /pagina -> /pagina.html
    try {
      await stat(`${filePath}.html`);
      return `${filePath}.html`;
    } catch {
      return null;
    }
  }

  try {
    await stat(filePath);
    return filePath;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname);
  const filePath = await resolveFile(pathname === '/' ? '/index.html' : pathname);

  if (!filePath) {
    const notFound = await resolveFile('/404.html');
    const body = notFound ? await readFile(notFound) : 'Not Found';
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(body);
    return;
  }

  const body = await readFile(filePath);
  const type = MIME[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
  const immutable = /\/(_next\/static|images)\//.test(filePath);
  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
  });
  res.end(body);
}).listen(port, '0.0.0.0', () => {
  console.log(`Preview do build de produção em http://0.0.0.0:${port}`);
});
