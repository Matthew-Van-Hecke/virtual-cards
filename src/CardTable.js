import React, { Component } from 'react';
import Axios from 'axios';
import Card from './Card';
import './CardTable.css';

class CardTable extends Component{
    constructor(props){
        super(props);
        this.state = {deckId: "", cards: []};
        this.drawCard = this.drawCard.bind(this);
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
    render(){
        let pileHasCards = this.state.cards.length > 0;
        let cards = pileHasCards ? this.state.cards.map(c => <Card cardCode={c.cardCode} name={c.name} key={c.id} id={c.id} />) : "";
        return (
            <div className="CardTable">
                <div className="CardTable-cards">
                    {cards}
                </div>
                <div className="CardTable-button">
                    {this.state.cards.length < 52 && <button onClick={this.drawCard}>Draw a Card</button>}
                    {/* {this.state.cards.length < 52 ? <button onClick={this.drawCard}>Draw a Card</button> : <p>No More Cards Remaining</p>} */}
                </div>
            </div>
        );
    }
    componentDidMount(){
        let deckId;
        Axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/').then(result => this.setState({deckId: result.data.deck_id}))
    }
}

export default CardTable;