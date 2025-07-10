let songIndex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songitem = Array.from(document.getElementsByClassName('songitem'));

let songs = [
//     {songName: , filePath: "1.mp3", coverPath: "logo.jpg"},
//     {songName: "Cielo - Huma-Huma", filePath: "2.mp3", coverPath: "logo.jpg"},
//     {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "3.mp3", coverPath: "logo.jpg"},
//     {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "4.mp3", coverPath: "logo.jpg"},
//     {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "5.mp3", coverPath: "logo.jpg"},

    {songName: "Cielo - Huma-Huma", filePath: "1.mp3 ", coverPath: "logo.jpg"},
    {songName:  "Warriyo - Mortals [NCS Release]", filePath: "2.mp3 ", coverPath: "logo1.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "3.mp3 ", coverPath: "logo2.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "4.mp3 ", coverPath: "logo3.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "5.mp3 ", coverPath: "image.jpg"},
]

// initializer check however with different logos to check if it probably works 
songitem.forEach((element,i) => {
    element.getElementsByClassName("songimg")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
})


// Handle play/pause click-------|| audioElement.currentTime<=0

//simple play/pause works checked
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}) 

//update seekbar 
// checked works but weird bug timeline jumps to mid and then back to 0 when switching songs

audioElement.addEventListener("timeupdate", ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", ()=>{
    audioElement.currentTime= myProgressBar.value * audioElement.duration/100;
})
// play pause from menu
// play works checked
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


// not working doesnt update the song name and does not update new song to play probable error in song index check e.target
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        console.log(songIndex);
        console.log(e);
        audioElement.src = `${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        myProgressBar.value = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
// next - works checked 
document.getElementById("next").addEventListener("click", ()=>{
    if(songIndex>=4){
        songIndex=0;// reset to initial song 
    }else{
        songIndex+=1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");

})
// prev works checked
document.getElementById("previous").addEventListener("click", ()=>{
    if(songIndex==0){
        songIndex=4;// reset to initial song 
    }else{
        songIndex-=1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})