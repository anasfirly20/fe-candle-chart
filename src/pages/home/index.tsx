import { TIMEFRAMES } from "@/data";
import { CandleChart } from "./components/candle-chart";
import { useCandleChartData } from "./functions";
import { cn } from "@/lib/cn";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { formatPair } from "@/utils";

const PAIRS = ["BTCUSDT", "ETHUSDT", "SOLUSDT"];

const HomePage = () => {
  const { data, filter, handleFilterChange } = useCandleChartData();

  console.log("filter", filter);

  return (
    <section className="px-xl pt-xs pb-md">
      <h1 className="text-3xl font-bold text-white/85 mb-sm ml-2 text-center">
        Crypto Trading Dashboard
      </h1>
      <div className="space-y-10 bg-foreground p-10 rounded-xl">
        <div className="flex justify-between">
          <div className="grid grid-cols-8 gap-2">
            {PAIRS.map((pair) => {
              const isActive =
                filter.symbol.toLowerCase() === pair.toLowerCase();

              return (
                <Button
                  size="lg"
                  key={pair}
                  onClick={() => handleFilterChange("symbol", pair)}
                  className={cn(
                    "gap-2 px-sm py-xs bg-transparent rounded-lg text-white/50 border border-black transition-all duration-300",
                    isActive && "bg-primary text-white/85"
                  )}
                >
                  {formatPair(pair)}
                </Button>
              );
            })}
          </div>
          <Select
            aria-label="Timeframe"
            size="lg"
            className="w-1/12"
            defaultSelectedKeys={["1h"]}
            onChange={(e) => {
              handleFilterChange("timeframe", e.target.value);
            }}
          >
            {TIMEFRAMES.map((timeframe) => (
              <SelectItem key={timeframe}>{timeframe}</SelectItem>
            ))}
          </Select>
        </div>
        <CandleChart data={data} filter={filter} />
      </div>
    </section>
  );
};

export default HomePage;
