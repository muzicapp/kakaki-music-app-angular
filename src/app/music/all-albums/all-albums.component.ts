import { Component, OnInit } from '@angular/core';
import { Album } from '../music';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicService } from '../music.service';
import { User } from 'src/app/user/user';


@Component({
    selector: "all-albums",
    templateUrl: "./all-albums.component.html",
    styleUrls: ["./all-albums.component.css"]
})
export class AllAlbumsComponent implements OnInit {

    albums: Album[];
    constructor(private musicService: MusicService,
        private route: ActivatedRoute,
        private router: Router) { }
    user: User;
    ngOnInit() {

        this.user = JSON.parse(sessionStorage.getItem("user"));

        //null user redirect to home page 
            if(this.user==null){
            alert("please log in to access");
            this.router.navigate(["/userhome"])
        }

            //admin home page button
            if(this.user.role == "admin"){
                document.getElementById("adminbutton").style.display="block";
            }

        if (this.user != null) {
            this.musicService.allAlbums().subscribe((data) => {
                this.albums = data;
            });
        } else {
            this.router.navigate(["/userhome"]);
            alert("please login to access");
        }


    }

    oNav() {
        document.getElementById("mySidenav").style.width = "200px";
    }

    cNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    logout() {
        sessionStorage.removeItem("user");
        this.router.navigate(["/signin"]);
    }
}