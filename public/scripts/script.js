
    $(document).ready(function() {
    $('#open_nav').on('click', function() {
        $('#wrapper, #nav').toggleClass('show');
    });
});
    


navigator.geolocation.getCurrentPosition(success, fail);

function success(pos) {
    ajaxRequest(pos.coords.latitude, pos.coords.longitude);
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    $('#loc').text(`latitude：${lat} longitude：${lng}`);
    $('#accuracy').text(accuracy);
}

function fail(error) {
    alert('Failed to get the location information.Error code：' + error.code);
}


function utcToJSTime(utcTime) {
    return utcTime * 1000;
}

function ajaxRequest(lat, long) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const appId = 'f0085f043802580d14205b92e34129e1';

    $.ajax({
        url: url,
        data: {
            appid: appId,
            lat: lat,
            lon: long,
            units: 'metric',
            lang: 'ja'
        }
    })
    .done(function(data){
        $('#place').text(data.city.name + ', ' + data.city.country);

        data.list.forEach(function(forecast, index) {
            const dateTime = new Date(utcToJSTime(forecast.dt));
            const month = dateTime.getMonth() + 1;
            const date = dateTime.getDate();
            const hours = dateTime.getHours();
            const min = String(dateTime.getMinutes()).padStart(2, '0');
            const temperature = Math.round(forecast.main.temp);
            const description = forecast.weather[0].description;
            const iconPath = `images/${forecast.weather[0].icon}.svg`;

            if(index === 0) {
                const currentWeather = `
                <div class="icon"><img src="${iconPath}"></div>
                <div class="info">
                    <p>
                        <span class="description">現在の天気：${description}</span>
                        <span class="temp">${temperature}</span>°C
                    </p>
                </div>`;
                $('#weather').html(currentWeather);
            } else {
                const tableRow = `
                <tr>
                    <td class="info">
                        ${month}/${date} ${hours}:${min}
                    </td>
                    <td class="icon"><img src="${iconPath}"></td>
                    <td><span class="description">${description}</span></td>
                    <td><span class="temp">${temperature}°C</span></td>
                </tr>`;
                $('#forecast').append(tableRow);
            }
        });
    })
    .fail(function() {
        console.log('$.ajax failed!');
    })
}

