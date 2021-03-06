import { HockeyDataDAO } from './hockeydata.dao';
import { ApiParams } from '../model/types';
import { HockeyDataGameReportMapper } from '../mapper/hockeydata-gamereport.mapper';
import { HockeyDataGameReport } from '../model/hockeydata-gamereport';
import { map } from 'rxjs/operators';
import { HockeyDataTeamStanding } from '../model/hockeydata-team-standing';
import { HockeyDataTeamStandingMapper } from '../mapper/hockeydata-team-standing.mapper';
import { HockeyDataKnockoutStage } from '../model/hockeydata-knockout-stage';
import { HockeyDataKnockoutStageMapper } from '../mapper/hockeydata-knockout-stage.mapper';

export abstract class HockeyDataService {

  protected constructor(protected dao: HockeyDataDAO,
                        protected gameReportMapper: HockeyDataGameReportMapper,
                        protected teamStandingMapper: HockeyDataTeamStandingMapper,
                        protected knockoutStageMapper: HockeyDataKnockoutStageMapper) {
  }

  public getKnockoutStage(divisionId: number, params: ApiParams = {}): Promise<HockeyDataKnockoutStage> {
    return this.dao.fetchKnockoutStage(divisionId, params)
      .pipe(map(res => this.knockoutStageMapper.fromJson(res.data)))
      .toPromise();
  }

  public getGameReport(gameId: string, params: ApiParams = {}): Promise<HockeyDataGameReport> {
    return this.dao.fetchGameReport(gameId, params)
      .pipe(map(res => this.gameReportMapper.fromJson(res.data)))
      .toPromise();
  }

  public getStandings(divisionId: number, live: boolean, params: ApiParams = {}): Promise<HockeyDataTeamStanding[]> {
    return this.dao.fetchStandings(divisionId, live, params)
      .pipe(map(res => this.teamStandingMapper.fromJsonArray(res.data.rows)))
      .toPromise();
  }
}
