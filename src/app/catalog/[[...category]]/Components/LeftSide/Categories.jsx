import { BlueLink, BlueLinkReversed } from "@/Components/Links/ColoredLinks";
import axiosClient from "@/axios-client";
import ContextCatalog from "@/context/Catalog/ContextCatalog";
import { useContext, useEffect, useState } from "react";

export default function Categories({ className = "" }) {
  const {stateCatalog} = useContext(ContextCatalog)
  const {acitveCategory} = stateCatalog;
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    axiosClient.get("get-categories")
      .then(({data})=>{
        setCategories(data.categories);
      })
  }, [acitveCategory])

  return (
    <div className={`${className} flex flex-col`}>
      {categories.map((category) => {
        return (stateCatalog.activeCategoryAlias === category.alias) ?
          (
            <BlueLink
              key={category.id}
              href={`/catalog/${category.alias}`}
              className={"py-2 text-center mb-3"}
            >
              {category.name}

            </BlueLink>
          )
          :
          (
            <BlueLinkReversed
              key={category.id}
              href={`/catalog/${category.alias}`}
              className={"py-2 text-center mb-3"}
            >
              {category.name}
            </BlueLinkReversed>
          );
      })}
    </div>
  );
}
