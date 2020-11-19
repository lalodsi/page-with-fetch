'use strict'

window.addEventListener('load', ()=> {
	
	//Elementos del DOM
	var divContenido = document.getElementsByClassName('menu_p-link');
	var menu = document.getElementsByClassName('p-link');
	
	//Peticiones
	let getHome = () => fetch("https://jsonplaceholder.typicode.com/posts");
	let getUsuarios = () => fetch('https://jsonplaceholder.typicode.com/users');
	let getFotos = () => fetch('https://jsonplaceholder.typicode.com/photos');
	let getBlog = () => fetch('https://jsonplaceholder.typicode.com/comments');
	let getLista = () => fetch('https://jsonplaceholder.typicode.com/todos');

//Funciones para la interactividad de los elementos

	function OcultarTodo(elemento){
		for(let i = 0; i < elemento.length; i++){
			elemento[i].style.display = "none";
		}
	}

	OcultarTodo(divContenido);
	divContenido[0].style.display = "block";

	for (let i = 0; i < menu.length; i++){
		menu[i].addEventListener('click', () => {
			OcultarTodo(divContenido);
			divContenido[i].style.display = "block";
		});
	}
	
	var espacio = (elemento) =>  {
					elemento.appendChild(
						document.createElement('br'));
				}

//Uso de las peticiones
	
	//Texto Normal
	getHome()
		.then(data => data.json())
		.then(response => {
			//console.log(response);
			for (let i = 0; i < response.length; i++) {
				let seccion = document.createElement("section");
				let titulo = document.createElement("h2");
				titulo.innerHTML = response[i].title;
				let cuerpo = document.createElement("p");
				cuerpo.innerHTML = response[i].body;
				seccion.appendChild(titulo);
				espacio(seccion)
				seccion.appendChild(cuerpo);
				divContenido[0].appendChild(seccion);
			}
		});

	//Blog
	getBlog()
		.then(data => data.json())
		.then(response => {
			let seccion = document.createElement("section");
			for(let i = 0; i < response.length; i++){
				let nombre = document.createElement("p");
				nombre.innerHTML = response[i].name;
				let correo = document.createElement("p");
				correo.innerHTML = response[i].email;
				let cuerpo = document.createElement("p");
				cuerpo.innerHTML = response[i].body;
				seccion.appendChild(nombre);
				seccion.appendChild(correo);
				seccion.appendChild(cuerpo);
				espacio(seccion);
				seccion.appendChild(
					document.createElement("hr"));
				espacio(seccion);
			}
			divContenido[3].appendChild(seccion);
		});

	//Imágenes
	getFotos()
		.then(data => data.json())
		.then(response => {
			for(let i = 0; i < response.length; i++){
				if(response[i].albumId == "1"){
					let nombre = document.createElement("p");
					let avatar = document.createElement("img");
					let elemento = document.createElement("section");
					nombre.innerHTML = response[i].title;
					avatar.src = response[i].url;
					avatar.width = "200";
					avatar.display = "in-line";
					elemento.appendChild(nombre);
					elemento.appendChild(avatar);
					divContenido[2].appendChild(elemento); 
				}
			}
		});

	//Usuarios
	getUsuarios()
		.then(data => data.json())
		.then(response => {
			for (var i=0; i<response.length; i++){
				let usuario = document.createElement('section');
				usuario.innerHTML = response[i].name;
				espacio(usuario);
				usuario.append('Telefono: ' + response[i].phone);
				espacio(usuario);
				usuario.append("Empresa: ");
				let listaU = document.createElement('ul');
				let listaI = document.createElement('li');
				listaI.append(response[i].company.name);
				listaU.append(listaI);
				usuario.appendChild(listaU);
				usuario.appendChild(listaU);
				divContenido[1].appendChild(usuario);
			}
		});

	getLista()
		.then(data => data.json())
		.then(response => {
			divContenido[4].appendChild(document.createTextNode(
					"Lista de Cosas por hacer"));
			//let listaU = document.createElement("ul");
			for(let i = 0; i < response.length; i++){
				let listaU = document.createElement("ul");
				let lista = document.createElement("li");
				lista.innerHTML = response[i].id + ". " 
					+ response[i].title;
				listaU.appendChild(lista);
				divContenido[4].appendChild(listaU);
				
			}

		});
});