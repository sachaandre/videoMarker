class Division{
  videoElement;
  sequenceList = [];
  title;

  constructor(vidEl, title){
    this.videoElement = vidEl;
    this.title = title;
  }

  get videoElementURL(){
    return this.videoElement;
  }

  get title(){
    return this.title;
  }
}

export { Division };
