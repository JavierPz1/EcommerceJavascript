const mainIndex = document.getElementById("mainIndex");
mainIndex.style.padding = "2%";

const tituloTotalCarrito = document.getElementById("tituloTotalCarrito");

const productosIndex = document.getElementById("productosIndex");

//......................................................

//Carrito y precio total capturados del localStorage o si no existe se crea
let carrito = JSON.parse(localStorage.getItem('Carrito de Compras')) || [];
let totalCarrito = JSON.parse(localStorage.getItem('Precio Total')) ?? 0;

//Muestra el precio total del carrito
let mostrarTotalCarrito = document.createElement("h3");
mostrarTotalCarrito.innerText = `Total del Carrito: $${totalCarrito}`;
mostrarTotalCarrito.style.cssText = "color: #24ff6a";
mostrarTotalCarrito.style.position = "absolute";
mostrarTotalCarrito.style.top = "64px";
mostrarTotalCarrito.style.right = "20px";
mostrarTotalCarrito.style.zIndex = "10";
mostrarTotalCarrito.style.background = "white";
mostrarTotalCarrito.style.padding = "10px";
mostrarTotalCarrito.style.borderBottomRightRadius = "10px";
mostrarTotalCarrito.style.borderBottomLeftRadius = "10px";

tituloTotalCarrito.appendChild(mostrarTotalCarrito);



//Por cada producto crea una carta en el DOM

fetch("../aproductos.json")
    .then((response) => response.json())
    .then((data) => {
        for (const item of data) {
            const contenedor = document.createElement("div");
            contenedor.className = "col";
            contenedor.style.minWidth = "340px";
            contenedor.style.maxWidth = "400px";
            contenedor.style.marginBottom = "30px";
            contenedor.style.fontSize = "20px";
            contenedor.style.color = "#484848";
            contenedor.style.borderRadius = "10px";

            item.precioConIva = item.precioConIva * 1.21;

            contenedor.innerHTML = `
            <div class="card h-100">
            <img src="${item.img}" alt="${item.nombre}" width="100%" class="img-thumbnail card-img-top" >
            <div class="card-body">
            <h3 class= "card-title"><strong> ${item.nombre} </strong></h3>
            <span class="d-none">${item.categoria}</span>
            <ul class="list-unstyled">
            <li> Sabor: ${item.sabor} </li>
            <li> Kg: ${item.kg} </li>
            <li> <span class="font-monospace">$ ${item.precio}</span> </li>
            <li class="mb-4"><strong class="font-monospace fs-2">$ ${item.precioConIva}</strong>  (IVA)</li>
            </ul>
            <button class="buttonCarrito btn rounded-pill btn-outline-success" data-nombre="${item.nombre}">Agregar al Carrito</button>
            </div>
            </div>`;



            productosIndex.appendChild(contenedor);
        }


        //funcion para agregar productos al carrito y sumar los precios
        const botonesCarrito = document.getElementsByClassName("buttonCarrito");

        for (const boton of botonesCarrito) {
            boton.style.cssText = "background:linear-gradient(to right, #00d6bc, #24ff6a); color: #484848; border: none; padding: 3%; cursor: pointer; margin-top: 10px;";
            boton.addEventListener("click", function () {
                const productoNombre = this.getAttribute("data-nombre");
                const product = data.find(p => p.nombre === productoNombre);

                const productoEnCarrito = carrito.find(item => item.nombre === productoNombre);

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


