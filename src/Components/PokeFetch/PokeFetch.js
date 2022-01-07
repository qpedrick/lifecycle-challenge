import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      time: 10,
      style: {},
      isRunning: false,
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
  }

  decrement () {
    if((this.state.time > 0) && (this.state.isRunning === true)) {
    this.setState((prevState) => ({ time: prevState.time - 1 }))
    //console.log(this.state.time)
      } else {
        this.stop()
      }
    }

  start() {
    this.setState({isRunning: true});
    this.setState({time: 10})
  }

  stop() {
    this.setState({isRunning: false})
  }

  componentDidMount() {
    this.interval = setInterval(() => this.decrement(), 1000)
  }

  componentDidUpdate() {
    //this.interval = setInterval(() => this.decrement(), 1000)
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {this.fetchPokemon(); this.start()}}>Start!</button>
        <h1 className={'timer'} >{this.state.time}</h1>
        <div className={'pokeWrap'}>
          {this.state.isRunning ? 
          (<img className={'pokeImgDark'} src={this.state.pokeSprite} alt = {this.state.pokeName} />)
          :
          (<img className={'pokeImgLight'} src={this.state.pokeSprite} alt = {this.state.pokeName} />)
          }
          {this.state.isRunning ? 
          (<></>) :
          (<h1 className={'pokeName'}>{this.state.pokeName}</h1>)
          }
        </div>
      </div>
    )
  }
}

export default PokeFetch;