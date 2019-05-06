// const fs = require('fs-extra');
var parser =  require('xml-js');

const xmlPath = "E:\\Dropbox (BigBangBoxSL)\\PROYECTOS\\My preschool monster serie\\PRODUCCION\\Story\\EPISODIOS\\Sustos\\video\\SUSTOS_XML\\MM_26_Sustos_Rv1.xml" 




function parseXML(xml){
    // const xml = fs.readFileSync(xmlPath, 'utf8');
    const storyOBJ = JSON.parse(
        parser.xml2json(xml, {
            compact: true, spaces: 4
        })
    );

    const shotList = storyOBJ.xmeml.sequence.media.video.track.clipitem
        .reduce( (acc, shot) => {
            acc.push({
                name: shot.name._text,
                dur: shot.duration._text,
                in: shot.in._text,
                out: shot.out._text,
                start: shot.start._text,
                end: shot.end._text,
            })
            return acc
        }, []);

    const audioList = storyOBJ.xmeml.sequence.media.audio.track
        .filter( (track, idx) => {
            return idx % 2 === 0})
        .map((track, idx) => {
            let arr = [];
            track.clipitem.forEach(clip => {
                arr.push({
                    name: clip.file.name._text,
                    path: clip.file.pathurl._text,
                    in: clip.in._text,
                    out: clip.out._text,
                    start: clip.start._text,
                    end: clip.end._text,
                    dur: clip.end._text - clip.start._text})
            })
            return arr
        });
    return {
        shotList: shotList,
        audioList: audioList,
        // animatic: animaticPath
    }
}

module.exports = parseXML