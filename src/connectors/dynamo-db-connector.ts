import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Book } from '../models/book';
import { v4 } from "uuid";

const dynamo = new DocumentClient();

export async function create(table: string, book: Book) {
  const params = {
    TableName: table,
    Item: {
      id: v4(),
      ...book
    }
  }
  await dynamo.put(params).promise();
}

export async function get(table: string, id: string) {
  const params = {
    TableName: table,
    Key: {
      id
    }
  };

  const dbResponse = await dynamo.get(params).promise();
  return dbResponse.Item;
}