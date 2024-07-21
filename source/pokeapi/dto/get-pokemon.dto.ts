export type Url = string;

export type NameAndUrl = {
  readonly name: string;
  readonly url: Url;
};

export type AbilityDto = {
  readonly ability: NameAndUrl;
  readonly is_hidden: boolean;
  readonly slot: number;
}

export type CriesDto = {
  readonly latest: string;
  readonly legacy: string;
}

export type FormDto = NameAndUrl;

export type VersionDto = NameAndUrl;

export type GameIndexDto = {
  readonly game_index: number;
  readonly version: VersionDto;
}

export type ItemDto = NameAndUrl;

export type VersionDetailDto = {
  readonly rarity: number;
  readonly version: VersionDto;
}

export type HeldItemDto = {
  readonly item: ItemDto;
  readonly version_details: VersionDetailDto[]; 
}

export type MoveLearnMethodDto = NameAndUrl;

export type VersionGroupDto = NameAndUrl;

export type VersionGroupDetailDto = {
  readonly level_learned_at: string;
  readonly move_learn_method: MoveLearnMethodDto;
  readonly version_group: VersionGroupDto;
}

export type MoveDto = {
  readonly move: NameAndUrl;
  readonly version_group_details: VersionGroupDetailDto[];
} 

export type SpeciesDto = NameAndUrl;

type StringOrNull = string | null | undefined;

type SpriteDto = {
  readonly back_default: StringOrNull;
  readonly back_female: StringOrNull;
  readonly back_shiny: StringOrNull;
  readonly back_shiny_female: StringOrNull;
  readonly front_default: StringOrNull;
  readonly front_female: StringOrNull;
  readonly front_shiny: StringOrNull;
  readonly front_shiny_female: StringOrNull;
}

export type SpritesDto = SpriteDto & {
  readonly other: any;
  readonly versions: any;
} 

export type StatDto = {
  readonly base_stat: number;
  readonly effort: number;
  readonly stat: NameAndUrl;
}

export type TypeDto = {
  readonly slot: number;
  readonly type: NameAndUrl;
}

export class GetPokemonDto {
  readonly id: number;
  readonly name: string;
  readonly abilities: AbilityDto[];
  readonly base_experience: number;
  readonly cries: CriesDto;
  readonly forms: FormDto[];
  readonly game_indeces: GameIndexDto[];
  readonly height: number;
  readonly is_default: boolean;
  readonly location_area_encounters: Url;
  readonly moves: MoveDto;
  readonly order: number;
  readonly species: SpeciesDto;
  readonly sprites: SpritesDto;
  readonly stats: StatDto[];
  readonly types: TypeDto[];
  readonly weight: number;
}
