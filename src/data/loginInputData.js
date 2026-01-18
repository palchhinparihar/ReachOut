import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const inputFields = [
  { type: 'email', name: 'Email', key: 'email', placeholder: 'name@example.com' },
  { type: 'password', name: 'Password', key: 'password', placeholder: '*******' },
];

export const authProviders = [
  { name: 'Google', provider: 'google', icon: FcGoogle },
  { name: 'GitHub', provider: 'github', icon: FaGithub },
];