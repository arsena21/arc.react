import React from "react";
import { render, findByText, fireEvent } from "@testing-library/react";
import {
  Arc,
  DevArcConfig as arcConfig,
  Token,
  TokenData,
  Tokens,
  Members,
  Member,
  MemberData,
  ArcConfig,
  DAO,
} from "../src";

describe("Components with logs ", () => {
  it("Protocol shows error", async () => {
    const badConfig = new ArcConfig(
      arcConfig.web3HttpUrl,
      "wrong url",
      arcConfig.graphqlWsUrl,
      arcConfig.ipfsProvider,
      arcConfig.network
    );
    const { findByTestId, container } = render(
      <Arc config={badConfig}>
        <Tokens>
          <Token.Data>
            {(token: TokenData) => (
              <div>{"Token address: " + token.address}</div>
            )}
          </Token.Data>
        </Tokens>
      </Arc>
    );
    const loader = await findByTestId("default-loader");
    fireEvent.mouseEnter(loader);
    const arcConnectionError = await findByText(container, /Connecting/);
    expect(arcConnectionError).toBeInTheDocument();
  });

  it("ComponentList shows error without arc", async () => {
    const MemberList = (
      <DAO address={""}>
        <Members>
          <Member.Data>
            {(member: MemberData) => (
              <div>{"Member address: " + member.address}</div>
            )}
          </Member.Data>
        </Members>
      </DAO>
    );
    const { findByTestId, container } = render(MemberList);
    const loader = await findByTestId("default-loader");
    fireEvent.mouseEnter(loader);
    const daoAddressError = await findByText(container, /Arc Entity not found/);
    expect(daoAddressError).toBeInTheDocument();
  });

  it("ComponentList shows error without when missing entity", async () => {
    const MemberList = (
      <Members>
        <Member.Data>
          {(member: MemberData) => (
            <div>{"Member address: " + member.address}</div>
          )}
        </Member.Data>
      </Members>
    );
    const { findByTestId, container } = render(MemberList);
    const loader = await findByTestId("default-loader");
    fireEvent.mouseEnter(loader);
    const daoAddressError = await findByText(container, /DAO Entity not found/);
    expect(daoAddressError).toBeInTheDocument();
  });
});
