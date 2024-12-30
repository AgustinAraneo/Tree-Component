"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface TreeNode {
  title: string;
  children: TreeNode[];
}

export const TreeDetail: React.FC<{ id: string }> = ({ id }) => {
  const [tree, setTree] = useState<TreeNode | null>(null);

  useEffect(() => {
    const savedTrees = JSON.parse(localStorage.getItem("savedTrees") || "[]");
    const selectedTree = savedTrees[parseInt(id, 10)];
    setTree(selectedTree || null);
  }, [id]);

  if (!tree) {
    return <p className="text-gray-400">Cargando árbol...</p>;
  }

  const renderTree = (node: TreeNode) => (
    <li key={node.title} className="my-2">
      <span className="text-white">{node.title}</span>
      {node.children.length > 0 && (
        <ul className="pl-4 border-l border-green-primary ml-4">
          {node.children.map(renderTree)}
        </ul>
      )}
    </li>
  );

  return (
    <div className="w-full py-20 min-h-screen bg-gradient-to-tl from-black-primary to-black flex flex-col gap-14">
      <h1 className="text-3xl text-center md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-primary to-green-500">
        Tree component - Challenge
      </h1>
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-tl from-black-primary to-black text-white p-6 rounded-lg shadow-[0px_0px_125px_0px_#00ffd4]">
        <h2 className="text-3xl font-semibold mb-4 underline decoration-green-primary underline-offset-8">
          Detalle del Árbol:
        </h2>
        <div className="p-4 bg-gradient-to-tl from-black-primary to-black-primary/50 rounded-lg font-[family-name:var(--font-geist-mono)]">
          <ul>{renderTree(tree)}</ul>
        </div>
        <div className="flex w-full justify-end">
          <Link
            href="/tree"
            className="mt-6 font-bold bg-green-primary hover:bg-green-primary/80 transition duration-300 ease-in-out text-black px-4 py-2 rounded"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};
