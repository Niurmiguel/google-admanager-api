import { InvalidOperationException } from '../common/handlers/exceptions.handler';
import { StatementBuilder } from '../common/utils';

describe('test StatementBuilder', () => {
  it('to statement for pql table', () => {
    const statementBuilder = new StatementBuilder();
    const query = statementBuilder
      .select('Id')
      .from('table')
      .where('a = b AND b = c')
      .orderBy('a ASC, b DESC')
      .limit(200)
      .offset(1)
      .toStatement().query;

    expect(query).toBe('SELECT Id FROM table WHERE a = b AND b = c ORDER BY a ASC, b DESC LIMIT 200 OFFSET 1');
  });

  it('to statement with keywords', () => {
    const statementBuilder = new StatementBuilder();
    const query = statementBuilder
      .select('Id')
      .from('FrOM table')
      .where('WHERE a = b AND b = c')
      .orderBy('order BY a ASC, b DESC')
      .limit(200)
      .offset(1)
      .toStatement().query;

    expect(query).toBe('SELECT Id FROM table WHERE a = b AND b = c ORDER BY a ASC, b DESC LIMIT 200 OFFSET 1');
  });

  it('to statement not pql table', () => {
    const statementBuilder = new StatementBuilder();
    const query = statementBuilder
      .where('a = b AND b = c')
      .orderBy('a ASC, b DESC')
      .limit(200)
      .offset(1)
      .toStatement().query;

    expect(query).toBe('WHERE a = b AND b = c ORDER BY a ASC, b DESC LIMIT 200 OFFSET 1');
  });

  it('to statement not offset', () => {
    const statementBuilder = new StatementBuilder();
    const query = statementBuilder.where('a = b AND b = c').orderBy('a ASC, b DESC').limit(200).toStatement().query;

    expect(query).toBe('WHERE a = b AND b = c ORDER BY a ASC, b DESC LIMIT 200');
  });

  it('to statement just limit', () => {
    const statementBuilder = new StatementBuilder();
    const query = statementBuilder.limit(500).toStatement().query;

    expect(query).toBe('LIMIT 500');
  });

  it('to statement limit and offset', () => {
    const statementBuilder = new StatementBuilder();
    const query = statementBuilder.limit(500).offset(1).where('a = b').orderBy('a');

    expect(query.toStatement().query).toBe('WHERE a = b ORDER BY a LIMIT 500 OFFSET 1');

    expect(query.removeLimitAndOffset().toStatement().query).toBe('WHERE a = b ORDER BY a');
  });

  it('to statement remove limit and offset', () => {
    const statementBuilder = new StatementBuilder();
    const query = statementBuilder.limit(500).offset(1).toStatement().query;

    expect(query).toBe('LIMIT 500 OFFSET 1');
  });

  it('to statement not initial offset', () => {
    const statementBuilder = new StatementBuilder();
    const query = statementBuilder.limit(500).where('a = b').orderBy('a');

    expect(query.toStatement().query).toBe('WHERE a = b ORDER BY a LIMIT 500');

    expect(query.increaseOffsetBy(120).toStatement().query).toBe('WHERE a = b ORDER BY a LIMIT 500 OFFSET 120');
  });

  it('to statement with initial offset', () => {
    const statementBuilder = new StatementBuilder();
    const query = statementBuilder.limit(500).offset(10).where('a = b').orderBy('a');

    expect(query.toStatement().query).toBe('WHERE a = b ORDER BY a LIMIT 500 OFFSET 10');

    expect(query.increaseOffsetBy(30).toStatement().query).toBe('WHERE a = b ORDER BY a LIMIT 500 OFFSET 40');
  });

  it('to statement empty', () => {
    const statementBuilder = new StatementBuilder();
    const query = statementBuilder.toStatement().query;

    expect(query).toBe('');
  });

  it('to statement offset without limit', () => {
    const statementBuilder = new StatementBuilder();
    const query = statementBuilder.offset(500);

    try {
      query.toStatement();
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidOperationException);
    }
  });
});
