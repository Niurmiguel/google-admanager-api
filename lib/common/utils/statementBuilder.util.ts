import { DateTime, Date, Statement, String_ValueMapEntry, Value } from '../../common/types';
import { InvalidOperationException } from '../handlers/exceptions.handler';

export class StatementBuilder {
  static SUGGESTED_PAGE_LIMIT = 500;
  private SELECT = 'SELECT';
  private FROM = 'FROM';
  private WHERE = 'WHERE';
  private LIMIT = 'LIMIT';
  private OFFSET = 'OFFSET';
  private ORDER_BY = 'ORDER BY';

  private _select: string;
  private _from: string;
  private _where: string;
  private _limit?: number | undefined;
  private _offset?: number | undefined;
  private _orderBy: string;

  private valueEntries: String_ValueMapEntry[] = [];

  private removeKeyword(clause: string, keyword: string): string {
    const formattedKeyword: string = keyword.trim() + ' ';

    return clause.toUpperCase().startsWith(formattedKeyword) ? clause.substring(formattedKeyword.length) : clause;
  }

  public select(columns: string): StatementBuilder {
    this._select = this.removeKeyword(columns, this.SELECT);
    return this;
  }

  public from(table: string): StatementBuilder {
    this._from = this.removeKeyword(table, this.FROM);
    return this;
  }
  public where(table: string): StatementBuilder {
    this._where = this.removeKeyword(table, this.WHERE);
    return this;
  }

  public limit(count: number): StatementBuilder {
    this._limit = count;
    return this;
  }

  public offset(count: number): StatementBuilder {
    this._offset = count;
    return this;
  }

  public increaseOffsetBy(amount: number): StatementBuilder {
    if (this._offset === undefined) this._offset = 0;
    this._offset += amount;
    return this;
  }

  public getOffset(): number | undefined {
    return this._offset;
  }

  public removeLimitAndOffset(): StatementBuilder {
    this._offset = undefined;
    this._limit = undefined;
    return this;
  }

  public orderBy(orderBy: string): StatementBuilder {
    this._orderBy = this.removeKeyword(orderBy, this.ORDER_BY);
    return this;
  }

  public addValue(key: string, value: Value): StatementBuilder {
    this.valueEntries.push({
      key,
      value: this.getValue(value),
    });
    return this;
  }

  private getValue(value: Value): Record<string, any> {
    switch (typeof value) {
      case 'string':
        return {
          value,
          attributes: {
            'xsi:type': 'TextValue',
          },
        };
      case 'number':
        return {
          value: value,
          attributes: {
            'xsi:type': 'NumberValue',
          },
        };
      case 'boolean':
        return {
          value: value,
          attributes: {
            'xsi:type': 'BooleanValue',
          },
        };
      case 'object':
        if (Array.isArray(value)) {
          return {
            values: value.map((v) => this.getValue(v)),
            attributes: {
              'xsi:type': 'SetValue',
            },
          };
        }
        if (this.isDateTime(value)) {
          return {
            value: value,
            attributes: {
              'xsi:type': 'DateTimeValue',
            },
          };
        }
        if (this.isDate(value)) {
          return {
            value: value,
            attributes: {
              'xsi:type': 'DateValue',
            },
          };
        }
        return {
          value: value,
          attributes: {
            'xsi:type': 'ObjectValue',
          },
        };
      default:
        throw new Error(typeof value);
    }
  }

  private isDateTime(arg: any): arg is DateTime {
    arg = arg as DateTime;
    if (!arg.date || !this.isDate(arg.date)) return false;
    if (!arg.hour || arg.hour === null) return false;
    if (!arg.minute || arg.minute === null) return false;
    if (!arg.second || arg.second === null) return false;
    return true;
  }

  private isDate(arg: any): arg is Date {
    arg = arg as Date;
    if (!arg.year || arg.year === null) return false;
    if (!arg.month || arg.month === null) return false;
    if (!arg.day || arg.day === null) return false;
    return true;
  }

  private validateQuery(): void {
    if (!this._limit && this._offset) {
      throw new InvalidOperationException('OFFSET cannot be set if LIMIT is not set.');
    }
  }

  private buildQuery(): string {
    const stringBuilder = [];
    this.validateQuery();
    if (typeof this.select !== 'undefined' && this._select) {
      stringBuilder.push(`${this.SELECT} ${this._select}`);
    }
    if (typeof this.from !== 'undefined' && this._from) {
      stringBuilder.push(`${this.FROM} ${this._from}`);
    }
    if (typeof this.where !== 'undefined' && this._where) {
      stringBuilder.push(`${this.WHERE} ${this._where}`);
    }
    if (typeof this.orderBy !== 'undefined' && this._orderBy) {
      stringBuilder.push(`${this.ORDER_BY} ${this._orderBy}`);
    }
    if (typeof this.limit !== 'undefined' && this._limit) {
      stringBuilder.push(`${this.LIMIT} ${this._limit}`);
    }
    if (typeof this.offset !== 'undefined' && this._offset) {
      stringBuilder.push(`${this.OFFSET} ${this._offset}`);
    }
    return stringBuilder.join(' ');
  }

  public toStatement(): Statement {
    return {
      query: this.buildQuery(),
      values: this.valueEntries,
    };
  }
}
