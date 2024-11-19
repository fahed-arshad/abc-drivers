export type SignInDto = {
  email: string;
  password: string;
};

export type SignInWithClerkDto = {
  token: string;
};

export type SignInWithNextAuthDto = {
  email: string;
};

export type SignUpDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignUpWithNextAuthDto = {
  email: string;
};

export type VerifyDto = {
  email: string;
  verificationCode: string;
};

export type SendVerificationCodeDto = {
  email: string;
};

export type ForgotPasswordDto = {
  email: string;
};

export type ChangePasswordDto = {
  newPassword: string;
};

export type RefreshTokenDto = {
  refreshToken: string;
};
