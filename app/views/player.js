//
import {MarkedVid} from '/lib/videoMarker/MarkedVid.js';

//Creating player page container (w/ id)
let player = document.createElement("div");
player.setAttribute("id","playerContainer");

//Creating a MarkedVid instance
let markedVid = new MarkedVid("/media/module_1/test.mp4", "mp4");

//Pushing markers
markedVid.pushMarker("00:00","Debut");
markedVid.pushMarker("00:29","Contexte");
markedVid.pushMarker("01:35","Axe Hierarchique");

//Creating a container for video player, buttons and mark list
let vidContainer = document.createElement("div");
vidContainer.setAttribute("id","videoContainer");
player.appendChild(vidContainer);

let markListContainer = document.createElement("div");
markListContainer.setAttribute("id","markListContainer");
player.appendChild(markListContainer);

//Generating the video player
markedVid.generateVideoPlayer(vidContainer);

//Generating marks's list
console.log(markedVid.marksArray);
markedVid.generateMarkerList(markListContainer);


//end of file
if (player.innerHTML == null || player.innerHTML == ""){
  player.innerHTML = `<p> pas de vidéo à afficher </p>`
}
export {player};
