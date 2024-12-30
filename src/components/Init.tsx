import Link from "next/link";
import { Button } from "./ui/button";

export const Init = () => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-tl from-black-primary to-black p-4 w-full font-[family-name:var(--font-geist-mono)]">
      <div className="max-w-3xl mx-auto py-8 text-white">
        <h1 className="text-3xl text-center md:text-6xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-green-primary to-green-secondary pb-6">
          Desafio Tree component
        </h1>
        <div className="flex justify-center">
          <Link href={"/tree"}>
            <Button
              className="hover:shadow-[0px_0px_50px_5px_#00ffd4 ] font-bold px-8"
              variant={"submit"}
            >
              Comenzar!
            </Button>
          </Link>
        </div>

        <hr className="w-full bg-green-prfrom-green-primary mt-10 mb-12 text-green-primary" />

        <div className="flex flex-auto justify-between">
          <h1 className="text-4xl font-bold underline underline-offset-4  bg-clip-text  text-transparent bg-gradient-to-t from-green-primary to-green-secondary">
            Introducción al Proyecto
          </h1>
        </div>
        <p>
          <span className="block mt-2 ">
            <br />
            <span className="">Breve descripción:</span> Qué objetivos se
            plantearon para este proyecto?
          </span>
          <br />
        </p>
        <p>
          Este proyecto fue desarrollado como parte del{" "}
          <span className="text-green-primary">Desafío React - Embryoxite</span>
          . Su objetivo principal es implementar una aplicación interactiva que
          permita la creación, visualización y manipulación de estructuras de
          datos en forma de árbol, aprovechando las capacidades de{" "}
          <span className="text-green-primary">React</span> y{" "}
          <span className="text-green-primary">TypeScript</span>
          .
          <br /> Los puntos clave abordados en la aplicación incluyen:
        </p>
        <br />
        <ul className="list-disc pl-6 mt-2">
          <li>
            <span className="font-bold">
              Diseño de un componente Tree reutilizable:
            </span>{" "}
            Capaz de representar estructuras jerárquicas con nodos y subnodos,
            con soporte para edición y visualización controlada mediante un modo
            editable.
          </li>
          <li>
            <span className="font-bold">Interacción dinámica: </span>
            Permitir agregar nuevos nodos en cualquier nivel del árbol y
            eliminar nodos existentes manteniendo la consistencia estructural.
          </li>
          <li>
            <span className="font-bold">Persistencia de datos: </span>
            Almacenamiento y recuperación del árbol desde el{" "}
            <span className="font-bold text-green-primary">localStorage</span>,
            garantizando que las modificaciones persistan tras recargar la
            página.
          </li>
          <li>
            <span className="font-bold">Experiencia de usuario: </span>
            Incorporación de efectos visuales y validación de formularios para
            garantizar una experiencia ágil e intuitiva.
          </li>
        </ul>

        <h2 className="text-2xl  mt-6 font-bold text-emerald-300">
          Tecnologías / Herramientas Utilizadas 💻
        </h2>
        <ul className="list-disc pl-6 mt-2">
          <li>
            <strong>Next.js</strong>
          </li>
          <li>
            <strong>Typescript</strong>
          </li>
          <li>
            <strong>Tailwind.css</strong>
          </li>
          <li>
            <strong>Shadcn</strong>
          </li>
        </ul>
        <h2 className="text-2xl mt-6 font-bold text-emerald-300">
          Dependencias y Configuración 📖
        </h2>
        <p>Para ejecutar este proyecto, sigue estos pasos:</p>
        <h3 className="text-xl mt-4 font-semibold text-emerald-300">
          1. Clonar el Repositorio
        </h3>
        <pre className="bg-gray-800 text-white p-2 mt-2 rounded overflow-x-auto">
          <code className="text-xs whitespace-pre-wrap break-all">
            $ git clone https://github.com/AgustinAraneo/Tree-Component.git
          </code>
        </pre>

        <h3 className="text-xl mt-4 font-semibold text-emerald-300">
          2. Instalación de dependencias
        </h3>
        <pre className="bg-gray-800 text-white p-2 mt-2 rounded">
          <code className="text-sm">$ pnpm i</code>
        </pre>
        <p className="mt-2">
          Ejecuta el comando <code>pnpm i</code> para descargar todas las
          dependencias necesarias del proyecto.
        </p>

        <h2 className="text-2xl  mt-6 font-bold text-emerald-300">
          Despliegue 🚀
        </h2>
        <p>Sigue estos pasos para desplegar la aplicación:</p>
        <pre className="bg-gray-800 text-white p-2 mt-2 rounded ">
          <code className="text-sm">$ pnpm dev</code>
        </pre>
        <p className="mt-2">
          Se ejecuta el comando pnpm dev para levantar el proyecto de forma
          local. <br />
          Puedes visitar la aplicación abriendo tu navegador y accediendo a:{" "}
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-300 underline font-bold"
          >
            http://localhost:3000
          </a>
        </p>
        <h2 className="text-2xl  mt-6">Autor 😎</h2>
        <p>
          Desarrollado por:{" "}
          <a
            href="https://github.com/AgustinAraneo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-300 underline font-bold"
          >
            @AgustinAraneo
          </a>
        </p>
      </div>
    </main>
  );
};
