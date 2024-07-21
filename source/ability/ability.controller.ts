import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Ability } from './ability.entity';
import { AbilityService } from './ability.service';

@Controller('ability')
export class AbilityController {
  constructor(private readonly abilityService: AbilityService) {}

  @Get()
  findAll(): Promise<Ability[]> {
    return this.abilityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.abilityService.findOne(+id);
  }
}
