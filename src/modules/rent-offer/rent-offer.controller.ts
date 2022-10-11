import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.type.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { RentOfferServiceInterface } from './rent-offer-service.interface.js';
import { fillDTO } from '../../utils/common.js';
import RentOfferResponse from './response/rent-offer.response.js';
import CreateRentOfferDto from './dto/create-rent-offer.dto.js';
import HttpError from '../../common/errors/http-error.js';
import * as core from 'express-serve-static-core';
import UpdateRentOfferDto from './dto/update-rent-offer.dto.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentResponse from '../comment/response/comment.response.js';
import { RequestQuery } from '../../types/request-query.type.js';

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
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/:offerId', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:offerId/comments', method: HttpMethod.Get, handler: this.getComments});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const rentOffers = await this.rentOfferService.getRentList();
    const rentOfferResponse = fillDTO(RentOfferResponse, rentOffers);
    this.send(res, StatusCodes.OK, rentOfferResponse);
  }

  public async create({ body }: Request<Record<string, unknown>, Record<string, unknown>, CreateRentOfferDto>, res: Response): Promise<void> {

    const result = await this.rentOfferService.create(body);
    const rentOffer = await this.rentOfferService.findById(result.id);

    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(RentOfferResponse, rentOffer)
    );
  }

  public async show({ params }: Request<core.ParamsDictionary | ParamsGetRentOffer>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const rentOffer = await this.rentOfferService.findById(offerId);

    if (!rentOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Not implemented',
        'RentOfferController'
      );
    }
    this.ok(res, fillDTO(RentOfferResponse, rentOffer));
  }

  public async delete(
    { params }: Request<core.ParamsDictionary | ParamsGetRentOffer>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const rentOffer = await this.rentOfferService.deleteById(offerId);

    if (!rentOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found`,
        'RentOfferController'
      );
    }

    this.noContent(res, rentOffer);
  }

  public async update(
    { body, params }: Request<core.ParamsDictionary | ParamsGetRentOffer, Record<string, unknown>, UpdateRentOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedRentOffer = await this.rentOfferService.updateById(params.offerId, body);

    if (!updatedRentOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'RentOfferController'
      );
    }

    this.ok(res, fillDTO(RentOfferResponse, updatedRentOffer));
  }

  public async getComments(
    {params, query}: Request<core.ParamsDictionary | ParamsGetRentOffer, object, object, RequestQuery>,
    res: Response
  ): Promise<void> {
    if(!await this.rentOfferService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offers with id ${params.offerId} not found.`,
        'RentOfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId, query.limit);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
