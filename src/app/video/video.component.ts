import { Component, OnInit ,Input, SimpleChanges, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import { DataService } from '../services/data.service';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnDestroy {
  @Input() id;
  @ViewChild('target', {static: true}) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
  @Input() options: {
      fluid: false,
      aspectRatio: '4:3',
      autoplay: false,
      sources: {
          src: string,
          type: string,
      }[],
  };
  player: videojs.Player;
  @Input() videoArray:any[];

  details:[];
  cast:[];
  test: string[] = []; 
  constructor(private dataservice:DataService, private elementref: ElementRef) {
    
   }

   ngOnInit() {
    // alert(this.id)
    console.log(this.videoArray)
    for(var i=0; i< this.videoArray.length; i++) {
      this.test.push(this.videoArray[i].thumbUrl);
    }
    console.log("test is" + this.test);
    // instantiate Video.js
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
  }

  ngOnChanges(changes: SimpleChanges){
    
    if(this.id){
    console.log(this.id)
    // console.log("list of movies "+ this.movieVideos)
    this.dataservice.getDetails(this.id)
    .subscribe((resp:any)=>{
    console.log(resp)
    this.details=resp.data[0];
    this.cast=resp.data['castCrew']
    
    })
  }
  }3

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}