import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'summary',
    title: 'Summary',
    type: 'item',
    icon: 'bar_chart',
    url: '/dashboards/summary'
  },
  {
    id: 'transactions',
    title: 'Transactions',
    type: 'item',
    icon: 'bar_chart',
    url: '/dashboards/transactions'
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
