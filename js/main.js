let requestURL = 'https://swapi.dev/api/people/?page=1';


function sendRequest(method, url){
    return fetch(url).then(response => {
        return response.json()
    })
}

function sendRequestDetails(method, url){
    return fetch(url).then(response => {
        return response.json()
    })
}

function People(data, count){
    this.name = data.results[count].name
    this.birth = data.results[count].birth_year
    this.gender = data.results[count].gender
    this.homeworld = homewordSearch('GET', data.results[count].homeworld)
    this.films = filmsSearch('GET', data.results[count].films)
}

async function homewordSearch(method, data){
    let planet = await sendRequestDetails(method, data)
    .then(details => {return details.name})
    .catch(err => console.log(err));
    return planet
}

async function filmsSearch(method, data){
    this.films
    let filmsArray = []
    for(let countFilm = 0; countFilm < data.length; countFilm++){
        films = await sendRequestDetails(method, data[countFilm])
        .then(details => {filmsArray.push(details.title);return filmsArray})
        .catch(err => console.log(err));
    }
    //console.log(filmsArray)
    return filmsArray
}

function mainRequest(method, url){
    sendRequest(method, url)
        .then(data => peopleSet(data))
        .catch(err => console.log(err))

    function peopleSet(data){
        console.log(data)
        for(let count = 0; count < 10; count++){
            let people = new People(data, count)
            peopleCreate(people)
            console.log(people)
        }
        
        setTimeout(function(){
            var swiper = new Swiper('.swiper-container', {
                navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                },
            });
        },5000)
    }

    async function peopleCreate(people){
        let newSlide = document.createElement('div')
        newSlide.innerHTML = `<h2>${people.name}</h2>
                                <p>${people.gender}</p>
                                <p>${await people.homeworld}</p>`
        this.filmsList = await people.films
        filmsList.forEach(film => {
            newSlide.innerHTML = newSlide.innerHTML + `<p>${film}</p>`
        });
        newSlide.classList.add('swiper-slide')
        document.querySelector('.swiper-wrapper').appendChild(newSlide);
    }

    this.remove = function(elementClass) {
        let swiperStart = document.querySelector('.swiper-wrapper')
        swiperStart.style.transform = 'translate3d(0px, 0px, 0px)';
        let element = document.getElementsByClassName(elementClass);
        while (element.length) {
          element[0].parentNode.removeChild(element[0]);
        }
      }
}


(function buttonsManage(){
    this.buttonNext = document.querySelector('.buttonNext')
    this.buttonPrevious = document.querySelector('.buttonPrevious')
    this.pageCount = 1

    buttonNext.addEventListener('click',function(){
        if(pageCount < 7){pageCount++}
        remove('swiper-slide')
        mainRequest('GET', `https://swapi.dev/api/people/?page=${pageCount}`)
    })

    buttonPrevious.addEventListener('click',function(){
        if(pageCount > 1){pageCount--}
        remove('swiper-slide')
        mainRequest('GET', `https://swapi.dev/api/people/?page=${pageCount}`)
    })
})()



mainRequest('GET', requestURL)















