const envVariables = [
    'NATS_CLUSTER_ID', 
    'NATS_CLIENT_ID', 
    'JWT_KEY',
    'MONGO_URI',
    'MONGO_CONNECTION_MSG',
    'EXPRESS_CONNECTION_MSG'
] as const;

type EnvVariablesType = {
    [K in typeof envVariables[number]]: string
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends EnvVariablesType {}
    }
}

export function checkEnvVariables() {
  for (const envKey of envVariables) {
      if (process.env[envKey] === undefined){
          throw new Error(`Env variable "${envKey}" not set`);
      }
  }
}