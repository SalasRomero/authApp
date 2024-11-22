//Este es el objeto que nos retorna el back, solo cambia o crea el nuevo por el que te retorna el nuevo back
export interface User {
    _id:      string;
    email:    string;
    name:     string;
    isActive: string;
    roles:    string[];
}
