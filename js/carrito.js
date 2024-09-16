const mainCarrito = document.getElementById("mainCarrito");

//Recupero el carrito y el precio total del localStorage
let carritoGuardado = JSON.parse(localStorage.getItem('Carrito de Compras'));
let totalGuardado = JSON.parse(localStorage.getItem('Precio Total'));

const carritoContenedor = document.getElementById('carritoContenedor');
carritoContenedor.style.width = "100%";
carritoContenedor.style.paddingInline = "3%";

const formularioContenedor = document.getElementById('formularioContenedor');
formularioContenedor.style.width = "100%";
formularioContenedor.style.paddingInline = "3%";


const mostrarTotalCarrito = document.createElement("div");
mostrarTotalCarrito.innerHTML = `<h3>Total del Carrito: $${totalGuardado}</h3>`;
mostrarTotalCarrito.style.fontSize = "25px";
mostrarTotalCarrito.style.color = "#24ff6a";
mostrarTotalCarrito.style.display = "flexbox";
mostrarTotalCarrito.style.width = "100%";
mostrarTotalCarrito.style.textAlign = "end";
mostrarTotalCarrito.style.marginBottom = "100px";

formularioContenedor.appendChild(mostrarTotalCarrito);

const botonConfirmarCompra = document.createElement("button");
botonConfirmarCompra.innerHTML = `Confirmar Compra`;
botonConfirmarCompra.className = "btn rounded-pill";
botonConfirmarCompra.type = "submit";
botonConfirmarCompra.style.cssText = "background:linear-gradient(to right, #00d6bc, #24ff6a); color: #484848; border: none; padding: 1.5%; cursor: pointer; margin-top: 10px;";
botonConfirmarCompra.style.display = "flexbox";
botonConfirmarCompra.style.float = "right";
botonConfirmarCompra.style.marginBottom = "20px";


const divFormulario = document.createElement("div");
divFormulario.style.width = "100%";
divFormulario.style.display = "flex";
divFormulario.style.alignItems = "center";
divFormulario.style.flexDirection = "column";


const formulario = document.createElement("form");
formulario.style.marginBottom = "50px";

const enviarEmail = document.createElement("a");

formularioContenedor.appendChild(divFormulario);
divFormulario.appendChild(formulario);

formulario.innerHTML = `
<div class="input-group mb-3">
  <label for="nombre"></label>
  <input id="nombre" name="nombre" type="text" aria-label="Nombres" class="form-control" placeholder="Nombre">
  <label for="nombre"></label>
  <input id="apellido" name="apellido" type="text" aria-label="Apellidos" class="form-control" placeholder="Apellido">
</div>

<div id="message">
    <label for="tel" class="d-none"></label>
    <input id="tel" name="tel" type="number" class="form-control mb-3" aria-label="Numero de celular" placeholder="Tel/Cel">
    <div class="row g-3">
        <div class="col-sm-5">
            <label for="direccion" class="d-none"></label>
            <input id="direccion" name="direccion" type="text" class="form-control" placeholder="Direccion" aria-label="Direccion">
        </div>
        <div class="col-sm">
            <label for="localidad" class="d-none"></label>
            <input id="localidad" name="localidad" type="text" class="form-control" placeholder="Localidad" aria-label="Localidad">
        </div>
        <div class="col-sm">
            <label for="postal" class="d-none"></label>
            <input id="postal" name="postal" type="number" class="form-control" placeholder="Codigo Postal" aria-label="Codigo Postal">
        </div>
    </div>
</div>

<p class="form-text my-3 ms-2">Llegará tu pedido en 2 dias hábiles!!</p>
`;

formulario.appendChild(botonConfirmarCompra);
formulario.appendChild(enviarEmail);



