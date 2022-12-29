const auth_link = 'https://www.strava.com/oauth/token'

const getActivities = async (access_token) => {
    
    try {
        const url = `https://www.strava.com/api/v3/athlete/activities?access_token=${access_token}`
        let response = await fetch(url)
        let data = await response.json()
        console.log(data);

        const container = document.getElementById('app')
    
        data.forEach(element => {
        container.innerHTML += `<h2>${element.name}<span>  Distancia: ${element.distance}</span></h2>`
    });
     

       } catch (error) {
            console.log(error);
       }
    

    

}


const reAuthorize = async () => {
    
    const auth_link = 'https://www.strava.com/oauth/token'
    
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: '98933',
            client_secret: '1a61cbb41a9f10c6859a77025d19003f18d2d5ed',
            refresh_token: '16a0cd5207d032e23c822042b935cb3dd820f0ff',
            grant_type: 'refresh_token'
        })
    }
    
    try {
        let response = await fetch(auth_link, options)
        let data = await response.json()
        console.log(data);
        let access_token = data.access_token
        getActivities(access_token)
        
    } catch (error) {
        console.log(error);
    }

}
    
reAuthorize()

    
const urlCode = 'http://www.strava.com/oauth/authorize?client_id=98933&response_type=code&redirect_uri=http://localhost:5500/exchange_token&approval_prompt=force&scope=activity:read_all'

const refresh = 'https://www.strava.com/oauth/token?client_id=98933&client_secret=1a61cbb41a9f10c6859a77025d19003f18d2d5ed&refresh_token=16a0cd5207d032e23c822042b935cb3dd820f0ff&grant_type=refresh_token'