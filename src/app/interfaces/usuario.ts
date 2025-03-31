export interface Usuario {
    id: string;
    full_name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';  // Definir los roles posibles
}
