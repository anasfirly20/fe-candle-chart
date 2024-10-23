const formatPrice = (price: number) => {
  if (!price) return "";

  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatPair = (pair: string) => {
  if (!pair) return "";

  return pair.slice(0, 3) + " / " + pair.slice(3);
};

export { formatPrice, formatPair };
