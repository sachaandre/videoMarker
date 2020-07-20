/*
  MarkedVid
  This class gives you the needed tools to play a simple video with a set of given markers.
  The set of markers is given in JSON and should be composed of a timeCode (markTime) and a label (markLabel)
  With the class you should be able to :
    - create a nav list of all your markers
    - create nav buttons (prev. marker / next marker / play / pause)
    - allow the user to go back at the beggining of the current marker when pausing the video.
  ****
*/
export class MarkedVid {
  constructor(videoPath, videoFormat) {
    this.marksArray = [];
    this.markCurrentlyPlayed = 0;
    this.videoDuration;
    this.videoElement = this.createVideoElement(videoPath, videoFormat);
    this.returnOnPause = false;
    this.returnOnPauseWatcher = null;
    this.pauseOnMarkEnd = false;
    this.pauseOnMarkEndWatcher = null;
    this.isPlaying = false;
  }

  /*
    Create a new section and push it to the marksArray
      - markStart : beggining point of a video section
      - markEnd : ending point of a video section. By default the end of the video
      - markLabel : Given label to the marked section
      - markIndex : index of the section
      - markLevel : hierarchy level. by default is equal to one, the higher level.
  */
  addMarker(start, label, index, end = this.videoElement.duration, level = 1) {
    this.marksArray.push({
      markStart: this.toSeconds(start),
      markEnd: end == this.videoElement.duration ? end : this.toSeconds(end) + 0.99,
      markLabel: label,
      markIndex: index,
      markLevel: level
    });
  }

  /*
    Generate an HTML navlist that will append to an existing empty container (nav / div / section / aside ...)
  */
  generateMarkerList(element) {
    var self = this;
    //Creating ul element
    let ulElement = document.createElement("ul");
    ulElement.setAttribute("id", "mv-markerlist");
    //creating li + button elements
    this.marksArray.forEach((mark, i) => {
      if(mark.markLevel == 1) {
        let li = document.createElement("li");
        li.setAttribute("class", "mv-marker");
        let button = document.createElement("button");
        button.innerText = mark.markLabel;
        button.addEventListener('click', function() {
          self.markCurrentlyPlayed = i;
          self.goTo(mark.markStart);
        });
        li.appendChild(button);
        ulElement.appendChild(li);
      }
    });

    //Append ul element to given container
    element.appendChild(ulElement);
  }

  /*
    Append the video element to an existing empty container (div / section / aside)
  */
  generateVideoPlayer(element) {
    element.appendChild(this.videoElement);
  }
  /*
    Generate an HTML control bar that will append to an existing empty container (nav / div / section / aside ...)
  */
  generateControlBar(element) {
    let playButton = this.generatePlay();
    let nextButton = this.generateNextMark();
    let prevButton = this.generatePreviousMark();
    element.appendChild(playButton);
    element.appendChild(nextButton);
    element.appendChild(prevButton);
  }

  generatePlay(){
    //creating the play button
    let playButton = document.createElement("button");
    let self = this;
    let video = this.videoElement;
    playButton.innerHTML = "<i class='fas fa-play fa-lg'></i>";
    playButton.setAttribute("id","play-button");
    playButton.addEventListener("click", function() {
      if( self.isPlaying ){
        video.pause();
        if (self.returnOnPause) self.returnToLastMark();
        self.isPlaying = false;
        playButton.innerHTML = "<i class='fas fa-play fa-lg'></i>";
      } else {
        video.play();
        self.isPlaying = true;
        playButton.innerHTML = "<i class='fas fa-pause fa-lg'></i>";
      }
    })
    return playButton
  }

  generateNextMark(){
    let nextButton = document.createElement("button");
    let self = this;
    let video = this.videoElement;
    nextButton.innerHTML = "<i class='fas fa-step-forward fa-lg'></i>"
    nextButton.setAttribute("id","next-button");
    nextButton.addEventListener("click", function(){
      if(self.markCurrentlyPlayed + 1 <= self.marksArray.length - 1){
        self.goTo(self.marksArray[self.markCurrentlyPlayed + 1].markStart);
        self.markCurrentlyPlayed++;
      }
    })
    return nextButton;
  }

