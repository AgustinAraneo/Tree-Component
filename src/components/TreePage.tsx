"use client";
import React, { useState } from "react";
import { Tree } from "../components/Tree";
import { Pencil, PencilOff } from "lucide-react";
import { motion } from "framer-motion";
import { LastTrees } from "./LastTrees";
import { toast } from "sonner";

interface TreeNode {
  title: string;
  children: TreeNode[];
}

const initialTree: TreeNode = {
  title: "Raíz del Árbol",
  children: [
    {
      title: "Nodo 1",
      children: [
        { title: "Nodo 1.1", children: [] },
        { title: "Nodo 1.2", children: [] },
      ],
    },
    { title: "Nodo 2", children: [{ title: "Nodo 2.1", children: [] }] },
  ],
};

export const TreePage: React.FC = () => {
  const [editable, setEditable] = useState(false);
  const [treeData, setTreeData] = useState<TreeNode>(initialTree);
  const [savedTreesUpdated, setSavedTreesUpdated] = useState(false);

  const handleSaveTree = () => {
    setSavedTreesUpdated(!savedTreesUpdated);
    const savedTrees = JSON.parse(localStorage.getItem("savedTrees") || "[]");
    const updatedTrees = [...savedTrees, treeData];
    localStorage.setItem("savedTrees", JSON.stringify(updatedTrees));
    toast.success("Árbol guardado exitosamente");
  };

  return (
    <div className="w-full py-20 min-h-screen bg-gradient-to-tl from-black-primary to-black flex flex-col gap-14">
      <h1 className="text-3xl text-center md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-primary to-green-500">
        Tree component - Challenge
      </h1>
      <div className="max-w-4xl w-full mx-auto bg-gradient-to-tl from-black-primary to-black text-white p-6 rounded-lg shadow-[0px_0px_125px_0px_#00ffd4]">
        <div className="flex justify-between">
          <h2 className="text-3xl font-semibold mb-4 underline decoration-green-primary underline-offset-8">
            {editable ? "Editor del Árbol" : "Estructura del Árbol"}
          </h2>
          <div className="flex items-center space-x-4 mb-6">
            <label className="flex items-center space-x-4 cursor-pointer">
              <motion.div
                key={editable.toString()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {editable ? (
                  <PencilOff size={22} className="text-green-primary " />
                ) : (
                  <Pencil size={22} className="text-green-primary " />
                )}
              </motion.div>

              <input
                type="checkbox"
                checked={editable}
                onChange={(e) => setEditable(e.target.checked)}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="font-[family-name:var(--font-geist-mono)]">
          <Tree value={treeData} editable={editable} onChange={setTreeData} />
        </div>
        <div className="flex w-full justify-end">
          <button
            onClick={handleSaveTree}
            className="mt-6 font-bold bg-green-primary hover:bg-green-primary/80 transition duration-300 ease-in-out text-black px-4 py-2 rounded"
          >
            Guardar Árbol
          </button>
        </div>
      </div>

      <LastTrees savedTreesUpdated={savedTreesUpdated} />
    </div>
  );
};
