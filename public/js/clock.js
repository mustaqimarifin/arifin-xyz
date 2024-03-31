var b = function () {
  let a = new Date(),
    y = a.getHours(),
    P = a.getMinutes();
  if (y >= 12) {
    if (y > 12) y -= 12;
  } else if (y === 0) y = 12;
  (y = y < 10 ? "0" + y : y), (P = P < 10 ? "0" + P : P);
  let d = y + ":" + P + ":KL";
  document.getElementById("clock").innerHTML = d;
};
setInterval(b, 60000);
b();
