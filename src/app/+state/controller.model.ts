import { fabric } from 'fabric';
export class controller {

    group: fabric.Group;
    line: fabric.Rect;
    markers: Array<fabric.Rect> = [];
    currentmarker: fabric.Rect;
    markerTitles: Array<String>;
    
    constructor() {
        
    }
    
    draw(w: number, h: number, x: number, y:number, numberofMarkers: number, markertitles:Array<string>){
        this.markerTitles = markertitles;
        let line = new fabric.Rect({
            width: w,
            height: h,
            left: x,
            top: y,
            fill: '#000',
            selectable: false,
            evented: false,
        });
        this.group = new fabric.Group([],{
            subTargetCheck: true
        }
        );
        this.group.selectable = false;
        this.group.addWithUpdate(line);
        let partsize = w/numberofMarkers;
        console.log(partsize);
        for(let i=0; i<numberofMarkers+1;i++){
            let line = new fabric.Rect({
                width: 2,
                height: 30,
                left: x+ partsize * i,
                top: y-15,
                fill: '#000',
                selectable: false,
                evented: false,
            });
            var text = new fabric.Text(markertitles[i], { 
                left: line.left, //Take the block's position
                top: line.top + 30, 
                fill: 'black',
                fontSize: 20,
                selectable: false,
                evented: false,
            });
            var clickable = new fabric.Rect({
                name:i.toString(),
                width: partsize,
                height: 60,
                left: x+ partsize * i,
                top: y-15,
                fill: '',
                selectable: false,
                evented: true,
            });

            this.group.addWithUpdate(line);
            this.group.addWithUpdate(text);
            this.group.addWithUpdate(clickable);
        }
    }

    getGroup(){
        return this.group
    }
}