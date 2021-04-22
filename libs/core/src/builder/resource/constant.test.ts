import { constant } from './constant';

describe('builder resource constant', () => {
  it('string', () => {
    expect(constant('test').value).toStrictEqual('test');
  });

  it('number', () => {
    expect(constant(1113).value).toStrictEqual(1113);
  });

  it('boolean', () => {
    expect(constant(false).value).toStrictEqual(false);
  });

  it('wrong type', () => {
    expect(() => {
      constant(new (class {})() as number);
    }).toThrowError();
  });
});
