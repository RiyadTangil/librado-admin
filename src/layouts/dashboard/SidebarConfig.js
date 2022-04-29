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
    title: 'Company Create',
    path: '/dashboard/create-company',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Welcome',
    path: '/dashboard/welcome',
    icon: getIcon('eva:pie-chart-2-fill')
  },

  {
    title: 'Getting Started',
    path: '/dashboard/getting-started',
    icon: getIcon('eva:lock-fill')
  },
  {
    title: 'Happiness Factor',
    path: '/dashboard/happiness-factor',
    icon: getIcon('eva:lock-fill')
  },
  
  {
    title: 'Cultural / Target Statement',
    path: '/dashboard/statements',
    icon: getIcon('eva:lock-fill')
  },
  {
    title: 'Category',
    path: '/dashboard/category',
    icon: getIcon('eva:lock-fill')
  },
  {
    title: 'Operational Category',
    path: '/dashboard/questions',
    icon: getIcon('eva:lock-fill')
  },

  {
    title: 'Publish report',
    path: '/dashboard/reports',
    icon: getIcon('eva:file-text-fill')
  }
];

export default sidebarConfig;
