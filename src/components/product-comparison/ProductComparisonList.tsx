import React from "react";
import Image from "next/image";
import { productCard } from "../../../public/images";
import { ButtonComponent } from "../common/ButtonComponent";

function ProductComparisonList() {
  return (
    <>
      <section className="bg-white rounded-xl p-7 flex flex-col gap-6 mt-[45px]">
        <h2 className="lg:text-[28px] md:text-2xl text-xl font-semibold lg:leading-normal text-[#1E1E1E]">
          Product Comparison
        </h2>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-[29px] gap-4">
          <div className="border border-black/20 bg-[#FDFDFD] rounded-lg">
            <div className="relative overflow-hidden pb-[75%] rounded-t-lg">
              <Image
                src={productCard}
                alt="product"
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover object-center mix-blend-luminosity rounded-t-lg"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-col gap-[2px]">
                  <h3 className="text-xs font-semibold leading-normal text-[#2D2D2D]">
                    Bored Pile Machine
                  </h3>
                  <h4 className="md:text-xl text-base font-bold leading-normal text-[#A9ABBD]">
                    1400$ USD
                  </h4>
                </div>
                <span className="block text-[#979797] opacity-70 text-xs font-medium leading-normal">
                  1 Piece
                </span>
              </div>
              <ButtonComponent
                variant="primary"
                className="w-full bg-[#2D2D2D] rounded text-sm leading-normal py-[7px]"
              >
                Compare Now
              </ButtonComponent>
            </div>
          </div>
          <div className="border border-black/20 bg-[#FDFDFD] rounded-lg">
            <div className="relative overflow-hidden pb-[75%] rounded-t-lg">
              <Image
                src={productCard}
                alt="product"
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover object-center mix-blend-luminosity rounded-t-lg"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-col gap-[2px]">
                  <h3 className="text-xs font-semibold leading-normal text-[#2D2D2D]">
                    Bored Pile Machine
                  </h3>
                  <h4 className="md:text-xl text-base font-bold leading-normal text-[#A9ABBD]">
                    1400$ USD
                  </h4>
                </div>
                <span className="block text-[#979797] opacity-70 text-xs font-medium leading-normal">
                  1 Piece
                </span>
              </div>
              <ButtonComponent
                variant="primary"
                className="w-full bg-[#2D2D2D] rounded text-sm leading-normal py-[7px]"
              >
                Compare Now
              </ButtonComponent>
            </div>
          </div>
          <div className="border border-black/20 bg-[#FDFDFD] rounded-lg">
            <div className="relative overflow-hidden pb-[75%] rounded-t-lg">
              <Image
                src={productCard}
                alt="product"
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover object-center mix-blend-luminosity rounded-t-lg"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-col gap-[2px]">
                  <h3 className="text-xs font-semibold leading-normal text-[#2D2D2D]">
                    Bored Pile Machine
                  </h3>
                  <h4 className="md:text-xl text-base font-bold leading-normal text-[#A9ABBD]">
                    1400$ USD
                  </h4>
                </div>
                <span className="block text-[#979797] opacity-70 text-xs font-medium leading-normal">
                  1 Piece
                </span>
              </div>
              <ButtonComponent
                variant="primary"
                className="w-full bg-[#2D2D2D] rounded text-sm leading-normal py-[7px]"
              >
                Compare Now
              </ButtonComponent>
            </div>
          </div>
          <div className="border border-black/20 bg-[#FDFDFD] rounded-lg">
            <div className="relative overflow-hidden pb-[75%] rounded-t-lg">
              <Image
                src={productCard}
                alt="product"
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover object-center mix-blend-luminosity rounded-t-lg"
              />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-col gap-[2px]">
                  <h3 className="text-xs font-semibold leading-normal text-[#2D2D2D]">
                    Bored Pile Machine
                  </h3>
                  <h4 className="md:text-xl text-base font-bold leading-normal text-[#A9ABBD]">
                    1400$ USD
                  </h4>
                </div>
                <span className="block text-[#979797] opacity-70 text-xs font-medium leading-normal">
                  1 Piece
                </span>
              </div>
              <ButtonComponent
                variant="primary"
                className="w-full bg-[#2D2D2D] rounded text-sm leading-normal py-[7px]"
              >
                Compare Now
              </ButtonComponent>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductComparisonList;
