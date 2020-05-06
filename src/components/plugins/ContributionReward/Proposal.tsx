import * as React from "react";
import { ContributionRewardProposal as Entity } from "@dorgtech/arc.js";
import {
  Arc as Protocol,
  ArcConfig as ProtocolConfig,
  Component,
  ComponentLogs,
  ComponentProps,
  ProposalEntity,
  ProposalData,
  Proposal,
} from "../../../";
import { CreateContextFeed } from "../../../runtime/ContextFeed";

interface RequiredProps extends ComponentProps {
  // Proposal ID
  id?: string | Entity;
}

interface InferredProps extends RequiredProps {
  config: ProtocolConfig;
  id: string | Entity;
}

class InferredContributionRewardProposal extends Component<
  InferredProps,
  ProposalEntity,
  ProposalData
> {
  protected createEntity(): ProposalEntity {
    const { config, id } = this.props;
    if (!config) {
      throw Error(
        "Arc Config Missing: Please provide this field as a prop, or use the inference component."
      );
    }

    const proposalId = typeof id === "string" ? id : id.id;
    return new Entity(config.connection, proposalId);
  }

  public static get Entity() {
    return CreateContextFeed(
      this._EntityContext.Consumer,
      this._LogsContext.Consumer,
      "ContributionRewardProposal"
    );
  }

  public static get Data() {
    return CreateContextFeed(
      this._DataContext.Consumer,
      this._LogsContext.Consumer,
      "ContributionRewardProposal"
    );
  }

  public static get Logs() {
    return CreateContextFeed(
      this._LogsContext.Consumer,
      this._LogsContext.Consumer,
      "ContributionRewardProposal"
    );
  }

  protected static _EntityContext = React.createContext<Entity | undefined>(
    undefined
  );
  protected static _DataContext = React.createContext<ProposalData | undefined>(
    undefined
  );
  protected static _LogsContext = React.createContext<
    ComponentLogs | undefined
  >(undefined);
}

class ContributionRewardProposal extends React.Component<RequiredProps> {
  public render() {
    const { id, children } = this.props;

    const renderInferred = (id: string | Entity) => (
      <Protocol.Config>
        {(config: ProtocolConfig) => (
          <InferredContributionRewardProposal id={id} config={config}>
            {children}
          </InferredContributionRewardProposal>
        )}
      </Protocol.Config>
    );

    if (!id) {
      return (
        <Proposal.Entity>
          {(proposal: ProposalEntity) => renderInferred(proposal.id)}
        </Proposal.Entity>
      );
    } else {
      return renderInferred(id);
    }
  }

  public static get Entity() {
    return InferredContributionRewardProposal.Entity;
  }

  public static get Data() {
    return InferredContributionRewardProposal.Data;
  }

  public static get Logs() {
    return InferredContributionRewardProposal.Logs;
  }
}

export default ContributionRewardProposal;

export { InferredContributionRewardProposal, ContributionRewardProposal };

// TODO @cesar test this functionality + implement it in other proposals & plugins:
/*

<Plugin id={...}>
  <ContributionRewardPlugin>
    <ContributionRewardPlugin.Data>

    </ContributionRewardPlugin.Data>
  </ContributionRewardPlugin>
</Plugin>

<Proposal id={...}>
  <ContributionRewardProposal>
    <ContributionRewardProposal.Data>

    </ContributionRewardProposal.Data>
  </ContributionRewardProposal>
</Proposal>

*/
