import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Menu',
    path: '/dashboard',
    icon: <Icon icon="lucide:wrench" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Crew', path: '/dashboard/crew' },
      { title: 'Hours Submission', path: '/dashboard/hoursubmission' },
      { title: 'Projects', path: '/dashboard/projects' },
    ],
  },
  {
    title: 'Logout',
    path: '/',
    icon: <Icon icon="lucide:logout" width="24" height="24" />,
  }
];