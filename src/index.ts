import './style.scss';

// //-- Ejercicios entregables ****************************************
// // 1. Array operations
// // 1.1.- Función Head. Implementa una función head (inmutable), tal que, dado un array como entrada extraiga y devuelva su primer elemento. Utiliza destructuring.

const family = ["Juan Carlos", "Laura", "Chloe"];

const head = (arr) =>{ 
  const [first] = arr;
  return first;
};

console.log(`1.1.- Con la función head extraemos el primer elemento del array:`);
console.log(head(family));

//  // 1.2.- Función Tail. Implementa una función tail (inmutable), tal que, dado un array como entrada devuelta todos menos el primer elemento. Utiliza rest operator.

const tail = ([,...arr]) => {
    
    return arr;
};

console.log(`+--------------------------------------------------------+`);
console.log(`1.2.- Con la función tail extraemos todos los elementos del array menos el primero:`);
console.log(tail(family));

// // 1.3.- Función Init. Implementa una función init(inmutable), tal que, dado un array como entrada devuelva todos los elementos menos el último. Utiliza los métodos que ofrece Array.prototype

const init = (arr) => {
    const [...newArray] = arr;
    newArray.pop();
    return newArray;
};

console.log(`+--------------------------------------------------------+`);
console.log(`1.3.- Con la función init extraemos todos los elementos del array menos el último:`);
console.log(init(family));

// // 1.4.- Función Last. Implementa una función last (inmutable), tal que, dado un array como entrada devuelva el último elemento.

const last = (arr) => {
    
    const [...newArray] = arr;
    
    return newArray.pop();
};

console.log(`+--------------------------------------------------------+`);
console.log(`1.4.- Con la función last extraemos el último elemento del array:`);
console.log(last(family));

// //EJERCICIO 2 -- CONCAT
// // 2.- Implementa una función concat (inmutable) tal que, dados 2 arrays como entrada, devuelva la concatenación de ambos. Utiliza rest / spread operators.

const family2 = ["Juan", "Teresa", "Mari Carmen"]

const concat = (a, b) => {
    
    return [...a, ...b];
    
};

console.log(`+--------------------------------------------------------+`);
console.log(`2.- Con la función concat concatenamos dos arrays en uno:`);
console.log(concat(family, family2));
console.log(`Comprobamos que el array original sigue inmutable:`)
console.log(family);

// //EJERCICIO 3 -- CLONE MERGE
// // 3.1.- Clone.- mplementa una función clone que, a partir de un objeto de entrada source devuelva un nuevo objeto con las propiedades de source.

const person = {
    name: "Juan Carlos",
    surname: "Fuentes",
    age: "49",
};

function clone(source) {
    
    return {...source}
};

const newPerson = clone(person);

console.log(`+--------------------------------------------------------+`);
console.log(`3.1.- Vemos que hemos clonado el objeto:`);
console.log(newPerson);
console.log(`Y comprobamos que cada uno apunta a una referencia distinta, por eso no son iguales:`);
console.log(newPerson === person);

// // 3.2.- Merge.- Implementa una función merge que, dados dos objetos de entrada source y target, devuelva un nuevo objeto con todas las propiedades de target y de source, y en caso de propiedades con el mismo nombre, source sobreescribe a target

const a = { name: "Maria", surname: "Ibañez", country: "SPA" };
const b = { name: "Luisa", age: 31, married: true };

function merge(source, target) {
    return {...target, ...source}
};

console.log(`+--------------------------------------------------------+`);
console.log(`3.2.- Vemos un solo objeto en el que el source sobreescribe los elementos repetidos sobre el target:`);
console.log(merge(a, b));

// //EJERCICIO 4 -- READ BOOKS
// // 4.- Crea una función isBookRead que reciba una lista de libros y un título y devuelva si se ha leído o no dicho libro. Un libro es un objeto con title como string y isRead como booleano. En caso de no existir el libro devolver false TIP: Existe un método de Array.prototype que te ayudará a buscar según un patrón.

