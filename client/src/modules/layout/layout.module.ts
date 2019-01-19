import { NgModule } from '@angular/core';

import { HorizontalLayout1Module } from './horizontal/layout-1/layout-1.module';

@NgModule({
    imports: [HorizontalLayout1Module],
    exports: [HorizontalLayout1Module]
})
export class LayoutModule {}
