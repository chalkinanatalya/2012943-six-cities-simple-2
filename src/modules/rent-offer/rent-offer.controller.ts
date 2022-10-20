import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.type.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RentOfferServiceInterface } from './rent-offer-service.interface.js';
import { fillDTO } from '../../utils/common.js';
import RentOfferResponse from './response/rent-offer.response.js';
import CreateRentOfferDto from './dto/create-rent-offer.dto.js';
import * as core from 'express-serve-static-core';
import UpdateRentOfferDto from './dto/update-rent-offer.dto.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/response/comment.response.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';

type ParamsGetRentOffer = {
  offerId: string;
}

@injectable()
export default class RentOfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.RentOfferServiceInterface) private readonly rentOfferService: RentOfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for RentOfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateRentOfferDto)
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.rentOfferService, 'RentOffer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.rentOfferService, 'RentOffer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateRentOfferDto),
        new DocumentExistsMiddleware(this.rentOfferService, 'RentOffer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.rentOfferService, 'RentOffer', 'offerId')
      ],
    });
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.rentOfferService.getRentList();
    this.ok(res, fillDTO(RentOfferResponse, offers));
  }

  public async create(req: Request<Record<string, unknown>, Record<string, unknown>, CreateRentOfferDto>, res: Response): Promise<void> {

    const { body, user } = req;
    const result = await this.rentOfferService.create({ ...body, userId: user.id });
    const rentOffer = await this.rentOfferService.findById(result.id);

    this.created(
      res, fillDTO(RentOfferResponse, rentOffer)
    );
  }

  public async show({ params }: Request<core.ParamsDictionary | ParamsGetRentOffer>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const rentOffer = await this.rentOfferService.findById(offerId);

    this.ok(res, fillDTO(RentOfferResponse, rentOffer));
  }

  public async delete(
    { params }: Request<core.ParamsDictionary | ParamsGetRentOffer>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const rentOffer = await this.rentOfferService.deleteById(offerId);

    this.noContent(res, rentOffer);
  }

  public async update(
    { body, params }: Request<core.ParamsDictionary | ParamsGetRentOffer, Record<string, unknown>, UpdateRentOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedRentOffer = await this.rentOfferService.updateById(params.offerId, body);

    this.ok(res, fillDTO(RentOfferResponse, updatedRentOffer));
  }

  public async getComments(
    { params, query }: Request<core.ParamsDictionary | ParamsGetRentOffer, object, object, RequestQuery>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId, query.limit);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}

