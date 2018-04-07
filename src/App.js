import React, { Component } from 'react';
import 'normalize.css'; 
import './styles.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            layout: "masonry",
            columns: 5,
            maxCards: 20
        };
    }
    componentDidMount() {
        this.fetchEr();
    }
    fetchEr = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(response => response.json())
        .then(result => {
            this.reorder(result.slice(0,this.state.maxCards), this.state.columns);
            this.setState({ cardsOG: result.slice(0,this.state.maxCards) });
        })
        .catch(e => e);
    }
    reorder = (arr, columns) => {
        const cols = columns;
        const out = [];
        let col = 0;
        while(col < cols) {
            for(let i = 0; i < arr.length; i += cols) {
                let _val = arr[i + col];
                if (_val != undefined)
                    out.push(_val);
            }
            col++;
        }
        this.setState({ cards: out, columns: columns });
    }
    handleButtonClick = (layout, columns) => {
        this.setState({ 
            layout: layout, 
            columns: columns
        });
        this.reorder(this.state.cardsOG, columns);
        
    }
    handleClickCard = (card) => {
        this.setState({
            cardActive: (this.state.cardActive != card) ? card : false
        })
    }
    render() {
        let CARDS = this.state.cards;
        return (
            <div>
                <nav>
                    <button onClick={()=>this.setState({ layout: "masonry", columns: 5, cards: this.state.cardsOG })}>five-column (no reorder)</button>
                    <button onClick={()=>this.handleButtonClick("masonry", 5)}>five-column</button>
                    <button onClick={()=>this.handleButtonClick("two-column", 2)}>two-column</button>
                    <button onClick={()=>this.handleButtonClick("single-column", 1)}>single-column</button>
                </nav>
                <div className="layout--wrapper">
                    <div className="info">
                        <div>
                            <h2>Card Order: <span>{ CARDS && CARDS.map( card => `${card.id} `) }</span></h2>
                            <p>Layout using CSS <span>column-count</span> only.</p>
                        </div>
                    </div>
                {CARDS &&
                    <div className={`layout + ${this.state.layout}`} style={{"columnCount" : this.state.columns}}>
                    {CARDS.map( (card, index) =>                         
                        <div className={(card === this.state.cardActive) ? "card active" : "card"} onClick={()=>this.handleClickCard(card)}>
                            <div className="media"></div>
                            <div>
                                <h1>{ card.id }</h1>
                                <h2>{ card.title }</h2>
                                <p>{ card.body }{ card.title }</p>
                            </div>
                        </div>
                    )}
                    </div>
                }
                </div>
            </div>
        );
    }
}

export default App;
