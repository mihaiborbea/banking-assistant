import {
  ArgumentMetadata,
  ForbiddenException,
  Injectable,
  PipeTransform
} from '@nestjs/common';
import { hash } from 'bcryptjs';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  public async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!value.password) {
      throw new ForbiddenException('Invalid credentials');
    }
    value.password = await hash(value.password, 10);
    return value;
  }
}
