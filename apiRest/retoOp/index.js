import {Movie} from './src/models/Movie.js'
import { Professional } from './src/models/Professional.js'

let movie = new Movie()

const showMovie = async () => {
    
    
    let container =  document.getElementById('container')
    container.innerHTML = ''
    let title = document.getElementById('title').value
    
    let url = `http://localhost:3000/movie/?title=${title}`
    
    let options = {
        headers: { "content-type": "application/json; charset=UTF-8" },
        method: 'GET'
    }
   

    try {
        let data = await fetch(url, options)
        let response = await data.json()
        console.log(response);
        if (response.movie) {
            
            // mostrar película y director
            let movie = response.movie
            let director = response.movie.director
            let isRetired
            movie.isMCU ? 'Pertenece al Universo Marvel' : 'No pertenece al Universo Marvel'
            director.isRetired ? isRetired = 'En Activo' : isRetired = 'Retirado'
            container.innerHTML = 
            `
            <div class="card mb-3" id="${movie.idMovie}">
              <img src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg" class="card-img-fluid" style="height: 30%; object-fit: contain;" alt="...">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><strong>Año de lanzamiento: </strong> ${movie.releaseYear}</li>
                  <li class="list-group-item"><strong>País: </strong> ${movie.nationality}cm</li>
                  <li class="list-group-item"><strong>Idioma: </strong>${movie.language}</li>
                  <li class="list-group-item"><strong>Plataforma:</strong> ${movie.platform}</li>
                  <li class="list-group-item"><strong>${movie.isMCU}</strong></li>
                  <li class="list-group-item"><strong>Actor Principal:</strong> ${movie.mainCharacterName}</li>
                  <li class="list-group-item"><strong>Productor:</strong> ${movie.producer}</li>
                  <li class="list-group-item"><strong>Distribuidor:</strong> ${movie.distributor}</li>
                  <li class="list-group-item"><strong>Genero:</strong> ${movie.genre}</li>
                </ul>
              <div class="card mb-3" style="max-width: 540px; id="${director.idDirector}">
              <h2>Actores</h2>
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                  <h5 class="card-title">${movie.director.name}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Edad:</strong> ${director.age}</li>
                        <li class="list-group-item"><strong>Altura:</strong> ${director.height}cm</li>
                        <li class="list-group-item"><strong>${isRetired}</strong></li>
                        <li class="list-group-item"><strong>Nacionalidad:</strong> ${director.nationality}</li>
                        <li class="list-group-item"><strong>Oscars:</strong> ${director.oscarNumber}</li>
                        <li class="list-group-item"><strong>Profesión:</strong> ${director.profession}</li>
                    </ul>
                    <div class="card-body">
                      <a href="#" class="card-link">Sus Películas</a>
                      <a href="#" class="card-link">Wikipedia</a>
                    </div>
                  </div>
                </div>
              </div>
            <div>             
            </div>
          </div>
          `

            // actores de la película
            response.movie.actors.forEach(actor => {
                let isRetired
                actor.isRetired ? isRetired = 'En Activo' : isRetired = 'Retirado'
                let content = 
            `  
            <div class="card mb-3" style="max-width: 540px; id="${actor.idActor}">
              <h2>Actores</h2>
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${actor.name}</h5>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><strong>Edad:</strong> ${actor.age}</li>
                      <li class="list-group-item"><strong>Altura:</strong> ${actor.height}cm</li>
                      <li class="list-group-item"><strong>${isRetired}</strong></li>
                      <li class="list-group-item"><strong>Nacionalidad:</strong> ${actor.nationality}</li>
                      <li class="list-group-item"><strong>Oscars:</strong> ${actor.oscarNumber}</li>
                      <li class="list-group-item"><strong>Profesión:</strong> ${actor.profession}</li>
                    </ul>
                    <div class="card-body">
                      <a href="#" class="card-link">Sus Películas</a>
                      <a href="#" class="card-link">Wikipedia</a>
                    </div>
                  </div>
                </div>
              </div>
            <div>
            `
                return container.innerHTML += content
            })
            
            // Guionistas de la película
            response.movie.writers.forEach(writer => {
                let isRetired
                if (writer.isRetired == true) {
                    isRetired = 'En Activo'
                } else {
                    isRetired = 'Retirado'
                } 
                let content = 
            `  
            <div class="card mb-3" style="max-width: 540px; id="${writer.idWriter}">
            <h2>Guionistas</h2>
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${writer.name}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Edad:</strong> ${writer.age}</li>
                        <li class="list-group-item"><strong>Altura:</strong> ${writer.height}cm</li>
                        <li class="list-group-item"><strong>${isRetired}</strong></li>
                        <li class="list-group-item"><strong>Nacionalidad:</strong> ${writer.nationality}</li>
                        <li class="list-group-item"><strong>Oscars:</strong> ${writer.oscarNumber}</li>
                        <li class="list-group-item"><strong>Profesión:</strong> ${writer.profession}</li>
                    </ul>
                <div class="card-body">
                    <a href="#" class="card-link">Sus Películas</a>
                    <a href="#" class="card-link">Wikipedia</a>
                </div>
                  </div>
                </div>
              </div>
            </div>
            `
                return container.innerHTML += content
            })

                
        } else {
            document.getElementById('container').innerHTML = JSON.stringify(response.message)
        }
    } catch (error) {
        console.log(error);
    }
}
 
