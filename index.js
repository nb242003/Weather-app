const weatheForm = document.querySelector(".weather");
const cityName = document.querySelector(".cityinput");
const card = document.querySelector(".con");
const apiKey = 'cdd19c001be4ad162b88908d748b3c47';

weatheForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city=cityName.value;

    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }

    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){

    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response= await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    const {name:city,
         main:{temp,humidity},
         weather:[{description, id}]}=data;

         card.textContent="";
         card.style.display="flex";

         const cityOdaName=document.createElement("h1");
         const tempDisplay=document.createElement("p");
         const humidityDisplay=document.createElement("p");
         const decDisplay=document.createElement("p");
         const emoji=document.createElement("p");  

         cityOdaName.textContent = city;
         tempDisplay.textContent = `${((temp-273.15) *(9/5)+32).toFixed(1)}°F`;
         humidityDisplay.textContent= `Humidity:${humidity}`;
         decDisplay.textContent = description;
         emoji.textContent = getWeatherEmoji(id);

         cityOdaName.classList.add("cityname");
         tempDisplay.classList.add("tempdisp");
         humidityDisplay.classList.add("humiditydisp");
         decDisplay.classList.add("dec");
         emoji.classList.add("emojidisp");


         card.appendChild(cityOdaName);
         card.appendChild(tempDisplay);
         card.appendChild(humidityDisplay);
         card.appendChild(decDisplay);
         card.appendChild(emoji);


}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errordisp");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}