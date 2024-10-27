import { useState, useEffect, useCallback } from "react";
import { TCandleChartDataItem, TWebSocketKlineResponse } from "../types";

export const useCandleChartData = () => {
  const [data, setData] = useState<TCandleChartDataItem[]>([]);
  const [status, setStatus] = useState<"loading" | "succcess" | "error">(
    "succcess"
  );
  const [filter, setFilter] = useState({
    timeframe: "1h",
    symbol: "btcusdt",
  });
  const [previousClosePrice, setPreviousClosePrice] = useState<number | null>(
    null
  );

  const handleFilterChange = useCallback(
    (key: keyof typeof filter, value: string) => {
      setFilter((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  // Fetch historical data before establishing the WebSocket connection
  useEffect(() => {
    const fetchHistoricalData = async () => {
      setStatus("loading");
      try {
        const response = await fetch(
          `https://testnet.binance.vision/api/v3/uiKlines?symbol=${filter.symbol.toUpperCase()}&interval=${
            filter.timeframe
          }`
        );
        const historicalData = await response.json();

        const formattedData = historicalData.map((item: string[]) => ({
          open: +item[1],
          high: +item[2],
          low: +item[3],
          close: +item[4],
          time: +item[0],
        }));

        setData(formattedData);
        setStatus("succcess");
      } catch (error) {
        console.error("Failed to fetch historical data", error);
        setStatus("error");
      }
    };

    fetchHistoricalData();
  }, [filter.symbol, filter.timeframe]);

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
          setPreviousClosePrice(lastCandle ? lastCandle.close : null);

          const existingCandle = prev.find(
            (candle) => candle.time === newCandle.time
          );

          if (existingCandle) {
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

          const updatedData = [...prev, newCandle];
          return updatedData.sort((a, b) => a.time - b.time);
        });
      };

      binanceSocket.onerror = () => {
        setStatus("error");
      };

      binanceSocket.onclose = () => {
        setStatus("succcess");
      };

      if (
        binanceSocket.readyState !== binanceSocket.CLOSED &&
        filter.symbol !== "btcusdt"
      ) {
        setStatus("loading");
      }
    };

    if (data?.length > 0) connectSocket();

    return () => {
      if (binanceSocket) {
        binanceSocket.close();
      }
    };
  }, [filter.symbol, filter.timeframe, data]);

  return {
    data,
    filter,
    handleFilterChange,
    status,
    previousClosePrice,
  };
};
