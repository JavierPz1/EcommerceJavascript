const cuerpo = document.getElementById("body");

cuerpo.style.backgroundImage = "linear-gradient(250deg, #d7fff5, white)";
cuerpo.style.backgroundRepeat = "no-repeat"
cuerpo.style.backgroundAttachment = "fixed"
cuerpo.style.fontFamily = "Helvetica";
cuerpo.style.height = "100vh";
cuerpo.style.width = "100%";

//Header...........................................
const header = document.getElementById("header");

header.style.width = "100%";
header.style.minHeight = "85px";
header.style.marginBottom = "20px";


//Nav...........................................
const navegador = document.createElement("nav");

navegador.style.background = "white";
navegador.style.position = "fixed";
navegador.style.width = "100%";
navegador.style.maxHeight = "80px";
navegador.style.paddingTop = "15px";
navegador.style.paddingLeft = "3%"
navegador.style.paddingRight = "3%"
navegador.style.display = "flex";
navegador.style.justifyContent = "space-between";
navegador.style.zIndex = "10";
navegador.style.borderBottomWidth = "1px";
navegador.style.borderBottomStyle = "solid";
navegador.style.borderBottomColor = "#24ff6a";

//Logo........................................
const logo = document.createElement("h1");
logo.innerHTML = "LOGO";

logo.style.display = "flex";
logo.style.position = "relative";
logo.style.color = "black";
logo.style.fontWeight = "bold";
logo.style.fontSize = "1.5rem"
logo.style.letterSpacing="2px"

//Ul...........................................
const ul = document.createElement("ul");

ul.style.display = "flex";
ul.style.textAlign = "space-between";


//Enlaces......................................
const enlaces = [
    {
        link: "index",
        nombre: "Inicio",
    },
    {
        link: "carrito",
        nombre: "Carrito",
    },
]

header.appendChild(navegador);
navegador.appendChild(logo);
navegador.appendChild(ul);

for (const link of enlaces) {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${link.link}.html" class="text-decoration-none text-black-50 navbar-brand">${link.nombre}</a>`
    li.style.display = "flex";
    li.style.position = "relative";
    li.style.marginInline = "20px";
    li.style.fontSize = "1.4rem";
    
    ul.appendChild(li);   
}




//Titulo de pagina...................................................

let tituloPagina = document.title;

window.addEventListener('blur', () => {
    tituloPagina = document.title;
    document.title ='No te vayas! Vuelve!';
})

window.addEventListener('focus', () => {
    document.title = tituloPagina;
})