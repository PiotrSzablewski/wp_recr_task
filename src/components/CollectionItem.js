import React, { Component } from "react";
import { APP_ID } from "../APP_URLs";
import axios from '../axios-photos';
import { Block } from 'react-super-styled';
import  BottomDraw  from './UI/BottomDraw';
import { Image } from './UI/Image.js';
class CollectionItem extends Component {
    state = {
      photoInfo: [],
      isHovered:false,
      error: null
    };


  API_URL = `https://api.unsplash.com/photos/${
    this.props.imgId
  }?client_id=${APP_ID}`;

  handleMouseOver = () => {
    this.state.photoInfo.length === 0 ? this.fetchPhotoInfo() : null;
    this.setState({
        isHovered:true
    });
  };
  handleMouseOut = ()=>{
      this.setState({
          isHovered:false
      });
  }


  fetchPhotoInfo = () => {
      axios.get(this.API_URL)
      .then(request => this.setState({ photoInfo: request.data }))
      .catch(error=> this.setState({error: true}));
  };

  render() {
    const { likes, country } = this.state.photoInfo;

    return (
      <Block styles="position: relative;">
        <BottomDraw country={country === undefined ? "N/A" : country} isHovered={this.state.isHovered} likes={likes}/>
        <Image
          src={this.props.imgSrc}
          alt={this.props.imgAlt}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        />
      </Block>
    );
  }
}

export default CollectionItem;
