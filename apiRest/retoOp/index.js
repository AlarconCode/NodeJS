

const  showMovie = async () => {

    let title = document.getElementById('titleShow').value
    let url = `http://localhost:3000/movie/?title=${title}`
    let param = {
        headers: { "content-type": "application/json; charset=UTF-8" },
        method: 'GET'
    }

    try {
        let data = await fetch(url, param)
        let result = await data.json()
        console.log(result);
        document.getElementById('main').innerHTML = JSON.stringify(result.movie.title)
    } catch (error) {
        console.log(error);
    }

}