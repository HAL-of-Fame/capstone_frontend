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

export default function MTT() {
  return (
    <div>
      <div className="greeting">Meet The Team</div>
      <div className="people">
        <div className="person1">
          <img
            src="https://img.cinemablend.com/quill/1/4/7/6/9/b/14769baf2cc87a08cdeb4244c138503dfa9149f2.jpg"
            alt="placeholder"
          />
          <div className="name"> Ashani Jewell </div>
          <div className="info">
            <div> Ashanijewell@gmail.com</div>
            <a href="https://www.linkedin.com/in/ashani-jewell/"> LinkedIn</a>
            <div>Github:</div>
            <div></div>
          </div>
        </div>
        <div className="person2">
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            alt="placeholder"
          />
          <div className="name"> Henry Mu </div>
          <div className="info">
            <div>Email:</div>
            <div>LinkedIn:</div>
            <div>Github:</div>
            <div>Description:</div>
          </div>
        </div>
        <div className="person3">
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            alt="placeholder"
          />
          <div className="name"> Leonel Rivera-Castro </div>
          <div className="info">
            <div>Email: Lriveracastro407@gmail.com</div>
            <div>LinkedIn:</div>
            <div>Github:</div>
            <div>Description:</div>
          </div>
        </div>
      </div>
    </div>
  );
}
