import React from 'react';
import StockImage from './StockImage';

class WisdomApp extends React.Component {
    timer = null;

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.wordsOfWisdom();
        }, 0);
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.ready && this.state.ready && !this.state.stop) {
            this.timer = setTimeout(() => {
                this.wordsOfWisdom();
            }, 1000 * 30);  // 30 seconds
        }
    }

    componentWillUnmount() {
        if(this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        return (
            <div className="px-4 pt-5 my-5 text-center">
                <h1 className="display-4 fw-bold">Words of Wisdom</h1>
                <div className="col-lg-6 mx-auto">
                    <h2 className="display-6 mb-4">{this.state.advice}</h2>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                        <button type="button" className="btn btn-outline-success btn-lg px-4 me-sm-3" onClick={this.wordsOfWisdom}>New</button>
                        <button type="button" className={`btn btn-lg px-4 me-sm-3 ${this.state.stop ? 'btn-danger' : 'btn-outline-danger'}`} onClick={this.stopTimer}>Stop</button>
                    </div>
                </div>
                <StockImage searchText={this.state.searchText} />
            </div>
        );
    }

    wordsOfWisdom = () => {
        this.setState({
            ready: false,
            stop: false,
        });
        
        fetch('https://api.adviceslip.com/advice')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // {"slip": { "id": 30, "advice": "When in doubt, just take the next small step."}}
            this.setState({
                advice: data.slip.advice,
                searchText: data.slip.advice,
                ready: true,
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    stopTimer = () => {
        if(this.state.stop) {
            this.wordsOfWisdom();
        } else {
            if(this.timer) {
                clearTimeout(this.timer);
            }
            this.setState({ stop: true });
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            advice: 'Thinking...',
            searchText: '',
            ready: false,
            stop: false,
            justMounted: true,
        }
    }
}

export default WisdomApp;