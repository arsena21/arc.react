import * as React from "react";
import { ProtocolConfig } from "./ProtocolConfig";
import { ProtocolLogs } from "./logging/ProtocolLogs";
export { ProtocolConfig };

interface Props<Config extends ProtocolConfig> {
  config: Config;
}

interface State {
  // Diagnostics for the component
  logs: ProtocolLogs;
}

export abstract class Protocol<
  Config extends ProtocolConfig
> extends React.Component<Props<Config>, State> {
  // Complete any asynchronous initialization work needed by the ProtocolConfig
  protected async initialize() {}
  protected static _ConfigContext: React.Context<{} | undefined>;
  protected static _LogsContext: React.Context<{} | undefined>;

  constructor(props: Props<Config>) {
    super(props);
    this.state = {
      logs: new ProtocolLogs(),
    };
  }

  // This trick allows us to access the static objects
  // defined in the derived class. See this code sample:
  // https://github.com/Microsoft/TypeScript/issues/5989#issuecomment-163066313
  // @ts-ignore: This should always be true
  "constructor": typeof Protocol;

  public render() {
    const ConfigProvider = this.constructor._ConfigContext.Provider as any;
    const LogsProvider = this.constructor._LogsContext.Provider;
    const { logs } = this.state;
    const { config, children } = this.props;
    return (
      <ConfigProvider value={config.isInitialized ? config : undefined}>
        <LogsProvider value={logs}>{children}</LogsProvider>
      </ConfigProvider>
    );
  }

  public async componentDidMount() {
    const { logs } = this.state;
    logs.configInitializeStarted();
    this.setState({
      logs: logs.clone(),
    });
    try {
      await this.initialize();
      this.forceUpdate();
      logs.configInitializeCompleted();
      this.setState({
        logs: logs.clone(),
      });
    } catch (e) {
      logs.configInitializeFailed(e);
      this.setState({
        logs: logs.clone(),
      });
    }
  }
}
