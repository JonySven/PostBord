import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../sherad/interfaces';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../sherad/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$!: Observable<Post>

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.post$ = this.route.params
    .pipe(switchMap( (params: Params) => {
      return this.postService.getById(params['id'])
    }))
  }

}
