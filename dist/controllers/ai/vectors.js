"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openTable = exports.createTable = void 0;
const lancedb_1 = require("langchain/vectorstores/lancedb");
const text_1 = require("langchain/document_loaders/fs/text");
const ollama_1 = require("langchain/embeddings/ollama");
const vectordb_1 = require("vectordb");
const fs = __importStar(require("node:fs/promises"));
const path = __importStar(require("node:path"));
const node_os_1 = __importDefault(require("node:os"));
const text_splitter_1 = require("langchain/dist/text_splitter");
const createDocs = (doc) => __awaiter(void 0, void 0, void 0, function* () {
    const splitter = new text_splitter_1.CharacterTextSplitter({
        separator: "\n",
        chunkSize: 120,
        chunkOverlap: 30,
    });
    const loader = new text_1.TextLoader(doc);
    return yield loader.loadAndSplit(splitter);
});
const createTable = (name, doc) => __awaiter(void 0, void 0, void 0, function* () {
    const documents = yield createDocs(doc);
    const dir = yield fs.mkdtemp(path.join(node_os_1.default.tmpdir(), "lancedb-"));
    const db = yield (0, vectordb_1.connect)(dir);
    try {
        const table = yield db.createTable(name, [
            {
                vector: Array(4096),
                text: "sample",
                source: "a",
                loc: { lines: { from: 0, to: 0 } },
            },
        ]);
        yield lancedb_1.LanceDB.fromDocuments(documents, new ollama_1.OllamaEmbeddings(), { table });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createTable = createTable;
const openTable = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dir = yield path.join(node_os_1.default.tmpdir(), "lancedb-");
        const db = yield (0, vectordb_1.connect)(dir);
        const table = yield db.openTable(name);
        const vectorStore = yield new lancedb_1.LanceDB(new ollama_1.OllamaEmbeddings(), {
            table,
        });
        return vectorStore;
    }
    catch (err) {
        console.log(err);
    }
});
exports.openTable = openTable;