const addMovie = async () => {

    movie.idMovie = document.getElementById('idMovie').value,
    movie.title = document.getElementById('title').value,
    movie.releaseYear = document.getElementById('releaseYear').value,
    movie.nationality = document.getElementById('nationality').value,
    movie.language = document.getElementById('language').value,
    movie.platform = document.getElementById('platform').value,
    movie.isMCU = document.getElementById('isMCU').value,
    movie.mainCharacterName = document.getElementById('mainCharacterName').value,
    movie.producer = document.getElementById('producer').value,
    movie.distributor = document.getElementById('distributor').value,
    movie.genre = document.getElementById('genre').value
    movie.actors = []
    movie.director = {}
    movie.writers = []

    let url = `http://localhost:3000/movie/`

    let options = {
        headers: { "content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(movie),
        method: 'POST'
    }

    let container =  document.getElementById('container')
    container.innerHTML = ''

    try {
        let data = await fetch(url, options)
        let response = await data.json()
        console.log(response);

        if (response.movie) {
            
            // mostrar película y director
            let movie = response.movie
            let director = response.movie.director
            let isRetired
            movie.isMCU ? 'Pertenece al Universo Marvel' : 'No pertenece al Universo Marvel'
            director.isRetired ? isRetired = 'En Activo' : isRetired = 'Retirado'
            container.innerHTML = 
            `
            <div class="card mb-3" id="${movie.idMovie}">
              <img src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg" class="card-img-fluid" style="height: 30%; object-fit: contain;" alt="...">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><strong>Año de lanzamiento: </strong> ${movie.releaseYear}</li>
                  <li class="list-group-item"><strong>País: </strong> ${movie.nationality}cm</li>
                  <li class="list-group-item"><strong>Idioma: </strong>${movie.language}</li>
                  <li class="list-group-item"><strong>Plataforma:</strong> ${movie.platform}</li>
                  <li class="list-group-item"><strong>${movie.isMCU}</strong></li>
                  <li class="list-group-item"><strong>Actor Principal:</strong> ${movie.mainCharacterName}</li>
                  <li class="list-group-item"><strong>Productor:</strong> ${movie.producer}</li>
                  <li class="list-group-item"><strong>Distribuidor:</strong> ${movie.distributor}</li>
                  <li class="list-group-item"><strong>Genero:</strong> ${movie.genre}</li>
                </ul>
              <div class="card mb-3" style="max-width: 540px; id="${director.idDirector}">
              <h2>Actores</h2>
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                  <h5 class="card-title">${movie.director.name}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Edad:</strong> ${director.age}</li>
                        <li class="list-group-item"><strong>Altura:</strong> ${director.height}cm</li>
                        <li class="list-group-item"><strong>${isRetired}</strong></li>
                        <li class="list-group-item"><strong>Nacionalidad:</strong> ${director.nationality}</li>
                        <li class="list-group-item"><strong>Oscars:</strong> ${director.oscarNumber}</li>
                        <li class="list-group-item"><strong>Profesión:</strong> ${director.profession}</li>
                    </ul>
                    <div class="card-body">
                      <a href="#" class="card-link">Sus Películas</a>
                      <a href="#" class="card-link">Wikipedia</a>
                    </div>
                  </div>
                </div>
              </div>
            <div>             
            </div>
          </div>
          `


        } else {
            document.getElementById('container').innerHTML = JSON.stringify(response.message)
        }
        
    } catch (error) {
        console.log(error);
    }
    
}

const modifyMovie = async () => {

    movie.idMovie = document.getElementById('idMovie').value,
    movie.title = document.getElementById('title').value,
    movie.releaseYear = document.getElementById('releaseYear').value,
    movie.nationality = document.getElementById('nationality').value,
    movie.language = document.getElementById('language').value,
    movie.platform = document.getElementById('platform').value,
    movie.isMCU = document.getElementById('isMCU').value,
    movie.mainCharacterName = document.getElementById('mainCharacterName').value,
    movie.producer = document.getElementById('producer').value,
    movie.distributor = document.getElementById('distributor').value,
    movie.genre = document.getElementById('genre').value
    movie.actors = []
    movie.director = {}
    movie.writers = []

    let url = `http://localhost:3000/movie/`

    let options = {
        headers: { "content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(movie),
        method: 'PUT'
    }

    let container =  document.getElementById('container')
    container.innerHTML = ''

    try {
        let data = await fetch(url, options)
        let response = await data.json()
        console.log(response);

        if (response.movie) {
            document.getElementById('container').innerHTML = `La Película ${JSON.stringify(response.movie.title)} ha sido modificada`
        } else {
            document.getElementById('container').innerHTML = JSON.stringify(response.message)
        }

    } catch (error) {
        console.log(error);
    }


}

const deleteMovie = async () => {

    let title = document.getElementById('title').value
    let url = `http://localhost:3000/movie/?title=${title}`

    let options = {
        headers: { "content-type": "application/json; charset=UTF-8" },
        method: 'DELETE'
    }

    let container =  document.getElementById('container')
    container.innerHTML = ''

    try {
        let data = await fetch(url, options)
        let response = await data.json()
        console.log(response);
        document.getElementById('container').innerHTML = `La Película ha sido eliminada`
        
    } catch (error) {
        console.log(error);
    }

}

let showButton = document.getElementById('Show')
showButton.addEventListener('click', showMovie)

let addButton = document.getElementById('Add')
addButton.addEventListener('click', addMovie)

let modifyButton = document.getElementById('Modify')
modifyButton.addEventListener('click', modifyMovie)

let deleteButton = document.getElementById('Delete')
deleteButton.addEventListener('click', deleteMovie)