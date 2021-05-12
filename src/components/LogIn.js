import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { NearContext } from '../contexts';

import HeadingText from './common/typography/HeadingText';
import Button from './common/Button';

import bgSignup from '../assets/bg-signup.png';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 28px;

  .sign-up-offer {
    margin-top: 40px;
  }

  @media (min-width: 767px) {
    align-items: center;
    justify-content: center;
    background: url(${bgSignup}) no-repeat bottom left fixed;
  }
`;

export default function LogIn() {
  const { signIn } = useContext(NearContext);

  const signInAction = () => {
    signIn();
  };

  return (
    <Container>
      <HeadingText>Let’s go</HeadingText>
      <p>Log In with your NEAR wallet</p>
      <Button isPrimary isLink>
        <Link to="#" onClick={() => signInAction()}>
          Connect NEAR Wallet
        </Link>
      </Button>
      <p className="sign-up-offer">
        Don’t have a NEAR wallet? No worries, sign up for a wallet <Link to="/sign-up">here</Link>.
      </p>
    </Container>
  );
}