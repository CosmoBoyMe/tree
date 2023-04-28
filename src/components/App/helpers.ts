import { NodeData } from '../../shared/types/NodeData';
import { getUniqueId } from '../../shared/helpers/getUniqueId';

const cloneTree = (tree: NodeData[]): NodeData[] =>
  tree.map((item) => ({
    ...item,
    children: cloneTree(item.children),
  }));

const removeNodeFromTree = (
  tree: NodeData[],
  parentId: string | null,
  nodeId: string
): NodeData[] => {
  return tree.map((item) => {
    if (item.id === parentId) {
      const newChildren = item.children.filter((child) => child.id !== nodeId);
      return { ...item, children: newChildren };
    }
    return {
      ...item,
      children: removeNodeFromTree(item.children, parentId, nodeId),
    };
  });
};

const updateNodeText = (
  tree: NodeData[],
  nodeId: string,
  text: string
): NodeData[] => {
  return tree.map((item) => {
    if (item.id === nodeId) return { ...item, text };

    return {
      ...item,
      children: updateNodeText(item.children, nodeId, text),
    };
  });
};

const addNewChildToNode = (
  tree: NodeData[],
  nodeId: string,
  text: string
): NodeData[] => {
  return tree.map((item) => {
    if (item.id === nodeId) {
      const newChild = { id: getUniqueId(), text, children: [] };
      return { ...item, text, children: [...item.children, newChild] };
    }

    return {
      ...item,
      children: addNewChildToNode(item.children, nodeId, text),
    };
  });
};

export { removeNodeFromTree, updateNodeText, addNewChildToNode, cloneTree };
