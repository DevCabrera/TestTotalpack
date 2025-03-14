import { Component, Input } from '@angular/core';
import { UserServices } from '../../../services/user/user-services.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-address-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent {
  @Input() userId!: number;
  addresses$ = this.userService.getUsers().pipe( //obtiene las direcciones de los usuarios
    map(users => users.find(user => user.id === this.userId)?.addresses || []) //mapea(recorremos) los usuarios y obtiene las direcciones del usuario y si no hay direcciones devuelve un array vacio
  );

  constructor(private userService: UserServices) { }

  //Funcion para setear la dirección principal de un usuario, recibe el id de la dirección y el id del usuario y llama a la función setPrimaryAddress del servicio userService
  setPrimaryAddress(addressId: number | undefined): void {
    if (addressId !== undefined) {
      this.userService.setPrimaryAddress(this.userId, addressId);
    }
  }
}