const app = () => {


    // Visual elements
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video')

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');


    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button')

    //Get the length of outline
    const outlineLength = outline.getTotalLength();

    //Duration
    let fakeDuration = 60;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Pick different sounds

    sounds.forEach(sound=> {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            play.src = './svg/play.svg'
            checkPlaying(song);
        })
    })

    //Play Sound/Video
    play.addEventListener('click', () => {
        checkPlaying(song);
        }
    );

    //Select Sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration % 60)}0`
        })
    })

    // Stop and play sounds and change icons

    const checkPlaying = song => {
        if(song.paused){
        song.play();
        video.play();
        play.src = "./svg/pause.svg"
    } else {
        song.pause();
        video.pause();
        play.src='./svg/play.svg'
    }
};

    // Animate circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animate the text and handle edge cases of time display
        if(seconds === 0){
            seconds = seconds + '0'
            timeDisplay.textContent=`${minutes}:${seconds}`
        } else if(seconds < 10){
            seconds = '0' + seconds
            timeDisplay.textContent=`${minutes}:${seconds}`
        } else{
        timeDisplay.textContent=`${minutes}:${seconds}`}

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'
            video.pause();
        }
    };

// To preload duration in with 1 minute
timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration % 60)}0`    
    
};

app();