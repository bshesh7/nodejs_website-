

$.getJSON("https://api.ipgeolocation.io/astronomy?apiKey=876e2dc0a8624653a7d243e0cb8e1257&ip=24.27.51.26&lang=cn", function (data) {
    console.log(data);
    var Moon_rise = data.moonrise;
    $('.moonrise').attr('value',Moon_rise);

});