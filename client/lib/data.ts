import { User } from '../src/components/UserContext';

const authKey = 'um.auth';

type Auth = {
  user: User;
  token: string;
};

export type Player = {
  userId?: number;
  email: string;
  hashedPassword?: string;
  firstName: string;
  lastName: string;
  longDescription: string;
  zipCode: number;
  skillId: number;
  playTypeId: number;
  genderId: number;
  handedNessId: number;
};

export function saveAuth(user: User, token: string): void {
  const auth: Auth = { user, token };
  localStorage.setItem(authKey, JSON.stringify(auth));
}

export function removeAuth(): void {
  localStorage.removeItem(authKey);
}

export async function readUserByZipCode(zipCode: number): Promise<Player[]> {
  const url = `/api/users/location/${zipCode}`;
  const token = readToken();
  const req = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, req);
  if (!response.ok) throw new Error(`Response status ${response.status}`);

  const users = await response.json();
  return users;
}

export async function readUsers(userId: number): Promise<Player | undefined> {
  const url = `/api/users/${userId}`;
  const token = readToken();
  const req = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, req);
  if (!response.ok) throw new Error(`Response status ${response.status}`);

  const entry = await response.json();
  return entry;
}

export async function addUser(user: Player): Promise<Player> {
  const url = '/api/auth/sign-in';
  const token = readToken();
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error(`Response status ${response.status}`);
  const json = await response.json();
  return json;
}

export async function updateUser(user: Player): Promise<Player> {
  const url = `/api/users/${user.userId}`;
  const token = readToken();
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
  const json = await response.json();
  if (!response.ok) throw new Error(`Response status ${response.status}`);
  return json;
}

export function readUser(): User | undefined {
  const auth = localStorage.getItem(authKey);
  if (!auth) return undefined;
  return (JSON.parse(auth) as Auth).user;
}

export function readToken(): string | undefined {
  const auth = localStorage.getItem(authKey);
  if (!auth) return undefined;
  return (JSON.parse(auth) as Auth).token;
}