// Funcion para mostrar los productos del carrito
function mostrarCarrito() {
    carritoContenedor.innerHTML = ``; // Limpia el contenedor antes de añadir los elementos

    carritoGuardado.forEach((producto, index) => {
        const contenedorProducto = document.createElement('div');
        contenedorProducto.className = 'card mb-3';

        contenedorProducto.innerHTML =
            `<div class="row g-0 fs-6">
            <div class="col-md-1 d-flex align-items-center px-2">
                <img src="${producto.img}" alt="${producto.nombre}" class="img-fluid rounded-start">
            </div>

            <div class="col-md-4 d-flex flex-column pt-2 ps-2 mx-0">
            <h4 class="col-md-11 fs-4 m-0">${producto.nombre}</h4>
            <p class="col-md-11 m-0">${producto.sabor}</p>
        
            </div>
            <p class="col-md-3 d-flex align-items-center fs-6 m-0 ps-2">(IVA)<span class="font-monospace fs-4"> $${producto.precioConIva}</span></p>

            <div class="col-md-2 d-flex align-items-center fs-5 ps-2">
            <p class="m-0">Cantidad: ${producto.cantidad}</p>
            </div>

            <div class="d-flex align-items-center col-md-1 btn-group px-2">
            <button id="botonCantidad" class="btn btn-outline-danger rounded-pill" onclick="eliminarCantidad(${producto.id})">Eliminar</button>
            <span id="botonEliminar" role="button" class="mx-4 btn-close" onclick="eliminarDelCarrito(${index})"></span>
            </div>
            
        </div>`;

        carritoContenedor.appendChild(contenedorProducto);
    });
    mostrarTotalCarrito.innerText = `Total del Carrito: $${totalGuardado.toFixed(2)}`;
}

//Eliminar la cantidad de a 1, si solo queda 1, elimina el producto completo
function eliminarCantidad(productoID) {
    const productoIndex = carritoGuardado.findIndex(item => item.id === productoID);

    if (productoIndex !== -1) {  // Si encuentra el producto en el carrito
        const producto = carritoGuardado[productoIndex];

        if (producto.cantidad > 1) {
            // Si la cantidad es mayor a 1, reduce la cantidad y ajusta el total
            producto.cantidad--;
            totalGuardado -= producto.precioConIva;
        } else {
            // Si la cantidad es 1, elimina el producto del carrito y actualiza el total
            totalGuardado -= producto.precioConIva;
            carritoGuardado.splice(productoIndex, 1);
        }

        localStorage.setItem('Carrito de Compras', JSON.stringify(carritoGuardado));
        localStorage.setItem('Precio Total', totalGuardado.toFixed(2));

        mostrarCarrito();
    } else {
        console.log("Producto no encontrado en el carrito");
    }
}


function eliminarDelCarrito(index) {
    if (index !== -1) {
        const producto = carritoGuardado[index];
        totalGuardado -= producto.precioConIva * producto.cantidad; // Actualiza el precio teniendo en cuenta la cantidad por producto
        carritoGuardado.splice(index, 1); // Eliminar el producto completo del carrito
        localStorage.setItem('Carrito de Compras', JSON.stringify(carritoGuardado));
        localStorage.setItem('Precio Total', totalGuardado.toFixed(2));
        mostrarCarrito();
    }
}

mostrarCarrito()



 function enviarPedidoEmail(event) {
    event.preventDefault();
    const fd = new FormData(formulario);

     enviarEmail.setAttribute(
        'href',
        `mailTo:javier_hp05@hotmail.com?subject=${fd.get('nombre')} ${fd.get('apellido')}&body=${fd.get('tel')}  /  ${fd.get('direccion')}  /  ${fd.get('localidad')}  /  ${fd.get('postal')}`
    );
     
    enviarEmail.click();
}

formulario.addEventListener('submit', enviarPedidoEmail);

/* ${ carritoGuardado.producto.nombre }& ${ carritoGuardado.producto.sabor }& ${ carritoGuardado.producto.precioConIva }${ carritoGuardado.producto.cantidad } */