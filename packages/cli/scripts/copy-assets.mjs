import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliDir = path.resolve(__dirname, '../');
const rootDir = path.resolve(cliDir, '../../');

const srcRegistry = path.resolve(rootDir, 'registry');
const destRegistry = path.resolve(cliDir, 'registry');
console.log('Copying from:', srcRegistry, 'to:', destRegistry);
if (fs.existsSync(srcRegistry)) {
  fs.cpSync(srcRegistry, destRegistry, { recursive: true });
  console.log('✓ Copied root registry -> packages/cli/registry');
} else {
  console.error('Source registry not found at:', srcRegistry);
}

const srcReadme = path.resolve(rootDir, 'README.md');
const destReadme = path.resolve(cliDir, 'README.md');
if (fs.existsSync(srcReadme)) {
  fs.copyFileSync(srcReadme, destReadme);
  console.log('✓ Copied root README.md -> packages/cli/README.md');
} else {
  console.error('Source README.md not found at:', srcReadme);
}

const srcLicense = path.resolve(rootDir, 'LICENSE');
const destLicense = path.resolve(cliDir, 'LICENSE');
if (fs.existsSync(srcLicense)) {
  fs.copyFileSync(srcLicense, destLicense);
  console.log('✓ Copied root LICENSE -> packages/cli/LICENSE');
}
