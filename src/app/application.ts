import express, { Express } from 'express';
import { injectable } from 'inversify';
import { inject } from 'inversify/lib/annotation/inject.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { ControllerInterface } from '../common/controller/controller.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { ExceptionFilterInterface } from '../common/errors/exception-filter.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { AuthenticateMiddleware } from '../common/middlewares/authenticate.middleware.js';
import { Component } from '../types/component.type.js';
import { getURI } from '../utils/db.js';


@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.RentOfferController) private rentOfferController: ControllerInterface,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
    @inject(Component.UserController) private userController: ControllerInterface,
    @inject(Component.CommentController) private commentController: ControllerInterface,
  ) {
    this.expressApp = express();
  }

  public initRoutes() {
    this.expressApp.use('/offers', this.rentOfferController.router);
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/comments', this.commentController.router);
  }

  public initMiddleware() {
    this.expressApp.use(express.json());
    this.expressApp.use(
      './upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );

    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApp.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.logger.info('Initializing application...');
    this.logger.info(`Got value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`DB_HOST: ${this.config.get('DB_HOST')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    await this.databaseClient.connect(uri);

    this.initMiddleware();
    this.initRoutes();
    this.initExceptionFilters();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server has started on http://localhost:${this.config.get('PORT')}`);
  }
}
