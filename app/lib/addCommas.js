export function addCommas(n) {
  // añade puntos a un precio, ej: 1234 => 1.234
  var rx = /(\d+)(\d{3})/;
  return String(n).replace(/^\d+/, function(w) {
    while (rx.test(w)) {
      w = w.replace(rx, "$1.$2");
    }
    return w;
  });
}
