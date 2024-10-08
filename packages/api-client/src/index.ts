/**
 * Generated by orval v7.0.1 🍺
 * Do not edit manually.
 * Watchtower API
 * Watchtower REST API
 * OpenAPI spec version: 0.0.1
 */
import axios from 'axios'
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import useSwr from 'swr'
import type {
  Arguments,
  Key,
  SWRConfiguration
} from 'swr'
import useSWRMutation from 'swr/mutation'
import type {
  SWRMutationConfiguration
} from 'swr/mutation'
export type IntegrationConfigControllerUpdateIntegrationConfig200 = { [key: string]: unknown };

export type IntegrationConfigControllerGetIntegrationConfig200 = { [key: string]: unknown };

export type MonitorConfigControllerUpdateMonitorConfig200 = { [key: string]: unknown };

export type MonitorConfigControllerGetMonitorConfig200 = { [key: string]: unknown };

/**
 * @nullable
 */
export type HealthControllerCheck503Info = {[key: string]: {
  status: string;
  [key: string]: unknown;
 }} | null;

/**
 * @nullable
 */
export type HealthControllerCheck503Error = {[key: string]: {
  status: string;
  [key: string]: unknown;
 }} | null;

export type HealthControllerCheck503Details = {[key: string]: {
  status: string;
  [key: string]: unknown;
 }};

export type HealthControllerCheck503 = {
  details?: HealthControllerCheck503Details;
  /** @nullable */
  error?: HealthControllerCheck503Error;
  /** @nullable */
  info?: HealthControllerCheck503Info;
  status?: string;
};

/**
 * @nullable
 */
export type HealthControllerCheck200Info = {[key: string]: {
  status: string;
  [key: string]: unknown;
 }} | null;

/**
 * @nullable
 */
export type HealthControllerCheck200Error = {[key: string]: {
  status: string;
  [key: string]: unknown;
 }} | null;

export type HealthControllerCheck200Details = {[key: string]: {
  status: string;
  [key: string]: unknown;
 }};

export type HealthControllerCheck200 = {
  details?: HealthControllerCheck200Details;
  /** @nullable */
  error?: HealthControllerCheck200Error;
  /** @nullable */
  info?: HealthControllerCheck200Info;
  status?: string;
};

export interface IntegrationUpdateDto {
  name?: string;
}

export interface IntegrationCreateDto {
  name: string;
  type: string;
}

export interface IntegrationDto {
  id: number;
  name: string;
  type: string;
}

export interface IntegrationTypeDto {
  description: string;
  id: string;
  name: string;
}

export interface MonitorTypeDto {
  description: string;
  id: string;
  name: string;
}

export interface Object { [key: string]: unknown }

export interface MonitorHistoryDto {
  finishedAt: number;
  id: number;
  startedAt: number;
  success: boolean;
}

export interface MonitorUpdateDto {
  integrations?: number[];
  interval?: number;
  name?: string;
}

export interface MonitorCreateDto {
  name: string;
  type: string;
}

export interface ErrorDto {
  message: string;
  statusCode: number;
}

export interface MonitorDto {
  id: number;
  integrations?: number[];
  interval: number;
  name: string;
  retries: number;
  retryInterval: number;
  type: string;
}




  
  export const healthControllerCheck = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<HealthControllerCheck200>> => {
    return axios.get(
      `/api/health`,options
    );
  }



export const getHealthControllerCheckKey = () => [`/api/health`] as const;

export type HealthControllerCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthControllerCheck>>>
export type HealthControllerCheckQueryError = AxiosError<HealthControllerCheck503>

