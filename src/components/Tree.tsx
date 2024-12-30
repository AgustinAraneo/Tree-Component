import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Trash, PlusSquare, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TreeNode {
  title: string;
  children: TreeNode[];
}

interface TreeProps {
  value: TreeNode;
  editable: boolean;
  onChange: (newTree: TreeNode) => void;
}

export const Tree: React.FC<TreeProps> = ({ value, editable, onChange }) => {
  const [tree, setTree] = useState<TreeNode>(value);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newNodeTitle, setNewNodeTitle] = useState("");
  const [currentParent, setCurrentParent] = useState<TreeNode | null>(null);
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>(
    {}
  );

  const handleRootTitleChange = (newTitle: string) => {
    const updatedTree = { ...tree, title: newTitle };
    setTree(updatedTree);
    onChange(updatedTree);
  };

  const openDialog = (parent: TreeNode | null) => {
    setCurrentParent(parent);
    setNewNodeTitle("");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddNode = () => {
    if (!newNodeTitle.trim()) return;

    const newTree = { ...tree };

    if (currentParent === null) {
      newTree.children.push({ title: newNodeTitle, children: [] });
    } else {
      const addChild = (node: TreeNode) => {
        if (node === currentParent) {
          node.children.push({ title: newNodeTitle, children: [] });
        } else {
          node.children.forEach(addChild);
        }
      };
      addChild(newTree);
    }

    setTree(newTree);
    onChange(newTree);
    toast.success(`Nodo "${newNodeTitle}" agregado exitosamente.`);
    closeDialog();
  };

  const handleRemoveNode = (target: TreeNode) => {
    const newTree = { ...tree };
    const removeNode = (node: TreeNode, parent?: TreeNode) => {
      if (node === target && parent) {
        parent.children = parent.children.filter((child) => child !== node);
      } else {
        node.children.forEach((child) => removeNode(child, node));
      }
    };
    removeNode(newTree);
    setTree(newTree);
    onChange(newTree);
    toast.success(`Nodo "${target.title}" eliminado exitosamente.`);
  };

  const toggleCollapse = (node: TreeNode) => {
    const newCollapsedNodes = { ...collapsedNodes };
    const isCollapsed = newCollapsedNodes[node.title];
    newCollapsedNodes[node.title] = !isCollapsed;

    if (!isCollapsed) {
      const collapseChildren = (node: TreeNode) => {
        newCollapsedNodes[node.title] = true;
        node.children.forEach(collapseChildren);
      };
      collapseChildren(node);
    }

    setCollapsedNodes(newCollapsedNodes);
  };

  const renderTree = (node: TreeNode) => (
    <li key={node.title} className="my-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {node.children.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleCollapse(node)}
              className="text-gray-200"
              title={collapsedNodes[node.title] ? "Expandir" : "Colapsar"}
            >
              {collapsedNodes[node.title] ? (
                <Plus size={16} />
              ) : (
                <Minus size={16} />
              )}
            </motion.button>
          )}
          <span>{node.title}</span>
        </div>
        {editable && (
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-green-400 hover:bg-green-500 text-white shadow"
              onClick={() => openDialog(node)}
              title="Agregar subnodo"
            >
              <PlusSquare size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-red-400 hover:bg-red-500 text-white shadow"
              onClick={() => handleRemoveNode(node)}
              title="Eliminar nodo"
            >
              <Trash size={16} />
            </motion.button>
          </div>
        )}
      </div>
      {!collapsedNodes[node.title] && node.children.length > 0 && (
        <ul className="ml-4 border-l border-green-secondary pl-4">
          {node.children.map(renderTree)}
        </ul>
      )}
    </li>
  );

  return (
    <div className="p-4 bg-gradient-to-tl from-black-primary to-black-primary/50 rounded-lg">
      <ul>
        <li className="my-2">
          <div className="flex items-center justify-between">
            {editable ? (
              <Input
                className="text-lg font-bold w-1/3 border-none"
                value={tree.title}
                onChange={(e) => handleRootTitleChange(e.target.value)}
              />
            ) : (
              <h2 className="font-bold">{tree.title}</h2>
            )}
            {editable && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow"
                onClick={() => openDialog(null)}
                title="Agregar nodo raíz"
              >
                <PlusCircle size={16} />
              </motion.button>
            )}
          </div>
          {tree.children.length > 0 && (
            <ScrollArea className="ml-4 border-l border-green-primary pl-4">
              <ul className="max-h-[20rem]">{tree.children.map(renderTree)}</ul>
            </ScrollArea>
          )}
        </li>
      </ul>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nodo</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Nombre del nodo"
            value={newNodeTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewNodeTitle(e.target.value)
            }
          />
          <DialogFooter>
            <Button variant="secondary" onClick={closeDialog}>
              Cancelar
            </Button>
            <Button variant="default" onClick={handleAddNode}>
              Agregar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
