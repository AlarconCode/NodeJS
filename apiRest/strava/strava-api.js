const auth_link = 'https://www.strava.com/oauth/token'

const getActivities = async (token) => {

  
    
    try {
        let before = Date.now()
        console.log(before);
        const urlList1 = `https://www.strava.com/api/v3/athlete/activities?before=${Date.parse('2023/1/1')}&page=10&per_page=30&access_token=${token.access_token}`
        let resList = await fetch(urlList1)
        let listActivities = await resList.json()
        console.log(listActivities);


        const urlPage = `https://www.strava.com/api/v3/activities/${listActivities[29].id}?include_all_efforts=true&access_token=${token.access_token}`
        let resAct = await fetch(urlPage)
        let activity = resAct.json()
        console.log(activity);


        const container = document.getElementById('container')
    
        listActivities.forEach(activity => {
        container.innerHTML += `
        <div class="card-activity">
            <h2 class="title">${activity.name}</h2>
            <p>Distancia: ${activity.distance/1000}kms</p>
            <p>Fecha:${activity.start_date}</p>
        </div>    
        `
       });
    }
    
    catch (error) {
        console.log(error);
    }
    
    // try {
    //     let before = new Date(2022,9,10)
    //     console.log(before);
    //     const urlList1 = `https://www.strava.com/api/v3/athlete/activities?before=${before.getTime()}&access_token=${token.access_token}`
    //     let resList = await fetch(urlList1)
    //     let listActivities = await resList.json()
    //     console.log(listActivities);

    //     const container = document.getElementById('app')
    
    //     listActivities.forEach(activity => {
    //     container.innerHTML += `
    //     <h1>Segundo</h1>
    //     <h2>${activity.name}<span>  Distancia: ${activity.distance}</span></h2>
    //     <a href="">ver más</a>
    //     `
    //     });
    // }  catch (error) {
    //     console.log(error);
    // } 

    

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
        let token = await response.json()
        console.log(token);
        getActivities(token)
        
    } catch (error) {
        console.log(error);
    }

}
    
reAuthorize()

    
const urlCode = 'http://www.strava.com/oauth/authorize?client_id=98933&response_type=code&redirect_uri=http://localhost:5500/exchange_token&approval_prompt=force&scope=activity:read_all'

const refresh = 'https://www.strava.com/oauth/token?client_id=98933&client_secret=1a61cbb41a9f10c6859a77025d19003f18d2d5ed&refresh_token=16a0cd5207d032e23c822042b935cb3dd820f0ff&grant_type=refresh_token'