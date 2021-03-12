import { BaseMapper } from '@valcome/ts-core';
import { Injectable } from '@angular/core';
import { HockeyDataKnockoutEncounter } from '../model/hockeydata-knockout-encounter';
import { IHockeyDataPhaseEncounter } from '../model/types';
import { HockeyDataKnockoutGameMapper } from './hockeydata-knockout-game.mapper';
import { HockeyDataKnockoutTeamScoreMapper } from './hockeydata-knockout-team-score.mapper';
import { HockeyDataKnockoutTeamScore } from '../model/hockeydata-knockout-team-score';
import { HockeyDataKnockoutGame } from '../model/hockeydata-knockout-game';

@Injectable({ providedIn: 'root' })
export class HockeyDataKnockoutEncounterMapper extends BaseMapper<HockeyDataKnockoutEncounter> {
  public constructor(private knockoutGamesMapper: HockeyDataKnockoutGameMapper,
                     private knockoutTeamScoreMapper: HockeyDataKnockoutTeamScoreMapper) {
    super(HockeyDataKnockoutEncounter);
  }

  public fromJson(json: Partial<IHockeyDataPhaseEncounter>): HockeyDataKnockoutEncounter {
    const bestOf = this.getValidated(json.bestOf);
    const gamesNeeded = this.getValidated(json.gamesNeeded);
    const isDecided = this.getValidated(json.isDecided);
    const labels = this.getValidated(json.labels);
    const games = this.knockoutGamesMapper.fromJsonArray(this.getValidated(json.games));
    const teamScores = this.knockoutTeamScoreMapper.fromJsonArray(this.getValidated(json.teams)) as [HockeyDataKnockoutTeamScore, HockeyDataKnockoutTeamScore];
    teamScores.forEach(teamScore => this.mapTeamScoreResults(teamScore, games));
    return new HockeyDataKnockoutEncounter(bestOf, gamesNeeded, isDecided, teamScores, games, labels);
  }

  private mapTeamScoreResults(teamScore: HockeyDataKnockoutTeamScore, games: HockeyDataKnockoutGame[]): void {
  }
}
