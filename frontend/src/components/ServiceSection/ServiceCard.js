import { Slide } from 'material-auto-rotating-carousel';
import React from "react";

const { red } = require('@material-ui/core/colors');
const { withStyles } = require('@material-ui/core/styles');

const styles = {
  root: {
    height: 500,
    width: 400, 
    backgroundColor:'transparent',

  },
  media: {
  }
}
const StyledSlide = withStyles(styles)(Slide);

function ServiceCard(props) {
  const { classes } = props;
  return (
<StyledSlide
  media={<img src= {props.image} />}
  title={props.title}
  mediaBackgroundStyle={{ backgroundColor: props.mediaBg }}
  subtitle= {props.subtitle}
/>
  );
}


export default ServiceCard;


