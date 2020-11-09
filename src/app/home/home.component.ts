import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slide ; 
  token;
  webSeries;
  webVideos:[];
  songs;
  songVideos:[];
  sainaOriginals;
  originalsVideos:[];
  movies;
  movieVideos:[];
  hits;
  hitsVideos:[];
  documentary;
  docVideos:[];
  id="";
  video_selected=true;
  
  constructor(private dataservice:DataService,private router:Router) {      
  }
 
  ngOnInit(): void {
    this.getBanner();
    this.getHomeVideos();
  }
  getBanner(){
     this.dataservice.getBanner()
    .subscribe((resp:any)=>{
      this.slide=resp[0].thumbUrl
      // console.log( this.slide)
    })
  }
  getHomeVideos(){
    this.dataservice.getHomeVideos()
    .subscribe((resp:any)=>{
        this.webSeries=resp[0].category
        this.webVideos=resp[0].videos;
        this.songs=resp[1].category
        this.songVideos=resp[1].videos;
        this.sainaOriginals=resp[2].category;
        this.originalsVideos=resp[2].videos;
        this.movies=resp[3].category;
        this.movieVideos=resp[3].videos;
        this.hits=resp[4].category;
        this.hitsVideos=resp[4].videos;
        this.documentary=resp[5].category;
        this.docVideos=resp[5].videos;
      })
  }

  getId(videoId){
    this.id =videoId;
    this.video_selected = !this.video_selected;
  }
}
