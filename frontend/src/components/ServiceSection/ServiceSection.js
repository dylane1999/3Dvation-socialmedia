import React from "react";
import ServiceCard from "./ServiceCard";
import Rectangle from "../../img/Rectangle.png";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import styles from "./ServiceStyle.module.css";

const Root = styled.div`
  height: 100%
  width: 100%
  background-color: #8F8F8F;

`;


export const ServiceSection = () => {
  const screenLarge = useMediaQuery("(min-width: 1400px)");
  const screenSmall = useMediaQuery("(max-width: 1400px)");

  const GetFlexDirection = () => {
    if (screenLarge) {
      return "row";
    } else if (screenSmall) {
      return "column";
    }
  };
  return (
    <Root>
      <Box
        flexDirection={GetFlexDirection()}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        display="flex"
      >
        <Box p={4}>
          <div className={styles.container}>
            <ServiceCard
              image={Rectangle}
              title={"Lorem Ipsum"}
              subtitle={"lorem ipsum iore"}
              mediaBg={"transparent"}
            ></ServiceCard>
          </div>
        </Box>

        <Box p={4}>
          <div className={styles.container}>
            <ServiceCard
              image={Rectangle}
              title={"Lorem Ipsum"}
              subtitle={"lorem ipsum iore"}
              mediaBg={"transparent"}
            ></ServiceCard>
          </div>
        </Box>

        <Box p={4}>
          <div className={styles.container}>
            <ServiceCard
              image={Rectangle}
              title={"Lorem Ipsum"}
              subtitle={"lorem ipsum iore"}
              mediaBg={"transparent"}
            ></ServiceCard>
          </div>
        </Box>
      </Box>
    </Root>
  );
};

export default ServiceSection;
