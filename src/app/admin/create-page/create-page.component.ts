import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/sherad/interfaces';
import { PostService } from 'src/app/sherad/posts.service';
import { AlertService } from '../shared/services/alert.service';



@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit{

  form!: FormGroup;

  constructor(private postService: PostService, private alert: AlertService){}

  ngOnInit() {
      this.form = new FormGroup({
        title: new FormControl('', Validators.required),
        text: new FormControl('', Validators.required),
        avtor: new FormControl('', Validators.required)
      })
  }
  submit(){
    if(this.form.invalid){
      return 
    }
    const post: Post = {
      title: this.form.value.title,
      avtor: this.form.value.avtor,
      text: this.form.value.text,
      date: new Date()
    }
    this.postService.create(post).subscribe(()=> {
      this.form.reset()
      this.alert.success('Пост был создан')
    })  
      
  }
}
