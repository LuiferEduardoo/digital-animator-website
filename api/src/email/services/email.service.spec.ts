import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import * as nodemailer from 'nodemailer';
import { ConfigModule } from '@nestjs/config';
import config from '../../config';

// Crear un mock para nodemailer
jest.mock('nodemailer');

describe('MailService', () => {
  let service: EmailService;
  let transporterMock;

  beforeEach(async () => {
    // Mock del transportador
    process.env.MAIL_FROM = 'test-email@luifereduardoo.com';
    transporterMock = {
      sendMail: jest.fn().mockResolvedValue({ messageId: '12345' }), // Simula el envío exitoso del correo
    };

    // Configura nodemailer para que use el mock del transportador
    (nodemailer.createTransport as jest.Mock).mockReturnValue(transporterMock);

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ // Asegura que las variables de entorno estén disponibles
          load: [config],
        }),
      ],
      providers: [EmailService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería enviar un correo exitosamente', async () => {
    const to = 'test@domain.com';
    const subject = 'Test Subject';
    const text = 'Test Body';
    const html = '<p>Test Body</p>';

    await service.sendMail(to, subject, html, text);

    // Verificar que sendMail fue llamado con los parámetros correctos
    expect(transporterMock.sendMail).toHaveBeenCalledWith({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html,
      text,
    });

    // Verificar que el correo fue enviado correctamente
    expect(transporterMock.sendMail).toHaveBeenCalledTimes(1);
  });

  it('debería manejar errores al enviar el correo', async () => {
    const to = 'test@domain.com';
    const subject = 'Test Subject';
    const text = 'Test Body';

    // Mock para simular un error en el envío del correo
    transporterMock.sendMail.mockRejectedValueOnce(new Error('Error enviando correo'));

    await expect(service.sendMail(to, subject, text)).rejects.toThrow('Error enviando correo');
  });
});