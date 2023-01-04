// const { query } = require("express");

const auth_link = 'https://www.strava.com/oauth/token'

const getActivities = async (token) => {

  
    
    try {
        let before = Date.now()
        console.log(before);
        
        let listActivities = []
        let control = true
        let page = 1
        while (control) {
    
            const url = `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=50&access_token=${token.access_token}`
            let resList = await fetch(url)
            let activities = await resList.json()
            
            if ( !activities.length ) {
                control = false
            } else {
                
                console.log(activities);
                for (let i=0; i < activities.length; i++) {
                    listActivities.push(activities[i])
                }
                
                page++
            }            
        
        }
        
        const container = document.getElementById('container')
    
        listActivities.forEach(activity => {
        container.innerHTML += `
        <div class="card-activity">
            <h2 class="title">${activity.name}</h2>
            <p>Distancia: ${Math.floor(activity.distance)/1000}kms</p>
            <p>Fecha:${activity.start_date}</p>
        </div>    
        `
       });
       
    }
    
    catch (error) {
        console.log(error);
    }    

}

        // const urlPage = `https://www.strava.com/api/v3/activities/${listActivities[29].id}?include_all_efforts=true&access_token=${token.access_token}`
        // let resAct = await fetch(urlPage)
        // let activity = resAct.json()
        // console.log(activity);


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
        let token = await response.json()
        console.log(token);
        getActivities(token)
        
    } catch (error) {
        console.log(error);
    }

}
    
// reAuthorize()

let myActivities = document.getElementById('activities')
myActivities.addEventListener('click', () => {
    reAuthorize()
})

    
const urlCode = 'http://www.strava.com/oauth/authorize?client_id=98933&response_type=code&redirect_uri=http://localhost:5500/exchange_token&approval_prompt=force&scope=activity:read_all'

const refresh = 'https://www.strava.com/oauth/token?client_id=98933&client_secret=1a61cbb41a9f10c6859a77025d19003f18d2d5ed&refresh_token=16a0cd5207d032e23c822042b935cb3dd820f0ff&grant_type=refresh_token'