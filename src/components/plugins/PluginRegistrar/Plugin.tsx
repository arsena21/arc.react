import * as React from "react";
import {
  PluginRegistrarPlugin as Entity,
  IPluginRegistrarState as Data,
} from "@dorgtech/arc.js";
import { CreateContextFeed } from "../../../runtime/ContextFeed";
import {
  Arc as Protocol,
  ArcConfig as ProtocolConfig,
  Component,
  ComponentLogs,
  ComponentProps,
  Plugin,
} from "../../..";

interface RequiredProps extends ComponentProps<Entity, Data> {
  // Plugin ID
  id?: string | Entity;
}

interface InferredProps extends RequiredProps {
  config: ProtocolConfig;
  id: string | Entity;
}

class InferredPluginRegistrarPlugin extends Component<
  InferredProps,
  Entity,
  Data
> {
  protected createEntity(): Entity {
    const { config, id } = this.props;

    if (!config) {
      throw Error(
        "Arc Config Missing: Please provide this field as a prop, or use the inference component."
      );
    }

    const pluginId = typeof id === "string" ? id : id.id;
    return new Entity(config.connection, pluginId);
  }

  public static get Entity() {
    return CreateContextFeed(
      this.EntityContext.Consumer,
      this.LogsContext.Consumer,
      "PluginRegistrarPlugin"
    );
  }

  public static get Data() {
    return CreateContextFeed(
      this.DataContext.Consumer,
      this.LogsContext.Consumer,
      "PluginRegistrarPlugin"
    );
  }

  public static get Logs() {
    return CreateContextFeed(
      this.LogsContext.Consumer,
      this.LogsContext.Consumer,
      "PluginRegistrarPlugin"
    );
  }

  public static EntityContext = React.createContext<Entity | undefined>(
    undefined
  );
  public static DataContext = React.createContext<Data | undefined>(undefined);
  public static LogsContext = React.createContext<ComponentLogs | undefined>(
    undefined
  );
}

function usePluginRegistrarPlugin(): [Data | undefined, Entity | undefined] {
  const data = React.useContext<Data | undefined>(
    InferredPluginRegistrarPlugin.DataContext
  );
  const entity = React.useContext<Entity | undefined>(
    InferredPluginRegistrarPlugin.EntityContext
  );

  return [data, entity];
}

class PluginRegistrarPlugin extends React.Component<RequiredProps> {
  public render() {
    const { id, children } = this.props;

    const renderInferred = (id: string | Entity) => (
      <Protocol.Config>
        {(config: ProtocolConfig) => (
          <InferredPluginRegistrarPlugin id={id} config={config}>
            {children}
          </InferredPluginRegistrarPlugin>
        )}
      </Protocol.Config>
    );

    if (!id) {
      return (
        <Plugin.Entity>
          {(plugin: Entity) => renderInferred(plugin.id)}
        </Plugin.Entity>
      );
    } else {
      return renderInferred(id);
    }
  }

  public static get Entity() {
    return InferredPluginRegistrarPlugin.Entity;
  }

  public static get Data() {
    return InferredPluginRegistrarPlugin.Data;
  }

  public static get Logs() {
    return InferredPluginRegistrarPlugin.Logs;
  }
}

export default PluginRegistrarPlugin;

export {
  PluginRegistrarPlugin,
  InferredPluginRegistrarPlugin,
  Entity as PluginRegistrarPluginEntity,
  Data as PluginRegistrarPluginData,
  usePluginRegistrarPlugin,
};