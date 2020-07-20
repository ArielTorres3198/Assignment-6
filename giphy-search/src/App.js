import React from 'react';
import GifCard from './components/GifCard';
import SearchField from './components/SearchField';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      trending: [],
      rand: [],
    };
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(term) {
    const gifURL = 'http://api.giphy.com/v1/gifs/search?q='+term.replace(" ","+")+'&api_key=w8ebRTS9OgXI7IMA0rzpmptAQsLXeFst'; 
    axios.get(gifURL)
      .then(response => this.setState({ gifs: response.data.data }))
    }

  componentDidMount() {
    const trendURL = 'http://api.giphy.com/v1/gifs/trending?api_key=w8ebRTS9OgXI7IMA0rzpmptAQsLXeFst';
	axios.get(trendURL)
      .then(resTrend => this.setState({ trending: resTrend.data.data }))

    const randURL = 'http://api.giphy.com/v1/gifs/random?api_key=w8ebRTS9OgXI7IMA0rzpmptAQsLXeFst';
	axios.get(randURL)
      .then(resRand => this.setState({ rand: resRand.data.data }))
  }

  handleClick = () => {
    const randURL = 'http://api.giphy.com/v1/gifs/random?api_key=w8ebRTS9OgXI7IMA0rzpmptAQsLXeFst';
	axios.get(randURL)
      .then(resRand => this.setState({rand: resRand.data.data}), this.handleRandomGif());
  }

  handleRandomGif = () => {
    return (
      <img src={this.state.rand.image_url} alt='A random gif'></img>
    )
  }  

  render() {
    return (
      <div style={{backgroundColor: '#121212', color: 'white'}}>
        <div style={{textAlign: 'center', padding: '20px'}}>
          <h1>GIPHY Search</h1>
        </div>
        <div>
          <SearchField onTermChange={term => this.handleTermChange(term)}/>
        </div>
        <div className='container'>
          <h1>Search Results: </h1>
          <GifCard gifs={this.state.gifs} />

          <h1>Trending: </h1>
          <GifCard gifs={this.state.trending} />

          <h1>Random: </h1>
          <center>
            <div className='gif-list2'>
              <div className='gif-item'>
                {this.handleRandomGif()}
              </div>
            </div>
            <button className='button' style={{marginBottom: '30px'}} onClick = {this.handleClick}> Random </button>
          </center>
        </div>
      </div>
    );
  }
}

export default App;
