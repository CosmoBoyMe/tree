import { useState } from 'react';

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

  const handleDeleteNodeClick = (parentId: string | null, nodeId: string) => {
    if (parentId === null) {
      const newTree = cloneTree(treeData).filter((item) => item.id !== nodeId);
      setTreeData(newTree);
    } else {
      const newTree = removeNodeFromTree(treeData, parentId, nodeId);
      setTreeData(newTree);
    }
  };

  const handleUpdateNodeTextClick = (nodeId: string, text: string) => {
    const newTree = updateNodeText(treeData, nodeId, text);
    setTreeData(newTree);
  };

  const handleAddNewChildToNodeSubmit = (id: string, text: string) => {
    const newTree = addNewChildToNode(treeData, id, text);
    setTreeData(newTree);
  };

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
