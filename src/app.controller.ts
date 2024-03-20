import { Controller, Get } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { EventPattern, KafkaContext } from '@nestjs/microservices';
import { Logger } from '@nestjs/common/services';
import { ChatGateway } from './chat/chat.gateway';
import * as io from 'socket.io-client';

@Controller()
export class AppController {
  private socket;

  constructor(
    private readonly appService: AppService,
    private readonly chatGateway: ChatGateway,
  ) {
    this.socket = io.connect('http://localhost:3001');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('match-summary-event')
  public handleMatchSummary(data: Record<string, unknown>): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        Logger.log({ data });

        this.socket.emit('match-summary', data);
        resolve();
      }, 3000),
    );
  }

  @EventPattern('market-set-event')
  public handleMarketSet(data: Record<string, unknown>): Promise<void> {
    Logger.log('data market-set-event');

    this.socket.emit('market-set', data);
    // this.chatGateway.sendData('market-set', data);
    return Promise.resolve();
  }
}
