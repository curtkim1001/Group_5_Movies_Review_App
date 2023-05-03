import React from "react";
import three from "../../../public/images/space.png"

const WelcomeMessage = (props) =>{
    return (
        <div>
            <h2 className="welcome-message">Reel Reviews</h2>
            <h4 className="welcome-message">Take a seat, enjoy the space.</h4>
            <img className="logo" src={three}/>
            <p className="authors">Developed and Designed by: Curt, Jose, and Solomon</p>
            </div>
    )
}

export default WelcomeMessage;