import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaneDto } from './create-plane.dto';

export class UpdatePlaneDto extends PartialType(CreatePlaneDto) {}
