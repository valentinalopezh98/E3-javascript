const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const form = document.getElementById("form");
const idInput = document.getElementById("pizza-id");
const cardContainer = document.getElementById("card-container");

// Traigo la ultima pizza del storage o creo array vacio si no hay ninguna
const lastPizza = JSON.parse(localStorage.getItem("lastPizza")) || [];

// Guardo la pizza actual en el local storage
const saveToLocalStorage = (pizza) => {
  localStorage.clear();
  localStorage.setItem("lastPizza", JSON.stringify(pizza));
}

//valido que el input no este vacio
const isEmpty = (input) => {
  return !input.value.trim().length;
}

// valido que solo se ingresen numeros
const isNumber = (input) =>{
  const reg = /^\d+$/;
  return reg.test(input.value.trim());
}

const isMatchingID = (input) => {
  match = false;
  const pizza = pizzas.find((pizza) => pizza.id === Number(idInput.value.trim()));
  if (pizza === undefined) match = false;
  else match = true;
  return match;
}

const getPizzaFromInput = (input) => {
  return pizzas.find((pizza) => pizza.id === Number(idInput.value.trim()));
}

const showError = (message) =>{
  cardContainer.innerHTML = `
    <small class="error_message"">${message}</small>
  `;
}

const capitalize = (str) => {
  let firstChar = str.charAt(0).toUpperCase();
  let rest = str.slice(1).toLowerCase();
  let result = firstChar + rest; 
  return result;
}

const showCard = (pizza) => {
  pizzaName = capitalize(pizza.nombre);
  cardContainer.innerHTML = `
  <div class="card">
    <div class="card-img">
        <img src="${pizza.imagen}" alt="${pizzaName}">
    </div>
    <div class="card-info">
        <h3>${pizzaName}</h3>
        <p><span>Ingredientes: </span>${pizza.ingredientes.join(", ")}</p>
    </div>
    <div class="card-price"><p>$${pizza.precio}</p></div>
  </div>
  `;
}

const validateInput = () => {
  valid = false;
  if (isEmpty(idInput)){
    showError("Por favor, ingrese un ID");
    return;
  }
  if (!isNumber(idInput)){
    showError("Por favor ingrese numeros");
    form.reset();
    return;
  }
  if (!isMatchingID(idInput)){
    showError("El dato ingresado es incorrecto");
    form.reset();
    return;
  }
  valid = true;
  return valid;
}

const search = (e) => {
  e.preventDefault();
  if (validateInput()) {
    let pizza = getPizzaFromInput(idInput);
    showCard(pizza);
    saveToLocalStorage(pizza);
    form.reset();
  }
} 

const showLastPizza = () => {
  if (lastPizza.length != 0) {
    showCard(lastPizza);
  }
}

const init = () => {
  window.addEventListener("load", showLastPizza);
  form.addEventListener("submit", search);
}

init();