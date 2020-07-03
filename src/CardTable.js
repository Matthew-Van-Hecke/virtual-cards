import React, { Component } from 'react';
import Axios from 'axios';
import Card from './Card';
import './CardTable.css';

class CardTable extends Component{
    constructor(props){
        super(props);
        this.state = {deckId: "", cards: [], idSubmitted: false};
        this.drawCard = this.drawCard.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async drawCard(){
        let cards = [...this.state.cards];
        let result = await Axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`);
        let data = result.data;
        let card = {id: cards.length, cardCode: data.cards[0].code, name: `${data.cards[0].value} of ${data.cards[0].suit}`};
        cards.push(card);
        console.log(data);
        this.setState({cards});
    }
    handleChange(evt){
        evt.preventDefault();
        console.log([evt.target.value])
        this.setState({[evt.target.name]: evt.target.value});
    }
    render(){
        let pileHasCards = this.state.cards.length > 0;
        let cards = pileHasCards ? this.state.cards.map(c => <Card cardCode={c.cardCode} name={c.name} key={c.id} id={c.id} />) : "";
        let game = 
            <div className="CardTable-game">
                <div className="CardTable-cards">
                    {cards}
                </div>
                <div className="CardTable-button">
                    {this.state.cards.length < 52 && <button onClick={this.drawCard}>Draw a Card</button>}
                    {/* {this.state.cards.length < 52 ? <button onClick={this.drawCard}>Draw a Card</button> : <p>No More Cards Remaining</p>} */}
                </div>
            </div>
        
        let newGameForm = 
            <form>
                <input
                    type="text"
                    name="deckId"
                    value={this.state.deckId}
                    onChange={this.handleChange}
                    placeholder="DeckId"
                />
            </form>
        return (
            <div className="CardTable">
                {this.state.idSubmitted ? game : newGameForm}
            </div>
        );
    }
}

export default CardTable;