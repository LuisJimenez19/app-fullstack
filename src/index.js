import { app } from "./app.js";

// Iniciar el servidor
app.listen(3000, () => {
  console.log(`Server on port ${3000}`);
});

/* Rutas login y register creadas encriptando la password guardando en la sesion
  controlando los datos de entrada
  estoy en duda si redirgir -> 8/06/2023 el enfoque es que es una API REST solo debo informar si hay o no una sesión.
  Para que sea una buena autenticación se deberian usar tokens.
  Bueno como no puedo usar el modulo que guarda la sesion en la base de datos, parece que no es compatible con ECMAScript modules.
  Voy a utilizar jsonWebToken para guardar la sesión y pues así sería hasta un poco más seguro, cambio un poco la lógica.
  Los tokens se almacenan en las cookies del navegador, por lo tanto en el cliente también hay que configurar para enviarlos en cada petición.
  Los tokens se generan y he visto que algunos lo almacenan en la base de datos, otros solo en la memoria volatil del servidor.
  ---- midd que hacía de autenticacación---
  export const authSession = (req, res, next) => {
  if (req.session.user) {
    next();
     return res.status(300).json({
      message: "There is already a session.",
      currentUser: req.session.user,
    }); 
  } else {
    res.status(400).json({ message: "access denied." });
  }
  -----------De esta forma validaba si y estaba en una sesión---
  export const registerController = async (req, res) => {
  if (req.session.user) {
    return res.status(300).json({
      message: "There is already a session.",
      currentUser: req.session.user,
    });
  }
};

  He usado jsonwebtoken para crear tokens y enviarlos a traves de las cookies, con el client rest sirve, protejo las rutas bien
  verifico primero si viene un token y después si es un token valido.
  Manejo mejor las rutas añadiendo el auth.middleare en la rutas al momento de declararlas y no cuando las llamo en el app.js de
  esta forma el usuarios se logea y se crea un token después al momento de ir a las demas rutas pasa por el authSession y este añade
  el usuario a la petición.
  12/06/23
  Cuando el token expira lanza un error, lo estoy manejando con un try catch, en el login si ya expiro lo borra y crea uno nuevo, en el register solo devuelve
  si ya hay una sesión y en el middleware auth devuelve un código d estado 401 cuando ya ha expirado o no esta en sesión.
*/
