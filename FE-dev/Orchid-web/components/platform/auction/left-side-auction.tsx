"use client";

import EmblaCarousel from "@/components/carousel/thumb-carousel";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import axios from "axios";
import ContentLoader from "react-content-loader";
import { useParams } from "next/navigation";

const LeftSideAuction = () => {
  const OPTIONS: EmblaOptionsType = {};
  // const SLIDE_COUNT = 10;
  // const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  const params = useParams()

  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${params.auctionId}`);

        setProduct(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, [params.auctionId]);

  if (loading) {
    return <ContentLoader className="w-full md:w-2/3"/>;
  }

  return (
    <div className="w-full md:w-2/3">
      <EmblaCarousel
        slides={Array.from(Array(product.images.length).keys())}
        options={OPTIONS}
        product={product}
      />
    </div>
  );
};

export default LeftSideAuction;
