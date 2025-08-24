import { readFileSync, writeFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
packageJson.version = packageJson.version.split('-')[0];
packageJson.devDependencies.adga = packageJson.devDependencies.adga.split('-')[0];
writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
