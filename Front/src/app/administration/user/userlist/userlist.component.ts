import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServices } from '../../../services/user/user-services.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../userform/userform.component';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  users$ = this.userService.getUsers();
  currentPage = 1; // Página actual
  itemsPerPage = 10; // Elementos por página
  paginatedUsers: any[] = []; // Usuarios paginados

  constructor(private userService: UserServices, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.users$.subscribe(users => {
      this.updatePaginatedUsers(users);
    });
  }

  // Actualiza la lista de usuarios paginados
  updatePaginatedUsers(users: any[]) {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = users.slice(startIndex, endIndex);
  }

  // Cambia de página en la lista de usuarios
  changePage(page: number) {
    this.currentPage = page;
    this.users$.subscribe(users => {
      this.updatePaginatedUsers(users);
    });
  }

  // Obtiene el número total de páginas
  get totalPages(): number {
    let total = 0;
    this.users$.subscribe(users => {
      total = Math.ceil(users.length / this.itemsPerPage);
    });
    return total;
  }

  // Elimina un usuario de la lista y agregamos alerta de confirmación de sweetalert2
  deleteUser(userId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',     
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId);
        Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
      } else if (result.isDismissed) {
        Swal.fire('Cancelado', 'El usuario no ha sido eliminado.', 'info');
      }
    });
  }

  // Abre el formulario de usuario para crear o editar un usuario obteniendo el id del usuario
  editUser(userId?: number): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: { userId }
    });

    dialogRef.componentInstance.userSaved.subscribe(() => {
      console.log('Usuario guardado');
    });
  }
  // obtiene la dirección principal de un usuario y devuelvemos la dirección o N/A si no tiene dirección
  getPrimaryAddress(user: any): string {
    const primaryAddress = user.addresses.find((a: any) => a.isPrimary);
    return primaryAddress ? primaryAddress.address : 'N/A';
  }
}