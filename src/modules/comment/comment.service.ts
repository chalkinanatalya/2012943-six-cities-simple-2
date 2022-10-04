import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.type.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) { }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('userId');
  }

  public async findByOfferId(rentOfferId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ rentOfferId })
      .populate('userId');
  }

  public async deleteByOfferId(rentOfferId: string): Promise<number | null> {
    const result = await this.commentModel
      .deleteMany({ rentOfferId })
      .exec();

    return result.deletedCount;
  }
}
