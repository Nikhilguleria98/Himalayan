import { copyFile, mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const optimizedPublicDir = path.resolve("public-optimized");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
let beforeBytes = 0;
let afterBytes = 0;
let imageCount = 0;

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(file));
    else files.push(file);
  }
  return files;
}

async function optimize(file) {
  const output = path.join(optimizedPublicDir, path.relative(publicDir, file));
  await mkdir(path.dirname(output), { recursive: true });
  const extension = path.extname(file).toLowerCase();
  if (!imageExtensions.has(extension)) {
    await copyFile(file, output);
    return;
  }
  const input = await stat(file);
  beforeBytes += input.size;

  let pipeline = sharp(file, { animated: false }).rotate().resize({
    width: 1920,
    height: 1920,
    fit: "inside",
    withoutEnlargement: true,
  });

  if (extension === ".webp") pipeline = pipeline.webp({ quality: 78, effort: 5 });
  if (extension === ".png") pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 82, effort: 8 });
  if (extension === ".jpg" || extension === ".jpeg") pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true, progressive: true });

  await pipeline.toFile(output);
  const outputStats = await stat(output);
  afterBytes += outputStats.size;
  imageCount += 1;
}

const files = await filesIn(publicDir);
for (const file of files) await optimize(file);

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
console.log(`Optimized ${imageCount} images: ${mb(beforeBytes)} MB -> ${mb(afterBytes)} MB (${Math.round((1 - afterBytes / beforeBytes) * 100)}% smaller).`);
