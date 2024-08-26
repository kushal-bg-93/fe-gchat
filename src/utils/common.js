export const stringToHash = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

export const getHSLColor = (hash) => {
    const hue = hash % 360; // Ensures hue is within 0-360 range
    const saturation = 90; // Fixed saturation for brightness
    const lightness = 80; // Fixed lightness for visibility
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };