






document.addEventListener('DOMContentLoaded', function () {
    const menuMovil = document.getElementById('menu-movil'); 
    const barraNavegacion = document.querySelector('.barra-navegacion'); 
    const menuBarra = document.querySelector('.menu-barra'); 
    const botonBusqueda = document.querySelector('.btn-busqueda');
    const entradaBusqueda = document.querySelector('.entrada-busqueda');
    const enlacesBarra = document.querySelectorAll('.enlace-barra');

    // Menú móvil
    menuMovil.addEventListener('click', function () {
        menuMovil.classList.toggle('activo');
        menuBarra.classList.toggle('activo');

        // Cambiar el degradado cuando el menú está abierto
        if (menuBarra.classList.contains('activo')) {
            barraNavegacion.style.background = 'var(--gradient-secondary)';
        } else {
            barraNavegacion.style.background = 'var(--gradient-primary)';
        }
    });

    // Scroll suave para navegación
    enlacesBarra.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Cerrar menú móvil si está abierto
            if (window.innerWidth <= 768) {
                menuMovil.classList.remove('activo');
                menuBarra.classList.remove('activo');
                barraNavegacion.style.background = 'var(--gradient-primary)';
            }

            // Obtener el ID de la sección objetivo
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Scroll suave
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Actualizar enlace activo
                enlacesBarra.forEach(enlace => enlace.classList.remove('activo'));
                this.classList.add('activo');
            }
        });
    });

    // Efecto de scroll en el navbar
    window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
            barraNavegacion.style.height = '70px';
            barraNavegacion.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
        } else {
            barraNavegacion.style.height = '85px';
            barraNavegacion.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        }

        // Actualizar enlace activo según scroll
        actualizarEnlaceActivo();
    });

    // Función para actualizar el enlace activo según la posición del scroll
    function actualizarEnlaceActivo() {
        const posicionScroll = window.scrollY + 100;

        document.querySelectorAll('section[id]').forEach(seccion => {
            const topeSeccion = seccion.offsetTop;
            const alturaSeccion = seccion.offsetHeight;

            if (posicionScroll >= topeSeccion && posicionScroll < topeSeccion + alturaSeccion) {
                const id = seccion.getAttribute('id');
                enlacesBarra.forEach(enlace => {
                    enlace.classList.remove('active');
                    if (enlace.getAttribute('href') === `#${id}`) {
                        enlace.classList.add('active');
                    }
                });
            }
        });
    }

 
});


document.addEventListener("DOMContentLoaded", function() {
  const elementosHistoria = document.querySelectorAll(".item-historia");

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        elementosHistoria.forEach((elemento, indice) => {
          setTimeout(() => {
            elemento.classList.add("visible");
          }, indice * 300);
        });
      } else {
        elementosHistoria.forEach((elemento, indice) => {
          setTimeout(() => {
            elemento.classList.remove("visible");
          }, indice * 300); 
        });
      }
    });
  }, {
    threshold: 0.6
  });

  elementosHistoria.forEach(elemento => {
    observador.observe(elemento);
  });
});