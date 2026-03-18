export const sizeMap: Record<string, string> = {
  "extra-small": "XS",
  small: "S",
  medium: "M",
  large: "L",
  "extra-large": "XL",
};

export const getSizeLabel = (value: string) => {
  return sizeMap[value] ?? value;
};
