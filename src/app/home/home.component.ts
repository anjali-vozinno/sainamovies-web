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
  allCategorys;
  i=0;
  getHomeVideos(){
    this.dataservice.getHomeVideos()
    .subscribe((resp:any)=>{
     this.allCategorys = resp;
    
    //  this.categorys = resp;
    //   //  while(this.i <= 2) {
    //   //    this.category = resp[this.i];
    //   //   this.i ++;
    //   //  }
    //   //  console.log(this.category)

    //   for(this.i of resp) {
    //     // console.log(this.i)
    //     this.category = resp[this.i];
    //     return this.category;
    //   }
      //  console.log(this.categorys)
      })
  }
    url; options; cname; videoPass;
  getId(videoId, catName){   
    // alert(catName) 
    // this.cname = 'Songs'
    this.id =videoId;
    // alert(videoId)
    this.video_selected = !this.video_selected;
    for(var i = 0; i< this.allCategorys.length; i++) {
      if(this.allCategorys[i].category == catName) {
        this.videoPass = this.allCategorys[i].videos;
        break;
      }

    }
    // console.log(this.videoPass)
    // console.log(this.categorys)
    // this.url = "https://cdn.sabha.tv/videos/hls/28ba6723-1498-492b-a7d8-0c61db2b4303.m3u8";
    this.options = {
      fluid: true,
      aspectRatio: '16:9',
      autoplay: false,
      sources: {
          src: 'https://cdn.sabha.tv/videos/hls/28ba6723-1498-492b-a7d8-0c61db2b4303.m3u8',
          type: "application/x-mpegURL",
      },
  };
  }
}

