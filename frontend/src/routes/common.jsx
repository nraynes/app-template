import TopBar from "@/components/TopBar";
import RootRoutes from "@/features/postWall/routes";
import TermsRoutes from "@/features/terms/routes";

const App = (value) => (
  <>
    <TopBar />
    {value}
  </>
);

export const commonRoutes = [
  { path: '/', element: App(<RootRoutes />) },
  { path: '/service/*', element: App(<TermsRoutes />) },
];

export default commonRoutes