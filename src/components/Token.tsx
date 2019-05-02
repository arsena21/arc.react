import * as React from "react";
import {
  Component,
  ComponentLogs,
  BaseProps,
} from "../runtime";
import {
  CreateContextFeed
} from "../runtime/ContextFeed";
import {
  Arc,
  ArcConfig
} from "../protocol";
import {
  Token as Entity,
  ITokenState as Data
} from "@daostack/client";

type Code = { }

const entityConsumer = Component.EntityContext<Entity>().Consumer;
const dataConsumer   = Component.DataContext<Data>().Consumer;
const codeConsumer   = Component.CodeContext<Code>().Consumer;
const logsConsumer   = Component.LogsContext().Consumer;

interface RequiredProps {
  // Address of the Token
  address: string;
}

interface InferredProps {
  // Arc Instance
  arcConfig: ArcConfig | undefined;
}

type Props = RequiredProps & InferredProps & BaseProps;

// TODO: DAOToken & DAOReputation
class ArcToken extends Component<Props, Entity, Data, Code>
{
  createEntity(): Entity {
    const { arcConfig, address } = this.props;
    if (!arcConfig) {
      throw Error("Arc Config Missing: Please provide this field as a prop, or use the inference component.");
    }
    return new Entity(address, arcConfig.connection);
  }

  public static get Entity() {
    return CreateContextFeed(entityConsumer);
  }

  public static get Data() {
    return CreateContextFeed(dataConsumer);
  }

  public static get Code() {
    return CreateContextFeed(codeConsumer);
  }

  public static get Logs() {
    return CreateContextFeed(logsConsumer);
  }
}

class Token extends React.Component<RequiredProps>
{
  render() {
    const { address, children } = this.props;

    return (
      <Arc.Config>
      {(arc: ArcConfig) => (
        <ArcToken address={address} arcConfig={arc}>
        {children}
        </ArcToken>
      )}
      </Arc.Config>
    );
  }

  public static get Entity() {
    return CreateContextFeed(entityConsumer);
  }

  public static get Data() {
    return CreateContextFeed(dataConsumer);
  }

  public static get Code() {
    return CreateContextFeed(codeConsumer);
  }

  public static get Logs() {
    return CreateContextFeed(logsConsumer);
  }
}

export default Token;

export {
  ArcToken,
  Token,
  Props as TokenProps,
  Entity as TokenEntity,
  Data as TokenData,
  Code as TokenCode,
  ComponentLogs
};