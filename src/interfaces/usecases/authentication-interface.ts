export interface IAuthentication {
  auth: (authenticationParams: IAuthentication.Params) => Promise<any>
}

export namespace IAuthentication {
  export interface Params {
    email: string
    password: string
  }

  export interface Result {
    accessToken: string
    id: string
  }
}
