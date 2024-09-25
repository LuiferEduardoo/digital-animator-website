import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    jwtAuthGuard = module.get<JwtAuthGuard>(JwtAuthGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should allow access if route is public', () => {
    // Simula que la ruta es pública
    jest.spyOn(reflector, 'get').mockReturnValue(true);

    // Crea un mock de ExecutionContext con un handler
    const context = createMockExecutionContext(() => 'testHandler');
    const result = jwtAuthGuard.canActivate(context);

    expect(result).toBe(true);
    expect(reflector.get).toHaveBeenCalledWith(IS_PUBLIC_KEY, expect.any(Function));
  });

  it('should delegate to AuthGuard if route is not public', () => {
    // Simula que la ruta NO es pública
    jest.spyOn(reflector, 'get').mockReturnValue(false);

    const context = createMockExecutionContext(() => 'testHandler');

    // Mockea directamente el método canActivate de la clase padre
    const superCanActivateSpy = jest
      .spyOn(AuthGuard('access-token').prototype, 'canActivate')
      .mockReturnValue(true);

    const result = jwtAuthGuard.canActivate(context);

    expect(result).toBe(true);
    expect(superCanActivateSpy).toHaveBeenCalledWith(context);
    expect(reflector.get).toHaveBeenCalledWith(IS_PUBLIC_KEY, expect.any(Function));
  });
});

// Función para crear un contexto de ejecución simulado
function createMockExecutionContext(handler: Function): ExecutionContext {
  return {
    switchToHttp: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getType: jest.fn(),
    getClass: jest.fn(),
    getHandler: jest.fn().mockReturnValue(handler), // Simula que getHandler devuelve una función
    getArgs: jest.fn(),
    getArgByIndex: jest.fn(),
    getRequest: jest.fn(),
    getResponse: jest.fn(),
    getNext: jest.fn(),
  } as unknown as ExecutionContext;
}