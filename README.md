
*Warning* : This library is still under construction
# introduction.
This library will help you to create HTML5 videos and assign them markers. You will be able to generate some elements like a control bar or a nav list of your markers, and do other stuff with your video (see functionalities below)

## what is a marker ?
A marker is like a sequence or a chapter you define in a video. It has a start, an end, a name and an index. Whith those markers, you will be able to create a table of content of your video, to navigate through them with next and previous buttons.

you can see the demo here : https://sachaandre.github.io/videoMarker/demo/

# how to use videoMarker ?
1. First of all, you'll have to create an instance of MarkedVid, which will contain your video and your markers.
```javascript
let myVideo = new MarkedVid("path/of/video", "video/type");
``` 
You have to pass as parameters :
  - the path of your video
  - the type of your video (mp4, webm...)
  
2. Generate the video HTML element and append it to a div / section or whatever you want it to be attached to.  
  You can attach too the control bar
```javascript
myVideo.generateVideoPlayer(yourHTMLElement);
myVideo.generateControlBar(yourHTMLElement2);
```
 3.Create and add markers to your marker list.  
 ```javascript
 /* 
    method signature
    start : the starting time of the marker
    end : the ending time of the marker, is defined by default as the last second of your video element
    label : the name of your marker
 */
 addMarker(start, label, index, end = this.videoElement.duration, level = 1);
 -----
 myVideo.addMarker("00:00","My first Marker",0,"00:10");
 myVideo.addMarker("00:11","My second Marker",0,"00:10");
 ```
 4. Add the list to your page
 ```javascript
 myVideo.generateMarkerList(youtHTMLElement);
 ```
