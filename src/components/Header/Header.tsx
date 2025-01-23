import { useContext } from "react";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import { CompanyContext } from "@/context/CompanyContext";

import styles from "./header.module.scss";
import { CompanyPropsBase } from "@/api/companies";

export default function Header() {
  const { companies, companiesLoading, setCompany } = useContext(CompanyContext);

  const navbarItemClick = (company: CompanyPropsBase) => setCompany(company)

  return (
    <div className={styles.header}>
      <Image src="/tractian-logo.svg" width="103" height="14" alt="Logo" />

      {!companiesLoading && (
        <ul className={styles.navbar}>
          {companies?.map((company: CompanyPropsBase) => {
            const { id, name } = company;

            return (
            <li
              key={id}
              onClick={() => navbarItemClick(company)}
              className={styles.navbar_item}
            >
                <Icon id="company" />
              {name}
            </li>
          )})}
        </ul>
      )}
    </div>
  );
}
