import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/sherad/interfaces';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit{

  form!: FormGroup;

  constructor(){}

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
  }
}
