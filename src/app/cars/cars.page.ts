import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {
  listProducts:any[]=[]
  constructor() { }

  ngOnInit() {
   this.listProducts=[
      {
        id:"qsd",
    
        date:"12/12/2023",
        title:"Peugeot 206",
        price:"1500 DT",
        description:"lorem ipusmlorem ipusmlorem ipusmlorem ipusmlorem ipusmlorem ipusmlorem ipusmlorem ipusm",
        imgs:[
          "post1.jpg",
          "post2.jpg",
        ]
      },
      {
        id:"qsd",
    
        date:"12/12/2023",
        title:"Peugeot 206",
        price:"1500 DT",
        description:"lorem ipusmlorem ipusmlorem ipusmlorem ipusmlorem ipusmlorem ipusmlorem ipusmlorem ipusm",
        imgs:[
          "post1.jpg",
          "post2.jpg",
        ]
      },
      {
        id:"qsd",
        date:"12/12/2023",
        title:"Peugeot 206",
        price:"1500 DT",
        description:"lorem ipusmlorem ipusmlorem ipusmlorem ipusmlorem ipusmlorem ipusmlorem ipusmlorem ipusm",
        imgs:[
          "post1.jpg",
          "post2.jpg",
        ]
      },
    ]
  }

}
