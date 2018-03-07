import React, { Component } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import { FlexItem, Block, Heading } from "react-super-styled";
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { APP_ID, BASE_URL, FEATURED_COLLECTIONS, AUTHORIZATION } from "../APP_URLs";
import axios from '../axios-photos';
import HomeItem from "../components/HomeItem";
import Spinner from '../components/UI/Spinner/Spinner';



const API_URL = BASE_URL + FEATURED_COLLECTIONS + AUTHORIZATION + APP_ID;

class Home extends Component {
  state = {
    collections: [],
    error: false
  };


  componentDidMount() {
    axios.get(API_URL)
      .then(response => this.setState({
        collections: response.data
      }))
      .catch(error => this.setState({
        error: true
      }));
  }

  render() {
    if (!this.state.collections) {
      return <Spinner/>;
    }
    const masonaryStyle = {
      width: '90%',
      margin: 'auto',
      padding: '0 100px'
    }
    const homeItems = this.state.collections.map(col => (
      <FlexItem col={12}  lgCol={2} key={col.id} >
        <Link to={`/collection/${col.id}`} >
          <HomeItem colId={col.id} colTitle={col.title} />
        </Link>
      </FlexItem>
    ));
    return (
      <Block center>
        <Heading h1 margin="50px">All Thanks To Unsplash</Heading>
        <Masonry style={masonaryStyle}>{homeItems}</Masonry>
      </Block>
    );
  }
}

export default withErrorHandler(Home, axios);
