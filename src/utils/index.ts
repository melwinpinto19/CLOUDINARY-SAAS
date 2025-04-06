export function formatSize(bytes: number) {
  let size, type;

  if (bytes >= 1024 * 1024) {
    // If greater than or equal to 1 MB
    size = (bytes / (1024 * 1024)).toFixed(2); // Convert to MB
    type = "MB";
  } else if (bytes >= 1024) {
    // If greater than or equal to 1 KB
    size = (bytes / 1024).toFixed(2); // Convert to KB
    type = "KB";
  } else {
    size = bytes; // Leave as bytes
    type = "bytes";
  }

  return { size: size, type: type };
}
