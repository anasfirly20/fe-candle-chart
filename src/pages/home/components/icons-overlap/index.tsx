import usdt from "@/assets/usdt.svg";
import btc from "@/assets/btc.svg";
import eth from "@/assets/eth.svg";
import bnb from "@/assets/bnb.svg";

type IconsOverlapProps = {
  filter: {
    symbol: string;
    timeframe: string;
  };
};

export const IconsOverlap = (props: IconsOverlapProps) => {
  const { filter } = props;

  const pair = filter.symbol.toLowerCase();

  const iconMap = {
    btcusdt: btc,
    ethusdt: eth,
    bnbusdt: bnb,
  };
  const icon = iconMap[pair as keyof typeof iconMap];

  return (
    <div className="relative flex">
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
  );
};
