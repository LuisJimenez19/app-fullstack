# React with swc

- react router dom
- axios

**Rutas**
Uso el router como esta en la documentación aunque ya he utilizado woter
que no es otro enrutador mas liviano y también funciona como un provider.

**Axios**
Creo un archivo config.js en el cliente donde esta la url de la api
en la carpeta api esta configurado axios con la url base y las credentials
en esa misma carpeta creo las funciones que se comunicac con el back

**Auth pages**
Termino el login y el register ahora redirigen cuando sale bien, falta añadir un context en donde se guarde el usuario 
y diga que esta en una sesión así no puede entrar en el login ni en el register a menos que no este en una sesión.

**Proteger rutas front**
Un contexto que tiene al usuario y si esta autenticado o no, manda una petición al back
a una ruta especifica que solo devuelve el usuario.
Creo una ruta en el front ProtectedRoutes y que deja pasar si esta autenticado y si no
lo manda al login.

protege las rutas profile, y la de los cruds.

**Agrego páginas de tasks, sites**
Listo las tareas y las creo, falta validar los datos y terminar el crud
obviamente dar estilos.

**Layout Default**
Agregogun layout que contiene el sidebar, agrego la funcionalidad de navegar entre las páginas
uso el localStorage para guardar los estados del sidebar y el dark mode
Agrego una ruta para notfound que hace una petición al back y mostrar el mensaje que viene

*To_do_list*
Estilizar las páginas tasks, sites y home
verificar la entraada de datos antes de mandar al back.

Api que da frases de animes
**http://animechan.melosh.space/random**


**Estilizo la página de las tareas**
le doy estilos a las targets agrego el perspective, y una forma de ver el formulario, componetizo, arreglo bugs del sidebar y el login

-- terminar un crud, hasta ahora solo listo y creo tareas, falta actualizar y borras, después lo mismo con los sitios

y con el usuario.

Agrego una tabla defaultGravatar que va a ser un catalogo con los strings que tiene por defecto gravatar, entonces así el usuario tiene la opción de poder
elegir que avatar tener, también informar al usuario que si quiere una imagen personalizada puede crear una cuenta en gravatar y añadir una foto de perfil.


03/07/2023
Le puse animaciones a las páginas para que se viera mas bonito.
tengo una función handleRequestTasks que llama a la función que se encarga de hacer la petición y traer las tareas y actualizar
el estado global de las tareas, al hacer esto se refrescaba otra vez toda la página haciendo que no se vean otra vez las 
animacione y pues esto se ve un poco mal.
Entonces estaba viendo si hacer copias de las tareas y todo eso, pero me di cuenta que al agregar yo no uso la función
handleResquestTasks sino que traigo las tareas y actualizo el estado global desde el componente y eso no refrescaba la página.
y Esa fue la solución, no entiendo porque, tal vez porque la función esta en el ocntext entonces refresca toda la página.