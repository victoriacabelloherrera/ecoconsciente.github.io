let botonscroll = document.getElementById("scroll");


window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    botonscroll.style.display = "block";
  } else {
    botonscroll.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document smoothly
function topFunction() {
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8); // Ajusta el valor de '8' para controlar la velocidad de desplazamiento
    }
  };
  
  scrollToTop();
}
