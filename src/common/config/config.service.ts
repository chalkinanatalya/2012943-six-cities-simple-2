import { config } from 'dotenv';
import { LoggerInterface } from '../logger/logger.interface.js';
import { ConfigInterface } from './config.interface.js';
import { configSchema, ConfigSchema } from './config.schema.js';

export default class ConfigService implements ConfigInterface {
  private config: ConfigSchema;
  private logger: LoggerInterface;

  constructor(logger: LoggerInterface) {
    this.logger = logger;
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Can\'t read .env file. Maybe the file doesn\'t exist.');
    }

    configSchema.load({});
    configSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configSchema.getProperties();
    this.logger.info('.env file has found and succesfilly parsed');
  }

  public get<T extends keyof ConfigSchema>(key: T) {
    return this.config[key];
  }
}
