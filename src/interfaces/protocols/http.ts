export interface HttpResponse {
  statusCode: number
  data: any
}

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  data: error
});
