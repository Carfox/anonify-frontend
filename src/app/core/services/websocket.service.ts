import { Injectable } from "@angular/core";
import { WebSocketMessage } from "../interfaces/websocket.interface";

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Observer } from 'rxjs';
import { share, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  private socket: WebSocketSubject<WebSocketMessage> | null = null;
  private currentWsUrl: string | null = null;


  constructor() { }

  /**
   * Conecta a un WebSocket. Si ya hay una conexión a la misma URL, la reutiliza.
   * @param url La URL del WebSocket (ej. 'ws://localhost:8000/ws/upload-progress')
   * @returns Un Observable de los mensajes recibidos.
   */
  public connect(url: string): Observable<WebSocketMessage> {
    if (this.socket && this.currentWsUrl === url && !this.socket.closed) {
      console.log('WebSocket ya conectado a:', url, 'Reutilizando conexión.');
      return this.socket.asObservable();
    }

    console.log('Intentando conectar WebSocket a:', url);
    this.currentWsUrl = url;
    this.socket = webSocket<WebSocketMessage>({
      url: url,
      openObserver: {
        next: () => console.log('WebSocket: Conexión abierta a', url)
      },
      closeObserver: {
        next: () => console.log('WebSocket: Conexión cerrada desde', url)
      },
      serializer: (value: any) => JSON.stringify(value), // Si necesitas enviar mensajes al backend
      deserializer: (e: MessageEvent) => JSON.parse(e.data) as WebSocketMessage // Parsea los mensajes entrantes
    });

    // Usa share() para que múltiples suscriptores compartan la misma conexión subyacente
    // y catchError para manejar errores de conexión/comunicación
    return this.socket.asObservable().pipe(
      tap(msg => console.log('WebSocket: Mensaje recibido:', msg)),
      catchError(error => {
        console.error('WebSocket: Error en la conexión o mensaje:', error);
        // Puedes re-lanzar el error o retornar un Observable vacío, dependiendo de cómo quieras manejarlo
        throw error; // Re-lanzar para que el componente suscriptor lo maneje
      }),
      share() // Compartir la conexión entre múltiples suscriptores
    );
  }

  /**
   * Envía un mensaje a través del WebSocket.
   * @param message El mensaje a enviar.
   */
  public send(message: any): void {
    if (this.socket) {
      this.socket.next(message);
    } else {
      console.warn('WebSocket no conectado, no se pudo enviar el mensaje.');
    }
  }

  /**
   * Cierra la conexión WebSocket.
   */
  public close(): void {
    if (this.socket) {
      console.log('Cerrando conexión WebSocket a:', this.currentWsUrl);
      this.socket.complete(); // Cierra la conexión
      this.socket = null;
      this.currentWsUrl = null;
    }
  }

  /**
   * Accede al estado de la conexión.
   */
  get isConnected(): boolean {
    return this.socket !== null && !this.socket.closed;
  }
}