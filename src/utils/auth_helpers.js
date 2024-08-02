import Cookies from "js-cookie"
import LZString from "lz-string"


export const getAndDecompress = (key, default_value) => {
    const details = Cookies.get(key);
    if (details) {
      try {
        const decompressed = LZString.decompressFromBase64(details);
        return decompressed ? JSON.parse(decompressed) : default_value;
      } catch (error) {
        console.error('Error decompressing or parsing data:', error);
      }
    }
    return default_value;
  };
  
  export const compressAndStore = (key, value, expires) => {
    try {
      const compressed = LZString.compressToBase64(JSON.stringify(value));
      Cookies.set(key, compressed, { expires: expires });
    } catch (error) {
      console.error('Error compressing or storing data:', error);
    }
  };
  