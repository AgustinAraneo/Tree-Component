import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface TreeNode {
  title: string;
  children: TreeNode[];
}

interface LastTreesProps {
  savedTreesUpdated: boolean;
}

export const LastTrees: React.FC<LastTreesProps> = ({ savedTreesUpdated }) => {
  const [savedTrees, setSavedTrees] = useState<TreeNode[]>([]);
  const router = useRouter();

  useEffect(() => {
    const trees = JSON.parse(localStorage.getItem("savedTrees") || "[]");
    setSavedTrees(trees);
  }, [savedTreesUpdated]);

  const handleTreeClick = (index: number) => {
    router.push(`/tree/${index}`);
  };

  return (
    <div className="pt-2 max-w-4xl w-full mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-4 underline decoration-green-primary underline-offset-8">
        Últimos Árboles
      </h2>
      {savedTrees.length === 0 ? (
        <p className="text-gray-400">No hay árboles guardados aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedTrees.map((tree, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-6 rounded-lg transition-shadow hover:shadow-[0px_0px_50px_-10px_rgba(34,_197,_94,_0.5)] cursor-pointer flex flex-col"
              onClick={() => handleTreeClick(index)}
            >
              <h3 className="text-lg font-semibold text-green-primary truncate mb-2">
                {tree.title}
              </h3>
              <ul className="list-disc pl-4 text-gray-400 space-y-1 flex-1">
                {tree.children.slice(0, 2).map((child, idx) => (
                  <li key={idx} className="truncate">
                    {child.title}
                  </li>
                ))}
                {tree.children.length > 2 && <p>...</p>}
              </ul>
              <p className="text-underline text-green-primary hover:underline underline-offset-4 text-left pl-4">
                Ver más
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
