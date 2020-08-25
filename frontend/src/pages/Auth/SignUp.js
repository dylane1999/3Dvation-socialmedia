import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";

import { Spacing, Container } from "components/Layout";
import { H1, Error } from "components/Text";
import { InputText } from "components/Form";
import Head from "components/Head";

import { SIGN_UP } from "graphql/user";

import * as Routes from "routes";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Box from "@material-ui/core/Box";

import StyledCard from "components/StyledCard";
import Rectangle from "../../img/Rectangle.png";
import MobileStyledCard from "components/MobileStyledCard";

import useMediaQuery from '@material-ui/core/useMediaQuery';



const useStyles = makeStyles({
  root: {
    background:
      "linear-gradient(to right, #085d84, #007699, #008fab, #00a8b9, #30c2c3);",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(8, 93, 132, .3)",
    color: "white",
    height: 48,
    width: "100%",
    padding: "0 30px",
  },
});

const Root = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 60px;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    justify-content: space-between;
    margin-top: 120px;
  }
`;

const Welcome = styled.div`
  padding: 4rem;
  height: 40rem;
  border-radius: 5% 0% 0% 5%;
  flex-direction: column;
  background-color: rgba(55, 55, 55, 0.87);
  width: 100%;
  
  @media (max-width: 1050px ) {
    border-radius: 5% 5% 5% 5%;

  }
`;

const IntroCard = styled.div`
  @media (max-width: 1050px ) {
    display: none;

  }
`;

const MobileIntroCard = styled.div`
  @media (min-width: 1050px ) {
    display: none;

  }
`;

const Heading = styled(H1)`
  margin-bottom: ${(p) => p.theme.spacing.sm};
`;

const Form = styled.div`
  border-radius: 0% 5% 5% 0%;

  padding: 3rem;
  height: 100%;
  background-color: rgba(182, 182, 182, 0.7);
  width: 100%;

  @media (min-width: ${(p) => p.theme.screen.sm}) {
    width: 500px;
  }
  @media (max-width: 1050px ) {
    border-radius: 5% 5% 5% 5%;

  }
`;


/**
 * Sign Up page
 */



const SignUp = ({ history, refetch }) => {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    if (!fullName || !email || !username || !password) {
      return "All fields are required";
    }

    if (fullName.length > 50) {
      return "Full name no more than 50 characters";
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(email).toLowerCase())) {
      return "Enter a valid email address.";
    }

    const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    if (!usernameRegex.test(username)) {
      return "Usernames can only use letters, numbers, underscores and periods";
    } else if (username.length > 20) {
      return "Username no more than 50 characters";
    }

    if (password.length < 6) {
      return "Password min 6 characters";
    }

    return false;
  };

  const handleSubmit = (e, signup) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setError(error);
      return false;
    }

    signup().then(async ({ data }) => {
      localStorage.setItem("token", data.signup.token);
      await refetch();
      history.push(Routes.HOME);
    });
  };

  const renderErrors = (apiError) => {
    let errorMessage;

    if (error) {
      errorMessage = error;
    } else if (apiError) {
      errorMessage = apiError.graphQLErrors[0].message;
    }

    if (errorMessage) {
      return (
        <Spacing bottom="sm" top="sm">
          <Error>{errorMessage}</Error>
        </Spacing>
      );
    }

    return null;
  };

  const { fullName, email, password, username } = values;
  const classes = useStyles();

  const screenLarge = useMediaQuery('(min-width: 1050px)');
  const screenSmall = useMediaQuery('(max-width: 1050px)');

  const GetHeroScreenSize = () => {
    if (screenLarge) {
      return "row"

      
    }
    else if (screenSmall) {
      return "column"
      
    }

  };


  return (
    <Mutation
      mutation={SIGN_UP}
      variables={{ input: { fullName, email, password, username } }}
    >
      {(signup, { loading, error: apiError }) => {
        return (
          <Root maxWidth="lg">
            <Head />
            <Box
              justifyContent="center"
              alignContent="center"
              display="flex"
              flexDirection={GetHeroScreenSize()}
              p={1}
              m={1}
            >
              <IntroCard>
                <Box justifyItems="center">
                  <Welcome>
                    <StyledCard
                      image={Rectangle}
                      title={"Lorem Ipsum"}
                      subtitle={"lorem ipsum iore"}
                      mediaBg={"transparent"}
                    ></StyledCard>
                  </Welcome>
                   
                </Box>
              </IntroCard>

              



              

              <Box>
                <Form>
                  <Spacing bottom="md">
                    <H1>Create Account</H1>
                  </Spacing>

                  <form onSubmit={(e) => handleSubmit(e, signup)}>
                    <Box
                      justifyContent="center"
                      alignContent="center"
                      display="flex"
                      flexDirection="column"
                    >
                      <Box>
                        <p>Full name</p>
                        <InputText
                          type="text"
                          name="fullName"
                          values={fullName}
                          onChange={handleChange}
                          placeholder="John Smith"
                          borderColor="white"
                        />
                      </Box>
                      <Box>
                        <Spacing top="xs" bottom="xs">
                          <p>Email</p>
                          <InputText
                            type="text"
                            name="email"
                            values={email}
                            onChange={handleChange}
                            placeholder="Example@gmail.com"
                            borderColor="white"
                          />
                        </Spacing>
                      </Box>
                      <Box>
                        <p>Username</p>

                        <InputText
                          type="text"
                          name="username"
                          values={username}
                          onChange={handleChange}
                          placeholder="Example_Username"
                          borderColor="white"
                        />
                      </Box>
                      <Box>
                        <Spacing top="xs" bottom="xs">
                          <p>Password</p>

                          <InputText
                            type="password"
                            name="password"
                            values={password}
                            onChange={handleChange}
                            placeholder="4-18 Characters"
                            borderColor="white"
                          />
                        </Spacing>
                      </Box>
                    </Box>

                    {renderErrors(apiError)}

                    <Spacing top="sm" />

                    <Button type="submit" className={classes.root}>
                      {" "}
                      Sign Up{" "}
                    </Button>
                  </form>
                </Form>
              </Box>
            </Box>
          </Root>
        );
      }}
    </Mutation>
  );
};

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default withRouter(SignUp);
