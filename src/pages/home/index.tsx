import { CandleChart } from "./components/candle-chart";
import { useCandleChartData } from "./functions";

const HomePage = () => {
  const { data, filter } = useCandleChartData();

  return (
    <section className="px-xl py-xs">
      <CandleChart data={data} filter={filter} />
    </section>
  );
};

export default HomePage;
