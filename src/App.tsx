import { Suspense } from "react";
import AppRoutes from "./AppRoutes";
import { LoadingComponent } from "./components/loading-component";

function App() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
