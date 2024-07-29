alert("Hola profe y tutores, bienvenidos!!"); //despues lo borro esto :)
 
let nombreDeUsuario = prompt ("Ingrese su nombre de usuario")
console.log("Su nombre de usuario es: " + nombreDeUsuario); 

//.......................................................

const IVA = 1.21
//funcion principal para crear nuevos productos
function Productos (nombre, marca, kg, sabor, precio) {
    this.nombre = nombre;
    this.marca = marca;
    this.kg = kg;
    this.sabor = sabor;
    this.precio = precio;
    
    this.precioFinal = function () {
        this.precioConIva = precio * IVA;
    }
    this.precioConIva = this.preciofinal
}

//Catalogo de productos
const productoProteina1 = new Productos("whey protein", "ENA Sport True Made", "900 gm", "chocolate", 18000);

const productoProteina2 = new Productos("Whey Protein", "NutriLab", "1 kg","chocolate", 11000)

const productoProteina3 = new Productos("Whey Protein", "Mervick", "1 kg", "vainilla", 15000)

const productoProteina4 = new Productos("Whey Protein", "SPX", "1 kg", "frutilla", 13000)


//.................................................

//Seleccionar producto y agrregarlo al carrito
let seleccionarProducto = prompt("Selecciona un whey protein con un numero del 1 al 4. " + "1) ENA Sport de chocolate. " + "2) Nutrilab de chocolate. " + "3) Mervick de vainilla. " + "4) SPX de frutilla. ")

while (seleccionarProducto != "terminar"){
if (seleccionarProducto == (parseInt(1))) {
    console.log(productoProteina1);
    productoProteina1.precioFinal();
    }
else if (seleccionarProducto == (parseInt (2))) {
    console.log (productoProteina2);
    productoProteina2.precioFinal()
    }
else if (seleccionarProducto == (parseInt(3))) {
    console.log (productoProteina3);
    productoProteina3.precioFinal();
}
else if (seleccionarProducto == (parseInt(4))) {
    console.log (productoProteina4);
    productoProteina4.precioFinal();
}
else {
    console.error("El caracter ingresado no pertenece a ningun producto")
    }
    seleccionarProducto = prompt("Seleccione otro producto" + "1) ENA Sport de chocolate. " + "2) Nutrilab de chocolate. " + "3) Mervick de vainilla. " + "4) SPX de frutilla. " + "Para finalizar la compra escriba ' terminar ' ")
}

//Quise agregar un carrito y sumar los costos de los precios finales con el IVA, pero no supe hacerlo '~'
/* function sumarCostos(numero1) {
        if (seleccionarProducto === (parseInt(1))) {
            numero1 = (parseInt(21780))
        }
        else if (seleccionarProducto === (parseInt(2))) {
            numero1 = (parseInt(13310))
        }
        else if (seleccionarProducto === (parseInt(3))) {
            numero1 = (parseInt(18150))
        }
        else if (seleccionarProducto === (parseInt(4))) {
            numero1 = (parseInt(15730))
        }
        else {
            numero1 = 0
        }
        return numero1 + numero1;

} */






//.....................................................


