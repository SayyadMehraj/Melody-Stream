console.log("Welcome to a new Project")

//Setting up the variables
let songIndex = 0
let audioElement = new Audio('songs/1.mp3');
let masterPlayBtn = document.getElementById('masterPlay')
let backBtn = document.getElementById('previous')
let forwardBtn = document.getElementById('next')
let progressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'))
let songPlay = Array.from(document.getElementsByClassName('songPlay'))
let songTitle = document.getElementById('songTitle')

//Adding the info of the Songs 
const songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",duration:"3.48"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg",duration:"2.34"},
    {songName: "DEAF KEV - Invincible [NCS Release]", filePath: "songs/3.mp3", coverPath: "covers/3.jpg",duration:"4.34"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg",duration:"4.28"},
]

//It is used to update songsName and the coverpage
songItems.forEach((element,i) => {
    element.getElementsByTagName('img')[0].src=songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName
    element.getElementsByClassName('timeStamp')[0].innerHTML=`${songs[i].duration}<i id=0 class="far songPlay fa-2x fa-play-circle"></i>` 
    // element.getElementsByClassName('timeStamp')[0].innerText=songs[i].duration 
})

//Functions
const play = () => {
    masterPlayBtn.classList.remove('fa-play-circle')
    masterPlayBtn.classList.add('fa-pause-circle')
    songTitle.innerText = songs[songIndex].songName
    gif.style.opacity=1
}

const pause = () => {
    masterPlayBtn.classList.remove('fa-pause-circle')
    masterPlayBtn.classList.add('fa-play-circle')
    songTitle.innerText = songs[songIndex].songName
    gif.style.opacity=0
}

const songWork = () => {
    audioElement.currentTime=0
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.play()
    songTitle.innerText = songs[songIndex].songName
}

//Setting up the Event Listeners

//This is used to play and pause music
masterPlayBtn.addEventListener('click',() => {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        play()

    }else{
        audioElement.pause()
        pause()
    }
})

//This is used to update progressBar
audioElement.addEventListener('timeupdate',() => {
    let progressLine = ((audioElement.currentTime/audioElement.duration)*100)
    progressBar.value=progressLine
})

progressBar.addEventListener('change',() => {
    audioElement.currentTime = ((progressBar.value * audioElement.duration)/ 100);
})

backBtn.addEventListener('click',() => {
    console.log('back')
    if(songIndex<=0){
        songIndex=0
    }else{
        songIndex-=1
    }
    songWork()
    play()
})

forwardBtn.addEventListener('click',() => {
    console.log('forward')
    if(songIndex>=3){
        songIndex=0
    }else{
        songIndex+=1
    }
    play()
    songWork()
})

const makeAllPlay = () => {
    songPlay.forEach((element) => {
        element.classList.add("fa-pause-circle")
        element.classList.add("fa-play-circle")
    })
}

songPlay.forEach((element) => {
    element.addEventListener('click',(e) => {
        makeAllPlay()
        songIndex = parseInt(e.target.id)
        play()
        songWork()
        gif.style.opacity=1
        play()
})
})