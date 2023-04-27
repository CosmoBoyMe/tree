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
} from './helpers';
import './App.scss';
import { Button } from '../Button/Button';

const App = () => {
  const [treeData, setTreeData] = useState<NodeData[]>(mockTree);

  const handleDeleteNodeClick = (parentId: string | null, nodeId: string) => {
    if (parentId === null) {
      const tree = treeData.filter((item) => item.id !== nodeId);
      setTreeData(tree);
    } else {
      const tree = removeNodeFromTree(treeData, parentId, nodeId);
      setTreeData(tree);
    }
  };

  const handleUpdateNodeTextClick = (nodeId: string, text: string) => {
    const tree = updateNodeText(treeData, nodeId, text);
    setTreeData(tree);
  };

  const handleAddNewChildToNodeSubmit = (id: string, text: string) => {
    const tree = addNewChildToNode(treeData, id, text);
    setTreeData(tree);
  };

  const handleAddNewChildToTreeSubmit = (text: string) => {
    setTreeData([...treeData, { id: getUniqueId(), text, children: [] }]);
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
            <Button text="RESET" onClick={handleButtonResetClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export { App };
