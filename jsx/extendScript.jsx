function createOverlays(str) {
    var seq = app.project.activeSequence;
    var markers = markersToArray(seq.markers);
    var relMarkers = relativeMarkers(seq, markers);
    alert(seq.getOutPointAsTime())

    var filterString = "";
    if (Folder.fs === 'Windows'){
        filterString = "Motion Graphics Templates:*.mogrt";
    }

    var mogrtToImport = File.openDialog (
        "Choose a template file", // title
        filterString,  // filter available files
        false
    );	
            
    for (var i = 0; i < relMarkers.length; i++) {
        if (mogrtToImport) {
            var shot = str + padZero((1+i)*10, 4);
            var targetTime = relMarkers[i].start;
            var vidTrackOffset = 1;
            var audTrackOffset = 0;
            var newTrackItem = seq.importMGT(	
                mogrtToImport.fsName, 
                targetTime.ticks, 
                vidTrackOffset,
                audTrackOffset
            );
            if (newTrackItem){
                (i == relMarkers.length -1 ) 
                    ? newTrackItem.end = seq.getOutPointAsTime()
                    : newTrackItem.end = relMarkers[i + 1].start;
                var moComp = newTrackItem.getMGTComponent();
                var params = moComp.properties;
                if (moComp) { 
                    var srcTextParam = params.getParamForDisplayName("txt");
                    if (srcTextParam) srcTextParam.setValue(shot);
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

function relativeMarkers(seq, markers) {
    var inPoint = seq.getInPoint();
    var outPoint = seq.getOutPoint();

    var beforeIn = [];
    var afterOut = [];

    for (var i = 0; i < markers.length; i ++) {
        if (markers[i].start.seconds < inPoint) beforeIn.unshift(i);
        if (markers[i].start.seconds > outPoint) afterOut.push(i);
    }

    var sliceStart = beforeIn[0] + 1;
    var sliceEnd = afterOut[0];
    var relevantMarkers = markers.slice(sliceStart, sliceEnd);

    return relevantMarkers
  }