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

const formatDateTime = (timestamp: number, timeframe: string): string => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    weekday: timeframe === "1d" ? "short" : undefined,
    year: "2-digit",
    month: "short",
    day: "numeric",
  };

  const timeframesWithTime = ["1h", "4h"];
  if (timeframesWithTime.includes(timeframe)) {
    return `${date.toLocaleString("en-GB", options)} ${date.toLocaleTimeString(
      "en-GB",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }
    )}`;
  }

  if (timeframe === "1d") {
    return `${date.toLocaleString("en-GB", options)}`;
  }

  return date.toLocaleString("en-GB", options);
};

export { formatPrice, formatPair, formatDateTime };
