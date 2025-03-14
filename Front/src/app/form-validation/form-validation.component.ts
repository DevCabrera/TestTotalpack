import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';


@Component({
  selector: 'app-form-validation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent {
  @Input() form!: NgForm;
  @Input() model!: NgModel;
  @Input() errorMessages: { [key: string]: string } = {};


  // Obtiene el mensaje de error del campo que agreguemos en el formulario  
  get errorMessage(): string | null {
    if (this.model.invalid && (this.model.dirty || this.model.touched)) {
      for (const errorKey in this.model.errors) {
        if (this.model.errors.hasOwnProperty(errorKey)) {
          return this.errorMessages[errorKey];
        }
      }
    }
    return null;
  }
}