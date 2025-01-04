import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
// import { join } from 'path';
// import * as hbs from 'hbs';
// import * as hbsUtils from 'hbs-utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
   app.setGlobalPrefix('api');
   app.useGlobalFilters(new ValidationExceptionFilter());
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // hbs.registerPartials(join(__dirname, '..', 'views/layouts'));
  // hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views/layouts'));
  // app.setViewEngine('hbs');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
