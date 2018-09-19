function getTrk() {
    var seq = app.project.activeSequence;
    return seq.videoTracks.numTracks;
}


function createOverlays(str) {
    var seq = app.project.activeSequence;
    var markers = markersToArray(seq.markers);
    var relMarkers = relativeMarkers(seq, markers);

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
            var vidTrackOffset = 4;
            var audTrackOffset = 0;
            var newTrackItem = seq.importMGT(	
                mogrtToImport.fsName, 
                targetTime.ticks, 
                vidTrackOffset,
                audTrackOffset
            );
            if (newTrackItem){
                (i == relMarkers.length - 1) 
                    ? newTrackItem.end = seq.getOutPointAsTime()
                    : newTrackItem.end = relMarkers[i + 1].start;
                var shotDur = Math.round(
                    (newTrackItem.end.seconds - newTrackItem.start.seconds) * 25
                );
                var moComp = newTrackItem.getMGTComponent();
                var params = moComp.properties;
                if (moComp) { 
                    var srcTextParam = params.getParamForDisplayName("txt");
                    var srcDurParam = params.getParamForDisplayName("dur");
                    if (srcTextParam) srcTextParam.setValue(shot);                    
                    if (srcDurParam) srcDurParam.setValue(padZero(shotDur, 3));
                }
            }
        }
    }
}

function getSep() {
    if(Folder.fs == 'Macintosh'){
        return '/';
    }else{
        return '\\';
    }
}


function renderSection(str) {
    app.enableQE(); 

    app.encoder.setSidecarXMPEnabled(0);
    app.encoder.setEmbeddedXMPEnabled(0);
                        
    var activeSequence = qe.project.getActiveSequence();

    var seq = app.project.activeSequence;
    var markers = markersToArray(seq.markers);
    var relMarkers = relativeMarkers(seq, markers);
    var origIn = seq.getInPointAsTime();
    var origOut = seq.getOutPointAsTime();
    
    var outputPresetPath = "C:\\Users\\ptger\\Documents\\Adobe\\Adobe Media Encoder\\12.0\\Presets\\QT_DNxHD_RGB444_10bit.epr"
    // var projPath	= new File(app.project.path);
    var outputPath  = Folder.selectDialog("Choose the output directory");
    // var outputPath  = "C:\\Users\\Hookie\\Downloads\\boop";
    if (outputPath){
        var outPreset = new File(outputPresetPath);
        if (outPreset.exists === true){
            var outputFormatExtension =	activeSequence.getExportFileExtension(outPreset.fsName);
            if (outputFormatExtension){
                for (var i = 0; i < relMarkers.length; i++) {
                    var shot = str + padZero((1+i)*10, 4);
                    var outputFilename = activeSequence.name + '.' + outputFormatExtension;
                    var fullPathToFile = outputPath.fsName + getSep() + shot + "." + outputFormatExtension;
                    
                    var inPt = relMarkers[i].start.ticks;
                    var outPt;
                    
                    (i == relMarkers.length - 1) 
                        ? outPt = origOut.ticks
                        : outPt = relMarkers[i + 1].start.ticks;

                    seq.setInPoint(inPt);
                    seq.setOutPoint(outPt);

                    var jobID = app.encoder.encodeSequence(app.project.activeSequence,
                        fullPathToFile,
                        outPreset.fsName,
                        1, 
                        1);
                    outPreset.close()


                }
            }

        }


    }
    app.encoder.startBatch();
    seq.setInPoint(origIn);
    seq.setOutPoint(origOut);
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

    var sliceStart;
    var sliceEnd;
    (beforeIn.length < 1) ? sliceStart = 0 : sliceStart = beforeIn[0] + 1;
    (afterOut.length < 1) ? sliceEnd = markers.length - 1 : sliceEnd = afterOut[0];


    var relevantMarkers = markers.slice(sliceStart, sliceEnd);

    return relevantMarkers
  }