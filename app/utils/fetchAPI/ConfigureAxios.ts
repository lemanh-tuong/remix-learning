import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

interface Configure {
  configure: AxiosRequestConfig;
}

export class ConfigureAxios {
  private axiosInstance: AxiosInstance;

  public constructor({ configure }: Configure) {
    this.axiosInstance = axios.create(configure);
  }

  public create = () => {
    return {
      request: (requestConfig: AxiosRequestConfig) => {
        const request = this.axiosInstance({ ...requestConfig });
        return request;
      },
    };
  };
}
