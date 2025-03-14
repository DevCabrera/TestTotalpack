import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { UserServices } from '../../../services/user/user-services.service';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { AddressFormComponent } from '../address-form/address-form.component';
import { FormValidationComponent } from '../../../form-validation/form-validation.component';
import Swal from 'sweetalert2';
import { EmailServices } from '../../../services/email-services/email-services.service';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [FormsModule, CommonModule, FormValidationComponent],
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserFormComponent {
  @Input() user: any = { name: '', email: '', birthdate: '', addresses: [] }; // Datos del usuario o esperables del usuario
  @Output() userSaved = new EventEmitter<void>(); // Evento para guardar el usuario
  temporaryAddresses: any[] = [];  // Direcciones temporales, para guardarlas en el usuario mas tarde
  maxDate: string;

  //mi tarea mas complicada fue pensar la logica de las direcciones temporales, ya que al no existir un usuario, no se podia guardar la dirección
  //por lo que se me ocurrio guardar las direcciones en un array temporal y luego guardarlas en el usuario cuando se registrara el usuario
  constructor( //Constructor de la clases con los servicios y dialogos necesarios
    private userService: UserServices,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private emailServices: EmailServices,
    private datePipe: DatePipe
  ) {
    //Funcion para establecer la fecha máxima como hoy
    this.maxDate = new Date().toISOString().split('T')[0];
    //Funcion para obtener el usuario por id y establecer las direcciones temporales si el usuario existe 
    if (data && data.userId) {
      const existingUser = this.userService.getUserById(data.userId);
      if (existingUser) {
        this.user = { ...existingUser };
        this.temporaryAddresses = [...this.user.addresses];
      }
    }
  }

  // Validador para la fecha
  validateDate(): boolean {
    const selectedDate = new Date(this.user.birthdate);
    const today = new Date();
    return selectedDate <= today;
  }

  // no pude formatear la fecha, pero dejo el intento 
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  }
  //Funcion para guardar el usuario con alerta de sweetalert2
  saveUser(): void {
    if (!this.validateDate()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La fecha de nacimiento no puede ser superior a la fecha actual.',
      });
      return;
    }
    Swal.fire({
      title: '¿Deseas guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: 'No guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      cancelButtonColor: '#aaa',
    }).then((result) => {
      if (result.isConfirmed) {
        this.user.addresses = this.temporaryAddresses;
        if (this.user.id) {
          this.userService.updateUser(this.user);
        } else {
          this.userService.createUser(this.user);
        }
        this.sendEmailToUser();
        this.userSaved.emit();
        this.dialogRef.close();
        Swal.fire('Usuario registrado', 'Los cambios se han guardado correctamente.', 'success');
      } else if (result.isDenied) {
        Swal.fire('Cambios no guardados', 'Los cambios no se han guardado.', 'info');
      }
    });
  }


  // Método para enviar un correo electrónico al usuario
  //intente realizar la implementación de la función sendEmailToUser() pero no pude lograrlo, ya que tengo errores
  //de cors en el servidor de correo, por lo que no pude realizar la implementación de la función en el front
  sendEmailToUser(): void {
    const to = this.user.email;
    const bodyTemplate = `Hola ${this.user.name}, "Bienvenido nuevo usuario al sistema".`;

    this.emailServices.sendEmail(to, bodyTemplate).subscribe({
      next: () => {
        console.log('Correo enviado exitosamente');
      },
      error: (err) => {
        console.error('Error al enviar el correo:', err);
      },
    });
  }

  //Funcion para cerrar el modal
  closeModal(): void {
    this.dialogRef.close();
  }
  //abrir formulario de dirección
  openAddressForm(): void {
    const dialogRef = this.dialog.open(AddressFormComponent, {
      width: '400px'
    });

    dialogRef.componentInstance.addressSaved.subscribe((address: any) => {
      this.temporaryAddresses.push(address);
    });
  }
  //Funcion para setear la dirección principal
  setPrimaryAddress(addressId: number): void {
    this.temporaryAddresses.forEach((a: any) => a.isPrimary = false); //recorre las direcciones temporales y establece que no hay ninguna dirección principal
    const address = this.temporaryAddresses.find((a: any) => a.id === addressId);//busca la dirección por id en a 
    if (address) {
      address.isPrimary = true; //establece la dirección como principal si la encuentra
    }
  }
}