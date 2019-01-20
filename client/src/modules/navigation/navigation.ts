import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'analytics',
    title: 'Analytics',
    type: 'item',
    icon: 'show_chart',
    url: '/dashboards/analytics'
  },
  {
    id: 'project',
    title: 'Project',
    type: 'item',
    icon: 'bar_chart',
    url: '/dashboards/project'
  },
  {
    id: 'chat',
    title: 'Chat',
    type: 'item',
    icon: 'chat',
    url: '/chat',
    badge: {
      title: '1',
      bg: '#507b1e',
      fg: '#FFFFFF'
    }
  }
];
