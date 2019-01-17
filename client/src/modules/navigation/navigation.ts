import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'profile',
        title: 'Profile',
        type: 'item',
        icon: 'person',
        url: '/profile'
    },
    {
        id: 'error',
        title: 'Error',
        type: 'item',
        icon: 'error',
        url: '/error'
    },
    {
        id: 'auth',
        title: 'Auth',
        type: 'item',
        icon: 'lock',
        url: '/auth'
    },
    {
        id: 'chat',
        title: 'Chat',
        type: 'item',
        icon: 'chat',
        url: '/chat',
        badge: {
            title: '13',
            bg: '#09d261',
            fg: '#FFFFFF'
        }
    },
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
    }
];
