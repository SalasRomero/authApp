import { User } from "./user.interface";
//Esta es la respuesta que nos regresa el back, en caso de que cambie hay que medificar el objeto
export interface LoginResponse {
    user:  User;
    token: string;
}