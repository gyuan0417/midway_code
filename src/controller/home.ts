import { Controller, Get, Inject} from "@midwayjs/decorator";
// import { Controller, Get, Inject, sleep } from "@midwayjs/decorator";
import { Context } from '@midwayjs/koa';
import { HttpClient } from '@midwayjs/core';
import cheerio from 'cheerio';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;
  @Get('/data')
  async home() {
    return 'Hello Midwayjs!';
  }
  @Get('/baidu')
  async updateData() {
    const httpclient = new HttpClient({
      headers: {
        'x-timeout': '5',
      },
      method: 'GET',
      timeout: 2000,
    });

    // await sleep(5000);
    const result = await httpclient.request('https://www.baidu.com/');
    const $ = cheerio.load(result.data);
    const imgSrc = $('img[id=s_lg_img]').attr().src;
    console.log('请求到的地址：', imgSrc);
    return imgSrc;
  }

  @Get('/')
  async getDate() {
    const http = require('http');
    const https = require('https');
    // const cheerio = require('cheerio');
    // 该对象解析网页中的数据
    const filterData = data => {
      // console.log('整个页面',data);
      const $ = cheerio.load(data);
      // console.log(data);
      // const imgSrc = $('div[id=lg]').children('img')[0].attribs.src;
      // console.log('src', imgSrc);
      const imgSrc = $('img[id=s_lg_img]').attr().src;
      console.log('请求到的地址：', imgSrc);
      return imgSrc;
    };
    // 创建一个服务，请求url，交给上面的对象进行解析
    const server = http.createServer((req, res) => {
      let data = '';
      https.get('https://www.baidu.com/', result => {
        result.on('data', chunk => {
          data += chunk;
        });
        result.on('end', () => {
          filterData(data);
        });
      });
    });

    // 开启一个端口，进行监听，该监听运行上面的一个对象
    server.listen(5080, () => {
      console.log('localhost:5080 Listen...');
    });
  }
}
