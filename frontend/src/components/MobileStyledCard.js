import { Slide } from 'material-auto-rotating-carousel';
import React from "react";

const { red } = require('@material-ui/core/colors');
const { withStyles } = require('@material-ui/core/styles');

const styles = {
  root: {
    height: 100,
    width: 400, 
    backgroundColor:'transparent',
    alignSelf: "start"

  },
  media: {
  }
}
const MobileStyledSlide = withStyles(styles)(Slide);

function StyledCard(props) {
  const { classes } = props;
  return (
<MobileStyledSlide
  media={<img src= {props.image} />}
  title={props.title}
  mediaBackgroundStyle={{ backgroundColor: props.mediaBg }}
  subtitle= {props.subtitle}
  mobile 
  landscape
/>
  );
}


export default StyledCard;
