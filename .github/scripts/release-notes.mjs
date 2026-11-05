// Prints the release notes of one version, taken from its section of
// `CHANGELOG.md`, for `gh release create --notes-file`.
//
// Usage: node .github/scripts/release-notes.mjs <version> [path to CHANGELOG.md]
import { readFileSync } from 'node:fs';

const PACKAGE_URL = 'https://www.npmjs.com/package/vitepress-i18n/v';

// A section is headed `## 1.4.0 (2026-08-25)`, and an early one may carry a
// label after the date, as in `## 1.0.5 (2024-09-16) - Not for Production`.
const findSection = (changelog, version) => {
  const lines = changelog.split('\n');
  const start = lines.findIndex((line) => line.startsWith(`## ${version} (`));

  if (start === -1) {
    return null;
  }

  const end = lines.findIndex((line, index) => index > start && line.startsWith('## '));

  return {
    heading: lines[start],
    body: lines
      .slice(start + 1, end === -1 ? undefined : end)
      .join('\n')
      .trim()
  };
};

const readReleaseNotes = (version, changelogPath) => {
  if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) {
    throw new Error(`Expected a version such as 1.5.0, but got '${version ?? ''}'.`);
  }

  const section = findSection(readFileSync(changelogPath, 'utf-8'), version);

  // A version is only released once its section is named and dated, which a
  // `vNext (2026--)` section is not yet.
  if (!section) {
    throw new Error(`'${changelogPath}' has no section for ${version}.`);
  }

  const heading = section.heading.match(/^## \S+ \((\d{4}-\d{2}-\d{2})\)(?:\s*-\s*(.+))?$/);

  if (!heading) {
    throw new Error(`The section for ${version} has no release date: '${section.heading}'.`);
  }

  const [, releaseDate, label] = heading;
  const body = label ? `${label.trim()}.\n\n${section.body}` : section.body;

  return `${body}\n\nReleased on ${releaseDate}. [View on npm](${PACKAGE_URL}/${version})\n`;
};

const [version, changelogPath = 'CHANGELOG.md'] = process.argv.slice(2);

try {
  process.stdout.write(readReleaseNotes(version, changelogPath));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
