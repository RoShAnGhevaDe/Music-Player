//  2 - WE create below music variable to control entire music system
const music = new Audio('Songs/1.mp3');

// music.play();

//  2 - WE create above music variable to control entire music system



//3  we create array for song name X20 In this Array every Music stored in form Of { Object }

const songs = [
    {
        id: 1,
        songName: `The Peak <br><div class="subtitle">By SEKAI NO OWARI </div>`,
        poster : "Song Covers/onepiece/1.jpg"
    },
    {
        id: 2,
        songName: `UUUUUS! <br><div class="subtitle">By Hiroshi Kitadani </div>`,
        poster : "Song Covers/onepiece/2.jpg",
    },
    {
        id: 3,
        songName: `Dear Sunrise <br><div class="subtitle">By Maki Otsuki </div>`,
        poster : "Song Covers/onepiece/3.jpg",
    },
    
    {
        id: 4,
        songName: `We Are! <br><div class="subtitle">Song by Hiroshi Kitadani
        </div>`,
        poster : "Song Covers/onepiece/4.jpg",
    },
    
    {
        id: 5,
        songName: `OVER THE TOP <br><div class="subtitle">By Hiroshi Kitadani </div>`,
        poster : "Song Covers/onepiece/5.jpg",
    },
    
    {
        id: 6,
        songName: `PAINT <br><div class="subtitle">By I Don't Like Mondays</div>`,
        poster : "Song Covers/onepiece/6.png",
    },
    
    {
        id: 7,
        songName: `Raise<br><div class="subtitle">By  Chilli Beans</div>`,
        poster : "Song Covers/onepiece/7.jpg",
    },
    
    {
        id: 8,
        songName: `One Day <br><div class="subtitle">By The ROOTLESS</div>`,
        poster : "Song Covers/onepiece/8.jpg",
    },
    
    {
        id: 9,
        songName: ` Hope <br><div class="subtitle">By Namie Amuro</div>`,
        poster : "Song Covers/onepiece/9.jpg",
    },
    
    {
        id: 10,
        songName: `Wake up<br><div class="subtitle">By  AAA</div>`,
        poster : "Song Covers/onepiece/10.jpg",
    },
    
    {
        id: 11,
        songName: `Dekhte Dekhte <br><div class="subtitle">By Atif Aslam</div>`,
        poster : "Song Covers/onepiece/11.jpg",
    },
    
]

//3 above  we create array for song name X20 In this Array every Music stored in form Of { Object } 



/// Step 4 ///////
Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    
  e.getElementsByTagName('img')[0].src = songs[i].poster;
  e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;

});

//////////////////Step 4 Above ./...................//////////////........................



// .....................art..... Step 5 ................................

let masterplay = document.getElementById('masterplay');

let wave = document.getElementById('wave');

masterplay.addEventListener('click' , ()=> {

    if(music.paused || music.currentTime <=0 ) { 
        music.play();

        wave.classList.add('active1');
        

        masterplay.classList.remove('bi-play-fill');
        masterplay.classList.add('bi-pause-fill');
        
    }
    else  {
        music.pause();
        wave.classList.remove('active1');
        
        masterplay.classList.add('bi-play-fill');
        masterplay.classList.remove('bi-pause-fill');

    }

});

const makeAllplays = () =>{
    Array.from(document.getElementsByClassName('playlistplay')).forEach((el)=>{
        el.classList.add('bi-play-circle-fill');
       el.classList.remove('bi-pause-circle-fill');
    })

}

const makeAllBackground = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((el)=>{

        el.style.background = ' rgb(105, 105, 105, .0)';
    })

}



let index = 0;
let poster_play = document.getElementById('poster_play');
let download_music = document.getElementById('download_music');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playlistplay')).forEach((e)=>{

    e.addEventListener('click', (el) => {
        index = el.target.id;
        // console.log(index);
        music.src = `songs/onepiece/${index}.mp3`;
        poster_play.src =`Song Covers/onepiece/${index}.jpg`;
        music.play();
        masterplay.classList.remove('bi-play-fill');
        masterplay.classList.add('bi-pause-fill');
        download_music.href= `Songs/onepiece/${index}.mp3`;
       
        let songTitles = songs.filter((els) => {

            return els.id == index ;

        });

        songTitles.forEach(elss => {
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download', songName);

        });

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = "rgb(105, 105, 105, .1)";
        makeAllplays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
    
    });


})

// Now We are gonna js SeekBar

let starttime = document.getElementById('starttime');
let endtime = document.getElementById('endtime');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    // console.log(music_curr) 
    
    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);
    
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    endtime.innerText = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
     
    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    starttime.innerText = `${min2}:${sec2}`;

    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;
    console.log(seek.value);

    let seekbar = seek.value;
    bar2.style.width =`${seekbar}%`;
    dot.style.left =`${seekbar}%`;

});

seek.addEventListener('change' , ()=> {

    music.currentTime = seek.value * music.duration / 100;
 });

//  Now we are gonna target volume

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar')[0];
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', ()=>{
    if (vol.value == 0){

        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    }
    
    if (vol.value > 0){

        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if (vol.value > 50 ){

        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;

    music.volume = vol_a / 100;


})




// now we are gonna js Next Back 

let back = document.getElementById('back');
let Next = document.getElementById('Next');


