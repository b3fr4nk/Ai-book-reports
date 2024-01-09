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

  const model = new Ollama({ model: "llama2-uncensored" });

  const retriever = vectorStore.asRetriever();

  const prompt = PromptTemplate.fromTemplate(
    `The book's title is ${title}, please give me a full report on what happens in the book, who the characters are, and a couple quotes important quotes for each character. Here is the full book {context}`
  );

  const chain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  return await chain.invoke(
    `The book's title is ${title}, please give me a full report on what happens in the book, who the characters are, and a couple quotes important quotes for each character.`
  );
};
