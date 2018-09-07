function createOverlays() {
    const seq = app.project.activeSequence;
    const markers = markersToArray(seq.markers);


    var filterString = "";
    if (Folder.fs === 'Windows'){
        filterString = "Motion Graphics Templates:*.mogrt";
    }
    var mogrtToImport = File.openDialog (
        "Choose MoGRT", // title
        filterString,  // filter available files? 
        false
    );	
    
    var targetTime = markers[0].start;
    var vidTrackOffset = 0;
    var audTrackOffset = 0;
    var newTrackItem = seq.importMGT(	
        mogrtToImport.fsName, 
        targetTime.ticks, 
        vidTrackOffset,
        audTrackOffset
    );

    var moComp = newTrackItem.getMGTComponent();
    var params = moComp.properties;
    var srcTextParam = params.getParamForDisplayName("Source Text");
    var val	= srcTextParam.getValue();
    srcTextParam.setValue("New value set by PProPanel!");
    

}


function markersToArray(markerObject){
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