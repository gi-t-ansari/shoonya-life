import { Suspense, lazy } from "react";
import { CircularProgress } from "../../common";

const LazyRetreatDetails = lazy(() => import("./RetreatDetails"));

export const RetreatDetails = (props) => (
  <Suspense fallback={<CircularProgress />}>
    <LazyRetreatDetails {...props} />
  </Suspense>
);
