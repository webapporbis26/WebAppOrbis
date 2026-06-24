const fs = require('fs');
const path = require('path');

const DIRECTORIES_TO_SCAN = [
  path.join(__dirname, '../src/routes'),
  path.join(__dirname, '../src/components')
];

// Spacing caps based on user requirements
const CAPS = {
  p: 28,  // py, pt, pb, px, p
  m: 12,  // my, mt, mb, mx, m
  gap: 12 // gap, gap-x, gap-y
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Regex to match tailwind spacing classes:
  // e.g., py-32, sm:gap-16, md:mt-20, lg:pb-40, gap-24
  const regex = /\b((?:sm:|md:|lg:|xl:|2xl:|hover:|focus:)?)(p|py|px|pt|pb|pl|pr|m|my|mx|mt|mb|ml|mr|gap|gap-x|gap-y)-(\d+)\b/g;

  content = content.replace(regex, (match, prefix, property, valueStr) => {
    const value = parseInt(valueStr, 10);
    
    // Skip if it's not a standard tailwind spacing scale multiple (like opacity-50, etc, but we already matched property prefixes)
    // Tailwind spacing typically goes 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
    
    let cap = 0;
    if (property.startsWith('p')) cap = CAPS.p;
    if (property.startsWith('m')) cap = CAPS.m;
    if (property.startsWith('gap')) cap = CAPS.gap;

    if (cap > 0 && value > cap) {
      // Find the closest valid tailwind spacing class <= cap
      // E.g. if value is 32 and cap is 28, we use 28
      // For margins and gaps, if value is 20 and cap is 12, we use 12
      // Let's just use the cap directly as it aligns with standard tailwind tokens (12, 28 are standard)
      console.log(`[${path.basename(filePath)}] Replacing ${match} -> ${prefix}${property}-${cap}`);
      return `${prefix}${property}-${cap}`;
    }

    return match;
  });

  // Additional check for hardcoded pixel padding/margins like py-[120px] -> py-28
  const arbitraryRegex = /\b((?:sm:|md:|lg:|xl:|2xl:)?)(py|pt|pb|mt|mb|gap)-\[([^\]]+)\]\b/g;
  content = content.replace(arbitraryRegex, (match, prefix, property, valueStr) => {
    if (valueStr.endsWith('px')) {
      const px = parseInt(valueStr.replace('px', ''), 10);
      let capPx = 0;
      if (property.startsWith('p')) capPx = 112; // 28 * 4
      if (property.startsWith('m')) capPx = 48;  // 12 * 4
      if (property.startsWith('gap')) capPx = 48; // 12 * 4

      if (capPx > 0 && px > capPx) {
        let capToken = property.startsWith('p') ? 28 : 12;
        console.log(`[${path.basename(filePath)}] Replacing ${match} -> ${prefix}${property}-${capToken}`);
        return `${prefix}${property}-${capToken}`;
      }
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function scanDir(dir) {
  let changedCount = 0;
  if (!fs.existsSync(dir)) return 0;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      changedCount += scanDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      if (processFile(fullPath)) {
        changedCount++;
      }
    }
  }
  return changedCount;
}

console.log('Starting spacing optimization...');
let totalChanged = 0;
for (const dir of DIRECTORIES_TO_SCAN) {
  totalChanged += scanDir(dir);
}
console.log(`Optimization complete. Modified ${totalChanged} files.`);
