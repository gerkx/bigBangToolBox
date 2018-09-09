function createOverlays(str) {
    const seq = app.project.activeSequence;
    const markers = markersToArray(seq.markers);



    var filterString = "";
    if (Folder.fs === 'Windows'){
        filterString = "Motion Graphics Templates:*.mogrt";
    }
    var mogrtToImport = File.openDialog (
        "Choose a template file", // title
        filterString,  // filter available files? 
        false
    );	

    if (mogrtToImport){
        var targetTime = markers[0].start;
        var vidTrackOffset = 1;
        var audTrackOffset = 0;
        var newTrackItem = seq.importMGT(	
            mogrtToImport.fsName, 
            targetTime.ticks, 
            vidTrackOffset,
            audTrackOffset
        );

        if (newTrackItem){
            newTrackItem.end = markers[1].start;
            var moComp = newTrackItem.getMGTComponent();
            if (moComp){
                var params = moComp.properties;
                var srcTextParam = params.getParamForDisplayName("txt");
                if (srcTextParam){
                    var val	= srcTextParam.getValue();
                    srcTextParam.setValue(str);
                }
            }
        }
    }

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