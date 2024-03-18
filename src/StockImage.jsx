import React from 'react';

class StockImage extends React.Component {
    state = {
        imageUrl: '',
        pexelsUrl: '',
        photographer: '',
        photographerUrl: '',
    };

    componentDidMount() {
        if(this.props.searchText == '') {
            return;
        }
        this.getImage(this.props.searchText);
    }

    componentDidUpdate(prevProps) {
        if(this.props.searchText !== prevProps.searchText) {
            this.getImage(this.props.searchText);
        }
    }

    getImage = (searchText) => {
        /*this.setState({ 
            imageUrl: 'https://via.placeholder.com/700x500?text=Image',
            pexelsUrl: '',
            photographer: '',
            photographerUrl: '',
        });*/

        fetch(`https://api.pexels.com/v1/search?query=${searchText}&per_page=1&page=1&orientation=landscape`, {
            headers: {
                'Authorization': import.meta.env.VITE_PEXELS_CLIENT_KEY,
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const imageUrl = data.photos[0].src.large;
            this.setState({ 
                imageUrl: imageUrl,
                pexelsUrl: data.photos[0].url,
                photographer: data.photos[0].photographer,
                photographerUrl: data.photos[0].photographer_url,
            });
        })
    }

    render() {
        if(!this.state.imageUrl) {
            return null;
        }

        return (
            <div className="container px-5">
                <img src={this.state.imageUrl} className="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy"/>
                <div className="d-flex justify-content-center align-items-center">
                    <p className="text-center">Photo by <a href={this.state.photographerUrl} target="_blank" rel="noreferrer">{this.state.photographer}</a> on <a href={this.state.pexelsUrl} target="_blank" rel="noreferrer">Pexels</a>.</p>
                </div>
            </div>
        );
    }
}

export default StockImage;