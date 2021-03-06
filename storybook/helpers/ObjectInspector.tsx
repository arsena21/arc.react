import * as React from "react";
import {
  ObjectInspector,
  ObjectRootLabel,
  ObjectLabel
} from "react-inspector";

const nodeRenderer = (node: any, tooltip: string) => {
  const { depth, name, data, isNonenumerable } = node;

  return (
    depth === 0
      ? <ObjectRootLabel name={name} data={tooltip} />
      : <ObjectLabel name={name} data={data} isNonenumerable={isNonenumerable} />
  );
}

export default (data: any, name: string, tooltip: string, expanded: boolean = true) => {
  return (
    <ObjectInspector
      data={{...data}}
      name={name}
      expandLevel={expanded ? 1 : 0}
      theme={"chromeDark"}
      nodeRenderer={(node: any) => nodeRenderer(node, tooltip)} />
  );
}
