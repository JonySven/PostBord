import { Component, OnInit } from '@angular/core';
import { PostService } from '../sherad/posts.service';
import { Observable } from 'rxjs';
import { Post } from '../sherad/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{

  posts$!: Observable<Post[]>

  constructor(private postService: PostService){}

  ngOnInit() {
   this.posts$ = this.postService.getAll()
  }
}
