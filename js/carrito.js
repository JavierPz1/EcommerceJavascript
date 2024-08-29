const mainCarrito = document.getElementsByClassName("mainCarrito");


//Recupero el carrito y el precio total del localStorage
let carritoGuardado = JSON.parse(localStorage.getItem('Carrito de Compras'));
let totalGuardado = JSON.parse(localStorage.getItem('Precio Total'));

// const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
// let totalCarrito = totalGuardado ? parseFloat(totalGuardado) : 0;

// Elemento donde se mostrarán los productos del carrito
const carritoContenedor = document.getElementById('carritoContenedor');

// Función para mostrar los productos del carrito en la página
function mostrarCarrito() {
    carritoContenedor.innerHTML = ''; // Limpiar el contenedor antes de añadir los elementos

    carritoGuardado.forEach((producto, index) => {
        const contenedorProducto = document.createElement('div');
        contenedorProducto.className = 'productoCarrito';

        contenedorProducto.innerHTML = `
            <img src="../${producto.img}" alt="${producto.nombre}" width="100px">
            <h3>${producto.nombre}</h3>
            <p>Sabor: ${producto.sabor}</p>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Precio (IVA): $${producto.precioConIva.toFixed(2)}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button id="botonEliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;

        carritoContenedor.appendChild(contenedorProducto);
    });
}

totalGuardado.innerHTML = `Total del Carrito: $${totalGuardado}`;


function eliminarDelCarrito(index) {
    if (index !== -1) {
        const producto = carritoGuardado[index];
        totalGuardado -= producto.precioConIva * producto.cantidad; // Actualiza el precio
        carritoGuardado.splice(index, 1); // Eliminar el producto del carrito
        localStorage.setItem('Carrito de Compras', JSON.stringify(carritoGuardado));
        localStorage.setItem('Precio Total', totalGuardado.toFixed(2));
        mostrarCarrito();
    }
}

mostrarCarrito()


//IMPORTANTE!! No se me ocurrio como borrar solo la cantidad del producto en vez de borrar todo, si tienes alguna recomendacion me vendria muy bien. Gracias!!! :)