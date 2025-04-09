import { asyncStorageToken } from './asyncStorageToken';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://172.20.10.1r:8080';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
}

interface ApiError extends Error {
  status?: number;
  data?: any;
}

const createUrl = (endpoint: string, params?: Record<string, string>): string => {
  const url = new URL(`${API_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
};

const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  if (!response.ok) {
    const error: ApiError = new Error('API Error');
    error.status = response.status;
    error.data = isJson ? await response.json() : await response.text();
    throw error;
  }

  if (response.headers.get('content-type')?.includes('image/')) {
    return response.arrayBuffer();
  }

  return isJson ? response.json() : response.text();
};

const request = async <T>(
  endpoint: string,
  method: RequestMethod = 'GET',
  config: RequestConfig = {}
): Promise<T> => {
  const { params, body, headers: customHeaders, ...rest } = config;

  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(customHeaders as Record<string, string>),
  });

  const token = await asyncStorageToken.get();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(createUrl(endpoint, params), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  return handleResponse(response);
};

export const api = {
  get: <T>(endpoint: string, config?: RequestConfig) => request<T>(endpoint, 'GET', config),

  post: <T>(endpoint: string, data?: any, config?: RequestConfig) =>
    request<T>(endpoint, 'POST', { ...config, body: data }),

  put: <T>(endpoint: string, data?: any, config?: RequestConfig) =>
    request<T>(endpoint, 'PUT', { ...config, body: data }),

  patch: <T>(endpoint: string, data?: any, config?: RequestConfig) =>
    request<T>(endpoint, 'PATCH', { ...config, body: data }),

  delete: <T>(endpoint: string, config?: RequestConfig) => request<T>(endpoint, 'DELETE', config),
};
