node -e "
const fs = require('fs');
const path = require('path');
const sizeOf = (buf) => {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47 && buf.readUInt32BE(4) === 0x0d0a1a0a) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  return null;
};
const pJsonPath = path.join(process.cwd(), 'content', 'portfolio.json');
const portfolio = JSON.parse(fs.readFileSync(pJsonPath, 'utf8'));
let count = 0;
portfolio.projects.forEach(p => {
  p.images.forEach(img => {
    const fullPath = path.join(process.cwd(), 'public', img.src.replace(/^\//, ''));
    if (fs.existsSync(fullPath)) {
      const dim = sizeOf(fs.readFileSync(fullPath));
      if (dim) {
        img.width = dim.width;
        img.height = dim.height;
        count++;
      }
    }
  });
});
console.log('Updated dimensions for', count, 'images');
fs.writeFileSync(pJsonPath, JSON.stringify(portfolio, null, 2), 'utf8');
"







node -e "const fs = require('sharp'); const path = require('path'); const f = require('fs'); const sample = ['public/images/work/ethiopian-orthodox-church-design/ethiopian-orthodox-church-design-01.png', 'public/images/work/enda-mikael-palace-reimagination/enda-mikael-palace-reimagination-01.png']; for(const p of sample){ const orig = f.statSync(p).size; fs(p).webp({ quality: 80 }).toBuffer().then(b => console.log(p, (orig/1024).toFixed(1)+'KB -> '+(b.length/1024).toFixed(1)+'KB ('+Math.round(100*(1-b.length/orig))+'% saved)')); }"