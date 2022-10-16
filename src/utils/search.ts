export interface SearchPayload {
  keywords: string[]
  exclude: string[]
  exact: string[]
}

export const parseQuery = (query: string) => {}
