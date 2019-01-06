import { Controller, Get, Res, Param, HttpStatus, Post, Body, Delete, Put } from "@nestjs/common";
import { Response } from "express";

import { UsersService } from "../services/users.service";

@Controller('users')
export class UsersController {

  constructor(protected service: UsersService) {}

  @Post()
  public async create(@Body() input: any, @Res() res: Response): Promise<void> {
    try {
      const user = await this.service.create(input);
      res.status(HttpStatus.CREATED).json(user);
    } catch {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @Get(':id')
  public async findOne(@Param('id')id: string, @Res() res: Response): Promise<void> {
    try {
      const user = await this.service.retrieveOne(id);
      res.status(HttpStatus.OK).json(user);
    } catch {
      res.status(HttpStatus.BAD_REQUEST).send([]);
    }
  }

  @Get()
  public async findAll(@Param()critera: any, @Res()res: Response): Promise<void> {
    try {
    const users = await this.service.retrieve(critera);
    res.status(HttpStatus.OK).json(users);
    } catch {
      res.status(HttpStatus.BAD_REQUEST).send([]);
    }
  }

  @Put(':id')
  public async update(@Body() input: any, @Res() res: Response): Promise<void> {
    try {
      const user = await this.service.update(input);
      res.status(HttpStatus.OK).json(user);
    } catch(e) {
      res.status(HttpStatus.BAD_REQUEST).send(e);
    }
  }

  @Delete(':id')
  public async delete(@Param('id')id: string, @Res()res: Response): Promise<void> {
    try {
      const deleted = await this.service.delete(id);
      res.status(HttpStatus.OK).json({ deleted });
    } catch(e) {
      res.status(HttpStatus.BAD_REQUEST).json({ deleted: false, error: e });
    }
  }
}