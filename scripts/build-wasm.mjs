import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const pkgDir = path.join(dist, 'pkg');
const cratePkg = path.join(root, 'crates', 'aperture-core', 'pkg');

console.log('[build-wasm] Building Rust aperture-core crate with wasm-pack...');

// Cross-platform cargo path resolution
const cargoBin = path.join(os.homedir(), '.cargo', 'bin');
const env = {
  ...process.env,
  PATH: `${cargoBin}${path.delimiter}${process.env.PATH || ''}`,
};

execSync('npx wasm-pack build crates/aperture-core --target web --release', {
  cwd: root,
  env,
  stdio: 'inherit',
});

fs.mkdirSync(pkgDir, { recursive: true });

// Copy only the web js wrapper and wasm binary to avoid public artifact leakage
fs.copyFileSync(
  path.join(cratePkg, 'aperture_core.js'),
  path.join(pkgDir, 'aperture_core.js')
);
fs.copyFileSync(
  path.join(cratePkg, 'aperture_core_bg.wasm'),
  path.join(dist, 'aperture_core_bg.wasm')
);
fs.copyFileSync(
  path.join(cratePkg, 'aperture_core_bg.wasm'),
  path.join(pkgDir, 'aperture_core_bg.wasm')
);

const wasmSize = fs.statSync(path.join(dist, 'aperture_core_bg.wasm')).size;
console.log(`[build-wasm] WebAssembly binary generated: ${wasmSize} bytes (~${(wasmSize / 1024).toFixed(1)} KB)`);
