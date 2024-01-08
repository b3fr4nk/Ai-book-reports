import { openTable } from "./vectors";
import { Ollama } from "langchain/llms/ollama";
import { PromptTemplate } from "langchain/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";
import { LanceDB } from "langchain/vectorstores/lancedb";
import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { formatDocumentsAsString } from "langchain/util/document";

export const createReport = async (title: string) => {
  const table = await openTable(title);
  const vectorStore = new LanceDB(new OllamaEmbeddings(), {
    table,
  });

  const model = new Ollama({ model: "book-model" });

  const retriever = vectorStore.asRetriever();

  const prompt = PromptTemplate.fromTemplate(
    "Create a book report from the following book {book}"
  );

  const chain = RunnableSequence.from([
    {
      book: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  return await chain.invoke("create a book report");
};
