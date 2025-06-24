// Interfaz para los mensajes de progreso que esperas del backend
export interface WebSocketMessage {
  progress?: number;
  status?: string;
  message?: string;
  error?: string;
  [key: string]: any; // Para permitir otras propiedades
}
