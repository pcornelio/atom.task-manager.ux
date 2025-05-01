# Task Manager UX

Aplicación de gestión de tareas con autenticación de usuarios y diseño responsivo.

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm (incluido con Node.js)
- Angular CLI (versión 17 o superior)
- Git

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/pcornelio/atom.task-manager.ux.git
cd atom.task-manager.ux
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto
   - Agregar las siguientes variables:
   ```
   API_URL=http://localhost:4200
   ```

4. Iniciar el servidor de desarrollo:
```bash
ng serve
```

5. Abrir la aplicación en el navegador:
```
http://localhost:4200
```

## Funcionalidades

### Autenticación
- Registro de nuevos usuarios
- Inicio de sesión


### Gestión de Tareas
- Crear nuevas tareas
- Editar tareas existentes
- Eliminar tareas
- Marcar tareas como completadas
- Filtrar tareas por estado (todas, pendientes, completadas)
- Ordenar tareas por fecha de creación
- Búsqueda de tareas por título o descripción

### Interfaz de Usuario
- Diseño responsivo para móviles y escritorio
- Animaciones y transiciones suaves

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/         # Componentes reutilizables
│   ├── modules/           # Módulos de la aplicación
│   ├── services/          # Servicios de la aplicación
│   ├── guards/            # Guards de autenticación
│   └── models/            # Interfaces y tipos
├── assets/                # Recursos estáticos
└── environments/          # Configuraciones de entorno
```

## Tecnologías Utilizadas

- Angular 17
- TypeScript
- SCSS
- FontAwesome
- Angular Material
- RxJS
- JWT para autenticación

## Contribución

1. Hacer fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Instrucciones
Siéntete libre de clonar este repositorio y utilizarlo como base para el desarrollo de la aplicación. Sigue las indicates de la prueba técnica para completar la aplicación y desarrolla como más te sientas cómodo.

De igual manera puedes documentar dentro de este archivo todo lo que deseas contar sobre tu desarrollo, como por ejemplo, decisiones de diseño, problemas encontrados, etc.

