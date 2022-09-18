import { config } from 'dotenv';
import { injectable } from 'inversify';
import { inject } from 'inversify/lib/annotation/inject.js';
import { Component } from '../../types/component.type.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { ConfigInterface } from './config.interface.js';
import { configSchema, ConfigSchema } from './config.schema.js';

@injectable()
export default class ConfigService implements ConfigInterface {
  private config: ConfigSchema;
  private logger: LoggerInterface;

  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface) {
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
