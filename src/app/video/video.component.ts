import { Component, OnInit ,Input, SimpleChanges, OnDestroy, ElementRef, ViewChild, OnChanges, AfterViewInit, ViewEncapsulation} from '@angular/core';
import { DataService } from '../services/data.service';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit, OnChanges,  OnDestroy {
  @Input() id;
  // @ViewChild('target', {static: true}) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
  
  player: videojs.Player;
  @Input() videoArray:any[];
  urlVideohls; urlVideoOrg; urlPoster;
  details:[];
  cast:[];
  test: string[] = []; 
  constructor(private dataservice:DataService) {
    window.scrollTo(0, 0);
   }

  ngOnInit() {
    for(var i=0; i< this.videoArray.length; i++) { 
      this.test.push(this.videoArray[i].thumbUrl);
    }
  }
  
  ngOnChanges(changes: SimpleChanges){
      this.getIdFunction(this.id);  
  }
  getIdFunction(idFromCarousel){
      this.id=idFromCarousel;   
      this.dataservice.getDetails(this.id)
      .subscribe((resp:any)=>{
        // console.log(resp)
      this.urlVideohls = resp.data[0]['videoUrl'].hls;
      this.urlVideoOrg = resp.data[0]['videoUrl'].original;
      // console.log(this.urlVideoOrg)
      this.urlPoster = resp.data[0]['videoBgUrl'];
      this.details=resp.data[0];
      // console.log(this.details)
      this.cast=resp.data[0]['castCrew']; 
        this.playVideo();   
    })     
    
  }

  playVideoBtn(e) {
    console.log(e);
    var myPlayer = videojs('vjs-player');
    myPlayer.play();
  }

  getId(idFromCarousel){
    this.id=idFromCarousel;
    this.getIdFunction(this.id);
  }
  playVideo() {

    var myPlayer = videojs('vjs-player');
    myPlayer.src([{
      type: 'application/x-mpegURL',
      src: this.urlVideohls
    },     
    {
      type:'video/mp4',
      src: this.urlVideoOrg
    }]);
    myPlayer.poster(this.urlPoster);
  }
  // ngAfterViewInit() {
  //   const options = {
  //     'sources' : [{
  //       'src' : this.urlVideohls,
  //       'type' : 'application/x-mpegURL'
  //       },{
  //         'src':this.urlVideoOrg,
  //         'type':'video/mp4'
  //       }
  //     ],
  //     'poster' : this.urlPoster
  //   };
  //   this.player = videojs('vjs-player', options);
  // }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
      
    }
  }
}