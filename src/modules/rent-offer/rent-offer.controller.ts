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

@injectable()
export default class RentOfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.RentOfferServiceInterface) private readonly rentOfferService: RentOfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for RentOfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const rentOffers = await this.rentOfferService.find();
    const rentOfferResponse = fillDTO(RentOfferResponse, rentOffers);
    this.send(res, StatusCodes.OK, rentOfferResponse);
  }

  public async create({ body }: Request<Record<string, unknown>, Record<string, unknown>, CreateRentOfferDto>, res: Response): Promise<void> {

    const result = await this.rentOfferService.create(body);

    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(RentOfferResponse, result)
    );
  }
}
