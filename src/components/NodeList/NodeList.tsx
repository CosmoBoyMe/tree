import { FC } from 'react';

import { Node } from '../Node/Node';
import { NodeData } from '../../shared/types/NodeData';
import './NodeList.scss';

type Props = {
  parentId: string | null;
  items: NodeData[];
  onClickDeleteNode?: (parentId: string | null, nodeId: string) => void;
  onClickUpdateNodeText?: (nodeId: string, text: string) => void;
  onSubmitAddNewChildToNode?: (nodeId: string, text: string) => void;
};

const NodeList: FC<Props> = ({
  parentId,
  items,
  onClickDeleteNode,
  onClickUpdateNodeText,
  onSubmitAddNewChildToNode,
}) => {
  return (
    <div className="node-list">
      {items.map((item) => (
        <div className="node-list__inner" key={item.id}>
          <div className="node-list__node">
            <Node
              key={item.id}
              id={item.id}
              parentId={parentId}
              text={item.text}
              onClickDeleteNode={onClickDeleteNode}
              onClickUpdateNodeText={onClickUpdateNodeText}
              onSubmitAddNewChildToNode={onSubmitAddNewChildToNode}
            />
          </div>
          {item.children.length > 0 && (
            <div className="node-list__node-children">
              <NodeList
                parentId={item.id}
                items={item.children}
                onClickDeleteNode={onClickDeleteNode}
                onClickUpdateNodeText={onClickUpdateNodeText}
                onSubmitAddNewChildToNode={onSubmitAddNewChildToNode}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export { NodeList };
