import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Headers, RequestOptions, BaseRequestOptions } from '@angular/http';
import { APP_BASE_HREF, CommonModule, Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
// third party module to display toast 
import { ToastrModule } from 'toastr-ng2';
//PRIMENG - Third party module
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, DropdownModule } from 'primeng/primeng';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { ContactComponent } from './components/contact/contact.component';
import { LocationComponent } from './components/location/location.component';

import { ContactService } from './_services/index';
import { LocationService } from './_services/index';


class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers();
    constructor() {
        super();
        this.headers.append('Content-Type', 'application/json');
        this.body = '';
    }
}

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        ContactComponent,
        LocationComponent
    ],
    providers: [ContactService,LocationService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: RequestOptions, useClass: AppBaseRequestOptions }],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        InputTextModule, DataTableModule, ButtonModule, DialogModule, DropdownModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'contact', pathMatch: 'full' },
            { path: 'contact', component: ContactComponent },
            { path: 'location', component: LocationComponent },
            { path: '**', redirectTo: 'contact' }
        ])
    ]
})
export class AppModuleShared {
}
