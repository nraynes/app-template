import TopBar from "@/components/TopBar";
import RootRoutes from "@/features/common/routes";

const App = (value) => (
  <>
    <TopBar />
    {value}
  </>
);

export const commonRoutes = [
  { path: '/*', element: App(<RootRoutes />) },
];

export default commonRoutes