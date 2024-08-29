/* alert("Hola profe y tutores, bienvenidos!!"); //despues lo borro esto :)
const fechaActual = new Date() //fecha actual para el header
console.log(fechaActual.getFullYear())

let nombreDeUsuario = prompt("Ingrese su nombre de usuario")
console.log("Su nombre de usuario es: " + nombreDeUsuario);

//.......................................................

//Catalogo de productos
const productos = [
    { cantidad: 1 , nombre: 'whey protein ENA Sport True Made', kg: '900 gm', sabor: 'chocolate', precio: 18000, precioConIva: 18000 * 1.21 },

    { cantidad: 1, nombre: 'Whey Protein NutriLab', kg: '1 kg', sabor: 'chocolate', precio: 11000, precioConIva: 11000 * 1.21},

    { cantidad: 1, nombre: 'Whey Protein Mervick', kg: '1 kg', sabor: 'vainilla', precio: 15000, precioConIva: 15000 * 1.21 },

    { cantidad: 1, nombre: 'Whey Protein SPX', kg: '1 kg', sabor: 'frutilla', precio: 13000, precioConIva: 13000 * 1.21 },
]

//.................................................

//Buscador de producto
function filtrarProductos(productos, buscar) {
    return productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
        producto.sabor.toLowerCase().includes(buscar.toLowerCase())
    );


}//filtrado por nombre y sabor

let buscar = prompt("¿Que estas buscando?(puedes buscar por producto o sabor del producto)");
const resultados = filtrarProductos(productos, buscar);

if (resultados.length > 0) {
    resultados.forEach((producto) => {
        console.log(
            `Producto: ${producto.nombre}
Kg: ${producto.kg}
Sabor: ${producto.sabor}
Precio: $${producto.precio}
Precio: $${producto.precioConIva}`
            );
        });
} else {
    console.error("No se encuentraron resultados.");
}


//.........................................................

//Seleccionar producto y agregarlo al carrito

const carrito = [];

let seleccionarProducto = prompt("Selecciona un whey protein con un numero del 1 al 4. " + "1) ENA Sport de chocolate. " + "2) Nutrilab de chocolate. " + "3) Mervick de vainilla. " + "4) SPX de frutilla. ")

//Intente generar un contador para q no se repitiera el producto por cada vez q lo elegia
while (seleccionarProducto != "fin") {
            
    if (seleccionarProducto == (parseInt(1))) {
        /* const ex = carrito.some(productos => productos.nombre === carrito.nombre)
        if (ex) {
            const contador = carrito.map(producto => {
                if (producto.nombre === carrito.nombre) {
                    carrito.cantidad++
                }
            })
        } else {
            carrito.push(productos[0]);        
    }
    }
    else if (seleccionarProducto == (parseInt(2))) {
        carrito.push(productos[1]);
    }
    else if (seleccionarProducto == (parseInt(3))) {
        carrito.push(productos[2]);
    }
    else if (seleccionarProducto == (parseInt(4))) {
        carrito.push(productos[3]);
    }
    else {
        console.error("El caracter ingresado no pertenece a ningun producto")
    }
    seleccionarProducto = prompt("Seleccione otro producto" + "1) ENA Sport de chocolate. " + "2) Nutrilab de chocolate. " + "3) Mervick de vainilla. " + "4) SPX de frutilla. " + "Para finalizar la compra escriba ' fin ' ");
    
}

console.log(carrito);
//................................................. */