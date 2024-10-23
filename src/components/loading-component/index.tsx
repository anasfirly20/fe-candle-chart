import { cn } from "@/lib/cn";
import { Spinner } from "@nextui-org/spinner";

type LoadingComponentProps = {
  className?: string;
};

export const LoadingComponent = (props: LoadingComponentProps) => {
  const { className } = props;
  return (
    <section
      className={cn("flex items-center justify-center min-h-screen", className)}
    >
      <Spinner />
    </section>
  );
};
