import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const inputFields = [
  { type: 'email', name: 'Email', placeholder: 'name@example.com' },
  { type: 'password', name: 'Password', placeholder: '*******' },
];

export const authProviders = [
  { name: 'Google', provider: 'google', icon: FcGoogle },
  { name: 'GitHub', provider: 'github', icon: FaGithub },
];