import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.page.html',
  styleUrls: ['./postdetails.page.scss'],
})
export class PostdetailsPage implements OnInit {
  postDetails: any;

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Retrieve post ID from the route parameters
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId !== null) {
      // Fetch post details
      this.postsService.getPostById(postId).subscribe(details => {
        this.postDetails = details;
        console.log('Post Details:', this.postDetails);
      });
    }
  }

}
