var vitrine = {

    getData: function (url) {
        fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        }).then(function(response) {
            console.log("response: ", response)
            if(response.ok) {
                response.json().then(function(data){
                    console.log("Data: ", data);
                    console.log("Data typeof: ", typeof data);
                });
            } else {
              console.log('Network response was not ok.');
            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    },
    
    init: function () {
        vitrine.getData("http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X");

    }

    
}

vitrine.init();