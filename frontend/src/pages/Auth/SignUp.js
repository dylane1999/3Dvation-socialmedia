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
import PrinterIcon from "../../img/PrinterIcon.svg";

import MobileStyledCard from "components/MobileStyledCard";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles({
  root: {
    background: "#30ADEB",
    border: 0,
    borderRadius: "5px",
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
  overflow: hidden;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    justify-content: space-between;
    margin-top: 120px;
  }
`;

const Welcome = styled.div`
  padding: 5.5rem;
  height: 40rem;
  border-radius: 6.64407px 0px 0px 6.64407px;
  flex-direction: column;
  background-color: rgba(55, 55, 55, 0.6);
  width: 100%;

  @media (max-width: 1050px) {
    height: 100%;
    border-radius: 6.64407px 6.64407px 0% 0%;
  }
`;

const IntroCard = styled.div``;

const MobileIntroCard = styled.div`
  @media (min-width: 1050px) {
    display: none;
  }
`;

const Heading = styled(H1)`
  margin-bottom: ${(p) => p.theme.spacing.sm};
`;

const CalltoAction = styled(H1)`
  font-weight: 500;
  line-height: 28px;
  font-family: aktiv-grotesk, sans-serif;
  /* identical to box height */

  color: #ffffff;
`;

const Form = styled.div`
  border-radius: 0% 6.64407px 6.64407px 0%;

  padding: 3rem;
  height: 100%;
  background: rgba(0, 0, 0, 0.29);
  width: 100%;

  @media (min-width: ${(p) => p.theme.screen.sm}) {
    width: 500px;
  }
  @media (max-width: 1050px) {
    border-radius: 0% 0% 6.64407px 6.64407px;
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

  const screenLarge = useMediaQuery("(min-width: 1050px)");
  const screenSmall = useMediaQuery("(max-width: 1050px)");

  const GetHeroScreenSize = () => {
    if (screenLarge) {
      return "row";
    } else if (screenSmall) {
      return "column";
    }
  };

  const GetCardType = () => {
    if (screenLarge) {
      return (
        <StyledCard
          image={PrinterIcon}
          //title={"Lorem Ipsum"}
          //subtitle={"lorem ipsum iore"}
          mediaBg={"transparent"}
        ></StyledCard>
      );
    } else if (screenSmall) {
      return (
        <MobileStyledCard
          image={Rectangle}
          //title={"Lorem Ipsum"}
          //subtitle={"lorem ipsum iore"}
          mediaBg={"transparent"}
        ></MobileStyledCard>
      );
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
                  <Welcome>{GetCardType()}</Welcome>
                </Box>
              </IntroCard>

              <Box>
                <Form>
                  <Spacing bottom="md">
                    <CalltoAction>Create Account</CalltoAction>
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
