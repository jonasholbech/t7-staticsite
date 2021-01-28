var css = `* {
  transition:all 1s;
transform-origin:center;
}`,
  head = document.head || document.getElementsByTagName('head')[0],
  style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

head.appendChild(style);

const all = document.querySelectorAll("p, img, a,h1,h2,h3,h4,h5,h6");
setInterval(() => {
  const random = all[Math.floor(Math.random() * all.length - 1)];
  console.log(random);
  const modifier = 20;
  random.style.transform = `translate(${Math.random()*modifier-modifier/2}vw, ${Math.random()*modifier-modifier/2}vh) rotate(${Math.random()*360-180}deg)`

}, 500)