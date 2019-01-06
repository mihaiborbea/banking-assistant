import { Controller, Get, HttpStatus, Res } from "@nestjs/common";

import { BaseEntityController } from "src/modules/shared/controllers";
import { User } from "../domain/models";

@Controller('users')
export class UsersController extends BaseEntityController<User> {

  @Get()
  public findAll(@Res() res) {
    res.status(HttpStatus.OK).json([]);
  }
}