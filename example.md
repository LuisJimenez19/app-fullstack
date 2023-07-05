# Primer APIREST

Aplicación que permite al usuario leer, crear, actualizar y borrar tareas y sitios favoritos.
Con un sistema de autenticación.

### Paquetes.
- express 
- mysql2 
  
- express session ❌
  
No pude usar este paquete, parece que no es compatible con los ECMAScript module
aunque dicen que sí, parece que no es compatbile con la función `pool` de mysql2,la verdad es que hasta el momento no sé.
Use jsonWebToken, solo creo y verifico y mando a traves de las cookies, no almaceno en la base de datos.
 


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

> Use

~~~

~~~


