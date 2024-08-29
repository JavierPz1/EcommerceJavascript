const mainIndex = document.getElementById("mainIndex");
const nav = document.getElementsByClassName('navbar')
//......................................................

// Catalogo de productos
const productos = [
    { img: "/multimedia/wheyprotein-ENAsport-chocolate-1kg.jpeg", nombre: 'Whey protein ENA Sport True Made', kg: '900 gm', sabor: 'chocolate', precio: 18000, precioConIva: 18000 * 1.21, categoria: 'proteina'},

    { img: "/multimedia/wheyprotein-nutrilab-chocolate-1kg.png", nombre: 'Whey Protein NutriLab', kg: '1 kg', sabor: 'chocolate', precio: 11000, precioConIva: 11000 * 1.21, categoria: 'proteina'},

    { img: "multimedia/wheyprotein-mervick-vainilla-1kg.png", nombre: 'Whey Protein Mervick', kg: '1 kg', sabor: 'vainilla', precio: 15000, precioConIva: 15000 * 1.21, categoria: 'proteina'},

    { img: "multimedia/wheyprotein-SPX-frutilla1-1kg.jpg", nombre: 'Whey Protein SPX', kg: '1 kg', sabor: 'frutilla', precio: 13000, precioConIva: 13000 * 1.21, categoria: 'proteina'},
]




//Carrito y precio total capturados del localStorage o si no existe se crea
let carrito = JSON.parse(localStorage.getItem('Carrito de Compras')) || [];
let totalCarrito = JSON.parse(localStorage.getItem('Precio Total')) ?? 0;

//Muestra el precio total del carrito
let mostrarTotalCarrito = document.createElement("h3");
mostrarTotalCarrito.innerText = `Total del Carrito: $${totalCarrito}`;
mostrarTotalCarrito.style.cssText = "color: #24ff6a";
mainIndex.appendChild(mostrarTotalCarrito);

//funcion para agregar productos al carrito y sumar los precios
function agregarAlCarrito(productoNombre) {

    const product = productos.find(p => p.nombre === productoNombre)

    const productoEnCarrito = carrito.find(item => item.nombre === productoNombre);

    if (productoEnCarrito) { // Si existe, incrementar la cantidad.
        productoEnCarrito.cantidad += 1;
    } else {  // Si no existe, agregar el producto al carrito.
        carrito.push({
            img: product.img,
            nombre: product.nombre,
            sabor: product.sabor,
            precio: product.precio,
            precioConIva: product.precioConIva,
            cantidad: 1
        });
    }

    totalCarrito += product.precioConIva;

    mostrarTotalCarrito.innerText = `Total del Carrito: $${totalCarrito}`;

    //Agrega al localStorage
    localStorage.setItem("Carrito de Compras", JSON.stringify(carrito))
    localStorage.setItem("Precio Total", totalCarrito.toFixed(2))
}


//Por cada producto gerera un h3(nombre), li(kg), li(sabor), etc.
for (const producto of productos) {
    let contenedor = document.createElement("div");
    contenedor.style.cssText = "background-color:lightgray; width:400px; padding:20px; border: 2px solid grey; margin: 10px;";

    contenedor.innerHTML = `
    <img src="${producto.img}" alt="" width="100%" class="img-thumbnail >
    <div>
    <h3 class= "tituloProducto"> ${producto.nombre} </h3>
    <span display: none>${producto.categoria}</span>
    <li> Sabor: ${producto.sabor} </li>
    <li> Kg: ${producto.kg} </li>
    <li> Precio: $ ${producto.precio} </li>
    <li> Precio(IVA): $ ${producto.precioConIva.toFixed(2)} </li>
    <button class="buttonCarrito" data-nombre="${producto.nombre}">Agregar al Carrito</button>
    </div>`;

    mainIndex.appendChild(contenedor);
}

const botonesCarrito = document.getElementsByClassName("buttonCarrito");

for (const boton of botonesCarrito) {
    boton.style.cssText = "background-color: #484848; color: #24ff6a; border: none; padding: 3%; cursor: pointer; margin-top: 10px;";
    boton.addEventListener("click", function () {
        const productoNombre = this.getAttribute("data-nombre");
        agregarAlCarrito(productoNombre);
    });
}
