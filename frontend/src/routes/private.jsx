import TopBar from "@/components/TopBar";
import ProfileRoutes from '@/features/profile/routes';
import AdminRoutes from '@/features/admin/routes';

const App = (value) => (
  <>
    <TopBar />
    {value}
  </>
)

export const privateRoutes = [
  { path: '/user/*', element: App(<ProfileRoutes />) },
  { path: '/admin/*', element: App(<AdminRoutes />) },
];

export default privateRoutes