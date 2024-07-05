document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        clearInfos();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e65bc18d30ebf2dcd998b3f418863cdb&units=metric&lang=pt_br`

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windDeg: json.wind.deg
            });
        } else {
            clearInfos();
            showWarning('Localização não encontrada');
        }
    } else {
        clearInfos();
    }
});

function showInfo(json) {
    showWarning('');
   
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').src = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg - 90}deg)`

    document.querySelector('.resultado').style.display = 'block';

}
 
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfos() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none';
}