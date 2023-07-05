import md5 from "md5";
/*
 *imagen para el avatar
 * @param {string} email - correo electronico
 * @returns {string} hash - para el servicio de gravatar
 * */
export function getHash(email= "example@gmail.com") {
  const hash = md5(email).toString();
  return hash;
}
