import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";

import { Overlay } from "components/Layout";

import { AuthHeader, SignUp, ForgotPassword, ResetPassword } from "pages/Auth";

import * as Routes from "routes";

import ParticlesBg from "particles-bg";

import Box from "@material-ui/core/Box";

import LandingVector from "../../img/LandingVector.svg";



import ServiceSection from "../../components/ServiceSection/ServiceSection";

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

  @media (max-width: 1250px) {
    margin-top: 50px;
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
  position: absolute;
  width: 1440px;
  height: 535px;
  left: 0px;
  top: 268px;
  background: #1ca7ec;
`;

const Grid = styled.div`
  @media (max-width: 1250px) {
    display: grid;
    width: 100%;
    background-color: #149bde;
    height: 110%;
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
  background-color: #149bde;
  background-image: url(${LandingVector});
  background-position: bottom; 
  background-repeat: no-repeat;
  background-size: cover;
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
  return (
    <Root>
      <Grid>
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
]    </Root>
  );
};

AuthLayout.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default AuthLayout;
