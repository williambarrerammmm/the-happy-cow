$(document).ready(function(){
    $('.product-carousel').slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000
    });


    // Obtén todos los botones de "Detalles" y el modal
const detallesButtons = document.querySelectorAll('.btn-detalles');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const comprarButtonModal = document.querySelector('.btn-comprar-modal');

// Agrega un evento de clic a cada botón de "Detalles"
detallesButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        console.log(index);
        // Aquí puedes cargar los detalles del producto correspondiente en el modal
        const productoDetalles = obtenerDetallesDelProducto(index); // Debes implementar esta función
        modalContent.innerHTML = productoDetalles;

        // Muestra el modal
        modal.style.display = 'block';
    });
});

// Cierra el modal cuando se hace clic en el botón de cerrar o fuera del modal
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Cierra el modal cuando se hace clic en el botón de cerrar
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Agrega un evento de clic al botón "Comprar" dentro del modal
comprarButtonModal.addEventListener('click', () => {
    // Lógica para realizar la compra, por ejemplo, redirigir a una página de compra
    alert('Producto comprado! Redirigiendo a la página de compra...');
    // Simular una redirección a la página de compra
    window.location.href = 'https://api.whatsapp.com/send?phone=573174341478';
});

// Función para obtener los detalles del producto (debes implementarla según tus necesidades)
function obtenerDetallesDelProducto(index) {
    // Aquí debes retornar los detalles del producto en función del índice proporcionado
    // Puedes obtener los datos de un arreglo, una base de datos, o cualquier otra fuente de datos
    // Por ejemplo:
    const productos = [
        {
            nombre: 'Queso Artesanal',
            descripcion: 'Creemos en transformar la simplicidad de la leche en una experiencia gourmet. Nuestro queso artesanal es cuidadosamente elaborado por expertos queseros que han perfeccionado el arte de la fermentación y el envejecimiento. Cada bocado es una obra maestra, una fusión de tradición y innovación. Nuestro queso se elabora con leche fresca y pura, sin conservantes ni aditivos. Cada rueda se envejece con paciencia para desarrollar su sabor característico: desde los suaves y cremosos hasta los intensos y audaces. Cada textura, cada aroma cuenta una historia de dedicación y pasión. Descubre una gama de sabores que despiertan tus papilas gustativas: desde nuestros quesos suaves y untuosos ideales para untar, hasta los quesos envejecidos con notas terrosas y picantes que complementan perfectamente una tabla de quesos gourmet. Invita a la sofisticación a tu mesa y eleva tus platillos a nuevas alturas con nuestro queso artesanal. Cada pedazo es una aventura culinaria, cada bloque es una expresión de excelencia. Únete a nosotros y descubre la magia del queso auténtico.',
        },
        {
            nombre: 'Queso Artesanal',
            descripcion: 'Creemos en transformar la simplicidad de la leche en una experiencia gourmet. Nuestro queso artesanal es cuidadosamente elaborado por expertos queseros que han perfeccionado el arte de la fermentación y el envejecimiento. Cada bocado es una obra maestra, una fusión de tradición y innovación. Nuestro queso se elabora con leche fresca y pura, sin conservantes ni aditivos. Cada rueda se envejece con paciencia para desarrollar su sabor característico: desde los suaves y cremosos hasta los intensos y audaces. Cada textura, cada aroma cuenta una historia de dedicación y pasión. Descubre una gama de sabores que despiertan tus papilas gustativas: desde nuestros quesos suaves y untuosos ideales para untar, hasta los quesos envejecidos con notas terrosas y picantes que complementan perfectamente una tabla de quesos gourmet. Invita a la sofisticación a tu mesa y eleva tus platillos a nuevas alturas con nuestro queso artesanal. Cada pedazo es una aventura culinaria, cada bloque es una expresión de excelencia. Únete a nosotros y descubre la magia del queso auténtico.',
        },
        {
            nombre: 'Arequipe Artesanal',
            descripcion: 'Nuestro arequipe artesanal es un tributo a la tradición, elaborado con pasión y devoción siguiendo recetas familiares que han perdurado generación tras generación. Cada cucharada de nuestro arequipe es un viaje de indulgencia, una experiencia celestial para tus papilas gustativas. Nuestros expertos reposteros combinan cuidadosamente ingredientes naturales: la leche más fresca, el azúcar más dulce y un toque de amor incondicional. El resultado es una crema suave y sedosa que se derrite en tu boca, liberando un sabor a caramelo dorado que te transporta a la infancia. Nuestro arequipe artesanal no es solo un postre; es un tributo a la autenticidad y a la dedicación a la calidad. Perfecto para acompañar tus postres favoritos, untar en galletas o simplemente disfrutarlo con una cuchara directamente del frasco. Es el regalo perfecto para ti mismo o para aquellos que amas, una delicia que crea momentos inolvidables de dulzura y alegría. Descubre el placer verdadero del arequipe. Cada tarro está lleno de la riqueza del pasado y la promesa de momentos dulces en el futuro. Únete a nosotros en este viaje culinario y deja que el sabor del auténtico arequipe artesanal acaricie tu alma y haga sonreír tu corazón.',
        },
        {
            nombre: 'Leche Fresca',
            descripcion: 'Entendemos la importancia de la frescura en cada bocado. Nuestra leche proviene directamente de nuestras vacas que se crían en entornos naturales y saludables. Cada gota está llena de bondad, nutrición y un sabor inigualable. Nuestra leche fresca es tratada con el máximo cuidado desde la granja hasta tu mesa. Es rica en calcio para huesos fuertes, llena de proteínas para mantener tu energía durante todo el día y simplemente deliciosa para disfrutar sola o con tus cereales favoritos. ¿Por qué conformarte con menos cuando puedes disfrutar de la pureza directamente de la naturaleza? Prueba nuestra leche hoy y experimenta la diferencia real en cada sorbo. La frescura pura nunca ha sido tan deliciosa.',
        }
    ];

    const producto = productos[index];
    return `<h3>${producto.nombre}</h3><p>${producto.descripcion}</p>`;
}


});
