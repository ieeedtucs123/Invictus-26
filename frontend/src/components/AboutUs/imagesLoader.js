// Replace the URLs with your actual image paths or logic as needed
export async function loadImages() {
  const img = new window.Image();
  img.src = "/image.jpg"; // Use /image.jpg if the image is in public/
  await new Promise((resolve) => { img.onload = resolve; });
  return [{ image: img, iWidth: img.width, iHeight: img.height, width: img.width, height: img.height }];
}
