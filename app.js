
class Weather {
    constructor(city, state) {
        this.apiKey = 'ee67206886fd733872f185aa4d68f5f6';
        this.city = city;
        this.state = state;
    }

    async getWeatherData(){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state},USA&appid=${this.apiKey}`);

        const responseData = await response.json();

        return responseData;
    }

}

class UI {

    paint(){
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;
        const weather = new Weather(city, state);
        weather.getWeatherData()

            .then(res => {
                // console.log(res);
                document.getElementById('w-loc').textContent = res.name + ', ' + document.getElementById('state').value;
                document.getElementById('w-desc').textContent = res.weather[0].description;
                document.getElementById('w-temp').textContent = Math.round(res.main.temp - 273) + `\u00B0`;
                document.getElementById('w-icon').setAttribute('src', `http://openweathermap.org/img/wn/${res.weather[0].icon}@4x.png`);
                document.getElementById('w-humidity').textContent = `Humidity : ${res.main.humidity}%`;
                document.getElementById('w-feels-like').textContent = `Feels Like : ${Math.round(res.main.feels_like - 273)} \u00B0`;
                document.getElementById('w-wind').textContent = `Wind Speed : ${res.wind.speed} mph`;
            })
            .then(res =>{
                document.getElementById('city').value = "";
                document.getElementById('state').value = "";
            })
            .then(res =>{                
                if(document.getElementById('w-desc').textContent === 'broken clouds'){
                    document.getElementById('bgImg').style.background = 'url(/img/cloudy.jpg)';
                } else if
                (document.getElementById('w-desc').textContent === 'raining'){
                    document.getElementById('bgImg').style.background = 'url(/img/raining.jpg)';
                } else if
                (document.getElementById('w-desc').textContent === 'clear sky'){
                    document.getElementById('bgImg').style.background = 'url(/img/clearsky.jpg)';
                }
            })
            .catch(err => console.log(err));

            document.getElementById('showCard').className = `row`;
    }

}

document.getElementById('w-search').addEventListener('click', getData);

function getData(e)
    {
        if(document.getElementById('city').value === "" && document.getElementById('state').value === ""){
            alert('Enter city and state');
        } else
        {
        const newUI = new UI();
        newUI.paint();
        }
    };