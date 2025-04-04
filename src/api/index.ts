import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

class ApiRequest {
  baseURL: string;
  axiosInstance: AxiosInstance;
  constructor(baseURL = "") {
    this.baseURL = baseURL;
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });
  }

  // GET request
  async get(endpoint: string, params: any, headers: AxiosHeaders) {
    try {
      const response: AxiosResponse = await this.axiosInstance.get(endpoint, {
        params,
        headers,
      });
      return this.formatResponse(response);
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }

  // POST request
  async post<T>(endpoint: string, data: any, headers: any) {
    try {
      const response: AxiosResponse = await this.axiosInstance.post(
        endpoint,
        data,
        {
          headers,
        }
      );
      return this.formatResponse<T>(response);
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }

  // PUT request
  async put(endpoint: string, data: any, headers: AxiosHeaders) {
    try {
      const response: AxiosResponse = await this.axiosInstance.put(
        endpoint,
        data,
        {
          headers,
        }
      );
      return this.formatResponse(response);
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }

  // DELETE request
  async delete(endpoint: string, data: any, headers: AxiosHeaders) {
    try {
      const response: AxiosResponse = await this.axiosInstance.delete(
        endpoint,
        {
          data,
          headers,
        }
      );
      return this.formatResponse(response);
    } catch (error) {
      return this.handleError(error as AxiosError);
    }
  }

  // Format response data in { status, data, statusText }
  formatResponse<T>(response: AxiosResponse) {
    return {
      status: response.status,
      data: response.data as T,
      statusText: response.statusText,
      error: false,
    };
  }

  // Handle errors and return in { status, data, statusText } format
  handleError(error: AxiosError) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      return {
        status: error.response.status,
        data: error.response.data,
        statusText: error.response.statusText,
        error: true,
      };
    } else if (error.request) {
      // The request was made but no response was received
      return {
        status: null,
        data: error.request,
        statusText: "No Response",
        error: true,
      };
    } else {
      // Something happened in setting up the request that triggered an Error
      return {
        status: null,
        data: error.message,
        statusText: "Request Error",
        error: true,
      };
    }
  }
}

export default ApiRequest;
