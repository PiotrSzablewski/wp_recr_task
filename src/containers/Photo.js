import React, { Component } from "react";
import { Flex, FlexItem, Heading } from "react-super-styled";
import axios from '../axios-photos';
import FbLikeButton from "../components/FbLikeButton";
import { Image } from '../components/UI/Image';
import { APP_ID, PHOTOS_URL } from "../APP_URLs";
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import  Back  from '../components/UI/Back';
class Photo extends Component {
    state = {
      photo: null,
      error:null
    };


  actualUrl = this.props.match.url;
  photoID = this.actualUrl.slice(this.actualUrl.lastIndexOf("/") + 1);

  API_URL = `${PHOTOS_URL}${
    this.photoID
  }?client_id=${APP_ID}`;

  componentWillMount() {
     fetch(this.API_URL)
       .then(response => response.json())
       .then(data => this.setState({ photo: data }))
       .catch(error=> console.log(error));

  }

  render() {
    if (!this.state.photo) {
      return <Spinner/>;
    }
    const { urls, likes, views, downloads, user, description, width, height} = this.state.photo;

    return (
      <div style={{width: '90%', margin: 'auto'}}>
          <Back/>
        <Flex justifyContent="center" alignItems="center">
          <FlexItem xs={12}>
            <Image
              className="center-block"
              src={urls.regular}
              alt={description}
              responsive
            />
          </FlexItem>
        </Flex>
        <Flex styles="padding: 60px" justifyContent="space-around" alignItems="center" >
          <FlexItem xs={4}>
            <Heading h3 underline >Info</Heading>
            <ul className="photo-info-list text-center">
              <li>Description: {description}</li>
              <li>Width: {width}</li>
              <li>Height: {height}</li>
            </ul>
          </FlexItem>
          <FlexItem xs={4}>
            <Heading h3 underline >Stats</Heading>
            <ul className="photo-info-list text-center">
              <li>Likes: {likes}</li>
              <li>Downloads: {downloads}</li>
              <li>Views: {views}</li>
            </ul>
          </FlexItem>
          <FlexItem xs={4}>
            <Heading h3 underline >Author</Heading>
            <ul className="photo-info-list text-center">
              <li>Username: {user.username}</li>
              <li>Name: {user.name}</li>
            </ul>
          </FlexItem>
        </Flex>
        <Flex margin="10px" justifyContent="center" alignItems="center">
          <FlexItem xs={4} xsOffset={4}>
            <FbLikeButton photoUrl={urls.regular} />
          </FlexItem>
        </Flex>
      </div>
    );
  }
}

export default withErrorHandler(Photo, axios);
