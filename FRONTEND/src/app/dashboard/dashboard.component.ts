import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  email:string
  name:string
  constructor(private http: HttpClient,private readonly userService:AuthService) { }

  ngOnInit(): void {
    this.http
      .get( 
        environment.apiUrl + "/user/profile",
      ).subscribe(res=>{  
        this.email = res["profile"].email
        this.name = res["profile"].name
        
      })
  }

  logout(){
    this.userService.logout()
  }

}
