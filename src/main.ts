import 'reflect-metadata';
import { Container } from 'inversify';
import Application from './app/application.js';
import { ConfigInterface } from './common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';
import { LoggerInterface } from './common/logger/logger.interface.js';
import LoggerService from './common/logger/logger.service.js';
import { Component } from './types/component.type.js';
import { DatabaseInterface } from './common/database-client/database.interface.js';
import DatabaseService from './common/database-client/database.service.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import { UserServiceInterface } from './modules/user/user-service.interface.js';
import UserService from './modules/user/user.service.js';
import { RentOfferServiceInterface } from './modules/rent-offer/rent-offer-service.interface.js';
import RentOfferService from './modules/rent-offer/rent-offer.service.js';
import { RentOfferEntity, RentOfferModel } from './modules/rent-offer/rent-offer.entity.js';
import { CommentServiceInterface } from './modules/comment/comment-service.interface.js';
import { CommentEntity, CommentModel } from './modules/comment/comment.entity.js';
import CommentService from './modules/comment/comment.service.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<RentOfferServiceInterface>(Component.RentOfferServiceInterface).to(RentOfferService);
applicationContainer.bind<types.ModelType<RentOfferEntity>>(Component.RentOfferModel).toConstantValue(RentOfferModel);
applicationContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService).inSingletonScope();
applicationContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

const application = applicationContainer.get<Application>(Component.Application);

await application.init();
