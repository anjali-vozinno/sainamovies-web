import { Component, OnInit ,Input, SimpleChanges} from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
@Input() id: string;
details:[];
cast:[];

constructor(private dataservice:DataService) { }

  ngOnInit(): void {
     alert(this.id)
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.id){      
    this.dataservice.getDetails(this.id)
    .subscribe((resp:any)=>{
      console.log(resp)
    this.details=resp.data;
    this.cast=resp.data['castCrew']
    
    })}
}}