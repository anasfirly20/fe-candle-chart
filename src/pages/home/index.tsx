import { TIMEFRAMES } from "@/data";
import { CandleChart } from "./components/candle-chart";
import { useCandleChartData } from "./functions";
import { Select, SelectItem } from "@nextui-org/select";
import { Spinner } from "@nextui-org/spinner";
import { formatPair } from "@/utils";
import { Tabs, Tab } from "@nextui-org/tabs";
import { PAIRS } from "@/data";
import { ErrorBoundary } from "react-error-boundary";
import { IconsOverlap } from "./components/icons-overlap";
import { ErrorComponent } from "@/components/error-component";

const HomePage = () => {
  const { data, filter, handleFilterChange, status } = useCandleChartData();

  const isLoading = status === "loading";
  const isError = status === "error";

  return (
    <section className="px-xl pt-xs pb-md">
      <h1 className="text-3xl font-bold text-white/85 mb-sm ml-2 text-center">
        Crypto Trading Dashboard
      </h1>
      <div className="space-y-8 bg-foreground p-10 rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex gap-5 w-5/6">
            <Tabs
              size="lg"
              aria-label="timeframe-options"
              color="primary"
              onSelectionChange={(e) =>
                handleFilterChange("timeframe", e.toString())
              }
              defaultSelectedKey="1h"
              isDisabled={isLoading}
            >
              {TIMEFRAMES.map((timeframe) => {
                return <Tab key={timeframe} title={timeframe} />;
              })}
            </Tabs>
            {isLoading && <Spinner size="sm" />}
          </div>
          <Select
            aria-label="pair-options"
            size="lg"
            className="w-1/6"
            defaultSelectedKeys={["BTCUSDT"]}
            onChange={(e) => {
              handleFilterChange("symbol", e.target.value);
            }}
          >
            {PAIRS.map((pair) => (
              <SelectItem key={pair}>{formatPair(pair)}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex gap-2">
          <IconsOverlap filter={filter} />
          <div className="flex gap-1">
            <p>{formatPair(filter.symbol).toUpperCase()} Spot Trading Pair</p>
            {"·"}
            <p>{filter.timeframe}</p>
            {"·"}
            <p>Binance WS</p>
          </div>
        </div>
        {isError && <ErrorComponent showRetry />}
        {!isError && (
          <ErrorBoundary
            fallback={<ErrorComponent showRetry />}
            onReset={() => {
              console.log("reset");
            }}
          >
            <CandleChart data={data} filter={filter} />
          </ErrorBoundary>
        )}
      </div>
    </section>
  );
};

export default HomePage;
