import { createChart, ColorType, CrosshairMode } from "lightweight-charts";
import { useRef, useEffect } from "react";
import { TCandleChartDataItem, TCandleChartData } from "../../types";
import { formatDateTime, formatPrice } from "@/utils";

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
        tickMarkFormatter: (timestamp: number) =>
          new Date(timestamp).getDate().toString(),
      },
      localization: {
        timeFormatter: (timestamp: number) =>
          formatDateTime(timestamp, filter.timeframe),
      },
      width: chartContainerRef?.current?.clientWidth,
      height: 500,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
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
