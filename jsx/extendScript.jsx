  function getTrk() {
    var seq = app.project.activeSequence;
    return seq.videoTracks.numTracks;
}


function createOverlays(str) {
    var prog = str.prog;
    var season = padZero(str.season, 2);
    var epi = padZero(str.epi, 2);
    var seasonEpi = "S"+season+"E"+epi;
    
    var seq = app.project.activeSequence;
    var markers = markersToObj(seq.markers);
    var relMarkers = relevantMarkers(seq, markers);

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
            var mk = relMarkers[i];
            var us = "_";
            var sqNum = (parseInt((mk.shot)/10) + 1) * 10;
            var sq = "SQ"+padZero(sqNum, 4);
            var shotNum = "SH"+padZero(mk.shot*10, 4);
            var shot = prog + us + seasonEpi + us + sq + us + shotNum;
            var targetTime = mk.start;
            var vidTrackOffset = str.track -1;
            var audTrackOffset = 0;
            var newTrackItem = seq.importMGT(	
                mogrtToImport.fsName, 
                targetTime.ticks, 
                vidTrackOffset,
                audTrackOffset
            );
            if (newTrackItem){
                newTrackItem.end = mk.end;

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
    var prog = str.prog;
    var season = padZero(str.season, 2);
    var epi = padZero(str.epi, 2);
    var seasonEpi = "S"+season+"E"+epi;

    app.enableQE(); 
    app.encoder.setSidecarXMPEnabled(0);
    app.encoder.setEmbeddedXMPEnabled(0);                        
    var activeSequence = qe.project.getActiveSequence();
    var seq = app.project.activeSequence;

    var markers = markersToObj(seq.markers);
    var relMarkers = relevantMarkers(seq, markers);

    var origIn = seq.getInPointAsTime();
    var origOut = seq.getOutPointAsTime();
    
    // var outputPresetPath = "C:\\Users\\ptger\\Documents\\Adobe\\Adobe Media Encoder\\12.0\\Presets\\QT_DNxHD_SQ.epr"
    var outputPresetPath = "C:\\Users\\ptger\\Documents\\Adobe\\Adobe Media Encoder\\13.0\\Presets\\Apple ProRes Proxy multiCanal.epr"
    var outputPath  = Folder.selectDialog("Choose the output directory");

    if (outputPath){
        var outPreset = new File(outputPresetPath);
        if (outPreset.exists === true){
            var outputFormatExtension =	activeSequence.getExportFileExtension(outPreset.fsName);
            if (outputFormatExtension){
                for (var i = 0; i < relMarkers.length; i++) {

                    var mk = relMarkers[i];
                    var us = "_";
                    var sqNum = (parseInt((mk.shot)/10) + 1) * 10;
                    var sq = "SQ"+padZero(sqNum, 4);
                    var shotNum = "SH"+padZero(mk.shot*10, 4);
                    var shot = prog + us + seasonEpi + us + sq + us + shotNum;
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
    // app.encoder.startBatch();
    seq.setInPoint(origIn);
    seq.setOutPoint(origOut);
}

function markersToObj(markerObj) {
    markerArr = markersToArray(markerObj);
    markerLib = [];
    for(var i = 0; i < markerArr.length - 1; i++){
        var obj = {
            shot: i+1,
            start: markerArr[i].start,
            end: markerArr[i + 1].start,
        }
        markerLib.push(obj);
    }
    return markerLib;
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

function relevantMarkers(seq, markers) {
    var inPoint = seq.getInPoint();
    var outPoint = seq.getOutPoint();
    var relMarkers = [];
    for (var i = 0; i < markers.length; i++) {
        var mk = markers[i]
        if (mk.start.seconds >= inPoint && mk.start.seconds < outPoint) {
            relMarkers.push(mk);
        }
    }
    // alert(relMarkers.length);
    return relMarkers
  }