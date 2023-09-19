const cacheImage = async (src: string) => {
  const img = new Image();

  img.src = src;

  img.onload;
};

export default cacheImage;
