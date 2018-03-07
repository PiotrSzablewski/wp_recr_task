import React, { Component } from "react";
import { Block, Heading } from "react-super-styled";
import Masonry from "react-masonry-component";
import { Image } from './UI/Image.js';
import { APP_ID } from "../APP_URLs";
import axios from '../axios-photos';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'

class HomeItem extends Component {
    state = {
      photos: [],
      error: null
    };


  componentDidMount() {
    const API_URL = `https://api.unsplash.com/collections/${
      this.props.colId
    }/photos?order_by=latest&client_id=${APP_ID}`;
    axios.get(API_URL)
    .then(response => this.setState({ photos: response.data }))
    .catch(error=>this.setState({error: true}));
  }

  render() {
    return (
      <Block >
        <Block >
          <Heading h3 margin="20px 0" color="white">{this.props.colTitle}</Heading>
      </Block>
        <Block>
          <div className="test">
            <Masonry>
              {this.state.photos.map(img => (
                <Image
                  key={img.id}
                  src={img.urls.thumb}
                  alt={img.description}

                />
              ))}
            </Masonry>
          </div>
      </Block>
    </Block>
    );
  }
}

export default withErrorHandler(HomeItem, axios);
