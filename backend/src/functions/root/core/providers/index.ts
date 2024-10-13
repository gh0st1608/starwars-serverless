import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class AxiosSingleton {
    private static instance: AxiosInstance;

    // Propiedades privadas
    private static baseURL: string;
    private static timeout: number;

    // Constructor privado
    private constructor() {}

    // Método para inicializar la instancia
    public static initialize(baseURL: string, timeout: number): void {
        if (!this.instance) {
            this.baseURL = baseURL;
            this.timeout = timeout;

            const config: AxiosRequestConfig = {
                baseURL: this.baseURL,
                timeout: this.timeout,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            this.instance = axios.create(config);
        }
    }

    // Método para obtener la instancia
    public static getInstance(): AxiosInstance {
        if (!this.instance) {
            throw new Error("AxiosSingleton is not initialized. Call initialize() first.");
        }
        return this.instance;
    }
}