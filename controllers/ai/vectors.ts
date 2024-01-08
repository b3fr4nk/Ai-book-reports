import { LanceDB } from "langchain/vectorstores/lancedb";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { Table, connect } from "vectordb";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import os from "node:os";
import { CharacterTextSplitter } from "langchain/text_splitter";

const createDocs = async (doc: string) => {
  const splitter = new CharacterTextSplitter({
    separator: "\n",
    chunkSize: 120,
    chunkOverlap: 30,
  });

  const loader = new TextLoader(doc);
  return await loader.loadAndSplit(splitter);
};

export const createTable = async (name: string, doc: string) => {
  const documents = await createDocs(doc);

  const dir = "./lancedb";
  const db = await connect(dir);

  try {
    const table = await db.createTable(name, [
      {
        vector: Array(4096),
        text: "sample",
        source: "a",
        loc: { lines: { from: 0, to: 0 } },
      },
    ]);

    console.log("table created");

    const vectorStore = await LanceDB.fromDocuments(
      documents,
      new OllamaEmbeddings(),
      { table }
    );
  } catch (err) {
    console.log(err);
  }
};

export const openTable = async (name: string): Promise<Table<number[]>> => {
  const dir = "./lancedb";
  const db = await connect(dir);

  const table = await db.openTable(name);

  return table;
};
