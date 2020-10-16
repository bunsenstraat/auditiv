import { ThrowStmt } from '@angular/compiler';
import { fabric } from 'fabric';
export class controller {

    group: fabric.Group;
    line: fabric.Rect;
    markers: Array<fabric.Rect> = [];
    currentmarker: fabric.Rect;
    markerTitles: Array<String>;
    position:number = 0;
    lines:Array<fabric.Rect> = [];
    
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
                width: h,
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
               // backgroundColor: 'black',
                fontSize: 12,
                selectable: false,
                evented: false,
                fontFamily: 'sans-serif',
            });

            if(i>0)
            text.left = text.left - text.width;

            if(i>0 && i<markertitles.length-1)
            text.left = text.left;

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

            if(i==0)
            clickable.width = clickable.width/2;
            if(i>0)
            clickable.left = clickable.left - clickable.width/2;

            if(i>0 && i<markertitles.length-1)
            text.left = text.left + text.width/2;

            this.lines.push(line);

            this.group.addWithUpdate(line);
            this.group.addWithUpdate(text);
            this.group.addWithUpdate(clickable);
            //this.group.addWithUpdate(this.positionLine);
        }
        this.setPosition(this.position.toString())
    }

    getGroup(){
        return this.group
    }

    setPosition(i:string){
        this.position = +i;
        this.lines.forEach(function (value:fabric.Rect) {
            value.set("fill","black")
        }); 
        this.lines[this.position].set("fill","red");
        console.log(this.lines[0]);
    }

    getPosition():number{
        return this.position;
    }
}