export const useHealthControllerCheck = <TError = AxiosError<HealthControllerCheck503>>(
   options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof healthControllerCheck>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getHealthControllerCheckKey() : null);
  const swrFn = () => healthControllerCheck(axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const monitorControllerGetMonitors = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<MonitorDto[]>> => {
    return axios.get(
      `/api/monitors`,options
    );
  }



export const getMonitorControllerGetMonitorsKey = () => [`/api/monitors`] as const;

export type MonitorControllerGetMonitorsQueryResult = NonNullable<Awaited<ReturnType<typeof monitorControllerGetMonitors>>>
export type MonitorControllerGetMonitorsQueryError = AxiosError<unknown>

export const useMonitorControllerGetMonitors = <TError = AxiosError<unknown>>(
   options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof monitorControllerGetMonitors>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getMonitorControllerGetMonitorsKey() : null);
  const swrFn = () => monitorControllerGetMonitors(axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const monitorControllerAddMonitor = (
    monitorCreateDto: MonitorCreateDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<MonitorDto>> => {
    return axios.post(
      `/api/monitors`,
      monitorCreateDto,options
    );
  }



export const getMonitorControllerAddMonitorMutationFetcher = ( options?: AxiosRequestConfig) => {
  return (_: Key, { arg }: { arg: MonitorCreateDto }): Promise<AxiosResponse<MonitorDto>> => {
    return monitorControllerAddMonitor(arg, options);
  }
}
export const getMonitorControllerAddMonitorMutationKey = () => [`/api/monitors`] as const;

export type MonitorControllerAddMonitorMutationResult = NonNullable<Awaited<ReturnType<typeof monitorControllerAddMonitor>>>
export type MonitorControllerAddMonitorMutationError = AxiosError<unknown>

export const useMonitorControllerAddMonitor = <TError = AxiosError<unknown>>(
   options?: { swr?:SWRMutationConfiguration<Awaited<ReturnType<typeof monitorControllerAddMonitor>>, TError, Key, MonitorCreateDto, Awaited<ReturnType<typeof monitorControllerAddMonitor>>> & { swrKey?: string }, axios?: AxiosRequestConfig}
) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const swrKey = swrOptions?.swrKey ?? getMonitorControllerAddMonitorMutationKey();
  const swrFn = getMonitorControllerAddMonitorMutationFetcher(axiosOptions);

  const query = useSWRMutation(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const monitorControllerGetMonitor = (
    id: number, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<MonitorDto>> => {
    return axios.get(
      `/api/monitors/${id}`,options
    );
  }



export const getMonitorControllerGetMonitorKey = (id: number,) => [`/api/monitors/${id}`] as const;

export type MonitorControllerGetMonitorQueryResult = NonNullable<Awaited<ReturnType<typeof monitorControllerGetMonitor>>>
export type MonitorControllerGetMonitorQueryError = AxiosError<ErrorDto>

export const useMonitorControllerGetMonitor = <TError = AxiosError<ErrorDto>>(
  id: number, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof monitorControllerGetMonitor>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getMonitorControllerGetMonitorKey(id) : null);
  const swrFn = () => monitorControllerGetMonitor(id, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const monitorControllerUpdateMonitor = (
    id: number,
    monitorUpdateDto: MonitorUpdateDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<MonitorDto>> => {
    return axios.patch(
      `/api/monitors/${id}`,
      monitorUpdateDto,options
    );
  }



export const getMonitorControllerUpdateMonitorMutationFetcher = (id: number, options?: AxiosRequestConfig) => {
  return (_: Key, { arg }: { arg: MonitorUpdateDto }): Promise<AxiosResponse<MonitorDto>> => {
    return monitorControllerUpdateMonitor(id, arg, options);
  }
}
export const getMonitorControllerUpdateMonitorMutationKey = (id: number,) => [`/api/monitors/${id}`] as const;

export type MonitorControllerUpdateMonitorMutationResult = NonNullable<Awaited<ReturnType<typeof monitorControllerUpdateMonitor>>>
export type MonitorControllerUpdateMonitorMutationError = AxiosError<ErrorDto>

export const useMonitorControllerUpdateMonitor = <TError = AxiosError<ErrorDto>>(
  id: number, options?: { swr?:SWRMutationConfiguration<Awaited<ReturnType<typeof monitorControllerUpdateMonitor>>, TError, Key, MonitorUpdateDto, Awaited<ReturnType<typeof monitorControllerUpdateMonitor>>> & { swrKey?: string }, axios?: AxiosRequestConfig}
) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const swrKey = swrOptions?.swrKey ?? getMonitorControllerUpdateMonitorMutationKey(id);
  const swrFn = getMonitorControllerUpdateMonitorMutationFetcher(id, axiosOptions);

  const query = useSWRMutation(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const monitorControllerDeleteMonitor = (
    id: number, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<MonitorDto>> => {
    return axios.delete(
      `/api/monitors/${id}`,options
    );
  }



export const getMonitorControllerDeleteMonitorMutationFetcher = (id: number, options?: AxiosRequestConfig) => {
  return (_: Key, __: { arg: Arguments }): Promise<AxiosResponse<MonitorDto>> => {
    return monitorControllerDeleteMonitor(id, options);
  }
}
export const getMonitorControllerDeleteMonitorMutationKey = (id: number,) => [`/api/monitors/${id}`] as const;

export type MonitorControllerDeleteMonitorMutationResult = NonNullable<Awaited<ReturnType<typeof monitorControllerDeleteMonitor>>>
export type MonitorControllerDeleteMonitorMutationError = AxiosError<ErrorDto>

export const useMonitorControllerDeleteMonitor = <TError = AxiosError<ErrorDto>>(
  id: number, options?: { swr?:SWRMutationConfiguration<Awaited<ReturnType<typeof monitorControllerDeleteMonitor>>, TError, Key, Arguments, Awaited<ReturnType<typeof monitorControllerDeleteMonitor>>> & { swrKey?: string }, axios?: AxiosRequestConfig}
) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const swrKey = swrOptions?.swrKey ?? getMonitorControllerDeleteMonitorMutationKey(id);
  const swrFn = getMonitorControllerDeleteMonitorMutationFetcher(id, axiosOptions);

  const query = useSWRMutation(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const monitorHistoryControllerGetMonitorHistory = (
    id: number, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<MonitorHistoryDto[]>> => {
    return axios.get(
      `/api/monitors/${id}/history`,options
    );
  }



export const getMonitorHistoryControllerGetMonitorHistoryKey = (id: number,) => [`/api/monitors/${id}/history`] as const;

export type MonitorHistoryControllerGetMonitorHistoryQueryResult = NonNullable<Awaited<ReturnType<typeof monitorHistoryControllerGetMonitorHistory>>>
export type MonitorHistoryControllerGetMonitorHistoryQueryError = AxiosError<unknown>

export const useMonitorHistoryControllerGetMonitorHistory = <TError = AxiosError<unknown>>(
  id: number, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof monitorHistoryControllerGetMonitorHistory>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getMonitorHistoryControllerGetMonitorHistoryKey(id) : null);
  const swrFn = () => monitorHistoryControllerGetMonitorHistory(id, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const monitorConfigControllerGetMonitorConfig = (
    id: number, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<MonitorConfigControllerGetMonitorConfig200>> => {
    return axios.get(
      `/api/monitors/${id}/config`,options
    );
  }



export const getMonitorConfigControllerGetMonitorConfigKey = (id: number,) => [`/api/monitors/${id}/config`] as const;

export type MonitorConfigControllerGetMonitorConfigQueryResult = NonNullable<Awaited<ReturnType<typeof monitorConfigControllerGetMonitorConfig>>>
export type MonitorConfigControllerGetMonitorConfigQueryError = AxiosError<unknown>

export const useMonitorConfigControllerGetMonitorConfig = <TError = AxiosError<unknown>>(
  id: number, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof monitorConfigControllerGetMonitorConfig>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getMonitorConfigControllerGetMonitorConfigKey(id) : null);
  const swrFn = () => monitorConfigControllerGetMonitorConfig(id, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const monitorConfigControllerUpdateMonitorConfig = (
    id: number,
    monitorConfigControllerUpdateMonitorConfigBody: Object, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<MonitorConfigControllerUpdateMonitorConfig200>> => {
    return axios.put(
      `/api/monitors/${id}/config`,
      monitorConfigControllerUpdateMonitorConfigBody,options
    );
  }



export const getMonitorConfigControllerUpdateMonitorConfigMutationFetcher = (id: number, options?: AxiosRequestConfig) => {
  return (_: Key, { arg }: { arg: Object }): Promise<AxiosResponse<MonitorConfigControllerUpdateMonitorConfig200>> => {
    return monitorConfigControllerUpdateMonitorConfig(id, arg, options);
  }
}
export const getMonitorConfigControllerUpdateMonitorConfigMutationKey = (id: number,) => [`/api/monitors/${id}/config`] as const;

export type MonitorConfigControllerUpdateMonitorConfigMutationResult = NonNullable<Awaited<ReturnType<typeof monitorConfigControllerUpdateMonitorConfig>>>
export type MonitorConfigControllerUpdateMonitorConfigMutationError = AxiosError<unknown>

export const useMonitorConfigControllerUpdateMonitorConfig = <TError = AxiosError<unknown>>(
  id: number, options?: { swr?:SWRMutationConfiguration<Awaited<ReturnType<typeof monitorConfigControllerUpdateMonitorConfig>>, TError, Key, Object, Awaited<ReturnType<typeof monitorConfigControllerUpdateMonitorConfig>>> & { swrKey?: string }, axios?: AxiosRequestConfig}
) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const swrKey = swrOptions?.swrKey ?? getMonitorConfigControllerUpdateMonitorConfigMutationKey(id);
  const swrFn = getMonitorConfigControllerUpdateMonitorConfigMutationFetcher(id, axiosOptions);

  const query = useSWRMutation(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const monitorTypeControllerGetMonitorTypes = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<MonitorTypeDto[]>> => {
    return axios.get(
      `/api/monitor-types`,options
    );
  }



export const getMonitorTypeControllerGetMonitorTypesKey = () => [`/api/monitor-types`] as const;

export type MonitorTypeControllerGetMonitorTypesQueryResult = NonNullable<Awaited<ReturnType<typeof monitorTypeControllerGetMonitorTypes>>>
export type MonitorTypeControllerGetMonitorTypesQueryError = AxiosError<unknown>

export const useMonitorTypeControllerGetMonitorTypes = <TError = AxiosError<unknown>>(
   options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof monitorTypeControllerGetMonitorTypes>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getMonitorTypeControllerGetMonitorTypesKey() : null);
  const swrFn = () => monitorTypeControllerGetMonitorTypes(axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const monitorTypeControllerGetSchema = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.get(
      `/api/monitor-types/${id}`,options
    );
  }



export const getMonitorTypeControllerGetSchemaKey = (id: string,) => [`/api/monitor-types/${id}`] as const;

export type MonitorTypeControllerGetSchemaQueryResult = NonNullable<Awaited<ReturnType<typeof monitorTypeControllerGetSchema>>>
export type MonitorTypeControllerGetSchemaQueryError = AxiosError<unknown>

export const useMonitorTypeControllerGetSchema = <TError = AxiosError<unknown>>(
  id: string, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof monitorTypeControllerGetSchema>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getMonitorTypeControllerGetSchemaKey(id) : null);
  const swrFn = () => monitorTypeControllerGetSchema(id, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const monitorTypeControllerGetSchemaDocs = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<string>> => {
    return axios.get(
      `/api/monitor-types/${id}/docs`,options
    );
  }



export const getMonitorTypeControllerGetSchemaDocsKey = (id: string,) => [`/api/monitor-types/${id}/docs`] as const;

export type MonitorTypeControllerGetSchemaDocsQueryResult = NonNullable<Awaited<ReturnType<typeof monitorTypeControllerGetSchemaDocs>>>
export type MonitorTypeControllerGetSchemaDocsQueryError = AxiosError<unknown>

export const useMonitorTypeControllerGetSchemaDocs = <TError = AxiosError<unknown>>(
  id: string, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof monitorTypeControllerGetSchemaDocs>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getMonitorTypeControllerGetSchemaDocsKey(id) : null);
  const swrFn = () => monitorTypeControllerGetSchemaDocs(id, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const monitorTypeControllerValidateSchema = (
    id: string,
    monitorTypeControllerValidateSchemaBody: Object, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.post(
      `/api/monitor-types/${id}/validate`,
      monitorTypeControllerValidateSchemaBody,options
    );
  }



export const getMonitorTypeControllerValidateSchemaMutationFetcher = (id: string, options?: AxiosRequestConfig) => {
  return (_: Key, { arg }: { arg: Object }): Promise<AxiosResponse<void>> => {
    return monitorTypeControllerValidateSchema(id, arg, options);
  }
}
export const getMonitorTypeControllerValidateSchemaMutationKey = (id: string,) => [`/api/monitor-types/${id}/validate`] as const;

export type MonitorTypeControllerValidateSchemaMutationResult = NonNullable<Awaited<ReturnType<typeof monitorTypeControllerValidateSchema>>>
export type MonitorTypeControllerValidateSchemaMutationError = AxiosError<unknown>

export const useMonitorTypeControllerValidateSchema = <TError = AxiosError<unknown>>(
  id: string, options?: { swr?:SWRMutationConfiguration<Awaited<ReturnType<typeof monitorTypeControllerValidateSchema>>, TError, Key, Object, Awaited<ReturnType<typeof monitorTypeControllerValidateSchema>>> & { swrKey?: string }, axios?: AxiosRequestConfig}
) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const swrKey = swrOptions?.swrKey ?? getMonitorTypeControllerValidateSchemaMutationKey(id);
  const swrFn = getMonitorTypeControllerValidateSchemaMutationFetcher(id, axiosOptions);

  const query = useSWRMutation(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const integrationTypeControllerGetIntegrationTypes = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<IntegrationTypeDto[]>> => {
    return axios.get(
      `/api/integration-types`,options
    );
  }



export const getIntegrationTypeControllerGetIntegrationTypesKey = () => [`/api/integration-types`] as const;

export type IntegrationTypeControllerGetIntegrationTypesQueryResult = NonNullable<Awaited<ReturnType<typeof integrationTypeControllerGetIntegrationTypes>>>
export type IntegrationTypeControllerGetIntegrationTypesQueryError = AxiosError<unknown>

export const useIntegrationTypeControllerGetIntegrationTypes = <TError = AxiosError<unknown>>(
   options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof integrationTypeControllerGetIntegrationTypes>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getIntegrationTypeControllerGetIntegrationTypesKey() : null);
  const swrFn = () => integrationTypeControllerGetIntegrationTypes(axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const integrationTypeControllerGetSchema = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.get(
      `/api/integration-types/${id}`,options
    );
  }



export const getIntegrationTypeControllerGetSchemaKey = (id: string,) => [`/api/integration-types/${id}`] as const;

export type IntegrationTypeControllerGetSchemaQueryResult = NonNullable<Awaited<ReturnType<typeof integrationTypeControllerGetSchema>>>
export type IntegrationTypeControllerGetSchemaQueryError = AxiosError<unknown>

export const useIntegrationTypeControllerGetSchema = <TError = AxiosError<unknown>>(
  id: string, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof integrationTypeControllerGetSchema>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getIntegrationTypeControllerGetSchemaKey(id) : null);
  const swrFn = () => integrationTypeControllerGetSchema(id, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const integrationTypeControllerGetSchemaDocs = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<string>> => {
    return axios.get(
      `/api/integration-types/${id}/docs`,options
    );
  }



export const getIntegrationTypeControllerGetSchemaDocsKey = (id: string,) => [`/api/integration-types/${id}/docs`] as const;

export type IntegrationTypeControllerGetSchemaDocsQueryResult = NonNullable<Awaited<ReturnType<typeof integrationTypeControllerGetSchemaDocs>>>
export type IntegrationTypeControllerGetSchemaDocsQueryError = AxiosError<unknown>

export const useIntegrationTypeControllerGetSchemaDocs = <TError = AxiosError<unknown>>(
  id: string, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof integrationTypeControllerGetSchemaDocs>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getIntegrationTypeControllerGetSchemaDocsKey(id) : null);
  const swrFn = () => integrationTypeControllerGetSchemaDocs(id, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const integrationTypeControllerValidateSchema = (
    id: string,
    integrationTypeControllerValidateSchemaBody: Object, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.post(
      `/api/integration-types/${id}/validate`,
      integrationTypeControllerValidateSchemaBody,options
    );
  }



export const getIntegrationTypeControllerValidateSchemaMutationFetcher = (id: string, options?: AxiosRequestConfig) => {
  return (_: Key, { arg }: { arg: Object }): Promise<AxiosResponse<void>> => {
    return integrationTypeControllerValidateSchema(id, arg, options);
  }
}
export const getIntegrationTypeControllerValidateSchemaMutationKey = (id: string,) => [`/api/integration-types/${id}/validate`] as const;

export type IntegrationTypeControllerValidateSchemaMutationResult = NonNullable<Awaited<ReturnType<typeof integrationTypeControllerValidateSchema>>>
export type IntegrationTypeControllerValidateSchemaMutationError = AxiosError<unknown>

export const useIntegrationTypeControllerValidateSchema = <TError = AxiosError<unknown>>(
  id: string, options?: { swr?:SWRMutationConfiguration<Awaited<ReturnType<typeof integrationTypeControllerValidateSchema>>, TError, Key, Object, Awaited<ReturnType<typeof integrationTypeControllerValidateSchema>>> & { swrKey?: string }, axios?: AxiosRequestConfig}
) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const swrKey = swrOptions?.swrKey ?? getIntegrationTypeControllerValidateSchemaMutationKey(id);
  const swrFn = getIntegrationTypeControllerValidateSchemaMutationFetcher(id, axiosOptions);

  const query = useSWRMutation(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const integrationControllerGetIntegrations = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<IntegrationDto[]>> => {
    return axios.get(
      `/api/integrations`,options
    );
  }



export const getIntegrationControllerGetIntegrationsKey = () => [`/api/integrations`] as const;

export type IntegrationControllerGetIntegrationsQueryResult = NonNullable<Awaited<ReturnType<typeof integrationControllerGetIntegrations>>>
export type IntegrationControllerGetIntegrationsQueryError = AxiosError<unknown>

export const useIntegrationControllerGetIntegrations = <TError = AxiosError<unknown>>(
   options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof integrationControllerGetIntegrations>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getIntegrationControllerGetIntegrationsKey() : null);
  const swrFn = () => integrationControllerGetIntegrations(axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const integrationControllerAddIntegration = (
    integrationCreateDto: IntegrationCreateDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<IntegrationDto>> => {
    return axios.post(
      `/api/integrations`,
      integrationCreateDto,options
    );
  }



export const getIntegrationControllerAddIntegrationMutationFetcher = ( options?: AxiosRequestConfig) => {
  return (_: Key, { arg }: { arg: IntegrationCreateDto }): Promise<AxiosResponse<IntegrationDto>> => {
    return integrationControllerAddIntegration(arg, options);
  }
}
export const getIntegrationControllerAddIntegrationMutationKey = () => [`/api/integrations`] as const;

export type IntegrationControllerAddIntegrationMutationResult = NonNullable<Awaited<ReturnType<typeof integrationControllerAddIntegration>>>
export type IntegrationControllerAddIntegrationMutationError = AxiosError<unknown>

export const useIntegrationControllerAddIntegration = <TError = AxiosError<unknown>>(
   options?: { swr?:SWRMutationConfiguration<Awaited<ReturnType<typeof integrationControllerAddIntegration>>, TError, Key, IntegrationCreateDto, Awaited<ReturnType<typeof integrationControllerAddIntegration>>> & { swrKey?: string }, axios?: AxiosRequestConfig}
) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const swrKey = swrOptions?.swrKey ?? getIntegrationControllerAddIntegrationMutationKey();
  const swrFn = getIntegrationControllerAddIntegrationMutationFetcher(axiosOptions);

  const query = useSWRMutation(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const integrationControllerGetIntegration = (
    id: number, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<IntegrationDto>> => {
    return axios.get(
      `/api/integrations/${id}`,options
    );
  }



export const getIntegrationControllerGetIntegrationKey = (id: number,) => [`/api/integrations/${id}`] as const;

export type IntegrationControllerGetIntegrationQueryResult = NonNullable<Awaited<ReturnType<typeof integrationControllerGetIntegration>>>
export type IntegrationControllerGetIntegrationQueryError = AxiosError<ErrorDto>

export const useIntegrationControllerGetIntegration = <TError = AxiosError<ErrorDto>>(
  id: number, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof integrationControllerGetIntegration>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getIntegrationControllerGetIntegrationKey(id) : null);
  const swrFn = () => integrationControllerGetIntegration(id, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const integrationControllerUpdateIntegration = (
    id: number,
    integrationUpdateDto: IntegrationUpdateDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<IntegrationDto>> => {
    return axios.patch(
      `/api/integrations/${id}`,
      integrationUpdateDto,options
    );
  }



export const getIntegrationControllerUpdateIntegrationMutationFetcher = (id: number, options?: AxiosRequestConfig) => {
  return (_: Key, { arg }: { arg: IntegrationUpdateDto }): Promise<AxiosResponse<IntegrationDto>> => {
    return integrationControllerUpdateIntegration(id, arg, options);
  }
}
export const getIntegrationControllerUpdateIntegrationMutationKey = (id: number,) => [`/api/integrations/${id}`] as const;

export type IntegrationControllerUpdateIntegrationMutationResult = NonNullable<Awaited<ReturnType<typeof integrationControllerUpdateIntegration>>>
export type IntegrationControllerUpdateIntegrationMutationError = AxiosError<ErrorDto>

export const useIntegrationControllerUpdateIntegration = <TError = AxiosError<ErrorDto>>(
  id: number, options?: { swr?:SWRMutationConfiguration<Awaited<ReturnType<typeof integrationControllerUpdateIntegration>>, TError, Key, IntegrationUpdateDto, Awaited<ReturnType<typeof integrationControllerUpdateIntegration>>> & { swrKey?: string }, axios?: AxiosRequestConfig}
) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const swrKey = swrOptions?.swrKey ?? getIntegrationControllerUpdateIntegrationMutationKey(id);
  const swrFn = getIntegrationControllerUpdateIntegrationMutationFetcher(id, axiosOptions);

  const query = useSWRMutation(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const integrationControllerDeleteIntegration = (
    id: number, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<IntegrationDto>> => {
    return axios.delete(
      `/api/integrations/${id}`,options
    );
  }



export const getIntegrationControllerDeleteIntegrationMutationFetcher = (id: number, options?: AxiosRequestConfig) => {
  return (_: Key, __: { arg: Arguments }): Promise<AxiosResponse<IntegrationDto>> => {
    return integrationControllerDeleteIntegration(id, options);
  }
}
export const getIntegrationControllerDeleteIntegrationMutationKey = (id: number,) => [`/api/integrations/${id}`] as const;

export type IntegrationControllerDeleteIntegrationMutationResult = NonNullable<Awaited<ReturnType<typeof integrationControllerDeleteIntegration>>>
export type IntegrationControllerDeleteIntegrationMutationError = AxiosError<ErrorDto>

export const useIntegrationControllerDeleteIntegration = <TError = AxiosError<ErrorDto>>(
  id: number, options?: { swr?:SWRMutationConfiguration<Awaited<ReturnType<typeof integrationControllerDeleteIntegration>>, TError, Key, Arguments, Awaited<ReturnType<typeof integrationControllerDeleteIntegration>>> & { swrKey?: string }, axios?: AxiosRequestConfig}
) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const swrKey = swrOptions?.swrKey ?? getIntegrationControllerDeleteIntegrationMutationKey(id);
  const swrFn = getIntegrationControllerDeleteIntegrationMutationFetcher(id, axiosOptions);

  const query = useSWRMutation(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const integrationConfigControllerGetIntegrationConfig = (
    id: number, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<IntegrationConfigControllerGetIntegrationConfig200>> => {
    return axios.get(
      `/api/integrations/${id}/config`,options
    );
  }



export const getIntegrationConfigControllerGetIntegrationConfigKey = (id: number,) => [`/api/integrations/${id}/config`] as const;

export type IntegrationConfigControllerGetIntegrationConfigQueryResult = NonNullable<Awaited<ReturnType<typeof integrationConfigControllerGetIntegrationConfig>>>
export type IntegrationConfigControllerGetIntegrationConfigQueryError = AxiosError<unknown>

export const useIntegrationConfigControllerGetIntegrationConfig = <TError = AxiosError<unknown>>(
  id: number, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof integrationConfigControllerGetIntegrationConfig>>, TError> & { swrKey?: Key, enabled?: boolean }, axios?: AxiosRequestConfig }
) => {
  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnabled = swrOptions?.enabled !== false && !!(id)
  const swrKey = swrOptions?.swrKey ?? (() => isEnabled ? getIntegrationConfigControllerGetIntegrationConfigKey(id) : null);
  const swrFn = () => integrationConfigControllerGetIntegrationConfig(id, axiosOptions)

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

export const integrationConfigControllerUpdateIntegrationConfig = (
    id: number,
    integrationConfigControllerUpdateIntegrationConfigBody: Object, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<IntegrationConfigControllerUpdateIntegrationConfig200>> => {
    return axios.put(
      `/api/integrations/${id}/config`,
      integrationConfigControllerUpdateIntegrationConfigBody,options
    );
  }



export const getIntegrationConfigControllerUpdateIntegrationConfigMutationFetcher = (id: number, options?: AxiosRequestConfig) => {
  return (_: Key, { arg }: { arg: Object }): Promise<AxiosResponse<IntegrationConfigControllerUpdateIntegrationConfig200>> => {
    return integrationConfigControllerUpdateIntegrationConfig(id, arg, options);
  }
}
export const getIntegrationConfigControllerUpdateIntegrationConfigMutationKey = (id: number,) => [`/api/integrations/${id}/config`] as const;

export type IntegrationConfigControllerUpdateIntegrationConfigMutationResult = NonNullable<Awaited<ReturnType<typeof integrationConfigControllerUpdateIntegrationConfig>>>
export type IntegrationConfigControllerUpdateIntegrationConfigMutationError = AxiosError<unknown>

export const useIntegrationConfigControllerUpdateIntegrationConfig = <TError = AxiosError<unknown>>(
  id: number, options?: { swr?:SWRMutationConfiguration<Awaited<ReturnType<typeof integrationConfigControllerUpdateIntegrationConfig>>, TError, Key, Object, Awaited<ReturnType<typeof integrationConfigControllerUpdateIntegrationConfig>>> & { swrKey?: string }, axios?: AxiosRequestConfig}
) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const swrKey = swrOptions?.swrKey ?? getIntegrationConfigControllerUpdateIntegrationConfigMutationKey(id);
  const swrFn = getIntegrationConfigControllerUpdateIntegrationConfigMutationFetcher(id, axiosOptions);

  const query = useSWRMutation(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

