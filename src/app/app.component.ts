import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio-front-end';

  constructor(private http: HttpClient){}
  
  redirectToBlog(){
    this.http.get(environment.blogUrl)
                .subscribe(res => {
                  const url = res.toString()
                  window.open(url, "_blank");
                })
  }
  
}
