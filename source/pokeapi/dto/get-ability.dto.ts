type NameAndUrl = {
  name: string;
  url: string;
}

export type EffectEntryDto = {
  effect: string;
  language: NameAndUrl
};

export class GetAbilityDto {
  readonly id: number;
  readonly name: string; 
  readonly effect_entries: EffectEntryDto[];
  readonly generation: NameAndUrl;
  readonly is_main_series: boolean;
}
