import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(<%=payload.answers.serverPort%>,"<%=payload.answers.serverHost%>");
}
bootstrap();
