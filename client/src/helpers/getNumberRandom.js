export function getRandomNumber(min = -5, max = 5) {
  // Generar un número aleatorio decimal entre 0 y 1
  const random = Math.random();
  // Calcular la diferencia entre los límites máximo y mínimo
  const difference = max - min;
  // Ajustar el número aleatorio al rango deseado y redondearlo al número entero más cercano
  const randomNumber = Math.round(random * difference + min);

  return randomNumber;
}
