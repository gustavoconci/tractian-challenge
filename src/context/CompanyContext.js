import { createContext, useState } from 'react';
import { useCompanies } from "@/api/companies";

export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const { companies, companiesLoading } = useCompanies();
  const [ company, setCompany ] = useState({});

  return (
    <CompanyContext.Provider value={{ companies, companiesLoading, company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};
