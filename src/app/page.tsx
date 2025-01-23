"use client";

import { useContext } from "react";
import Header from "@/components/Header/Header";
import Tree from "@/components/Tree/Tree";
import AssetViewer from "@/components/AssetViewer/AssetViewer";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import { CompanyContext, CompanyProvider } from "@/context/CompanyContext";
import { AssetContext, AssetProvider } from "@/context/AssetContext";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <CompanyProvider>
        <Header />
        <main className={styles.main}>
          <AssetProvider>
            <PageBody />
          </AssetProvider>
        </main>
      </CompanyProvider>
    </div>
  );
}

const PageBody = () => {
  const { company } = useContext(CompanyContext);
  const { energySensorFilter, setEnergySensorFilter, sensorStatusFilter, setSensorStatusFilter } = useContext(AssetContext);

  if (!Object.keys(company).length) {
    return (
      <div className={styles.page_header}>
        <h1 className={styles.page_title}>
          Selecione uma empresa
        </h1>
      </div>
    );
  }

  return (<>
      <div className={styles.page_header}>
        <h1 className={styles.page_title}>
          Ativos
          <span>/ {company.name}</span>
        </h1>
        <div className={styles.page_actions}>
          <Button variant="outline" onClick={() => setEnergySensorFilter(!energySensorFilter)}>
            <Icon id="energy" size={16}/>
            Sensor de Energia
          </Button>
          <Button variant="outline" onClick={() => setSensorStatusFilter(!sensorStatusFilter)}>
            <Icon id="info" size={16}/>
            Crítico
          </Button>
        </div>
      </div>
      <div className={styles.page_body}>
          <Tree />
          <AssetViewer />
      </div>
  </>);
};