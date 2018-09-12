function createOverlays(str) {
    const seq = app.project.activeSequence;
    const markers = markersToArray(seq.markers);

    // var inPoint = seq.getInPoint();
    // var outPoint = seq.getOutPoint();
    // var beforeIn = [];
    // var afterOut = [];

    // for (var i = 0; i < markers.length; i ++) {
    //     if (markers[i].start.seconds < inPoint) beforeIn.push(i);
    //     if (markers[i].start.seconds > outPoint) afterOut.push(i);
    // }

    // markers.splice(beforeIn[0], beforeIn.length);
    // markers.splice(afterOut[0], afterOut.length);


    var filterString = "";
    if (Folder.fs === 'Windows'){
        filterString = "Motion Graphics Templates:*.mogrt";
    }
    var mogrtToImport = File.openDialog (
        "Choose a template file", // title
        filterString,  // filter available files? 
        false
    );	
            
    for (var i = 0; i < markers.length-1; i++) {
        var shot = padZero((1+i)*10, 4);
        var itemStr = str + shot;
        if (mogrtToImport) {
            var targetTime = markers[i].start;
            var vidTrackOffset = 1;
            var audTrackOffset = 0;
            var newTrackItem = seq.importMGT(	
                mogrtToImport.fsName, 
                targetTime.ticks, 
                vidTrackOffset,
                audTrackOffset
            );
            if (newTrackItem){
                // alert(markers[i].start.seconds)
                // newTrackItem.start = markers[i].start;
                newTrackItem.end = markers[i + 1].start;
                var moComp = newTrackItem.getMGTComponent();
                var params = moComp.properties;
                if (moComp) { 
                    var srcTextParam = params.getParamForDisplayName("txt");
                    if (srcTextParam) srcTextParam.setValue(itemStr);
                }
            
            }
            
        }
    }

}


function markersToArray(markerObject) {
    var markerArr = [];
    var currMarker;
    for(var i=0; i<markerObject.numMarkers; i++){        
        if(i==0){
            currMarker = markerObject.getFirstMarker();
            markerArr.push(currMarker);
        }else{
            currMarker = markerObject.getNextMarker(currMarker);
            markerArr.push(currMarker);
        }
    }
    return markerArr;
}

function padZero(num, zeros) {
    num = num.toString();
    while(num.length< zeros){
      num = "0" + num;
    }
    return num
  }