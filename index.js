const form=document.querySelector('.weather-form');
const cityInput=document.querySelector('.city-input');
const card=document.querySelector('.card');
const API_KEY="72e35f99b0cf5df38a10906abd18fecb";


form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const city=cityInput.value;

    if(city){
        try{
   const weatherData=await getWeatherData(city);
   displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
        }

    }
    else{
        disPlayError('please enter a city')
    }

    


})


async function getWeatherData(city){
const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
 const res=await fetch(apiURL);

 if(!res.ok){
    throw new Error('Could not get the weather data');
 }
  
 return await res.json();

}


function displayWeatherInfo(data){
 const {name:city,
        main:{temp,humidity},
        weather:[{description,Id}]}=data;


        card.textContent='';
        card.style.display="flex";

        const cityDisplay=document.createElement('h1');
        const temperatureDisplay=document.createElement('p');
        const humidityDisplay=document.createElement('p');
        const descDisplay=document.createElement('p');
        const emojiDisplay=document.createElement('p');





        cityDisplay.textContent=city;
        cityDisplay.classList.add('cityDisplay')
        card.appendChild(cityDisplay);

        
        temperatureDisplay.textContent=`${(temp-273.15).toFixed(1)}0C`;
        temperatureDisplay.classList.add('temperatureDisplay');
        card.appendChild(temperatureDisplay);

        humidityDisplay.textContent=`Humidity:${humidity} %`;
        humidityDisplay.classList.add('humidityDisplay');
        card.appendChild(humidityDisplay);

        descDisplay.innerText=description;
        descDisplay.classList.add('descDisplay');
        card.appendChild(descDisplay);

        emojiDisplay.textContent=getWeatherEmoji(Id);
        emojiDisplay.classList.add("emojiDisplay");
        card.appendChild(emojiDisplay);



}



function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId>=200&&weatherId<300):
            return "⛈";
        case(weatherId>=300&&weatherId<400):
            return "🌧";
         case(weatherId>=500&&weatherId<600):
            return "⛈";
        case(weatherId>=600&&weatherId<700):
            return "❄";
        case(weatherId>=700&&weatherId<800):
            return "🌁";
        case(weatherId===800):
            return "☀";
        case(weatherId>=810&&weatherId<810):
            return "☁";
        default:
            return"☁";
            


    }

}

function disPlayError(message){
    const errorDisplay=document.createElement('p');
    errorDisplay.textContent=message;
    errorDisplay.classList.add('errorDisplay')

    card.textContent='';
    card.style.display="flex";
    card.appendChild(errorDisplay);

}
/*
const temperature=document.querySelector('.temperature');
const humidity=document.querySelector('.humidity');
const desc=document.querySelector('.descDisplay');
const emoji=document.querySelector('.emoji');
const errorDisplay=document.querySelector('.errorDisplay');
console.log();*/
