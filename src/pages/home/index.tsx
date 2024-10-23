import { TIMEFRAMES } from "@/data";
import { CandleChart } from "./components/candle-chart";
import { useCandleChartData } from "./functions";
import { cn } from "@/lib/cn";

const HomePage = () => {
  const { data, filter, handleFilterChange } = useCandleChartData();

  return (
    <section className="px-xl pt-sm pb-md">
      <div className="space-y-10 bg-foreground p-10">
        <h1 className="text-xl font-bold border-b border-dotted w-fit">
          {filter.symbol.toUpperCase()}
        </h1>
        <div className="grid grid-cols-7 gap-2">
          {TIMEFRAMES.map((timeframe) => {
            const isActive = filter.timeframe === timeframe;
            return (
              <button
                key={timeframe}
                onClick={() => handleFilterChange("timeframe", timeframe)}
                className={cn(
                  "gap-2 px-sm py-xs bg-background/60 rounded-md text-grey border border-black",
                  isActive && "bg-primary text-white"
                )}
              >
                {timeframe}
              </button>
            );
          })}
        </div>
        <CandleChart data={data} filter={filter} />
      </div>
    </section>
  );
};

export default HomePage;
