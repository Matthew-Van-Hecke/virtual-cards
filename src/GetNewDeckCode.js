import React, { Component } from 'react';
import Axios from 'axios';
import './GetNewDeckCode.css';

class GetNewDeckCode extends Component{
    constructor(props){
        super(props);
        this.state = {deckCode: ""};
        this.generateDeckShuffled = this.generateDeckShuffled.bind(this);
    }
    async generateDeckShuffled(){
        const apiUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/';
        let newDeckApiCall = await Axios.get(apiUrl);
        this.setState({deckCode: newDeckApiCall.data.deck_id});
    }
    render(){
        return(
            <div className="GetNewDeckCode">
                <button onClick={this.generateDeckShuffled}>Generate Deck Shuffled</button>
                <p>{this.state.deckCode}</p>
            </div>
        )
    }
}

export default GetNewDeckCode;