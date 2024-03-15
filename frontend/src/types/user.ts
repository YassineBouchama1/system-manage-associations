interface Session {
  user: User;
  accessToken?: string;
}

interface User {
  name: string;
  email: string;
  email_verified_at: string;
}
