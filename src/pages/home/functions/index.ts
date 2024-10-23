import { useState, useEffect, useCallback } from "react";
import { TCandleChartDataItem, TWebSocketKlineResponse } from "../types";

export const useCandleChartData = () => {
  const [data, setData] = useState<TCandleChartDataItem[]>([]);
  const [filter, setFilter] = useState({
    timeframe: "1h",
    symbol: "btcusdt",
  });

  const handleFilterChange = useCallback(
    (key: keyof typeof filter, value: string) => {
      setFilter((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  useEffect(() => {
    let binanceSocket: WebSocket;

    const connectSocket = () => {
      binanceSocket = new WebSocket(
        `wss://stream.testnet.binance.vision:9443/ws/${filter.symbol.toLowerCase()}@kline_${
          filter.timeframe
        }`
      );

      binanceSocket.onmessage = (event) => {
        const response: TWebSocketKlineResponse = JSON.parse(event.data);
        const KItem = response.k;
        const newCandle = {
          open: +KItem.o,
          high: +KItem.h,
          low: +KItem.l,
          close: +KItem.c,
          time: +KItem.t,
        };

        setData((prev) => {
          const lastCandle = prev[prev.length - 1];

          // Merge if the new candle's time matches the last candle's time
          if (lastCandle && newCandle.time === lastCandle.time) {
            return prev.map((candle) => {
              if (candle.time === newCandle.time) {
                return {
                  ...candle,
                  high: Math.max(candle.high, newCandle.high),
                  low: Math.min(candle.low, newCandle.low),
                  close: newCandle.close,
                };
              }
              return candle;
            });
          }

          // Otherwise, add the new candle to the data
          return [...prev, newCandle];
        });
      };

      binanceSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      binanceSocket.onclose = () => {
        console.log("WebSocket closed");
      };
    };

    connectSocket();

    return () => {
      if (binanceSocket) {
        binanceSocket.close();
      }
    };
  }, [filter.symbol, filter.timeframe]);

  return {
    data,
    filter,
    handleFilterChange,
  };
};
