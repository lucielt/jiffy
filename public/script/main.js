const API_KEY = 'PNPPXukhULZqolZP2pufKUUu60u2hNyH'


const randomChoice = arr => {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex]
}

function createVideo (src) {

    const video = document.createElement('video');
    video.src = src
    video.autoplay = true
    video.loop = true

    video.className = 'video'
    console.log(video);
    // return to ask the function to give something back
    return video
}


const searchGiphy = searchTerms => {
    console.log('search for ', searchTerms)
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerms}&limit=50&offset=0&rating=PG-13&lang=fr`)
        .then(response => {
            // Convert to JSON
            return response.json();
        })
        .then(json => {
            // because one argument parenthèse non nécessaire
            const gif = randomChoice(json.data)
            console.log(json);
            const src = gif.images.original.mp4
            console.log(src);

            const video = createVideo(src)

            const videosEl = document.querySelector('.videos')
            videosEl.appendChild(video)
        })
        .catch(error => {
            //catch something in case fetch fail
        })

}


const searchEl = document.querySelector('.search-input')
const hintEl = document.querySelector('.search-hint')
// separate keyUp function
const doSearch = event => {
    searchTerms = searchEl.value
    // set search-hint to show when searchTerms > 2
    if(searchTerms.length > 2){
        hintEl.innerHTML = `Hit enter to search ${searchTerms}`
        document.body.classList.add('show-hint')
    } else{
        document.body.classList.remove('show-hint')
    }

    //search term >= 2
    // only when key enter is pressed
    console.log(event)
    console.log(searchTerms)
    if(event.key === 'Enter' && searchTerms.length > 2){

        searchGiphy(searchTerms)

    }
}

searchEl.addEventListener('keyup', doSearch)





/*
searchEl.addEventListener('keyup', () => {
    console.log(searchEl.value)
})*/
