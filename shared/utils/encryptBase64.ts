export const base64ToBlob = (base64: string, contentType: string = "image/jpeg"): Blob => {
  const byteCharacters = atob(base64.split(",")[1]); // Pisahkan metadata dari data base64
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length).fill(null).map((_, i) => slice.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};
