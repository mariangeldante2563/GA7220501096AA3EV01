# Registro de Clientes - GA7-220501096-AA3-EV01

Proyecto de codificacion de modulos de software **stand alone, web y movil** de
acuerdo al proyecto a desarrollar. Implementa una aplicacion web sencilla para
el registro de clientes usando **arquitectura MVC** con Spring Boot en el
backend y HTML/CSS/JavaScript vanilla en el frontend (sin React ni Angular).

---

## Stack tecnologico

### Backend
- **Java 17**
- **Spring Boot 3.2.12**
  - Spring Web (API REST)
  - Spring Data MongoDB
- **Maven** (gestion de dependencias)
- **MongoDB** (base de datos)

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript** (Fetch API, sin librerias externas)

### Base de datos
- **MongoDB** con la coleccion `clientes`

---

## Arquitectura

```
Cliente  ->  HTML  ->  JavaScript (Fetch)  ->  REST API  ->  Controller
    ->  Service  ->  Repository  ->  Document  ->  MongoDB
```

Arquitectura MVC sencilla en capas, cumpliendo con lo solicitado en la guia.

---

## Estructura del proyecto

```
registro-clientes/
|
|-- backend/
|   |-- pom.xml
|   `-- src/main/
|       |-- java/com/sena/clientes/
|       |   |-- ClientesApplication.java
|       |   |-- entity/Cliente.java
|       |   |-- repository/ClienteRepository.java
|       |   |-- service/ClienteService.java
|       |   `-- controller/ClienteController.java
|       `-- resources/
|           `-- application.properties
|
|-- frontend/
|   |-- index.html
|   |-- style.css
|   `-- script.js
|
|-- .gitignore
`-- README.md
```

---

## Requisitos previos

1. **JDK 17** instalado.
2. **Maven 3.8+** instalado.
3. **MongoDB 7.x o superior** instalado y en ejecucion.
4. **Visual Studio Code** (recomendado) con las extensiones:
   - *Extension Pack for Java* (Microsoft)
   - *Spring Boot Extension Pack*
   - *Live Server* (para servir el frontend durante el desarrollo)

---

## Instalacion y ejecucion

### 1. Configurar la base de datos

Arranca un servidor MongoDB local en el puerto 27017 o usa un contenedor Docker.
La aplicacion usa la base de datos `registro_clientes` en MongoDB.

### 2. Configurar el backend

Edita el archivo `backend/src/main/resources/application.properties` si necesitas
ajustar el URI de MongoDB:

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/registro_clientes
```

### 3. Ejecutar el backend

Desde la carpeta `backend`:

```bat
cd backend
mvnw.cmd spring-boot:run
```

El backend quedara disponible en `http://localhost:8080`.

### 4. Ejecutar el frontend

Abre la carpeta `frontend` en VS Code y usa la extension *Live Server* sobre el
archivo `index.html`, o simplemente abre el archivo en el navegador.

---

## Endpoints de la API REST

| Metodo  | URL                   | Descripcion                  | Body JSON                                                |
|---------|-----------------------|------------------------------|----------------------------------------------------------|
| GET     | `/api/clientes`       | Listar todos los clientes    | -                                                        |
| GET     | `/api/clientes/{id}`  | Buscar cliente por id        | -                                                        |
| POST    | `/api/clientes`       | Crear nuevo cliente          | `{ "nombre": "...", "correo": "...", "telefono": "..." }` |
| PUT     | `/api/clientes/{id}`  | Actualizar cliente existente | `{ "nombre": "...", "correo": "...", "telefono": "..." }` |
| DELETE  | `/api/clientes/{id}`  | Eliminar cliente por id      | -                                                        |

### Codigos de estado

- `200 OK` - operacion exitosa (GET, PUT).
- `201 Created` - recurso creado (POST).
- `204 No Content` - eliminacion exitosa (DELETE).
- `404 Not Found` - recurso no encontrado.
- `400 Bad Request` - error de validacion.

---

## Estructura de la base de datos

```sql
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(30)
);
```

---

## Estandar de codificacion

- **Java**: clases en PascalCase, metodos y variables en camelCase,
  constantes en MAYUSCULAS, sangria de 4 espacios.
- **JavaScript/CSS**: variables en camelCase, sangria de 4 espacios,
  funciones con nombres descriptivos y codigo organizado por responsabilidades.
- **Comentarios**: naturales y utiles, explicando el *por que* del codigo.

---

## Versionamiento

El proyecto usa **Git** desde Visual Studio Code y se publica en **GitHub**.

```bash
git init
git add .
git commit -m "Initial commit - GA7-220501096-AA3-EV01"
git branch -M main
git remote add origin https://github.com/USUARIO/registro-clientes.git
git push -u origin main
```

---

## Autor

**Aprendiz SENA** - Analisis y Desarrollo de Software.
Proyecto correspondiente a la guia **GA7-220501096-AA3-EV01**.
