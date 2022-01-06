document.getElementById('sample-btn').addEventListener('click',(e) => {
    console.log('Button is clicekd');
    fetch("Test-Ajax")
    .then(function(res){ 
        return res.json();
    })
    .then(function(data) {
        console.log(data.value);
    });
});