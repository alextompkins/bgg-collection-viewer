// noinspection JSUnusedGlobalSymbols
/* eslint-disable import/no-default-export */

import type { Config, Context } from '@netlify/functions';

interface ScheduledFnRequestBody {
  next_run: string;
}

export const config: Config = {
  schedule: '*/15 * * * *', // every 15 minutes
};

async function processCollectionFn(request: Request, context: Context) {
  const { next_run } = (await request.json()) as ScheduledFnRequestBody;

  console.log(
    `scheduled function at ${new Date().toISOString()} (account id :${context.account.id})`,
  );
  console.log(`Next invocation at ${next_run}`);
}

export default processCollectionFn;
