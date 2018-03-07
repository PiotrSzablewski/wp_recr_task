import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Flex, Block } from 'react-super-styled';
import axios from '../axios-photos'
import Back from '../components/UI/Back';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { Button } from '../components/UI/Button';
import Masonry from "react-masonry-component";
import { APP_ID } from "../APP_URLs.js";

import CollectionItem from "../components/CollectionItem";

const applyUpdateResult = result => prevState => ({
  photos: [...prevState.photos, ...result],
  page: prevState.page + 1,
  isLoading: false
});

const getUnsplashUrl = (colId, page) =>
  `https://api.unsplash.com/collections/${colId}/photos?page=${page}&per_page=30&client_id=${APP_ID}`;

class Collection extends Component {
  state = {
    photos: [],
    page: 1,
    isLoading: false,
    error: null
  };


  actualUrl = this.props.match.url;
  collectionID = this.actualUrl.slice(this.actualUrl.lastIndexOf("/") + 1);

  componentDidMount() {
    this.fetchPhotos(this.collectionID, this.state.page);
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }
  fetchPhotos = (colId, page) => {
    this.setState({
      isLoading: true
    });
    axios.get(getUnsplashUrl(colId, page)).then(request => {
      if (!request.data || request.data.length === 0) {
        window.removeEventListener("scroll", this.onScroll, false);
        this.setState({
          isLoading: false
        })
      } else {
        this.setState(applyUpdateResult(request.data))
      }
    }).catch(error => this.setState({
      error: true
    }))
  };


  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.state.photos.length &&
      !this.state.isLoading
    ) {
      this.onPaginatedFetch();
    }
  };

  onPaginatedFetch = e => this.fetchPhotos(this.collectionID, this.state.page);

  sortByNewest = () => {
    let sortedPhotos = [...this.state.photos];
    sortedPhotos = this.state.photos.sort((a, b) =>
      b.created_at.localeCompare(a.created_at)
    );
    this.setState({
      photos: sortedPhotos
    });
  };

  sortByPopular = () => {
    let sortedPhotos = [...this.state.photos];
    sortedPhotos = this.state.photos.sort((a, b) => b.likes - a.likes);
    this.setState({
      photos: sortedPhotos
    });
  };

  render() {
    const masonryImages = this.state.photos.map(img => (
      <Flex  key={img.id}>
        <Link to={`/photos/${img.id}`}>
          <CollectionItem
            imgId={img.id}
            imgSrc={img.urls.small}
            imgAlt={img.description}
          />
        </Link>
    </Flex>
    ));

    return (
      <div style={{display: "block",margin: "auto", width: "90%" }}>
        <Block><Back/> <h2>Collection</h2></Block>
        <Flex justifyContent="center" alignItems="center">
          <Button primary onClick={this.sortByNewest}>Newest</Button>
          <Button onClick={this.sortByPopular}>Popular</Button>
       </Flex>

        <Masonry>{masonryImages}</Masonry>
        <div>{this.state.isLoading && <Spinner/>}</div>
    </div>
    );
  }
}

export default withErrorHandler(Collection, axios);
