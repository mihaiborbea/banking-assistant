export interface JwtPayload {
  _id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}
