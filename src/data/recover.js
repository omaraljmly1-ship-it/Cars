const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, 'catalog.json');
console.log('Reading:', catalogPath);

// Read corrupted file as UTF-8 string
const corruptedContent = fs.readFileSync(catalogPath, 'utf8');

// Convert UTF-8 string back to original bytes using ISO-8859-1 (latin1)
const originalBytes = Buffer.from(corruptedContent, 'binary');

// Decode those bytes back to a UTF-8 string
const recoveredContent = originalBytes.toString('utf8');

// Let's print a sample to see if it worked
const sampleStart = recoveredContent.indexOf('rolls-royce-cullinan');
if (sampleStart !== -1) {
  console.log('Sample recovered text around rolls-royce-cullinan:');
  console.log(recoveredContent.substring(sampleStart - 100, sampleStart + 200));
} else {
  console.log('Could not find sample keyword.');
}

// Write the recovered content back
fs.writeFileSync(catalogPath, recoveredContent, 'utf8');
console.log('File successfully recovered and saved.');
