
interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string; 
}

const catalogo: Libro[] = [
    { isbn: "111", titulo: "El Señor de los Anillos", autor: "Tolkien", precio: 25000, disponible: true, genero: "Fantasía" },
    { isbn: "222", titulo: "1984", autor: "Orwell", precio: 18000, disponible: false, genero: "Ciencia Ficción" },
    { isbn: "333", titulo: "El Hobbit", autor: "Tolkien", precio: 20000, disponible: true },
    { isbn: "444", titulo: "Cien años de soledad", autor: "García Márquez", precio: 22000, disponible: true }
];

const inputAutor = document.querySelector('#filtroAutor') as HTMLInputElement;
const btnFiltrar = document.querySelector('#filtrar') as HTMLButtonElement;
const btnDisponibles = document.querySelector('#mostrarDisponibles') as HTMLButtonElement;
const btnTodos = document.querySelector('#mostrarTodos') as HTMLButtonElement;
const ulListado = document.querySelector('#listado') as HTMLUListElement;
const pStats = document.querySelector('#stats') as HTMLParagraphElement;



function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(libro => libro.disponible === true);
}

function precioPromedio(libros: Libro[]): number {
    if (libros.length === 0) return 0; // 
    
    let suma = 0;
    for (const libro of libros) {
        suma += libro.precio;
    }
    return suma / libros.length;
}


function renderizar(libros: Libro[]): void {
    ulListado.innerHTML = '';

    for (const libro of libros) {
        const li = document.createElement('li');
        li.textContent = `${libro.titulo} - ${libro.autor} ($${libro.precio})`;
        
        if (!libro.disponible) {
            li.textContent += " (Sin stock)";
            li.style.color = "red";
        }
        ulListado.appendChild(li);
    }

    const promedio = precioPromedio(libros);
    pStats.textContent = `Mostrando ${libros.length} libros. Precio promedio: $${promedio.toFixed(2)}`;
}



btnFiltrar.addEventListener('click', () => {
    const resultados = buscarPorAutor(inputAutor.value);
    renderizar(resultados);
});

btnDisponibles.addEventListener('click', () => {
    renderizar(librosDisponibles());
});

btnTodos.addEventListener('click', () => {
    inputAutor.value = ""; 
    renderizar(catalogo);  
});


renderizar(catalogo);