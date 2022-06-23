import { ParsedUrlQuery } from 'querystring';
import { createContext, useContext } from 'react';

export const QueryContext = createContext<ParsedUrlQuery | undefined>(
  undefined,
);

export const useQueryCtx = () => useContext(QueryContext);