class Book {
    title: string;
    isRead: boolean;
    constructor (title: string, isRead: boolean){
        this.title = title;
        this.isRead = isRead;
    }
}

// Esta sería la clase en vanilla JS
// class Book {
//     constructor(title, isRead){
//       this.title = title,
//       this.isRead = isRead
//     }
// }
        
const books: Book[] = [
    new Book('Harry Potter y la piedra filosofal', true),
    new Book('Canción de hielo y fuego', false),
    new Book('Devastación', true),
];

function isBookRead(books: Book[], titleToTest: string): string | boolean{
    let bookReaded = books.filter(b => b.title === titleToTest);
    
    if (bookReaded.length == 0)
        return false;
    else 
        return bookReaded[0].isRead ? `El libro ${bookReaded[0].title} ha sido leído` : `El libro ${bookReaded[0].title} no se ha leído`;
    
}

// Esta sería la función en vanilla JS
// function isBookRead(books, titleToSearch) {
//     let bookReaded = books.filter(b => b.title === titleToSearch);
//     if (bookReaded.length == 0)
//       return false;
//     else
//       return bookReaded[0].isRead ? `El libro ${bookReaded[0].title} ha sido leído` : `El libro ${bookReaded[0].title} no se ha leído`
// }
    
console.log(`+--------------------------------------------------------+`);
console.log(`4.- Comprobaciones de la función isBookRead`)
console.log(isBookRead(books, 'Harry Potter y la piedra filosofal'));
console.log(isBookRead(books, 'Canción de hielo y fuego'));
console.log(isBookRead(books, 'Devastación'));
console.log(isBookRead(books, "Los Pilares de la Tierra"));

// //EJERCICIO 5 -- SLOT MACHINE
// // 5.- El objetivo de este ejercicio es crear una máquina tragaperras utilizando clases donde cada vez que juguemos insertemos una moneda. Cada máquina tragaperras (instancia) tendrá un contador de monedas que automáticamente se irá incrementando conforme vayamos jugando. Cuando se llame al método play el número de monedas se debe incrementar de forma automática y debe generar tres booleanos aleatorios que representarán el estado de las 3 ruletas. El usuario habrá ganado en caso de que los tres booleanos sean true, y por tanto deberá mostrarse por consola el mensaje: "Congratulations!!!. You won <número de monedas> coins!!"; y reiniciar las monedas almacenadas, ya que las hemos conseguido y han salido de la máquina. En caso contrario deberá mostrar otro mensaje: "Good luck next time!!".

class SlotMachine {

    private _coins = 0;
    items: Array<boolean> = [];

    play(): void{
        this._coins += 1;
        this.items[0] = this.randomBool();
        this.items[1] = this.randomBool();
        this.items[2] = this.randomBool();
    };

    get balance(): number {
        return this._coins;
    };

    set resetCoins(value: number){
        this._coins = value;
    };

    randomBool(): boolean {
        return Boolean(Math.round(Math.random()));
    };
};

const machine = new SlotMachine();
  
let $div1 = document.getElementById('item1');
let $div2 = document.getElementById('item2');
let $div3 = document.getElementById('item3');
let $message = document.getElementById('message');
let $coins = document.getElementById('coins');

$coins!.innerText = `${machine.balance.toString()} Coins`;
$message!.innerText = `Waiting for players`;

const showResult = (machine: SlotMachine): void => {
 
    $div1!.innerHTML = machine.items[0] ? '🍏' : '🍌';
    $div2!.innerHTML = machine.items[1] ? '🍏' : '🍌';
    $div3!.innerHTML = machine.items[2] ? '🍏' : '🍌';

    if (machine.items[0] === machine.items[1] && machine.items[0] === machine.items[2]){
        $message!.innerText = `Congratulations!!!. You won ${machine.balance} coins!!`;
        machine.resetCoins = 0;
    }else {
        $message!.innerText = `Good luck next time!`;
    };

    $coins!.innerText = `${machine.balance.toString()} Coins`;
};

document.getElementById('throw')!.addEventListener('click', () =>{
    machine.play();
    showResult(machine);
});