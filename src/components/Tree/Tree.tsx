import { useCallback, useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { CompanyContext } from "@/context/CompanyContext";
import { AssetContext } from "@/context/AssetContext";
import { useAssets, useLocations, NodePropsBase } from "@/api/companies";
import styles from "./tree.module.scss";

export default function Tree() {
  const { company } = useContext(CompanyContext);
  const { assets } = useAssets(company?.id);
  const { locations } = useLocations(company?.id);
  const { setAssetData, energySensorFilter, setEnergySensorFilter, sensorStatusFilter, setSensorStatusFilter } =
    useContext(AssetContext);
  const [tree, setTree] = useState<NodePropsBase[]>([]);
  const [search, setSearch] = useState("");

  const itemClick = (type: string, item: NodePropsBase) => {
    if (type !== "component") return;

    setAssetData(item);
  };

  const renderTree = useCallback(
    (data: NodePropsBase[]) => {
      return data.map((item: NodePropsBase) => {
        const { id, name, sensorType, sensorId, children, status } = item;
        const type =
          typeof sensorType === "undefined"
            ? "location"
            : sensorId
            ? "component"
            : "asset";

        return (
          <li key={id} className={`${styles.tree_item} ${styles[type]}`}>
            <span
              className={styles.tree_item_name}
              onClick={() => itemClick(type, item)}
            >
              {children.length > 0 && <Icon id="arrow-down" size={10} />}
              <Icon id={type} size={22} className={styles.tree_item_icon} />
              {name}
              {type === "component" && (
                <div
                  className={`${styles.tree_item_status} ${
                    status && styles[status]
                  }`}
                />
              )}
            </span>
            {children && (
              <ul className={styles.tree_list}>{renderTree(children)}</ul>
            )}
          </li>
        );
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const buildTree = useCallback(
    (data: NodePropsBase[]) => {
      const nodeMap = new Map();
      const rootNodes = [] as NodePropsBase[];

      data.forEach((item) => {
        nodeMap.set(item.id, { ...item, children: [] });
      });

      data.forEach((item) => {
        const { id, locationId, parentId } = item;

        if (locationId) {
          const location = nodeMap.get(locationId);
          if (location) {
            location.children.push(nodeMap.get(id));
          }
        } else if (parentId) {
          const parent = nodeMap.get(parentId);
          if (parent) {
            parent.children.push(nodeMap.get(id));
          }
        } else {
          rootNodes.push(nodeMap.get(id));
        }
      });

      return sortTree(rootNodes);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const sortTree = useCallback((data: NodePropsBase[]) => {
    data.forEach((item) => {
      if (item?.children.length) {
        sortTree(item.children);
      }
    });

    return data.sort((a, b) => {
      if (a.children.length > b.children.length) return -1;
      if (a.children.length < b.children.length) return 1;
      return 0;
    });
  }, []);

  useEffect(() => {
    setTree([]);

    if (!assets || !locations) return;

    const items = [...locations, ...assets];

    setTree(buildTree(items as NodePropsBase[]));

    return () => {
      setTree([]);
      setSearch("");
      setEnergySensorFilter(false);
      setSensorStatusFilter(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets, locations]);

  useEffect(() => {
    if (!assets || !locations) return;

    const items = [...locations, ...assets];
    const lowerCaseSearch = search.toLowerCase();

    function filterTree(node: NodePropsBase): boolean {
      const matches =
        (lowerCaseSearch !== ""
          ? node.name.toLowerCase().includes(lowerCaseSearch)
          : true) &&
        (energySensorFilter ? node.sensorType === "energy" : true) &&
        (sensorStatusFilter ? node.status === "alert" : true);

      const filteredChildren = node.children.filter((node) => filterTree(node));

      node.children = filteredChildren;
      return matches || filteredChildren.length > 0;
    }

    setTree(buildTree(items as NodePropsBase[]).filter(filterTree));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, energySensorFilter, sensorStatusFilter]);

  return (
    <div className={styles.tree}>
      <div className={styles.tree_header}>
        <input
          type="text"
          className={styles.search}
          placeholder="Buscar Ativo ou Local"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Button className={styles.submit}>
          <Icon id="search" />
        </Button>
      </div>
      <div className={styles.tree_body}>
        {!!(tree && tree.length) && (
          <ul className={styles.tree_list}>{renderTree(tree)}</ul>
        )}
      </div>
    </div>
  );
}
