import { readFile } from 'node:fs/promises';

const data = JSON.parse(await readFile(new URL('../src/assets/images.json', import.meta.url)));
const errors = [];
const projects = new Set();

for (const [brand, items] of Object.entries(data)) {
  if (brand === 'featured') continue;
  if (!Array.isArray(items)) errors.push(`${brand}: expected an item array`);

  const itemList = Array.isArray(items) ? items : [];
  for (const [index, item] of itemList.entries()) {
    const files = Array.isArray(item.files) ? item.files : [item.file];
    if (!item.title || files.some((file) => typeof file !== 'string' || !file)) {
      errors.push(`${brand}[${index}]: requires title and file(s)`);
    }
    for (const file of files) projects.add(`${brand}/${file}`);
  }
}

for (const filename of data.featured ?? []) {
  if (![...projects].some((project) => project.endsWith(`/${filename}`))) {
    errors.push(`featured: missing project for ${filename}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${projects.size} media files.`);
