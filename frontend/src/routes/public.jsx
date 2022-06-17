import TopBar from "@/components/TopBar";
import AuthRoutes from "@/features/auth/routes";
import PasswordRoutes from "@/features/forgotPassword/routes";

const App = (value) => (
  <>
    <TopBar />
    {value}
  </>
);

export const publicRoutes = [
  { path: '/auth/*', element: App(<AuthRoutes />) },
  { path: '/password/*', element: App(<PasswordRoutes />) },
];

export default publicRoutes