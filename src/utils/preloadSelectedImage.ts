const preloadSelectedImage = (imageUrl: string) => {
  const preloadImageLink = document.createElement("link");
  preloadImageLink.href = imageUrl;
  preloadImageLink.rel = "preload";
  preloadImageLink.as = "image";

  document.head.appendChild(preloadImageLink);
};

export default preloadSelectedImage;
