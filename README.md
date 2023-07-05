# **Primer APIREST**

Aplicación que permite al usuario leer, crear, actualizar y borrar tareas y sitios favoritos, con un sistema de autenticación.


## **Descripción**

El proyecto es un API REST desarrollado utilizando Node.js y Express en el backend, y React con Vite en el frontend. Permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en tareas y sitios favoritos. También cuenta con un sistema de autenticación para proteger las rutas y asegurar el acceso a las funcionalidades.

## **Backend**
### El backend de la aplicación utiliza los siguientes paquetes y tecnologías:
## Paquetes utilizados

- express
- mysql2 
- jsonwebtoken 
- cookie-parser  
- cors 
- dotenv 
- mysql2 

### Nota sobre express-session

No pude utilizar el paquete `express-session` ya que parece no ser compatible con los módulos ECMAScript (ESM). Aunque se afirma que es compatible, en realidad parece no funcionar correctamente con la función `pool` de `mysql2`. Por el momento, no tengo una solución para este problema. En su lugar, utilicé `jsonwebtoken` para crear y verificar tokens, los cuales son enviados a través de las cookies sin ser almacenados en la base de datos.


### DB

- **users** (ED)
  - user_id INT (PK)
  - email varchar (UQ)
  - name varchar not null
  - password varchar not null
  - completed_tasks_count INT NULL
  - create_at DATETIME NOT NULL DEFAULT = NULL
  - default_url_id INT (FK)


- **tasks** (ED)
  - task_is INT (PK)
  - user_id (FK)
  - name varchar not null
  - description varchar not null
  - done bool

- **sites** (ED)
  - site_id INT (PK)
  - user_id (FK)
  - name VARCHAR
  - url VARCHAR

- **default_url_gravatar** (EC)
  - id INT (PK)
  - default_url VARCHAR(100)
  - description VARCHAR(100)


- **glosario**
- PRIMARY KEY (PK)
- FOREIGN KEY (FK)
- UNIQUE (UQ)
- ENTIDAD DE DATOS (ED)
- ENTIDAD PIVOTE (EP)
- ENTIDAD CATALOGO (EC)

### RELACIONES
- user 1 a m task.
- user 1 a m sites.
- user 1 a 1 default_url_gravatar.


## **Frontend**
### El frontend de la aplicación utiliza las siguientes tecnologías y paquetes:

- Vite 
- React 
- axios 
- md5.
- moment 
- react-hot-toast 
- react-icons
- react-router-dom 
- sweetalert2 

## **Instalación y ejecución**
1. Clona este repositorio
2. Navega al directorio del backend: cd primer-apirest/backend
3. Instala las dependencias del backend: npm install
4. Crea un archivo .env en el directorio del backend y configura las variables de entorno necesarias.
5. Inicia el servidor backend: npm start
6. Navega al directorio del frontend: cd ../frontend
7. Instala las dependencias del frontend: npm install
8. Configura el archivo .env del frontend con las variables de entorno necesarias.
9. Inicia el servidor de desarrollo del frontend: npm run dev
10. Accede a la aplicación en tu navegador: http://localhost:3000

## DEMO
Puedes encontrar un demostración de la app 👉🏽 [DEMO TASKIFY](http://localhost:5173/)

<small>Por favor ten en cuenta que la demostración en línea de la aplicación no incluye la funcionalidad de los sitios favoritos. Además, la aplicación puede estar en suspensión en ciertos momentos debido a tareas de mantenimiento o actualizaciones del servidor.</small>

## Otro servicios
- API de citas de anime 👉🏽 [anime chan](http://animechan.melosh.space/random)


## Contribuciones
Las contribuciones son bienvenidas. Si tienes alguna sugerencia, mejora o corrección, no dudes en abrir un problema o enviar una solicitud de extracción.


