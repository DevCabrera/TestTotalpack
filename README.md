README
Descripción del Proyecto
El proyecto cuenta con 10 usuarios mockeados(simulados para front), por lo que al agregar un usuario se ira a la paginacion 2.
Este proyecto es una aplicación Angular que permite:

    Agregar usuarios: Crear nuevos usuarios con nombre, email, fecha de nacimiento y direcciones.

    Agregar direcciones: Añadir direcciones a un usuario existente.

    Editar usuarios: Modificar la información de un usuario existente.

    Editar direcciones: Cambiar o marcar una dirección como principal.

La aplicación utiliza:

    Angular 17: Para la estructura y lógica del proyecto.

    Tailwind CSS: Para los estilos y diseño, el problema es que apenas es compatible con angular 17, por lo que no pude desenvolverme correctamente y utilice css puro

    SweetAlert2: Para mostrar alertas y mensajes de confirmación.
    
dependecias en caso de algo
npm install @angular/core @angular/cli
npm install tailwindcss postcss autoprefixer
npm install sweetalert2

Ejecución del Proyecto

    #1 Clona el repositorio:
    git clone https://github.com/DevCabrera/TestTotalpack.git
    
    #2 Instala las dependencias:
    npm install

    #3 Inicia el servidor de desarrollo:
    ng serve

    #4 Abre tu navegador y visita:
    http://localhost:4200
Instrucciones de Uso

    Agregar un usuario:

        Haz clic en el botón "Crear usuario".

        Completa el formulario con el nombre, email y fecha de nacimiento.

        Haz clic en "Añadir direcciones".

        Completa el formulario con la dirección y marca si es principal.

        Haz clic en "Guardar" para guardar al usuario.

    Editar un usuario:

        Selecciona un usuario de la lista.

        Haz clic en "Editar".

        Modifica los campos que desees.

        Haz clic en "Guardar" para actualizar la información.

        Icono de basura para eliminar usuario.

  
