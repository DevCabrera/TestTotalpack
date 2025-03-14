import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormValidationComponent } from '../../../form-validation/form-validation.component';


@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FormValidationComponent],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent {
  address: any = { address: '', isPrimary: false };
  @Output() addressSaved = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<AddressFormComponent>) { }
  //guardar la direccion del usuario y emitimos el evento addressSaved
  saveAddress(): void {
    this.addressSaved.emit(this.address);
    this.dialogRef.close();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}