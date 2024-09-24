const mainIndex = document.getElementById("mainIndex");
mainIndex.style.padding = "2%";

const tituloTotalCarrito = document.getElementById("tituloTotalCarrito");

const productosIndex = document.getElementById("productosIndex");
productosIndex.style.display = "flex";
productosIndex.style.justifyContent = "space-evenly";

//......................................................

//Carrito y precio total capturados del localStorage o si no existe se crea
let carrito = JSON.parse(localStorage.getItem('Carrito de Compras')) || [];
let totalCarrito = JSON.parse(localStorage.getItem('Precio Total')) ?? 0;

//Muestra el precio total del carrito
let mostrarTotalCarrito = document.createElement("h5");
mostrarTotalCarrito.innerText = `Total del Carrito: $${totalCarrito}`;
mostrarTotalCarrito.style.cssText = "color: #24ff6a";
mostrarTotalCarrito.style.position = "absolute";
mostrarTotalCarrito.style.top = "64px";
mostrarTotalCarrito.style.right = "3%";
mostrarTotalCarrito.style.zIndex = "10";
mostrarTotalCarrito.style.background = "white";
mostrarTotalCarrito.style.padding = "10px";
mostrarTotalCarrito.style.borderBottomRightRadius = "10px";
mostrarTotalCarrito.style.borderBottomLeftRadius = "10px";
mostrarTotalCarrito.style.borderBottomWidth = "1px";
mostrarTotalCarrito.style.borderBottomStyle = "solid";
mostrarTotalCarrito.style.borderBottomColor = "#24ff6a";

tituloTotalCarrito.appendChild(mostrarTotalCarrito);



//Por cada producto crea una carta en el DOM

fetch("js/productos.json")
    .then((response) => response.json())
    .then((data) => {
        for (const item of data) {
            const contenedor = document.createElement("div");
            contenedor.className = "col articulos";
            contenedor.style.minWidth = "340px";
            contenedor.style.maxWidth = "400px";
            contenedor.style.marginBottom = "30px";
            contenedor.style.fontSize = "20px";
            contenedor.style.color = "#484848";
            contenedor.style.borderRadius = "30px";

            item.precioConIva = item.precioConIva * 1.21;

            contenedor.innerHTML = `
            <div class="cartasProductos card h-100 bg-light">
            <img src="${item.img}" alt="${item.nombre}" width="100%" class="imgProduct img-thumbnail card-img-top" >
            <div class="card-body d-flex flex-column">
            <h3 class= "card-title"><strong> ${item.nombre} </strong></h3>
            <span class="d-none">${item.categoria}</span>
            <ul class="list-unstyled mb-auto">
            <li> Sabor: ${item.sabor} </li>
            <li> Kg: ${item.kg} </li>
            <li> <span class="font-monospace">$ ${item.precio}</span> </li>
            <li class="mb-4"><strong class="font-monospace fs-2">$ ${item.precioConIva}</strong>  (IVA)</li>
            </ul>
            <button class="buttonCarrito btn rounded-pill btn-outline-success" data-id="${item.idProducto}">Agregar al Carrito</button>
            </div>
            </div>`;

            productosIndex.appendChild(contenedor);
        }



        //funcion para agregar productos al carrito y sumar los precios
        const botonesCarrito = document.getElementsByClassName("buttonCarrito");

        for (const boton of botonesCarrito) {
            boton.style.cssText = "background:linear-gradient(to right, #00d6bc, #24ff6a); color: #484848; border: none; padding: 3%; cursor: pointer; margin-top: 10px;";
            boton.addEventListener("click", function () {
                const productoId = this.getAttribute("data-id");
                const product = data.find(p => p.idProducto === parseInt(productoId));

                const productoEnCarrito = carrito.find(item => item.id === product.idProducto);
                
                if (productoEnCarrito) { // Si existe, incrementar la cantidad.
                    productoEnCarrito.cantidad += 1;
                } else {  // Si no existe, agregar el producto al carrito.
                    carrito.push({
                        id: product.idProducto,
                        img: product.img,
                        nombre: product.nombre,
                        sabor: product.sabor,
                        precio: product.precio,
                        precioConIva: product.precioConIva,
                        cantidad: 1
                    });
                }

                Toastify({
                    text: "Producto agregado",
                    duration: 1000,
                    offset: {
                        x: 0,
                        y: 50
                    },
                    style: {
                        background: "linear-gradient(to right, #00d6bc, #24ff6a)",
                    }

                }).showToast();

                totalCarrito += product.precioConIva;

                mostrarTotalCarrito.innerText = `Total del Carrito: $${totalCarrito}`;

                //Agrega al localStorage
                localStorage.setItem("Carrito de Compras", JSON.stringify(carrito));
                localStorage.setItem("Precio Total", totalCarrito.toFixed(2));
            })

        }
    })


// Barra buscador de productos
const buscadorIndex = document.getElementById("buscadorIndex");
buscadorIndex.style.display = "flex";
buscadorIndex.style.justifyContent = "center";
buscadorIndex.style.alignSelf = "center";
buscadorIndex.style.width = "100%";
buscadorIndex.style.marginBottom = "40px";

const divBuscador = document.createElement("div");
divBuscador.style.width = "50%";
divBuscador.style.minWidth = "270px";

buscadorIndex.appendChild(divBuscador);


divBuscador.innerHTML = `<input id="buscador" class="form-control rounded-pill" type="search" placeholder="Buscar" aria-label="Search">`;

buscador = document.getElementById("buscador");

document.addEventListener('keyup', e => {
    if (e.target = buscador) {
        document.querySelectorAll('.articulos').forEach(articulos => {
            articulos.textContent.toLowerCase().includes(e.target.value) ? articulos.classList.remove('filtro') : articulos.classList.add('filtro');
        })
    }
})

