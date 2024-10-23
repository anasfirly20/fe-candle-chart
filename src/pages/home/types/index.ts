import { CandlestickData, Time, WhitespaceData } from "lightweight-charts";

type TWebSocketKlineResponse = {
  e: string;
  E: number;
  s: string;
  k: TKlineData;
};

type TKlineData = {
  t: number;
  T: number;
  s: string;
  i: string;
  f: number;
  L: number;
  o: string;
  c: string;
  h: string;
  l: string;
  v: string;
  n: number;
  x: boolean;
  q: string;
  V: string;
  Q: string;
  B: string;
};

type TCandleChartData = CandlestickData<Time> | WhitespaceData<Time>;

type TCandleChartDataItem = {
  close: number;
  high: number;
  low: number;
  open: number;
  time: number;
};

export type {
  TWebSocketKlineResponse,
  TKlineData,
  TCandleChartData,
  TCandleChartDataItem,
};
