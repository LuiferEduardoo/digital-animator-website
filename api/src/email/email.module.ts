import { Module, Global } from '@nestjs/common';

import { EmailService } from './services/email.service';

@Global()
@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
