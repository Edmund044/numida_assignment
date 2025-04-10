import { useSuspenseQuery, DocumentNode } from "@apollo/client";

class GraphQLService {
  fetchData<T>(gqlQuery: DocumentNode, variables?: Record<string, any>): T | undefined {
    const { data } = useSuspenseQuery<T>(gqlQuery, { variables });
    return data;
  }
}

export default new GraphQLService();
