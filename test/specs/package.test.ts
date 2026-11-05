import assert from 'assert';
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';

type AnyRecord = { [key: string]: any };

const ROOT = join(import.meta.dirname, '..', '..');
const ALWAYS_PACKED = ['package.json', 'README.md', 'LICENSE'];

// `npm pack` prints an array up to npm 11, and an object keyed by the package
// name from npm 12
const listPackedFiles = (): string[] => {
  const output = JSON.parse(
    execSync('npm pack --dry-run --json --ignore-scripts', {
      cwd: ROOT,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore']
    })
  );
  const [packed] = Array.isArray(output) ? output : Object.values(output);

  return (packed as AnyRecord).files.map((file: { path: string }) => file.path);
};

// Every path `package.json` points a consumer at, such as `./dist/index.js`
const listEntryPoints = (value: unknown): string[] => {
  if (typeof value === 'string') {
    return [value.replace(/^\.\//, '')];
  }

  if (value !== null && typeof value === 'object') {
    return Object.values(value).flatMap(listEntryPoints);
  }

  return [];
};

describe('Test: published package', () => {
  it('holds only the build output next to the files npm always adds', () => {
    // A folder that is not part of the package, like the local `.claude`
    // folder that ended up in 1.4.0, has to stay out of it
    const strayFolder = join(ROOT, `stray-folder-${process.pid}`);

    mkdirSync(strayFolder);
    writeFileSync(join(strayFolder, 'note.txt'), 'not part of the package');

    try {
      const unexpected = listPackedFiles().filter(
        (path) => !path.startsWith('dist/') && !ALWAYS_PACKED.includes(path)
      );

      assert.deepStrictEqual(unexpected, []);
    } finally {
      rmSync(strayFolder, { recursive: true, force: true });
    }
  });

  it('holds every file that `package.json` points to', () => {
    const packageJson = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));
    const packed = listPackedFiles();
    const entryPoints = listEntryPoints([packageJson.main, packageJson.types, packageJson.exports]);

    entryPoints.forEach((entryPoint) => {
      assert.ok(packed.includes(entryPoint), `'${entryPoint}' is missing from the package`);
    });
  });
});
