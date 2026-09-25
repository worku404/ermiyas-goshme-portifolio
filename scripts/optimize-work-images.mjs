import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function optimizeWorkImages() {
  const workDir = path.join(rootDir, 'public', 'images', 'work');
  let totalOrigBytes = 0;
  let totalWebpBytes = 0;
  let convertedCount = 0;

  function findPngs(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(findPngs(fullPath));
      } else if (file.toLowerCase().endsWith('.png')) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const pngFiles = findPngs(workDir);
  console.log(`Found ${pngFiles.length} PNG images to convert to WebP...`);

  for (const pngPath of pngFiles) {
    const webpPath = pngPath.replace(/\.png$/i, '.webp');
    const origStat = fs.statSync(pngPath);
    totalOrigBytes += origStat.size;

    // Convert using sharp with high quality 80
    await sharp(pngPath)
      .webp({ quality: 80 })
      .toFile(webpPath);

    const webpStat = fs.statSync(webpPath);
    totalWebpBytes += webpStat.size;
    convertedCount++;
  }

  console.log(`\nSuccessfully converted ${convertedCount} images to WebP.`);
  console.log(`Original total size: ${(totalOrigBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP total size:     ${(totalWebpBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Bandwidth saved:     ${((totalOrigBytes - totalWebpBytes) / 1024 / 1024).toFixed(2)} MB (${Math.round((1 - totalWebpBytes / totalOrigBytes) * 100)}% reduction!)`);

  // Update portfolio.json
  const portfolioPath = path.join(rootDir, 'content', 'portfolio.json');
  let portfolioContent = fs.readFileSync(portfolioPath, 'utf8');
  
  // Replace .png with .webp inside /images/work/ paths
  const updatedPortfolio = portfolioContent.replace(
    /(\/images\/work\/[^"]+?)\.png/g,
    '$1.webp'
  );

  fs.writeFileSync(portfolioPath, updatedPortfolio, 'utf8');
  console.log(`Updated content/portfolio.json to reference optimized WebP images.`);
}

optimizeWorkImages().catch(console.error);
