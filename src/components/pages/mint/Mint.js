import React, { useContext, useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { MarketContractContext } from '../../../contexts';

import { Page } from '../../../router';
import { MintDescribe, MintUpload, MintReview } from './steps';

import NotFound404 from '../not-found-404';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 90px);
  padding: 100px 28px 60px;
`;

export default function Mint() {
  const match = useRouteMatch();
  const [nft, setNft] = useState({ conditions: {} });
  const [isMintAllowed, setIsMintAllowed] = useState(null);
  const { getStoragePaid, marketContract } = useContext(MarketContractContext);

  const setNftField = (field, value) => {
    setNft((nftOld) => ({ ...nftOld, [field]: value }));
  };

  useEffect(() => {
    (async () => {
      const storagePaid = await getStoragePaid(marketContract.account.accountId);
      setIsMintAllowed(!!+storagePaid);
    })();
  }, []);

  if (isMintAllowed === false) {
    return (
      <Redirect
        to={{
          pathname: '/mint-not-allowed',
          state: { isMintAllowed },
        }}
      />
    );
  }

  if (isMintAllowed === null) {
    return null;
  }

  return (
    <Container>
      <Switch>
        <Route path={`${match.path}/upload`}>
          <MintUpload
            onUpload={(imageDataUrl) => setNftField('artDataUrl', imageDataUrl)}
            onCompleteLink={`${match.path}/review`}
            nft={nft}
          />
        </Route>
        <Route path={`${match.path}/review`}>
          <MintReview nft={nft} backLink={`${match.path}/upload`} />
        </Route>
        <Route exact path={match.path}>
          <MintDescribe onCompleteLink={`${match.path}/upload`} nft={nft} setNft={setNft} setNftField={setNftField} />
        </Route>
        <Page component={NotFound404} />
      </Switch>
    </Container>
  );
}