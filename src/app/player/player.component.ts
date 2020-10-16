import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { Observable } from 'rxjs';
import { controller } from '../+state/controller.model'
import * as SampleJson from "../../assets/files.json";
import { AudioService } from '../audio-service.service';

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

  playerstatus:string;
  
  c:controller;
  c2:controller;
  c3:controller;

  constructor(private audio:AudioService) {}
  ngOnInit(): void {

    console.log(SampleJson.data);

    
    this.audio.getPlayerStatus().subscribe((e)=>{
      console.log(e);
      this.playerstatus = e;
    })

    this.canvas = new fabric.Canvas('canvas');
    this.canvas2 = new fabric.Canvas('canvas2');
    this.canvas3 = new fabric.Canvas('canvas3');

    this.c = new controller();
    this.c.draw(320,2,0,60,2,["schwach","mittel","stark"]);
    
    this.c2 = new controller();
    this.c2.draw(320,2,0,60,2,["langsam","mittel","schnell"]);

    this.c3 = new controller();
    this.c3.draw(320,2,0,60,3,["aus","mittel","laut","nur beat"]);

    this.canvas.hoverCursor = "pointer";
    this.canvas2.hoverCursor = "pointer";
    this.canvas3.hoverCursor = "pointer";

    this.canvas.add(this.c.getGroup());
    this.canvas2.add(this.c2.getGroup());
    this.canvas3.add(this.c3.getGroup());

    let me = this;

    this.canvas.on("mouse:up",function(e){
      
      me.handletargets(me.canvas,me.c,e);
      
    });
    this.canvas2.on("mouse:up",function(e){
      me.handletargets(me.canvas2,me.c2,e);
    });
    this.canvas3.on("mouse:up",function(e){
      me.handletargets(me.canvas3,me.c3,e);
    });
    
    //this.canvas2.add(line2);
    //this.canvas3.add(line3);
  }

  public stop(){
    this.audio.pauseAudio()
  }

  public start(){
    this.process()
    this.audio.playAudio()

  }

  public handletargets(c:fabric.Canvas,g:controller,e:fabric.IEvent) {
    console.log(e.subTargets[0].name);
    //this.audio.setAudio("assets/Interface_Auditiv/"+SampleJson.data[0].file);
    g.setPosition(e.subTargets[0].name);
    let me = this;
    this.canvas.renderAll();
    this.canvas2.renderAll();
    this.canvas3.renderAll();
    this.process()
  }

  public process(){
    let pos = Array(this.c.getPosition(),this.c2.getPosition(),this.c3.getPosition());
    let me = this;
    console.log("POSITION",pos);
    SampleJson.data.forEach(function (ob) {
      console.log("__________");
      let c:number = 0;
      // console.log(Object.keys(ob.vals));
      for (let v in ob.vals) {
        // console.log("index",v)
        if(ob.vals[v] == pos[+v]){
          c++;
        //  console.log(ob.vals[v],pos[+v],v);
        }else{
        //  console.log(ob.vals[v],pos[+v],v);
        }
      }
      if(c == Object.keys(ob.vals).length){
        console.log(ob.file)
        me.audio.setAudio("assets/Interface_Auditiv/"+ob.file);
      }else{
        
/*         console.log(c);
        console.log(pos);
        console.log(Object.keys(ob.vals));
        console.log(Object.keys(ob.vals).length);
        console.log(ob.vals); */
      }
    })
  }
}
