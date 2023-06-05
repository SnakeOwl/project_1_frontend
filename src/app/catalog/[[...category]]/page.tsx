"use client"
import { useContext, useEffect, useState } from "react";
import Pagination from "./Components/Pagination";
import axiosClient from "@/axios-client";
import OfferList from "./OffersList";
import ContextCatalog from "@/context/Catalog/ContextCatalog";

export default function Catalog({
  params
}: {
  params: {
    category: [string]
  }
}) {

  const { stateCatalog, dispatchCatalog } = useContext(ContextCatalog);
  const { offers } = stateCatalog;

  // подгрузка Офферов
  useEffect(() => {
    const category = params.category === undefined ? null: params.category[0];

    axiosClient.get("catalog", {params: {category: category}})
      .then(({ data }) => {
        dispatchCatalog({
          type: "SET_OFFERS",
          offers: data.offers
        });
      })
  }, []);
  

  return (
    <div className="">
      <div className="flex flex-wrap">
        <OfferList className={"px-1"} offers={offers.data} />
      </div>


      <Pagination links={offers.links} />
    </div>
  );
}
