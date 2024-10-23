import errorSvg from "@/assets/error.svg";
import { cn } from "@/lib/cn";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";

type ErrorComponentProps = {
  className?: string;
  showRetry?: boolean;
};

export const ErrorComponent = (props: ErrorComponentProps) => {
  const { className, showRetry } = props;
  const navigate = useNavigate();

  return (
    <section
      className={cn(
        "w-full flex flex-col justify-center items-center gap-5",
        className
      )}
    >
      <img alt="error-illustration" src={errorSvg} width={300} height={300} />
      <p className="text-2xl">Oops, an error occurred</p>
      {showRetry && (
        <Button
          variant="ghost"
          className="border rounded-lg border-primary py-2 px-6 hover:opacity-75 active:opacity-100 transition-all duration-150 font-medium"
          onClick={() => navigate(0)}
        >
          Retry
        </Button>
      )}
    </section>
  );
};
