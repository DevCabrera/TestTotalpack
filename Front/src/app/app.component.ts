import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserlistComponent } from './administration/user/userlist/userlist.component';
import { UserFormComponent } from './administration/user/userform/userform.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UserFront';
  constructor(private dialog: MatDialog) { }


 
 
}


