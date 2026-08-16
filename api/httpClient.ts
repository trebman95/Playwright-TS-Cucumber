import { APIRequestContext, request } from '@playwright/test';

let requestContext: APIRequestContext | null = null;

export const getRequestContext = async (): Promise<APIRequestContext> => {
  if (!requestContext) {
    requestContext = await request.newContext();
  }
  return requestContext;
};

export const disposeRequestContext = async () => {
  if (requestContext) {
    await requestContext.dispose();
    requestContext = null;
  }
};
