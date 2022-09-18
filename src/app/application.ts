import { injectable } from 'inversify';
import { inject } from 'inversify/lib/annotation/inject.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { Component } from '../types/component.type.js';

@injectable()
export default class Application {

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface
  ) { }

  public async init() {
    this.logger.info('Initializing application...');
    this.logger.info(`Got value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`DB_HOST: ${this.config.get('DB_HOST')}`);
  }
}
