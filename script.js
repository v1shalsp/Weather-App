// API
const apiKey = "09b43cf1965a9be8b7c1b75c3e9543aa";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        async function getWeatherData(city) {
            const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);

            if (response.status == 404){
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
                }
            else {
                var data = await response.json();
                console.log(data);

                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
                document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
                document.querySelector(".wind").innerHTML = data.wind.speed + 'km/h';

                if(data.weather[0].main == "Clouds")
                    weatherIcon.src = "Icons/clouds.png";
                else if(data.weather[0].main == "Clear")
                    weatherIcon.src = "Icons/clear.png";
                else if(data.weather[0].main == "Rain")
                    weatherIcon.src = "Icons/rain.png";
                else if(data.weather[0].main == "Drizzle")
                    weatherIcon.src = "Icons/drizzle.png";
                else if(data.weather[0].main == "Mist")
                    weatherIcon.src = "Icons/mist.png";

                document.querySelector(".weather").style.display = "block";
                document.querySelector(".error").style.display = "none";
                }
        }

        searchBtn.addEventListener("click", ()=>{
            getWeatherData(searchBox.value);
            Notification.requestPermission().then(perm=>{
                if(perm == "granted")
                    new Notification("Weather App Pro", {
                        body: "Thank for using the app.",
                        icon: "Icons/clouds.png"  
                    })
            })
            })

        searchBox.addEventListener("keydown", event=>{
            if (event.key == "Enter"){
                getWeatherData(searchBox.value);
                Notification.requestPermission().then(perm=>{
                    if(perm == "granted")
                        new Notification("Weather App Pro", {
                            body: "Thank for using the app.",
                            icon: "Icons/clouds.png"  
                        })
                })
            }
            })
/*
//Notification
const notifBtn = document.querySelector(".notification button");
notifBtn.addEventListener("click", ()=>{
    Notification.requestPermission().then(perm=>{
        if(perm == "granted")
            new Notification("Weather App", {
                body: "You will now receive notifications from this app.",
                icon: "Icons/clouds.png"  
            })
    })
})
*/


