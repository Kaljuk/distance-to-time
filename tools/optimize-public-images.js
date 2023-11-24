import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Helper function to convert directory URL to path
const directoryPath = (dirUrl) => {
  return fileURLToPath(new URL(dirUrl, import.meta.url));
};

// Function to convert images to a specific format (e.g., WebP)
const convertToWebP = async (filePath, outputPath) => {
  await sharp(filePath)
    .toFormat('webp')
    .webp({ quality: 80 })
    .toFile(outputPath);
};

// Recursive function to process a directory
const processDirectory = async (dirPath) => {
  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    const itemPath = path.join(dirPath, item);

    if (fs.statSync(itemPath).isFile() && /\.(jpe?g|png)$/i.test(item)) {
      const outputPath = `${itemPath}.webp`;
      await convertToWebP(itemPath, outputPath);
      console.log(`Converted ${itemPath} to WebP format.`);
    } else if (fs.statSync(itemPath).isDirectory()) {
      await processDirectory(itemPath); // Recurse into subdirectories
    }
  }
};

// Convert the path from URL to file path for the initial directory
const initialDirectory = directoryPath('../public/img/');

// Start processing the directory
processDirectory(initialDirectory);