  generatePreviousMark(){
    let prevButton = document.createElement("button");
    let self = this;
    let video = this.videoElement;
    prevButton.innerHTML = "<i class='fas fa-step-backward fa-lg'></i>"
    prevButton.setAttribute("id","prev-button");
    prevButton.addEventListener("click", function(){
      if(self.markCurrentlyPlayed - 1 >= 0){
        self.goTo(self.marksArray[self.markCurrentlyPlayed - 1].markStart);
        self.markCurrentlyPlayed--;
      }
    })
    return prevButton;
  }
  /*
    Create a video html element with correct path and format
  */
  createVideoElement(path, format){
    let videoDOM = document.createElement("video");
    videoDOM.src = path;
    videoDOM.format = "video/" + format;
    return videoDOM;
  }

  /*
    Set the video time to given Seconds value
  */
  goTo(markTimeToSec) {
    this.videoElement.currentTime = markTimeToSec;
  }

  /*
    Convert a string with one of the following format : "hh:mm:ss" or "mm:ss" to seconds
  */
  toSeconds(markTime) {
    let timeTable = markTime.split(":");
    let seconds = 0;
    if (timeTable.length == 2) seconds = (+timeTable[0]) * 60 + (+timeTable[1]);
    if (timeTable.length == 3) seconds = (+timeTable[0]) * 60 * 60 + (+timeTable[1]) * 60 + (+timeTable[2]);
    //
    return seconds;
  }

  //******************************************************
  //**  RETURN ON PAUSE FUNCTIONNALITY
  //*****************************************************/
  /*
    Toggle the Return on Pause option.
    The return on pause let the user go back to the beggining of the last marker read when pausing the video.
  */
  toggleReturnOnPause(element){
    let self = this;
    this.returnOnPause = this.returnOnPause ? false : true;
    element.innerText = this.returnOnPause ? "Deactivate return on pause" : "Activate return on pause";
    if (this.returnOnPause){
      this.startReturnOnPauseWatcher()
    } else {
      this.stopReturnOnPauseWatcher()
    }
  }

  startReturnOnPauseWatcher(){
    let self = this;
    this.returnOnPauseWatcher = setInterval(function(){
      let res = self.marksArray.findIndex(mark => mark.markStart == self.videoElement.currentTime.toFixed(0));
      // If findIndex found something (different from -1) then assign it
      if (res != -1) self.markCurrentlyPlayed = res;
    }, 500);
  }

  stopReturnOnPauseWatcher(){
    clearInterval(this.returnOnPauseWatcher);
  }

  returnToLastMark(){
    this.goTo(this.marksArray[this.markCurrentlyPlayed].markStart);
  }

  /*******************************************************
    PAUSE ON MARKER END FUNCTIONNALITY
  *******************************************************/
  togglePauseOnMarker(element){
    let self = this;
    this.pauseOnMarkEnd = this.pauseOnMarkEnd ? false : true;
    element.innerText = this.pauseOnMarkEnd ? "Deactivate Pause at End Of Mark" : "Activate Pause at End Of Mark";
    if (this.pauseOnMarkEnd){
      this.startPauseOnMarkerWatcher();
    } else {
      this.stopReturnOnPauseWatcher();
    }
  }

  startPauseOnMarkerWatcher(){
    let self = this;
    this.pauseOnMarkEndWatcher = setInterval(function(){
      if (self.videoElement.currentTime.toFixed(2) == self.marksArray[self.markCurrentlyPlayed].markEnd) {
        self.videoElement.pause();
        self.isPlaying = false;
        document.getElementById("play-button").innerHTML = "<i class='fas fa-play fa-lg'></i>";
      } ;
    })
  }

  stopPauseOnMarkerWatcher(){
    clearInterval(this.pauseOnMarkEndWatcher);
  }

}
