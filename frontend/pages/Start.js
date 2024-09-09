import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

export default function Start({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Welcome to the MBH App</Header>
      <Paragraph>
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Login")}
      >
        Log in
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Register")}
      >
        Create an account
      </Button>
    </Background>
  );
}