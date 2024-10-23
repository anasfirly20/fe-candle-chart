import usdt from "@/assets/usdt.svg";
import btc from "@/assets/btc.svg";
import eth from "@/assets/eth.svg";
import bnb from "@/assets/bnb.svg";
import { formatPair } from "@/utils";

type TradingPairProps = {
  filter: {
    symbol: string;
    timeframe: string;
  };
};

export const TradingPair = (props: TradingPairProps) => {
  const { filter } = props;

  const pair = filter.symbol.toLowerCase();

  const iconMap = {
    btcusdt: btc,
    ethusdt: eth,
    bnbusdt: bnb,
  };
  const icon = iconMap[pair as keyof typeof iconMap];

  return (
    <div className="flex gap-2">
      <div className="relative flex items-center">
        <img
          src={icon}
          alt={pair.slice(0, -4)}
          width={30}
          height={30}
          className={"z-10 border-3 border-foreground rounded-full"}
        />
        <img
          src={usdt}
          alt="usdt"
          width={30}
          height={30}
          className="border-3 border-foreground rounded-full -ml-5 -translate-y-3"
        />
      </div>
      <div className="flex gap-1">
        <p>{formatPair(filter?.symbol).toUpperCase()} Spot Trading Pair</p>
        {"·"}
        <p>{filter?.timeframe}</p>
        {"·"}
        <p>Binance WS</p>
      </div>
    </div>
  );
};
