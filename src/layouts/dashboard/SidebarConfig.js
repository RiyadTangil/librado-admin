// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'Questions',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill')
  },
  {
    title: 'Report',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill')
  },
  {
    title: 'Manage Content',
    path: '/dashboard/contents',
    icon: getIcon('eva:lock-fill')
  },
  {
    title: 'Request',
    path: '/dashboard/request',
    icon: getIcon('eva:person-add-fill')
  },
  //   title: 'Manage Content',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill')
  // },
  // {
  //   title: 'Request',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill')
  // },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill')
  }
];

export default sidebarConfig;
