import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// creamos la interfaz User y Address para definir los tipos de datos que vamos a utilizar y simular una base de datos
//utilizare la opcion de mockear datos, por lo que no se guardaran, intente utilizar local storage pero no logre hacerlo funcionar correctamente
//ya que la prueba era para un front, me hubiera gustado realizarlo con el back, pero no conocia .net 8, asi que simule los datos
//basicamente un usuario tiene un id, nombre, email, fecha de nacimiento y direcciones
// las direcciones tienen un id, dirección y si es principal que pertenece al usuario
interface User {
  id: number;
  name: string;
  email: string;
  birthdate?: Date;
  addresses: Address[];
}

interface Address {
  id: number;
  address: string;
  isPrimary: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private users: User[] = []; //arreglo de usuarios vacio para rellenar datos

  constructor() {
    //creamos un arreglo de usuarios con sus respectivas direcciones, para rellenar datos y ver que funcione correctamente, por lo que al 
    //agregar otro usuario activaremos la paginacion
    this.users = [
      {
        id: 1,
        name: 'Omar Mora',
        email: 'omarpack@example.com',
        birthdate: new Date('1985-05-15'),
        addresses: [
          { id: 1, address: 'Calle Principal 123', isPrimary: true },
          { id: 2, address: 'Avenida Libertad 456', isPrimary: false },
        ],
      },
      {
        id: 2,
        name: 'María González',
        email: 'maria@example.com',
        birthdate: new Date('1990-08-22'),
        addresses: [
          { id: 1, address: 'Calle Secundaria 789', isPrimary: true },
          { id: 2, address: 'Boulevard Central 101', isPrimary: false },
        ],
      },
      {
        id: 3,
        name: 'Luis Ramírez',
        email: 'luis@example.com',
        birthdate: new Date('1988-03-10'),
        addresses: [
          { id: 1, address: 'Calle Norte 234', isPrimary: true },
          { id: 2, address: 'Calle Sur 567', isPrimary: false },
        ],
      },
      {
        id: 4,
        name: 'Ana Martínez',
        email: 'ana@example.com',
        birthdate: new Date('1995-11-30'),
        addresses: [
          { id: 1, address: 'Avenida Reforma 890', isPrimary: true },
          { id: 2, address: 'Calle Juárez 123', isPrimary: false },
        ],
      },
      {
        id: 5,
        name: 'Pedro Sánchez',
        email: 'pedro@example.com',
        birthdate: new Date('1980-07-25'),
        addresses: [
          { id: 1, address: 'Calle Hidalgo 456', isPrimary: true },
          { id: 2, address: 'Avenida Independencia 789', isPrimary: false },
        ],
      },
      {
        id: 6,
        name: 'Laura Fernández',
        email: 'laura@example.com',
        birthdate: new Date('1992-04-18'),
        addresses: [
          { id: 1, address: 'Calle Morelos 101', isPrimary: true },
          { id: 2, address: 'Avenida Revolución 202', isPrimary: false },
        ],
      },
      {
        id: 7,
        name: 'Jorge Torres',
        email: 'jorge@example.com',
        birthdate: new Date('1987-09-12'),
        addresses: [
          { id: 1, address: 'Calle Zaragoza 303', isPrimary: true },
          { id: 2, address: 'Avenida Juárez 404', isPrimary: false },
        ],
      },
      {
        id: 8,
        name: 'Sofía López',
        email: 'sofia@example.com',
        birthdate: new Date('1998-12-05'),
        addresses: [
          { id: 1, address: 'Calle Madero 505', isPrimary: true },
          { id: 2, address: 'Avenida Hidalgo 606', isPrimary: false },
        ],
      },
      {
        id: 9,
        name: 'Miguel Ruiz',
        email: 'miguel@example.com',
        birthdate: new Date('1983-06-20'),
        addresses: [
          { id: 1, address: 'Calle Allende 707', isPrimary: true },
          { id: 2, address: 'Avenida Morelos 808', isPrimary: false },
        ],
      },
      {
        id: 10,
        name: 'Elena Castro',
        email: 'elena@example.com',
        birthdate: new Date('1991-02-14'),
        addresses: [
          { id: 1, address: 'Calle Guerrero 909', isPrimary: true },
          { id: 2, address: 'Avenida Zaragoza 1010', isPrimary: false },
        ],
      },
    ];
    this.usersSubject.next(this.users);
  }

  //servicios para realizar nuestro crud de usuarios, ya que no apunto a una base de datos no tengo url para hacer peticiones http, pero obtenemos los datos de nuestra interfaz
  //obtenemos los usuarios
  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }
  //obtenemos un usuario por su id para luego poder editar o eliminar
  getUserById(userId: number): User | undefined {
    return this.users.find(u => u.id === userId);
  }
  //creamos un usuario
  createUser(user: User): void {
    user.id = this.users.length + 1;
    this.users.push(user);
    this.usersSubject.next(this.users);
  }
  //actualizamos un usuario desde su id
  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.usersSubject.next(this.users);
    }
  }
  //eliminamos un usuario desde su id
  deleteUser(userId: number): void {
    this.users = this.users.filter(u => u.id !== userId);
    this.usersSubject.next(this.users);
  }
  //agregamos una dirección a un usuario
  addAddress(userId: number, address: Address): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      address.id = user.addresses.length + 1;
      user.addresses.push(address);
      this.usersSubject.next(this.users);
    }
  }
  //pasaremos el id del usuario y la dirección para actualizarla y guardarla como principal
  setPrimaryAddress(userId: number, addressId: number): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.addresses.forEach(a => a.isPrimary = false);
      const address = user.addresses.find(a => a.id === addressId);
      if (address) {
        address.isPrimary = true;
        this.usersSubject.next(this.users);
      }
    }
  }
}