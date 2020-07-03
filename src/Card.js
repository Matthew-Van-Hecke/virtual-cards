import React, { Component } from 'react';
import './Card.css';

class Card extends Component{
    render(){
        let margin = (this.props.id * 30) + "px";
        let style = {marginLeft: margin};
        // let style = {zIndex: this.props.id, marginLeft: margin};
        return(
            <img 
                className="Card" 
                src={`https://deckofcardsapi.com/static/img/${this.props.cardCode}.png`} 
                alt={this.props.name} 
                style={style} 
            />
        )
    }
}

export default Card;