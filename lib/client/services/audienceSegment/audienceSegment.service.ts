import { Client } from 'soap';

import { AudienceSegmentServiceOperations } from './audienceSegmentService.interface';
import { Statement, UpdateResult } from '../../../common/types';
import { AudienceSegmentAction, AudienceSegmentPage, FirstPartyAudienceSegment } from './audienceSegment.type';

export class AudienceSegmentService implements AudienceSegmentServiceOperations {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  async createAudienceSegments(segments: FirstPartyAudienceSegment[]): Promise<FirstPartyAudienceSegment[]> {
    return this._client.createAudienceSegments({ segments });
  }

  async getAudienceSegmentsByStatement(filterStatement: Statement): Promise<AudienceSegmentPage> {
    return this._client.getAudienceSegmentsByStatement({
      filterStatement,
    });
  }

  async performAudienceSegmentAction(action: AudienceSegmentAction, filterStatement: Statement): Promise<UpdateResult> {
    return this._client.performAudienceSegmentAction({
      action: {
        attributes: {
          'xsi:type': action,
        },
      },
      filterStatement,
    });
  }

  async updateAudienceSegments(segments: FirstPartyAudienceSegment[]): Promise<FirstPartyAudienceSegment[]> {
    return this._client.updateAudienceSegments({ segments });
  }
}
