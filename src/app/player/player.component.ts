import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { controller } from '../+state/controller.model'


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: fabric.Canvas;
  canvas2: fabric.Canvas;
  canvas3: fabric.Canvas;
  

  constructor() {}
  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas');
    this.canvas2 = new fabric.Canvas('canvas2');
    this.canvas3 = new fabric.Canvas('canvas3');

    var c:controller = new controller();
    c.draw(300,5,0,60,2,["schwach","mittel","stark"]);
    
    var c2:controller = new controller();
    c2.draw(300,5,0,60,2,["langsam","mittel","schnell"]);

    var c3:controller = new controller();
    c3.draw(300,5,0,60,3,["aus","mittel","laut","nur beat"]);

    this.canvas.hoverCursor = "pointer";
    this.canvas2.hoverCursor = "pointer";
    this.canvas3.hoverCursor = "pointer";

    this.canvas.add(c.getGroup());
    this.canvas2.add(c2.getGroup());
    this.canvas3.add(c3.getGroup());

    this.canvas.on("mouse:up",function(e){
      console.log(e);
    });
    this.canvas2.on("mouse:up",function(e){
      console.log(e);
    });
    this.canvas3.on("mouse:up",function(e){
      console.log(e);
    });
    
    //this.canvas2.add(line2);
    //this.canvas3.add(line3);
  }

  handletargets(c:fabric.Canvas, e:fabric.IEvent) {
    
  }
}
