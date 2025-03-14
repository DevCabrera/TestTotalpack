import { Routes } from '@angular/router';

import { UserlistComponent } from './administration/user/userlist/userlist.component';
import { UserFormComponent } from './administration/user/userform/userform.component';

export const routes: Routes = [
    { path: 'users', component: UserlistComponent },
    { path: 'create-user', component: UserFormComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full' }
];