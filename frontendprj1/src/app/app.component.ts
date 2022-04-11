import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { name: string; content: string }) {
    // Send Http request
    console.log(postData)
    this.http.post(
      'https://ng-frontend-d7544-default-rtdb.firebaseio.com/posts.json', 
      postData
      ).subscribe(responseDate => {
        console.log(responseDate);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    // Send Http request
    this.http
    .get('https://ng-frontend-d7544-default-rtdb.firebaseio.com/posts.json')
    .pipe(map(responseData =>{
      const postsArray = [];
      for (const key in responseData){
        if (responseData.hasOwnProperty(key)){
          postsArray.push({ ...responseData[key], id: key})
        }
      }
      return postsArray;
    }))
    .subscribe(posts => {
      console.log(posts);
  
    });
  }
}

