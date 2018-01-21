const API_KEY = 'PNPPXukhULZqolZP2pufKUUu60u2hNyH'

const searchEl = document.querySelector('.search-input')
const hintEl = document.querySelector('.search-hint')
const videosEl = document.querySelector('.videos')
const clearEl = document.querySelector('.search-clear')

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


// on search loading spinner
// successfull = loading hint to say 'see more'
// on fail = error
const toggleLoading = state => {
    console.log('loading', state)

    if (state) {
        document.body.classList.add('loading')
        searchEl.disabled = true
    } else {
        document.body.classList.remove('loading')
        searchEl.disabled = false
        searchEl.focus()
    }
}

const searchGiphy = searchTerms => {
    console.log('search for ', searchTerms)

    toggleLoading(true)

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

            videosEl.appendChild(video)

            video.addEventListener('loadeddata', event => {

                video.classList.add('visible')

                toggleLoading(false)

                document.body.classList.add('has-results')

                hintEl.innerHTML = `hit enter to search more ${searchTerms}`

            })

        })
        .catch(error => {
            //catch something in case fetch fail
            console.log('fail')
            toggleLoading(false)
            hintEl.innerHTML = `Nothing found for ${searchTerms}`
            searchEl.value = ""

        })
}

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

const clearSearch = event => {
    document.body.classList.remove('has-results')
    videosEl.innerHTML = ""
    hintEl.innerHTML = ""
    searchEl.value = ""
    // focus the cursor back on input
    searchEl.focus()
}

document.addEventListener('keyup', event => {
    if(event.key === 'Escape'){
        clearSearch()
    }
})

searchEl.addEventListener('keyup', doSearch)
clearEl.addEventListener('click', clearSearch)
