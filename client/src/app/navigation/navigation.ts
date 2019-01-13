import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboards',
                title: 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'analytics',
                        title: 'Analytics',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },
                    {
                        id: 'project',
                        title: 'Project',
                        type: 'item',
                        url: '/apps/dashboards/project'
                    }
                ]
            },
            {
                id: 'chat',
                title: 'Chat',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'chat',
                url: '/apps/chat',
                badge: {
                    title: '13',
                    bg: '#09d261',
                    fg: '#FFFFFF'
                }
            }
        ]
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'group',
        icon: 'pages',
        children: [
            {
                id: 'authentication',
                title: 'Authentication',
                type: 'collapsable',
                icon: 'lock',
                badge: {
                    title: '10',
                    bg: '#525e8a',
                    fg: '#FFFFFF'
                },
                children: [
                    {
                        id: 'login-v2',
                        title: 'Login v2',
                        type: 'item',
                        url: '/pages/auth/login-2'
                    },
                    {
                        id: 'register-v2',
                        title: 'Register v2',
                        type: 'item',
                        url: '/pages/auth/register-2'
                    }
                ]
            },
            {
                id: 'errors',
                title: 'Errors',
                type: 'collapsable',
                icon: 'error',
                children: [
                    {
                        id: '404',
                        title: '404',
                        type: 'item',
                        url: '/pages/errors/error-404'
                    },
                    {
                        id: '500',
                        title: '500',
                        type: 'item',
                        url: '/pages/errors/error-500'
                    }
                ]
            },
            {
                id: 'profile',
                title: 'Profile',
                type: 'item',
                icon: 'person',
                url: '/pages/profile'
            }
        ]
    }
];
