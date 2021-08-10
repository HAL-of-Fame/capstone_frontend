import "./MTT.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import cruella from "../../assets/cruella.jpg";
import henrywidow from "../../assets/henrywidow.jpg";
import LeoMorales from "../../assets/LeoMorales.jpg";
export default function MTT() {
  return (
    <div>
      <div className="greeting">Meet The Team</div>
      <div className="people">
        <div className="person1">
          <img src={cruella} alt="cruellashani" />
          <div className="name"> Ashani Jewell </div>
          <div className="info">
            <div> Connect with Us:</div>

            <div> Ashanijewell@gmail.com</div>
            <a href="https://www.linkedin.com/in/ashani-jewell/"> LinkedIn</a>
            <a href="https://github.com/ashanij123"> GitHub</a>
            <div>
              Description: Ashani Jewell is a Junior at Kalamazoo College
              studying Economics and Computer Science. The 20-year-old Virgo, is
              very passionate about music and creating a space for everyone to
              express their creativity. Her favorite movie is The Parent Trap
              and you can check it out here!
            </div>
          </div>
        </div>
        <div className="person2">
          <img src={henrywidow} alt="henry widow" />
          <div className="name"> Henry Mu </div>
          <div className="info">
            <div>muh@oregonstate.edu</div>
            <a href="https://www.linkedin.com/in/hmu/"> LinkedIn</a>
            <a href="https://github.com/rrll3553/"> GitHub</a>
            <div>
              Description: Henry is studying computer science at Oregon State
              University 📚. His favorite Disney movie is Moana. 🌴 Moana > ❄️
              Frozen forever. When not coding Henry can be found watching
              badminton videos, doing outdoorsy stuff, and sleeping 💤. He hopes
              to one day travel to Egypt and explore the pyramids. ✈️
            </div>
          </div>
        </div>
        <div className="person3">
          <img src={LeoMorales} alt="placeholder" />
          <div className="name"> Leonel Rivera-Castro </div>
          <div className="info">
            <div>Lriveracastro407@berkeley.edu</div>
            <a href="https://www.linkedin.com/in/leonel-rivera-castro-663725163/">
              LinkedIn
            </a>
            <a href="https://github.com/lriveracastro407"> GitHub</a>

            <div>
              Description: Leo is a Junior studying Data Science at the
              University of California, Berkeley 🐻. He likes to watch movies🎥,
              TV shows📺, Football🏈, Basketball🏀, UFC, read, and play Video
              Games in his freetime. He also loves to listen to The Weeknd,
              Drake, and Spanish Music (reggaeton). You can find his favorite
              movie "Spiderman: Into the SpiderVerse" on our site!{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
