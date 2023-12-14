import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  cat: string="";
  listProducts=[
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
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.cat = params["cat"];
      }
    );
  }

}
