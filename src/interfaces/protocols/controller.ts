import { type HttpResponse } from '@/interfaces/protocols/http';

export interface Controller {
  handle: (request: any) => Promise<HttpResponse>
}
