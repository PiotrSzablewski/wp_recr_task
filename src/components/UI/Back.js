import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from './Button.js'


const Back = ({ history }) => (
  <Button primary onClick={history.goBack}>GoBack</Button>
);

export default withRouter(Back);
