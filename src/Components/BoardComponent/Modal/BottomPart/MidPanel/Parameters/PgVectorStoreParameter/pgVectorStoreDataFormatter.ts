export const pgVectorStoreNodeDataFormatter = (
  pgVectorStoreNodeData: any,
  nodeId: string
) => {
  return {
    id: nodeId,
    name: "PGVector Store",
    description: "pgvectore store",
    type: "PGVectorStore",
    parameters: {
      credentials: {
        id: "a",
        name: "Postgres account",
        provider: "postgres",
        ctype: "db",
      },
      operationMode: pgVectorStoreNodeData?.operationMode,
      tableName: pgVectorStoreNodeData?.tableName,
      options: {
        distanceStrategy: pgVectorStoreNodeData?.distanceStrategy,
        collection: {
          values: {
            useCollection: pgVectorStoreNodeData?.collection,
            // missing in the UI
            collectionName: "n8ns",
            collectionTableName: "n8n_vector_collectionss",
          },
        },
        columnNames: {
          values: {
            idColumnName: pgVectorStoreNodeData?.idColumnName,
            vectorColumnName: pgVectorStoreNodeData?.vectorColumnName,
            contentColumnName: pgVectorStoreNodeData?.contentColumnName,
            metadataColumnName: pgVectorStoreNodeData?.metadataColumnName,
          },
        },
      },
    },
    position: {
      x: -14560,
      y: -140,
    },
    inputs: [
      {
        id: "input",
        name: "fromEmbeddings",
        description: "data coming from embeddings node",
        type: "object",
      },
    ],
    outputs: [
      {
        id: "output",
        name: "pgvectore store output",
        description: "pgvectore output goes into vectore store tool",
        type: "object",
      },
    ],
  };
};
