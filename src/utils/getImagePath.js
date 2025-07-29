// src/utils/getImagePath.js
const images = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,webp}', { eager: true });

export function getImagePath(filename) {
  for (const path in images) {
    if (path.includes(filename)) {
      return images[path].default;
    }
  }
  return null;
}
