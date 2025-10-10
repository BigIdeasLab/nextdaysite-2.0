type EnvAccessOptions = {
  required?: boolean;
  fallback?: string;
};

export function getEnvVar(key: string, options: EnvAccessOptions = {}) {
  const value = process.env[key];

  if (value && value.length > 0) {
    return value;
  }

  if (options.fallback !== undefined) {
    return options.fallback;
  }

  if (options.required) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return undefined;
}
