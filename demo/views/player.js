//
import {MarkedVid} from '../../src/index.js';

//Creating player page container (w/ id)
export let player = document.createElement("div");
player.setAttribute("id","playerContainer");

//Generating after changing page
function generatePlayerPage(){
  let player = document.getElementById("playerContainer");
  //Creating a MarkedVid instance
  let markedVid = new MarkedVid("/media/module_1/test.mp4", "mp4");

  //Creating a container for video player, buttons and mark list
  let vidContainer = document.createElement("div");
  vidContainer.setAttribute("id","videoContainer");
  player.appendChild(vidContainer);

  let controllerContainer = document.createElement("div");
  controllerContainer.setAttribute("id","controllerContainer");
  player.appendChild(controllerContainer);

  let markListContainer = document.createElement("div");
  markListContainer.setAttribute("id","markListContainer");
  player.appendChild(markListContainer);

  //Generating the video player
  markedVid.generateVideoPlayer(vidContainer);

  //Generating control bar
  markedVid.generateControlBar(controllerContainer);



  //Pushing markers
  markedVid.videoElement.addEventListener("loadeddata", function(){
    markedVid.pushMarker("00:00","Debut",0,"00:28");
    markedVid.pushMarker("00:29","Contexte",1,"00:34");
    markedVid.pushMarker("01:35","Axe Hierarchique",2);

    //Generating marks's list
    markedVid.generateMarkerList(markListContainer);
  });



}

//end of file
export { generatePlayerPage };
