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
    this.markCurrentlyPlayed;
    this.videoDuration;
    this.videoElement = this.createVideoElement(videoPath, videoFormat);
  }

  /*
    Create a new section and push it to the marksArray
      - markStart : beggining point of a video section
      - markEnd : ending point of a video section. By default the end of the video
      - markLabel : Given label to the marked section
      - markIndex : index of the section
      - markLevel : hierarchy level. by default is equal to one, the higher level.
  */
  pushMarker(start, label, index, end = this.videoElement.duration, level = 1) {
    this.marksArray.push({
      markStart: this.toSeconds(start),
      markEnd: end == this.videoElement.duration ? end : this.toSeconds(end),
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
    this.marksArray.forEach(mark => {
      if(mark.markLevel == 1) {
        let li = document.createElement("li");
        li.setAttribute("class", "mv-marker");
        let button = document.createElement("button");
        button.innerText = mark.markLabel;
        button.addEventListener('click', function() {
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
    element.appendChild(playButton);
  }

  generatePlay(){
    //creating the play button
    let playButton = document.createElement("button");
    let self = this;
    let video = this.videoElement;
    let isPlaying = false;
    playButton.innerText = "Play"
    self.markCurrentlyPlayed = 0;
    playButton.addEventListener("click", function() {
      if( isPlaying ){
        video.pause();
        isPlaying = false;
        playButton.innerText = "Play";
        self.goTo(self.marksArray[self.markCurrentlyPlayed].markStart);
      } else {
        video.play();
        isPlaying = true;
        playButton.innerText = "Pause";
      }
    })
    return playButton
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

}
