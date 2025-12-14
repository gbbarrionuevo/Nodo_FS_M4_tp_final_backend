# PokémonCard's – Backend

## 1. Descripción

PokémonCard's es una API REST desarrollada con **Node.js**, **Express** y **MongoDB** que provee toda la lógica de negocio para una aplicación de e-commerce de cartas Pokémon. Gestiona autenticación, usuarios, roles, permisos, cartas, carrito, inventario y compras.

Consume datos desde la API externa **TCGDex** y los expone de forma segura al frontend.

---

## 2. Demo en vivo

**URL del proyecto desplegado:**  
[https://nodo-fs-m4-tp-final-backend.onrender.com](https://nodo-fs-m4-tp-final-backend.onrender.com)

---

## 3. Tecnologías

* Node.js
* Express
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* method-override
* express-validator
* multer
* dotenv
* axios

---

## 4. Seguridad

La API implementa un sistema completo de control de acceso:

* **JWT**: todas las rutas privadas requieren un token válido.
* **Usuario activo**: se valida que el usuario no esté deshabilitado.
* **RBAC (Role Based Access Control)**:

  * Los usuarios tienen **roles**.
  * Los roles agrupan **permisos**.
  * Cada endpoint valida permisos mediante el middleware `hasPermission`.

Ejemplo de permisos:

* `read:user`
* `create:user`
* `update:user`
* `delete:user`

---

## 5. Instalación y ejecución local

### Requisitos

* Node.js v18 o superior
* MongoDB (local o cloud)

### Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```
PORT=3000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret_key
```

### Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/gbbarrionuevo/Nodo_FS_M4_tp_final_backend.git pokemonCard/backend
cd pokemonCard/backend

# Instalar dependencias
npm install express mongoose dotenv express-validator method-override cors jsonwebtoken axios bcryptjs multer

# Scripts de inicialización
- Ejecutar los siguientes scripts para inicializar datos básicos del sistema.

1. Obtener cartas desde la API externa TCGDex y guardar en la base de datos:
node scripts/createCardsPokemons.js

2. Crear roles y permisos por defecto:
node scripts/createRolesAndPermissions.js

3. Crear usuario administrador:
node scripts/createUserAdmin.js

Estos scripts deben ejecutarse una sola vez en una instalación nueva.

# Ejecutar la aplicación
node app.mjs
```

La API estará disponible en:

```
http://localhost:3000/api
```

---

## 6. API externa

La aplicación consume cartas Pokémon desde:

```
https://api.tcgdex.net/v2/es/cards
```

---

## 7. Endpoints

### Auth

| Método | Ruta           | Descripción       |
| ------ | -------------- | ----------------- |
| POST   | /auth/login    | Login de usuario  |
| POST   | /auth/register | Registro          |
| GET    | /auth/roles    | Roles del usuario |

### Cards

| Método | Ruta            | Permiso     |
| ------ | --------------- | ----------- |
| GET    | /cards          | read:card   |
| POST   | /cards/create   | create:card |
| GET    | /cards/:id/show | read:card   |
| PUT    | /cards/:id/edit | update:card |
| DELETE | /cards/:id      | delete:card |

### Cart

| Método | Ruta       | Permiso                   |
| ------ | ---------- | ------------------------- |
| GET    | /cart      | read:cart                 |
| POST   | /cart/sync | create/update/delete:cart |

### Inventory

| Método | Ruta                | Permiso                    |
| ------ | ------------------- | -------------------------- |
| GET    | /inventory          | read:inventory             |
| GET    | /inventory/:id/show | read:inventory-item-detail |

### Purchases

| Método | Ruta              | Permiso         |
| ------ | ----------------- | --------------- |
| GET    | /purchases        | read:purchase   |
| POST   | /purchases/create | create:purchase |

### Store

| Método | Ruta   | Permiso    |
| ------ | ------ | ---------- |
| GET    | /store | read:store |

### Users

| Método | Ruta               | Permiso      |
| ------ | ------------------ | ------------ |
| GET    | /users             | read:user    |
| POST   | /users/create      | create:user  |
| GET    | /users/:id/show    | read:user    |
| PUT    | /users/:id/edit    | update:user  |
| PUT    | /users/:id/restore | restore:user |
| PUT    | /users/avatar      | update:user  |
| DELETE | /users/:id         | delete:user  |

### Profile

| Método | Ruta                  | Permiso        |
| ------ | --------------------- | -------------- |
| GET    | /profile              | read:profile   |
| PUT    | /profile/:id/edit     | update:profile |
| PUT    | /profile/:id/password | update:profile |

### Roles

| Método | Ruta            | Permiso     |
| ------ | --------------- | ----------- |
| GET    | /roles          | read:role   |
| POST   | /roles/create   | create:role |
| GET    | /roles/:id/show | read:role   |
| PUT    | /roles/:id/edit | update:role |
| DELETE | /roles/:id      | delete:role |

### Permissions

| Método | Ruta                  | Permiso           |
| ------ | --------------------- | ----------------- |
| GET    | /permissions          | read:permission   |
| POST   | /permissions/create   | create:permission |
| GET    | /permissions/:id/show | read:permission   |
| PUT    | /permissions/:id/edit | update:permission |
| DELETE | /permissions/:id      | delete:permission |

### Contacts

| Método | Ruta               | Permiso        |
| ------ | ------------------ | -------------- |
| GET    | /contacts          | read:contact   |
| POST   | /contacts/create   | create:contact |
| GET    | /contacts/:id/show | read:contact   |
| DELETE | /contacts/:id      | delete:contact |

---

## 8. Consideraciones

* Todas las rutas están montadas bajo `/api`.
* Estructura MVC: Separación de responsabilidades en controladores, servicios y repositorios.
* Validaciones centralizadas con `express-validator`.
* Pensado para escalar y agregar nuevos permisos sin modificar controladores.
