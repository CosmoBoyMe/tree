import { ChangeEvent, FC, useState } from 'react';

import './Node.scss';
import { NodeData } from '../../shared/types/NodeData';
import { NodeForm } from '../NodeForm/NodeForm';
import { Button } from '../Button/Button';

type Props = {
  data: NodeData;
  onClickDeleteNode?: () => void;
  onClickUpdateNodeText?: (text: string) => void;
  onSubmitAddNewChildToNode?: (text: string) => void;
};

const Node: FC<Props> = ({
  data,
  onClickDeleteNode,
  onClickUpdateNodeText,
  onSubmitAddNewChildToNode,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [nodeText, setNodeText] = useState(data.text);

  const handleNodeTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNodeText(event.currentTarget.value);
  };

  const handleNodeTextUpdateButtonClick = () => {
    if (nodeText !== data.text) onClickUpdateNodeText?.(nodeText);
    setIsEdit(false);
  };

  const handleNewNodeChildSubmit = (text: string) => {
    onSubmitAddNewChildToNode?.(text);
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
          <p className="node__text">{data.text}</p>
        )}

        <div className="node__buttons">
          <Button text="edit" onClick={() => setIsEdit((prev) => !prev)} />
          <Button text="delete" onClick={onClickDeleteNode} />
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
};

export { Node };
