export interface ClientesAtivosInativos {
  activeClients: number;
  inactiveClients: number;
}

export interface ClientePorMensalidade {
  subscriptionType: string;
  count: number;
}

export interface ClientePorIdade {
  ageRange: string;
  count: number;
}
