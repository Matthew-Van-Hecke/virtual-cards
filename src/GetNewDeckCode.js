import React, { Component } from 'react';
import './GetNewDeckCode.css';

class GetNewDeckCode extends Component{
    render(){
        return(
            <div className="GetNewDeckCode">
                <button onClick={this.generateDeckShuffled}>Generate Deck Shuffled</button>
            </div>
        )
    }
}

export default GetNewDeckCode;