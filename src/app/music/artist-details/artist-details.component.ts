import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Song, Artist } from '../music';
import { User } from 'src/app/user/user';
import { UserService } from 'src/app/user/user.service';

@Component({
    templateUrl: "./artist-details.component.html",
    selector: "album-details",
    styleUrls: ["./artist-details.component.css"]
})
export class ArtistDetailsComponent implements OnInit {

    constructor(private musicService: MusicService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) { }
        

    artist: Artist;
    song: Song;

    user: User;
    ngOnInit(): void {
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
            this.route.paramMap.subscribe((map) => {
                let artistId = Number(map.get("artistId"));

                this.musicService.artistDetails(artistId).subscribe((data) => {
                    this.artist = data;
                });
            });
        } else {
            this.router.navigate(["/userhome"]);
            alert("please login to access");
        }
    }

    play(song: Song): void {

        this.song = song;
    }

    oNav() {
        document.getElementById("mySidenav").style.width = "200px";
    }

    cNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    logout() {
        sessionStorage.removeItem("user");
        this.router.navigate(["/userhome"]);
    }

    addToFavourite(songId:number){
        this.userService.addToFavourite(this.user.userEmail,songId).subscribe((data) => {
            alert("added successfully");
        })
    }
}
