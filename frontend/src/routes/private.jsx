import TopBar from "@/components/TopBar";
import ProfileRoutes from '@/features/profile/routes';

const App = (value) => (
  <>
    <TopBar />
    {value}
  </>
)

export const privateRoutes = [
  { path: '/user/*', element: App(<ProfileRoutes />) },
];

export default privateRoutes