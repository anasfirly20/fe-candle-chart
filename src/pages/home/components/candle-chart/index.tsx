import { createChart, ColorType } from "lightweight-charts";
import { useRef, useEffect } from "react";
import { TCandleChartDataItem, TCandleChartData } from "../../types";
import { formatPrice } from "@/utils";

type CandleChartProps = {
  data: TCandleChartDataItem[];
  filter: {
    timeframe: string;
    symbol: string;
  };
};

export const CandleChart = (props: CandleChartProps) => {
  const { data, filter } = props;

  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current as HTMLDivElement, {
      layout: {
        background: { type: ColorType.Solid, color: "black" },
        textColor: "white",
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      localization: {
        timeFormatter: (timestamp: number) => {
          const date = new Date(timestamp);
          return `${date.toLocaleString("en-GB", {
            weekday: "short",
          })} ${date.getDate()} ${date.toLocaleString("en-GB", {
            month: "short",
          })} '${date.getFullYear().toString().slice(-2)}`;
        },
      },
      width: chartContainerRef?.current?.clientWidth,
      height: 500,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: true,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
      priceFormat: {
        type: "custom",
        formatter: (price: number) => formatPrice(price),
      },
      title: filter.symbol.toUpperCase(),
    });

    candlestickSeries.setData(data as TCandleChartData[]);
    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef?.current?.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, filter?.symbol]);

  return <div ref={chartContainerRef} />;
};
