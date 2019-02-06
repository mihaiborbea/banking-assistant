// tslint:disable-next-line:max-line-length
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  UsePipes
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { ChatResponse } from '../domain/models';
import { PaginationCriteria } from '../domain/models/pagination-criteria';
import { ChatService, HashPasswordPipe, UsersService } from '../services';

@Controller('api/users')
export class UsersController {
  constructor(protected service: UsersService, private chatService: ChatService) {}

  @Post()
  @UsePipes(new HashPasswordPipe())
  public async create(@Body() input: any, @Res() res: Response): Promise<void> {
    try {
      const user = await this.service.create(input);
      await this.service.provisionOne(user._id + '');
      res.status(HttpStatus.CREATED).json(user);
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @Post('/chat')
  public async chat(@Body() input: any, @Res() res: Response): Promise<void> {
    try {
      console.log(input);
      if (input.result.contexts.length) {
        input.result.parameters = input.result.contexts[0].parameters;
      }
      const chatResponse: ChatResponse = await this.chatService.getResponse(input.sessionId, input.result);
      res.status(HttpStatus.OK).json(chatResponse);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  public async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const user = await this.service.retrieveOne(id);
      res.status(HttpStatus.OK).json(user);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @Get(':id/accounts')
  @UseGuards(AuthGuard())
  public async findOnesAccounts(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const accounts = await this.service.retrieveOnesAccounts(id);
      res.status(HttpStatus.OK).json(accounts);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @Get(':id/provision')
  @UseGuards(AuthGuard())
  public async provisionOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const user = await this.service.provisionOne(id);
      res.status(HttpStatus.OK).json(user);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @Get(':id/transactions')
  @UseGuards(AuthGuard())
  public async findOnesTransactions(
    @Param('id') id: string,
    @Query() query: PaginationCriteria,
    @Res() res: Response
  ): Promise<void> {
    if ((!query.page || !query.count) && !query.aggregate) {
      throw new BadRequestException('Provide page and count or aggregate');
    }
    try {
      const transactions = await this.service.retrieveOnesTransactions(id, query);
      res.status(HttpStatus.OK).json(transactions);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  public async findAll(@Param() critera: any, @Res() res: Response): Promise<void> {
    try {
      const users = await this.service.retrieve(critera);
      res.status(HttpStatus.OK).json(users);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  public async update(@Param('id') id: string, @Body() input: any, @Res() res: Response): Promise<void> {
    try {
      input._id = id;
      const user = await this.service.update(input);
      res.status(HttpStatus.OK).json(user);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  public async delete(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const deleted = await this.service.delete(id);
      res.status(HttpStatus.OK).json({ deleted });
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).json({ deleted: false, error: e });
    }
  }
}
