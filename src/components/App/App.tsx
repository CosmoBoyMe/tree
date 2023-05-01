import { useCallback, useState } from 'react';

import { getUniqueId } from '../../shared/helpers/getUniqueId';
import { NodeList } from '../NodeList/NodeList';
import { NodeData } from '../../shared/types/NodeData';
import { NodeForm } from '../NodeForm/NodeForm';
import { mockTree } from './constants';
import {
  removeNodeFromTree,
  updateNodeText,
  addNewChildToNode,
  cloneTree,
} from './helpers';
import './App.scss';
import { Button } from '../Button/Button';

const App = () => {
  const [treeData, setTreeData] = useState<NodeData[]>(mockTree);

  const handleDeleteNodeClick = useCallback(
    (parentId: string | null, nodeId: string) => {
      setTreeData((prevTree) => {
        if (parentId === null) {
          const newTree = cloneTree(prevTree).filter(
            (item) => item.id !== nodeId
          );
          return newTree;
        }
        const newTree = removeNodeFromTree(prevTree, parentId, nodeId);
        return newTree;
      });
    },
    []
  );

  const handleUpdateNodeTextClick = useCallback(
    (nodeId: string, text: string) => {
      setTreeData((prevTree) => updateNodeText(prevTree, nodeId, text));
    },
    []
  );

  const handleAddNewChildToNodeSubmit = useCallback(
    (id: string, text: string) => {
      setTreeData((prevTree) => addNewChildToNode(prevTree, id, text));
    },
    []
  );

  const handleAddNewChildToTreeSubmit = (text: string) => {
    const newTree = cloneTree(treeData);
    setTreeData([...newTree, { id: getUniqueId(), text, children: [] }]);
  };

  const handleButtonResetClick = () => setTreeData([]);

  return (
    <div className="app">
      <div className="app__inner">
        <NodeList
          parentId={null}
          onClickDeleteNode={handleDeleteNodeClick}
          onClickUpdateNodeText={handleUpdateNodeTextClick}
          onSubmitAddNewChildToNode={handleAddNewChildToNodeSubmit}
          items={treeData}
        />
        <div className="app__node-form">
          <NodeForm onSubmit={handleAddNewChildToTreeSubmit} />
        </div>
        {treeData.length > 0 && (
          <div className="app__reset-button">
            <Button text="reset" onClick={handleButtonResetClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export { App };
