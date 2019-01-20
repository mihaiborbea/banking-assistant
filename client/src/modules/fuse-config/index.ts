import { FuseConfig } from '@fuse/types';

export const fuseConfig: FuseConfig = {
  layout: {
    style: 'horizontal-layout-1',
    width: 'fullwidth',
    navbar: {
      background: 'mat-fuse-dark-700-bg',
      folded: false,
      hidden: false,
      position: 'top',
      variant: 'vertical-style-1'
    },
    toolbar: {
      background: 'mat-white-500-bg',
      hidden: false,
      position: 'above'
    },
    footer: {
      background: 'mat-fuse-dark-900-bg',
      hidden: true,
      position: 'below-fixed'
    },
    sidepanel: {
      hidden: true,
      position: 'right'
    }
  },
  customScrollbars: true
};
