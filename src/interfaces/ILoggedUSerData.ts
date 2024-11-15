export interface ILoggedUserData {
  nome?: string;
  cpf?: string;
  telefone?: string;
  email?: string;
  senha?: string;
  registrosPontos?: {
    data: string;
    horaEntrada: string;
    horaSaida: string;
  }[];
  id?: string;
  username?: string;
  token?: string;
  role?: string;
}
