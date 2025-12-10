import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import awsconfig from "../aws-exports.js";
import { ERRORS } from "../constants/error.js";


Amplify.configure(awsconfig);

export const client = generateClient({
  authMode: "apiKey" ,
});



export async function runQuery(query: any, variables?: any) {
  
  try {
    const res: any = await client.graphql({
      query,
      variables,
    });


    return res.data;
  } catch (err) {
    console.error(ERRORS.GRAPHQL_ERROR , err )
  }
}
