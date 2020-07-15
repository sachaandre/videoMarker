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
      markTime: time,
      markLabel: label
    });
  }

  /*
    Generate an HTML navlist that will append to an existing empty container (nav / div / section / aside ...)
  */
  generateMarkerList(element) {
    //Creating ul element
    let ulElement = document.createElement("ul");
    ulElement.setAttribute("id", "mv-markerlist");
    //Creating li element for each marks in marksArray
    let arr = this.marksArray;
    for (let i=0; i < arr.length; i++) {
      let li = document.createElement("li");
      li.setAttribute("class", "mv-marker");
      li.appendChild(document.createTextNode(arr[i].markLabel));
      li.addEventListener("click", function(){
        console.log("clic");
        //let markToSec = toSeconds(arr[i].markTime);
        //goTo(markToSec);
      });
      ulElement.appendChild(li);
    }
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
  static goTo(markTimeToSec) {
    this.videoElement.currentTime = markTimeToSec;
  }

  /*
    Convert a string with one of the following format : "hh:mm:ss" or "mm:ss" to seconds
  */
  static toSeconds(markTime) {
    let timeTable = markTime.split(":");
    let seconds = 0;
    if (timeTable.length === 3) seconds = (+timeTable[0]) * 60 * 60 + (+timeTable[1]) * 60 + (+timeTable[2]);
    if (timeTable.length === 2) seconds = (+timeTable[1]) * 60 + (+timeTable[2]);
    //
    return seconds;
  }
}
