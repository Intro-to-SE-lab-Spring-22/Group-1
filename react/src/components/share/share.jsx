import './share.css'
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
} from "@material-ui/icons";
import React from 'react'

export default function share() {
    return (
        <div className="share">
          <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src="/assets/photo/profile.jpg" alt=""/>
                <input placeholder="What's on your mind?" classname="shareInput"/>
            </div>
            <hr className="shareHr" />
            <div className="shareBottom">
              <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              </label>
                <div className="shareOption">
                  <Label htmlColor="blue" className="shareIcon" />
                  <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                  <Room htmlColor="green" className="shareIcon" />
                  <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                  <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                  <span className="shareOptionText">Feelings</span>
                </div>
              </div>
              <button className="shareButton" type="submit">
                Post
              </button>
            </div>
          </div>
        </div>
    );
}
