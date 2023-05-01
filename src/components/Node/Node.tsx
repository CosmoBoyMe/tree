import { ChangeEvent, FC, memo, useState } from 'react';

import './Node.scss';
import { NodeForm } from '../NodeForm/NodeForm';
import { Button } from '../Button/Button';

type Props = {
  text: string;
  id: string;
  parentId: string | null;
  onClickDeleteNode?: (parentId: string | null, nodeId: string) => void;
  onClickUpdateNodeText?: (nodeId: string, text: string) => void;
  onSubmitAddNewChildToNode?: (nodeId: string, text: string) => void;
};

const Node: FC<Props> = memo(
  ({
    text,
    id,
    parentId,
    onClickDeleteNode,
    onClickUpdateNodeText,
    onSubmitAddNewChildToNode,
  }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [nodeText, setNodeText] = useState(text);
    const handleNodeTextChange = (event: ChangeEvent<HTMLInputElement>) => {
      setNodeText(event.currentTarget.value);
    };

    const handleNodeTextUpdateButtonClick = () => {
      if (nodeText !== text) onClickUpdateNodeText?.(id, nodeText);
      setIsEdit(false);
    };

    const handleNewNodeChildSubmit = (childText: string) => {
      onSubmitAddNewChildToNode?.(id, childText);
      setIsFormVisible(false);
    };

    return (
      <div className="node">
        <div className="node__content">
          {isEdit ? (
            <div className="node__edit-field">
              <input
                onChange={handleNodeTextChange}
                type="text"
                value={nodeText}
              />
              <Button text="update" onClick={handleNodeTextUpdateButtonClick} />
            </div>
          ) : (
            <p className="node__text">{text}</p>
          )}

          <div className="node__buttons">
            <Button text="edit" onClick={() => setIsEdit((prev) => !prev)} />
            <Button
              text="delete"
              onClick={() => onClickDeleteNode?.(parentId, id)}
            />
            <Button
              text={isFormVisible ? 'close' : 'add'}
              onClick={() => setIsFormVisible((prev) => !prev)}
            />
          </div>
        </div>
        {isFormVisible && (
          <div className="node__form">
            <NodeForm onSubmit={handleNewNodeChildSubmit} />
          </div>
        )}
      </div>
    );
  }
);

Node.displayName = 'Node';

export { Node };
