"use client";
import React, { use, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { VariantsWithImagesTags } from "@/lib/infer-type";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageSliderProps = {
  variants: VariantsWithImagesTags[];
};

const ImageSlider = ({ variants }: ImageSliderProps) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState<number[]>([0]);
  const searchParams = useSearchParams();
  const currentVariantType = searchParams.get("type");

  useEffect(() => {
    if (!mainApi) {
      return;
    }
    mainApi.on("slidesInView", (e) => {
      setActiveIndex(e.slidesInView());
    });
  }, [mainApi]);

  const images = variants.find((v) => v.productType === currentVariantType);

  return (
    <div>
      <Carousel setApi={setMainApi}>
        {/* main photo */}
        <CarouselContent>
          {variants.map(
            (v) =>
              v.productType === currentVariantType &&
              v.variantImages.length > 0 &&
              v.variantImages.map((img) => (
                <CarouselItem
                  key={img.id}
                  className="w-full h-full flex items-center justify-center"
                >
                  {img.image_url ? (
                    <Image
                      src={img.image_url}
                      alt={img.name}
                      width={1100}
                      height={600}
                      priority
                    />
                  ) : null}
                </CarouselItem>
              ))
          )}
        </CarouselContent>
      </Carousel>
      {/* Thumbnail Carousel*/}
      <Carousel>
        <CarouselContent className="flex gap-2 py-2  ">
          {variants.map(
            (v) =>
              v.productType === currentVariantType &&
              v.variantImages.length > 0 &&
              v.variantImages.map((img, i) => (
                <CarouselItem
                  key={img.id}
                  className="basis-1/3 lg:basis-1/4  flex items-center justify-center "
                  onClick={() => mainApi?.scrollTo(i)}
                >
                  {img.image_url ? (
                    <Image
                      src={img.image_url}
                      alt={img.name}
                      width={650}
                      height={40}
                      priority
                      className={cn(
                        "rounded-md cursor-pointer hover:opacity-100 transition-all duration-200",
                        i === activeIndex[0]
                          ? "border-2 border-blue-500 opacity-100"
                          : "border border-slate-500 opacity-45 "
                      )}
                    />
                  ) : null}
                </CarouselItem>
              ))
          )}
        </CarouselContent>
        {/* <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" /> */}
        {/* <CarouselPrevious />
      <CarouselNext /> */}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
