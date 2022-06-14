import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/home.test.ts', () => {

  it('should GET /', async () => {
    // create app
    const app = await createApp<Framework>();

    // make request
    const result = await createHttpRequest(app).get('/');

    // use expect by jest
    expect(result).toBe(100);
    expect(result.text).toBe('Hello Midwayjs!');

    // close app
    await close(app);
  });
  it("should GET /baidu", async () => {
    // create app
    const app = await createApp<Framework>();

    // make request
    const result = await createHttpRequest(app).get("/baidu").set('x-timeout', '1000');
    expect(result.status).toBe(200);
    // expect(result.text).toStrictEqual('//www.baidu.com/img/flexible/logo/pc/index.png');
    expect(result.status).toStrictEqual('//www.baidu.com/img/bd_logo1.png');

  });

});
