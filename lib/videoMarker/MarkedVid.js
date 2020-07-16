/*
  MarkedVid
  This class gives you the needed tools to play a simple video with a set of given markers.
  The set of markers is given in JSON and should be composed of a timeCode (markTime) and a label (markLabel)
  With the class you should be able to :
    - create a nav list of all your markers
    - create nav buttons (prev. marker / next marker / play / pause)
    - allow the user to go back at the beggining of the current marker when pausing the video.
  ****
  It's based on HTMLMediaElements
*/
export class MarkedVid {
  constructor(videoPath, videoFormat) {
    this.marksArray = [];
    this.videoElement = this.createVideoElement(videoPath, videoFormat);
  }

  /*
    Create / push a new marker with a give time and a given label
  */
  pushMarker(time, label) {
    this.marksArray.push({
      markTime: this.toSeconds(time),
      markLabel: label
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
    this.marksArray.forEach(mark => {
      let li = document.createElement("li");
      li.setAttribute("class", "mv-marker");
      let button = document.createElement("button");
      button.innerText = mark.markLabel;
      button.addEventListener('click', function() {
        self.goTo(mark.markTime);
      });
      li.appendChild(button);
      ulElement.appendChild(li);
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
    //let
  }

  /*
    Create a video html element with correct path and format
  */
  createVideoElement(path, format){
    let videoDOM = document.createElement("video");
    videoDOM.src = path;
    videoDOM.format = "video/" + format;
    videoDOM.setAttribute("controls","controls");
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
