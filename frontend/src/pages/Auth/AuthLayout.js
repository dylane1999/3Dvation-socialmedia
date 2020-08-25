import React, { useState, useEffect, useRef } from 'react'
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";

import { Overlay } from "components/Layout";
import   Vanta from "components/Vanta";
import NET from 'vanta/dist/vanta.net.min'

import { AuthHeader, SignUp, ForgotPassword, ResetPassword } from "pages/Auth";

import * as Routes from "routes";

import backgroundImage from "./background.jpeg";

import ParticlesBg from "particles-bg";

import Box from "@material-ui/core/Box";

import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';


import AboutSection from 'components/AboutSection';
import StyledCard from 'components/StyledCard';


import DummyImage from "../../img/Rectangle.png";

import Component from '../../components/TextArea'


import ServiceSection from '../../components/ServiceSection/ServiceSection'


const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: ${(p) => p.theme.zIndex.lg};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  grid-area: c;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    justify-content: center;
  }
`;

const Pages = styled.div`
  margin-top: 80px;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    margin-top: -120px;
  }
`;

const Flex = styled.div`
  grid-area:l
  margin-right: 100px;


  @media (max-width: 1250px) {
    display: none;
  }
`;

const Line = styled.div`
  border-left: 6px solid;
  height: 300px;
  border-image-source: linear-gradient(to bottom, #085d84, #007699, #008fab, #00a8b9, #30c2c3);
  border-image-slice: 1;
  align-self: start;
`;


const Grid = styled.div`


@media (max-width: 1250px) {
  display: grid;
  width: 100%;
  height: 105vh;
  grid-template-columns: auto;
  grid-template-rows: auto;
  justify-content: center;
  grid-template-areas: 
             ".   c   c   c   c   c"
             "l   c   c   c   c   c"
             "l   c   c   c   c   c"
             "l   c   c   c   c   c"
             ".   c   c   c   c   c"
             ".   c   c   c   c   c"
             ".   .   .   .   .   ."
             ".   .   .   .   .   .";
}

 display: grid;
 width: 100%;
 height: 100vh;
 grid-template-columns: auto;
 grid-template-rows: auto;
 justify-content: center;
 grid-template-areas: 
            "c   c   c   c   c   c"
            "c   c   c   c   c   c"
            "c   c   c   c   c   c"
            "c   c   c   c   c   c"
            "c   c   c   c   c   c"
            "c   c   c   c   c   c"
            ".   .   .   .   .   ."
            ".   .   .   .   .   .";


`;





/**
 * Main Layout for the app, when user isn't authenticated
 */
const AuthLayout = ({ refetch }) => {
  const [vantaEffect, setVantaEffect] = useState(0)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(NET({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        color: 0xffffff,
        backgroundColor: 0x0,
        scaleMobile: 1.00,
        shininess: 76.00
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  return (
    <Root>
      <Grid ref={myRef}>
        <Container>
          <AuthHeader refetch={refetch} />
          <Pages>
            <Switch>
              <Route
                exact
                path={Routes.HOME}
                render={() => <SignUp refetch={refetch} />}
              />
              <Route
                exact
                path={Routes.FORGOT_PASSWORD}
                component={ForgotPassword}
              />
              <Route
                exact
                path={Routes.RESET_PASSWORD}
                render={() => <ResetPassword refetch={refetch} />}
              />
              <Redirect to={Routes.HOME} />
            </Switch>
          </Pages>
        </Container>
      </Grid>
      <ServiceSection></ServiceSection>
      <Component></Component>
  

    </Root>
  );
};

AuthLayout.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default AuthLayout;
