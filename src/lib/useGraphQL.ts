import request from "graphql-request";
import { type TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  QueryClient,
  QueryFunction,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";

export function usePrefetchGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): {
  queryKey: [any, TVariables];
  queryFn: QueryFunction<TResult, any[], never>;
} {
  return {
    queryKey: [
      (document?.definitions[0] as any)?.name?.value,
      variables as TVariables,
    ],
    queryFn: async ({ queryKey }) =>
      request(
        process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:1337/graphql",
        document,
        queryKey[1] ? queryKey[1] : undefined,
      ),
  };
}

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): UseQueryResult<TResult> {
  return useQuery({
    queryKey: [(document?.definitions[0] as any)?.name?.value, variables],
    queryFn: async ({ queryKey }) =>
      request(
        process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:1337/graphql",
        document,
        queryKey[1] ? queryKey[1] : undefined,
      ),
  });
}

type ExcludePageParam<T> = "pageParam" extends keyof T
  ? Omit<T, "pageParam">
  : T;

export function useInfiniteGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables]: ExcludePageParam<TVariables> extends Record<string, never>
    ? []
    : [ExcludePageParam<TVariables>]
): UseInfiniteQueryResult<TResult> {
  return useInfiniteQuery({
    queryKey: [(document?.definitions[0] as any)?.name?.value, variables],
    queryFn: async ({ queryKey, pageParam }) =>
      request(
        process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:1337/graphql",
        document,
        queryKey[1] ? { ...queryKey[1], pageParam } : { pageParam: pageParam },
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = (lastPage as any)[
        (document?.definitions[0] as any)?.selectionSet?.selections[0].name
          .value
      ].meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
  });
}