back.addEventListener('click', ()=> {

    index -= 1;
    if (index < 1){
        index=Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `Songs/onepiece/${index}.mp3`;
    poster_play.src =`Song Covers/onepiece/${index}.jpg`;
    music.play();
    masterplay.classList.remove('bi-play-fill');
    masterplay.classList.add('bi-pause-fill');

    let songTitles = songs.filter((els) => {

        return els.id == index;

    });

    songTitles.forEach(elss => {
        let { songName } = elss;
        title.innerHTML = songName;


    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');

    // now we are gonna do for next button 


    
    });
     

    Next.addEventListener('click', ()=> {

        index ++;
        if (index > Array.from(document.getElementsByClassName('songItem')).length){
            index = 1;
        }
        music.src = `Songs/onepiece/${index}.mp3`;
        poster_play.src =`Song Covers/onepiece/${index}.jpg`;
        music.play();
        masterplay.classList.remove('bi-play-fill');
        masterplay.classList.add('bi-pause-fill');
    
        let songTitles = songs.filter((els) => {
    
            return els.id == index;
    
        });
        
        songTitles.forEach(elss =>{
            let {songName} = elss;
            title.innerHTML = songName;
    
        });
    
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = "rgb(105, 105, 105, .1)";
        makeAllplays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');


}) 






/////////////////////,................................5..................


//1 we target buttons in below javaScript


let pop_songs_left = document.getElementById('pop_songs_left');
let pop_songs_right = document.getElementById('pop_songs_right');
let pop_songs =document.getElementsByClassName('pop_songs')[0];



pop_songs_right.addEventListener('click', ()=> {

    pop_songs.scrollLeft +=400;


})
pop_songs_left.addEventListener('click', ()=> {

    pop_songs.scrollLeft -=400;


})




let pop_art_left = document.getElementById('pop_art_left');
let pop_art_right = document.getElementById('pop_art_right');
let  art = document.getElementsByClassName('art')[0];

pop_art_right.addEventListener('click', ()=> {

    art.scrollLeft +=330;


});
pop_art_left.addEventListener('click', ()=> {

    art.scrollLeft -=330;


})

// we target buttons in above javaScript





// Now we are gonna Activate Shuffle Button


let shuffle = document.getElementsByClassName('shuffle')[0];

shuffle.addEventListener('click', () =>{


        let a = shuffle.innerHTML;
        
        switch (a) {
            case "next":
                shuffle.classList.add('bi-arrow-repeat');
                shuffle.classList.remove('bi-music-note-beamed');
                shuffle.classList.remove('bi-shuffle');
                shuffle.innerHTML = 'repeat';
                break;

                case "repeat":
                shuffle.classList.remove('bi-arrow-repeat');
                shuffle.classList.remove('bi-music-note-beamed');
                shuffle.classList.add('bi-shuffle');
                shuffle.innerHTML = 'random';
                
                break;

                case "random":
                shuffle.classList.remove('bi-arrow-repeat');
                shuffle.classList.add('bi-music-note-beamed');
                shuffle.classList.remove('bi-shuffle');
                shuffle.innerHTML = 'next';

                break;

        }
    
})


const next_music = () =>{

    if (index == songs.length) {
        index = 1;
    } else {
        index++;
    }
    music.src = `songs/onepiece/${index}.mp3`;
    poster_play.src =`Song Covers/onepiece/${index}.jpg`;
    music.play();
    masterplay.classList.remove('bi-play-fill');
    masterplay.classList.add('bi-pause-fill');
    download_music.href= `songs/onepiece/${index}.mp3`;
   
    let songTitles = songs.filter((els) => {

        return els.id == index ;

    });

    songTitles.forEach(elss => {
        let {songName} = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);

    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}
const repeat_music = () =>{

    index;
    music.src = `songs/onepiece/${index}.mp3`;
    poster_play.src =`Song Covers/onepiece/${index}.jpg`;
    music.play();
    masterplay.classList.remove('bi-play-fill');
    masterplay.classList.add('bi-pause-fill');
    download_music.href= `songs/onepiece/${index}.mp3`;
   
    let songTitles = songs.filter((els) => {

        return els.id == index ;

    });

    songTitles.forEach(elss => {
        let {songName} = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);

    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}
const random_music = () =>{

    if (index == songs.length) {
        index = 1;
    } else {
        index = Math.floor((Math.random()*songs.length)+1);
    }
    music.src = `songs/onepiece/${index}.mp3`;
    poster_play.src =`Song Covers/onepiece/${index}.jpg`;
    music.play();
    masterplay.classList.remove('bi-play-fill');
    masterplay.classList.add('bi-pause-fill');
    download_music.href= `Songs/onepiece/${index}.mp3`;
   
    let songTitles = songs.filter((els) => {

        return els.id == index ;

    });

    songTitles.forEach(elss => {
        let {songName} = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);

    });

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background = "rgb(105, 105, 105, .1)";
    makeAllplays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
    wave.classList.add('active1');
}

music.addEventListener('ended', ()=> {
   
    let b = shuffle.innerHTML;

    switch (b) {
        case 'repeat':
            repeat_music();
            
            break;
            case 'next':
                next_music();


            break;
            case 'random':
                random_music();

    
  
            break;
    }

})