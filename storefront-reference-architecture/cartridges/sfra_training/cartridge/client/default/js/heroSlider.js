let slides = document.querySelectorAll('.asset');
    
    for (let index = 1; index < slides.length; index++) {
        slides[index].style.display = "none";
    }

    function currentSlide(n) {
        for (let index = 0; index < slides.length; index++) {
            if(n == index){
                slides[index].style.display = "block";
                continue;
            }
                slides[index].style.display = "none";
        }
    }