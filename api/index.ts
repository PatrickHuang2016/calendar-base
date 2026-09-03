let cachedServer: any;

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    const { NestFactory } = await import('@nestjs/core');
    const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');
    const { AppModule } = await import('../src/app.module.js');

    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('ScheduleBase API')
      .setDescription('ScheduleBase 后端 RESTful API 接口文档')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    const customOptions = {
      customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.js',
      ],
    };
    SwaggerModule.setup('api-docs', app, documentFactory, customOptions);

    await app.init();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer(req, res);
}


