import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ability } from './ability.entity';

@Injectable()
export class AbilityService {
  constructor(
    @InjectRepository(Ability)
    private readonly abilityRepository: Repository<Ability>,
  ) {}

  findAll(): Promise<Ability[]> {
    return this.abilityRepository.find();
  }

  async findOne(id: number): Promise<Ability> {
    const ability = await this.abilityRepository.findOne({
      where: { id: id },
    });

    if (!ability) throw new NotFoundException(`Ability with id ${id} not found.`);

    return ability;
  }
}
