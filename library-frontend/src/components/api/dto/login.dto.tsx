export class LoginDto {
  username: string | undefined;
  password: string | undefined;
}

export class LoginResponseDto {
  token: string | undefined;
  username: string | undefined;
  userRole: UserRole | undefined;
}

export enum UserRole {
  ROLE_ADMIN,
  ROLE_READER,
}
