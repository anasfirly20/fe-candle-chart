import { cn } from "@/lib/cn";
import { formatPrice } from "@/utils";
import { TCandleChartDataItem } from "../../types";

type PriceDisplayProps = {
  data: TCandleChartDataItem[];
  previousClosePrice: number | null;
};

export const PriceDisplay = (props: PriceDisplayProps) => {
  const { data, previousClosePrice } = props;

  const latestCandle = data[data.length - 1];
  const priceColor = latestCandle?.close > (previousClosePrice ?? 0);

  return (
    <div className="flex flex-col">
      <h1
        className={cn(
          "text-2xl",
          priceColor ? "text-green-500" : "text-red-500"
        )}
      >
        {formatPrice(latestCandle?.close)}
      </h1>
      <p className="text-sm">≈ ${formatPrice(latestCandle?.close)}</p>
    </div>
  );
};
