const fs = require('fs');
var parser = require('xml-js');


const xmlPath = "E:\\Dropbox (BigBangBoxSL)\\PROYECTOS\\My preschool monster serie\\PRODUCCION\\Story\\EPISODIOS\\Sustos\\video\\SUSTOS_XML\\MM_26_Sustos_Rv1.xml" 
const jsonPath = "E:\\Dropbox (BigBangBoxSL)\\PROYECTOS\\My preschool monster serie\\PRODUCCION\\Story\\EPISODIOS\\Sustos\\video\\SUSTOS_XML\\MM_26_Sustos_Rv1.json" 
const xml = fs.readFileSync(xmlPath, 'utf8');

const storyJSON = parser.xml2json(xml, {compact: true, spaces: 4});
const storyOBJ = JSON.parse(storyJSON);

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

const audioClips = storyOBJ.xmeml.sequence.media.audio.track
    .filter( (track, idx) => {
        return idx % 2 === 0})
    .map((track, idx) => {
        let arr = [];
        track.clipitem.forEach(clip => {
            arr.push({
                name: clip.name._text,
                in: clip.in._text,
                out: clip.out._text,
                start: clip.start._text,
                end: clip.end._text,
                dur: clip.end._text - clip.start._text})
        })
        return arr
    });
