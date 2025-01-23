import { fetcher } from "@/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export interface CompanyPropsBase {
  id?: string;
  name: string;
}

export interface AssetPropsBase {
  gatewayId?: string;
  id?: string;
  name: string;
  locationId: string | null;
  parentId: string | null;
  sensorId?: string | null;
  sensorType: string | null;
  status: string | null;
}

export interface LocationPropsBase {
  id?: string;
  name: string;
  parentId: string | null;
}

export interface NodePropsBase extends AssetPropsBase, LocationPropsBase {
  children: NodePropsBase[];
}

export function useCompanies() {
  const { data, isLoading, error, isValidating } = useSWR(
    "companies",
    () => fetcher("companies"),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const memoizedData = useMemo(
    () => ({
      companies: data as CompanyPropsBase[],
      companiesLoading: isLoading,
      companiesError: error,
      companiesValidating: isValidating,
      companiesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedData;
}

export function useAssets(companyId: string) {
  const { data, isLoading, error, isValidating } = useSWR(
    `${companyId}/assets`,
    () => fetcher(`companies/${companyId}/assets`),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const memoizedData = useMemo(
    () => ({
      assets: data as AssetPropsBase[],
      assetsLoading: isLoading,
      assetsError: error,
      assetsValidating: isValidating,
      assetsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedData;
};

export function useLocations(companyId: string) {
  const { data, isLoading, error, isValidating } = useSWR(
    `${companyId}/locations`,
    () => fetcher(`companies/${companyId}/locations`),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const memoizedData = useMemo(
    () => ({
      locations: data as LocationPropsBase[],
      locationsLoading: isLoading,
      locationsError: error,
      locationsValidating: isValidating,
      locationsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedData;
};
