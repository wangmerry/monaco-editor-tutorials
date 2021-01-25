export interface RouteProps {
  path: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
  component: () => Promise<{ default: any }>;
}

const routes: RouteProps[] = [
  {
    path: '/',
    component: () => import('@/pages/Home'),
    exact: true,
  },
  {
    path: '/formatting',
    component: () => import('@/pages/Formatting'),
  },
  {
    path: '/custom-action',
    component: () => import('@/pages/CustomAction'),
  },
  {
    path: '/intellisense',
    component: () => import('@/pages/IntelliSense'),
  },
  {
    path: '/theme',
    component: () => import('@/pages/Theme'),
  },
  {
    path: '/snippet',
    component: () => import('@/pages/Snippet'),
  },
  {
    path: '/syntax-verify',
    component: () => import('@/pages/SyntaxVerify'),
  },
  {
    path: '/syntax-extend',
    component: () => import('@/pages/SyntaxExtend'),
  },
  {
    path: '/command',
    component: () => import('@/pages/Command'),
  },
];

export default routes;
