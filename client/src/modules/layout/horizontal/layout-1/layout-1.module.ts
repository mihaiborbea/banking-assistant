import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';

import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ContentModule } from '../../components/content/content.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';

import { HorizontalLayout1Component } from '../../horizontal/layout-1/layout-1.component';

@NgModule({
    declarations: [HorizontalLayout1Component],
    imports: [MatSidenavModule, FuseSharedModule, FuseSidebarModule, ContentModule, NavbarModule, ToolbarModule],
    exports: [HorizontalLayout1Component]
})
export class HorizontalLayout1Module {}
