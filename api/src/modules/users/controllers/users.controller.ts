import { Controller, Get, Res, Param, HttpStatus, Post, Body } from "@nestjs/common";
import { Response } from "express";

import { UsersService } from "../services/users.service";

@Controller('users')
export class UsersController {

  constructor(protected service: UsersService) {}

  @Post()
  public async create(@Body()input: any, @Res()res: Response): Promise<void> {
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
}