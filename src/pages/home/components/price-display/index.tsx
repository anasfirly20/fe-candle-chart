import { cn } from "@/lib/cn";
import { formatPrice } from "@/utils";
import { TCandleChartDataItem } from "../../types";
import { Skeleton } from "@nextui-org/react";

type PriceDisplayProps = {
  data: TCandleChartDataItem[];
  previousClosePrice: number | null;
  isLoading: boolean;
};

export const PriceDisplay = (props: PriceDisplayProps) => {
  const { data, previousClosePrice, isLoading } = props;

  const latestCandle = data[data?.length - 1];
  const priceColor = latestCandle?.close > (previousClosePrice ?? 0);

  const price = formatPrice(latestCandle?.close);

  return (
    <div className="flex flex-col gap-1.5">
      <Skeleton isLoaded={!isLoading} className="rounded-lg">
        <h1
          className={cn(
            "text-2xl",
            priceColor ? "text-green-500" : "text-red-500"
          )}
        >
          {price}
        </h1>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} className="rounded-lg">
        {price && <p className="text-sm">≈ ${price}</p>}
      </Skeleton>
    </div>
  );
};
