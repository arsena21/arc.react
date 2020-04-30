import * as React from "react";
import { Component, ComponentLogs } from "../runtime";
import { CreateContextFeed } from "../runtime/ContextFeed";
import { Arc, ArcConfig } from "../protocol";
import { Token as Entity, ITokenState as Data } from "@daostack/client";
import { DAO, DAOData } from "./DAO";

interface RequiredProps {
  // Address of the Token
  address?: string;
}

interface InferredProps {
  // Arc Instance
  arcConfig: ArcConfig | undefined;
}

type Props = RequiredProps & InferredProps;

class ArcToken extends Component<Props, Entity, Data> {
  protected createEntity(): Entity {
    const { arcConfig, address } = this.props;
    if (!arcConfig) {
      throw Error(
        "Arc Config Missing: Please provide this field as a prop, or use the inference component."
      );
    }
    if (!address) {
      throw Error(
        "Address Missing: Please provide this field as a prop, or use the inference component."
      );
    }
    return new Entity(address, arcConfig.connection);
  }

  public static get Entity() {
    return CreateContextFeed(
      this._EntityContext.Consumer,
      this._LogsContext.Consumer
    );
  }

  public static get Data() {
    return CreateContextFeed(
      this._DataContext.Consumer,
      this._LogsContext.Consumer
    );
  }

  public static get Logs() {
    return CreateContextFeed(
      this._LogsContext.Consumer,
      this._LogsContext.Consumer
    );
  }

  protected static _EntityContext = React.createContext<{} | undefined>(
    undefined
  );
  protected static _DataContext = React.createContext<{} | undefined>(
    undefined
  );
  protected static _LogsContext = React.createContext<{} | undefined>({});
}

class Token extends React.Component<RequiredProps> {
  public render() {
    const { address, children } = this.props;

    if (address !== undefined) {
      return (
        <Arc.Config>
          {(arc: ArcConfig) => (
            <ArcToken address={address} arcConfig={arc}>
              {children}
            </ArcToken>
          )}
        </Arc.Config>
      );
    } else {
      return (
        <Arc.Config>
          <DAO.Data>
            {(arc: ArcConfig, dao: DAOData) => (
              <ArcToken address={dao.token.address} arcConfig={arc}>
                {children}
              </ArcToken>
            )}
          </DAO.Data>
        </Arc.Config>
      );
    }
  }

  public static get Entity() {
    return ArcToken.Entity;
  }

  public static get Data() {
    return ArcToken.Data;
  }

  public static get Logs() {
    return ArcToken.Logs;
  }
}

export default Token;

export {
  ArcToken,
  Token,
  Props as TokenProps,
  Entity as TokenEntity,
  Data as TokenData,
  ComponentLogs,
};
