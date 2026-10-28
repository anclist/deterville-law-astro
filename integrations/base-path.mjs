// Prefixes root-relative URLs in built HTML with Astro's `base`, so the site can be served
// from a sub-path (GitHub Pages project site) without threading base through every link.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(p);
    else if (p.endsWith('.html')) yield p;
  }
}

export default function basePath() {
  let base = '/';
  return {
    name: 'base-path',
    hooks: {
      'astro:config:done': ({ config }) => { base = config.base.replace(/\/$/, ''); },
      'astro:build:done': async ({ dir }) => {
        if (!base) return;
        const attr = /\b(href|src|action|content|url)=(["'])\/(?!\/)/g;
        for await (const file of htmlFiles(fileURLToPath(dir))) {
          const html = await readFile(file, 'utf8');
          const out = html.replace(attr, (m, name, q, offset) =>
            html.startsWith(base + '/', offset + m.length - 1) || html.startsWith(base + q, offset + m.length - 1)
              ? m
              : `${name}=${q}${base}/`);
          const final = out.replace(/(http-equiv="refresh" content="\d+;url=)\/(?!\/)/g, (m, pre, offset) =>
            out.startsWith(base + '/', offset + m.length - 1) ? m : `${pre}${base}/`);
          if (final !== html) await writeFile(file, final);
        }
      },
    },
  };
}
