import Image from "next/image";
import React from "react";
import { addIcon, closeIcon, diamond } from "../../../public/images";

function ProductComparisonInfo() {
  return (
    <>
      <section className="bg-white rounded-xl border py-7 border-[#DCDCDC] lg:mt-16 mt-10">
        <div className="flex md:flex-row flex-col md:gap-8 gap-4 px-7">
          <h2 className="lg:text-[28px] lg:leading-[35px] md:text-2xl text-xl font-medium text-black">
            lorum ipsum{" "}
          </h2>
          <div className="flex md:flex-row flex-col gap-2">
            <h2 className="lg:text-[28px] lg:leading-[35px] md:text-2xl text-xl font-medium text-black flex items-center gap-[2px]">
              <span className="text-sm font-medium leading-[18px] text-[#757575]">
                VS
              </span>
              lorum ipsum product name
            </h2>
            <h2 className="lg:text-[28px] lg:leading-[35px] md:text-2xl text-xl font-medium text-black flex items-center gap-[2px]">
              <span className="text-sm font-medium leading-[18px] text-[#757575]">
                VS
              </span>
              lorum ipsum
            </h2>
          </div>
        </div>
        <div className="border-t border-b border-[#EEE] lg:mt-24 mt-10">
          <div className="lg:max-w-[1038px] w-full mx-auto">
            <div className="flex xl:overflow-x-hidden overflow-x-auto">
              <div className="w-[260px] min-w-[260px] max-w-full relative border-l border-[#EEE]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center bg-black rounded-b text-xl font-bold text-white min-w-12 py-[3px]">
                    # 3
                  </div>
                  <button className="border-0 bg-transparent min-w-[26px]">
                    <Image src={closeIcon} alt="close" />
                  </button>
                </div>
                <div className="absolute -right-6 z-[1] top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center w-[44px] h-[44px] bg-[#EEE] text-lg font-bold">
                  VS
                </div>
                <div className="text-center mix-blend-luminosity lg:py-9 lg:px-10 p-4">
                  <Image
                    src={diamond}
                    alt="diamond"
                    className="object-contain lg:max-w-[115px] max-h-[109px] mix-blend-luminosity object-center mx-auto"
                  />
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <h6 className="text-sm font-normal leading-[22px] text-[#333]">
                    Louriume Ipsum
                  </h6>
                  <div className="flex items-center justify-between">
                    <h5 className="text-base font-medium text-black">
                      $59,999
                    </h5>
                    <button className="min-w-[26px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="30"
                        viewBox="0 0 26 30"
                        fill="none"
                      >
                        <g opacity="0.3">
                          <path
                            d="M12.9999 20.2734C13.5746 20.2734 14.1257 20.528 14.532 20.9813C14.9383 21.4345 15.1666 22.0492 15.1666 22.6901C15.1666 23.331 14.9383 23.9457 14.532 24.3989C14.1257 24.8522 13.5746 25.1068 12.9999 25.1068C12.4253 25.1068 11.8742 24.8522 11.4679 24.3989C11.0615 23.9457 10.8333 23.331 10.8333 22.6901C10.8333 22.0492 11.0615 21.4345 11.4679 20.9813C11.8742 20.528 12.4253 20.2734 12.9999 20.2734ZM12.9999 13.0234C13.5746 13.0234 14.1257 13.278 14.532 13.7313C14.9383 14.1845 15.1666 14.7992 15.1666 15.4401C15.1666 16.081 14.9383 16.6957 14.532 17.1489C14.1257 17.6022 13.5746 17.8568 12.9999 17.8568C12.4253 17.8568 11.8742 17.6022 11.4679 17.1489C11.0615 16.6957 10.8333 16.081 10.8333 15.4401C10.8333 14.7992 11.0615 14.1845 11.4679 13.7313C11.8742 13.278 12.4253 13.0234 12.9999 13.0234ZM12.9999 5.77344C13.5746 5.77344 14.1257 6.02805 14.532 6.48126C14.9383 6.93448 15.1666 7.54916 15.1666 8.1901C15.1666 8.83104 14.9383 9.44573 14.532 9.89895C14.1257 10.3522 13.5746 10.6068 12.9999 10.6068C12.4253 10.6068 11.8742 10.3522 11.4679 9.89895C11.0615 9.44573 10.8333 8.83104 10.8333 8.1901C10.8333 7.54916 11.0615 6.93448 11.4679 6.48126C11.8742 6.02805 12.4253 5.77344 12.9999 5.77344Z"
                            fill="black"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[260px] min-w-[260px] max-w-full relative border-l border-[#EEE]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center bg-black rounded-b text-xl font-bold text-white min-w-12 py-[3px]">
                    # 2
                  </div>
                  <button className="border-0 bg-transparent min-w-[26px]">
                    <Image src={closeIcon} alt="close" />
                  </button>
                </div>
                <div className="absolute -right-6 z-[1] top-1/2 -translate-y-1/2 rounded-full flex justify-center items-center w-[44px] h-[44px] bg-[#EEE] text-lg font-bold">
                  VS
                </div>
                <div className="text-center mix-blend-luminosity lg:py-9 lg:px-10 p-4">
                  <Image
                    src={diamond}
                    alt="diamond"
                    className="object-contain lg:max-w-[115px] max-h-[109px] mix-blend-luminosity object-center mx-auto"
                  />
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <h6 className="text-sm font-normal leading-[22px] text-[#333]">
                    Louriume Ipsum
                  </h6>
                  <div className="flex items-center justify-between">
                    <h5 className="text-base font-medium text-black">
                      $59,999
                    </h5>
                    <button className="min-w-[26px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="30"
                        viewBox="0 0 26 30"
                        fill="none"
                      >
                        <g opacity="0.3">
                          <path
                            d="M12.9999 20.2734C13.5746 20.2734 14.1257 20.528 14.532 20.9813C14.9383 21.4345 15.1666 22.0492 15.1666 22.6901C15.1666 23.331 14.9383 23.9457 14.532 24.3989C14.1257 24.8522 13.5746 25.1068 12.9999 25.1068C12.4253 25.1068 11.8742 24.8522 11.4679 24.3989C11.0615 23.9457 10.8333 23.331 10.8333 22.6901C10.8333 22.0492 11.0615 21.4345 11.4679 20.9813C11.8742 20.528 12.4253 20.2734 12.9999 20.2734ZM12.9999 13.0234C13.5746 13.0234 14.1257 13.278 14.532 13.7313C14.9383 14.1845 15.1666 14.7992 15.1666 15.4401C15.1666 16.081 14.9383 16.6957 14.532 17.1489C14.1257 17.6022 13.5746 17.8568 12.9999 17.8568C12.4253 17.8568 11.8742 17.6022 11.4679 17.1489C11.0615 16.6957 10.8333 16.081 10.8333 15.4401C10.8333 14.7992 11.0615 14.1845 11.4679 13.7313C11.8742 13.278 12.4253 13.0234 12.9999 13.0234ZM12.9999 5.77344C13.5746 5.77344 14.1257 6.02805 14.532 6.48126C14.9383 6.93448 15.1666 7.54916 15.1666 8.1901C15.1666 8.83104 14.9383 9.44573 14.532 9.89895C14.1257 10.3522 13.5746 10.6068 12.9999 10.6068C12.4253 10.6068 11.8742 10.3522 11.4679 9.89895C11.0615 9.44573 10.8333 8.83104 10.8333 8.1901C10.8333 7.54916 11.0615 6.93448 11.4679 6.48126C11.8742 6.02805 12.4253 5.77344 12.9999 5.77344Z"
                            fill="black"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[260px] min-w-[260px] max-w-full relative border-l border-r border-[#EEE]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center bg-black rounded-b text-xl font-bold text-white min-w-12 py-[3px]">
                    # 1
                  </div>
                  <button className="border-0 bg-transparent min-w-[26px]">
                    <Image src={closeIcon} alt="close" />
                  </button>
                </div>
                <div className="text-center mix-blend-luminosity lg:py-9 lg:px-10 p-4">
                  <Image
                    src={diamond}
                    alt="diamond"
                    className="object-contain lg:max-w-[115px] max-h-[109px] mix-blend-luminosity object-center mx-auto"
                  />
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <h6 className="text-sm font-normal leading-[22px] text-[#333]">
                    Louriume Ipsum
                  </h6>
                  <div className="flex items-center justify-between">
                    <h5 className="text-base font-medium text-black">
                      $59,999
                    </h5>
                    <button className="min-w-[26px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="30"
                        viewBox="0 0 26 30"
                        fill="none"
                      >
                        <g opacity="0.3">
                          <path
                            d="M12.9999 20.2734C13.5746 20.2734 14.1257 20.528 14.532 20.9813C14.9383 21.4345 15.1666 22.0492 15.1666 22.6901C15.1666 23.331 14.9383 23.9457 14.532 24.3989C14.1257 24.8522 13.5746 25.1068 12.9999 25.1068C12.4253 25.1068 11.8742 24.8522 11.4679 24.3989C11.0615 23.9457 10.8333 23.331 10.8333 22.6901C10.8333 22.0492 11.0615 21.4345 11.4679 20.9813C11.8742 20.528 12.4253 20.2734 12.9999 20.2734ZM12.9999 13.0234C13.5746 13.0234 14.1257 13.278 14.532 13.7313C14.9383 14.1845 15.1666 14.7992 15.1666 15.4401C15.1666 16.081 14.9383 16.6957 14.532 17.1489C14.1257 17.6022 13.5746 17.8568 12.9999 17.8568C12.4253 17.8568 11.8742 17.6022 11.4679 17.1489C11.0615 16.6957 10.8333 16.081 10.8333 15.4401C10.8333 14.7992 11.0615 14.1845 11.4679 13.7313C11.8742 13.278 12.4253 13.0234 12.9999 13.0234ZM12.9999 5.77344C13.5746 5.77344 14.1257 6.02805 14.532 6.48126C14.9383 6.93448 15.1666 7.54916 15.1666 8.1901C15.1666 8.83104 14.9383 9.44573 14.532 9.89895C14.1257 10.3522 13.5746 10.6068 12.9999 10.6068C12.4253 10.6068 11.8742 10.3522 11.4679 9.89895C11.0615 9.44573 10.8333 8.83104 10.8333 8.1901C10.8333 7.54916 11.0615 6.93448 11.4679 6.48126C11.8742 6.02805 12.4253 5.77344 12.9999 5.77344Z"
                            fill="black"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <button className="w-[260px] min-w-[260px] max-w-full flex items-center justify-center flex-col gap-1 text-base font-normal leading-6 text-[#333]">
                <em className="leading-[0] min-w-[45px]">
                  <Image
                    src={addIcon}
                    alt="add"
                    className="mix-blend-luminosity"
                  />
                </em>
                Add Product
              </button>
            </div>
          </div>
        </div>
        {/* Overview Table */}
        <>
          <div className="bg-[#F5F6F7] py-2 px-4 text-lg font-normal text-[#333333]">
            Overview
          </div>
          <div className="whitespace-nowrap overflow-x-auto">
            <div className="flex border-b-2 border-white">
              <div className="bg-[#e2e2e2] text-[#757575] w-full text-sm min-w-[108px] font-bold py-8 px-3 border-r-2 border-white flex items-center justify-end">
                loruime Ipsum
              </div>
              <div className="bg-[#e2e2e2] py-8 px-3 border-r-2 border-white min-w-[108px] w-full">
                <div className="text-white bg-gray-500 rounded lg:text-[22px] font-bold lg:leading-[30px] text-sm md:px-[10px] px-1 py-[6px] md:max-w-[100px] md:min-w-[100px] w-full">
                  83 / 100
                </div>
              </div>
              <div className="bg-[#e2e2e2] py-8 px-3 border-r-2 border-white min-w-[108px] w-full">
                <div className="text-white bg-gray-500 rounded lg:text-[22px] font-bold lg:leading-[30px] text-sm md:px-[10px] px-1 py-[6px] md:max-w-[100px] md:min-w-[100px] w-full">
                  94 / 100
                </div>
              </div>
              <div className="bg-[#e2e2e2] py-8 px-3 min-w-[108px] w-full">
                <div className="text-white bg-gray-500 rounded lg:text-[22px] font-bold lg:leading-[30px] text-sm md:px-[10px] px-1 py-[6px] md:max-w-[100px] md:min-w-[100px] w-full">
                  95 / 100
                </div>
              </div>
            </div>
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="flex border-b-2 border-white last:border-b-0"
              >
                <div className="bg-[#e2e2e2] min-w-[108px] w-full text-[#757575] text-sm font-bold py-8 px-3 border-r-2 border-white flex items-center justify-end">
                  Lorum Ipsum
                </div>
                <div className="bg-[#e2e2e2] min-w-[108px] w-full py-8 px-3 border-r-2 border-white text-sm font-normal text-[#333] flex items-start flex-col">
                  Lorum Ipsum
                  <span className="text-xs block pt-1">&nbsp;</span>
                </div>
                <div className="bg-[#e2e2e2] min-w-[108px] w-full py-8 px-3 border-r-2 border-white text-sm font-normal text-[#333] flex items-start flex-col">
                  Lorum Ipsum
                  <span className="text-xs block pt-1">Lorum Ipsum</span>
                </div>
                <div className="bg-[#e2e2e2] min-w-[108px] w-full py-8 px-3 text-sm font-normal text-[#333] flex items-start flex-col">
                  Lorum Ipsum
                  <span className="text-xs block pt-1">Lorum Ipsum</span>
                </div>
              </div>
            ))}
          </div>
        </>

        {/* General Table */}
        <div className="mt-10">
          <div className="bg-[#F5F6F7] py-2 px-4 text-lg font-normal text-[#333333]">
            General
          </div>
          <div className="whitespace-nowrap overflow-x-auto">
            <div className="flex border-b-2 border-white">
              <div className="bg-[#e2e2e2] min-w-[108px] w-full text-[#757575] text-sm font-bold py-8 px-3 border-r-2 border-white flex items-center justify-end">
                Country of Origin
              </div>
              <div className="bg-[#e2e2e2] min-w-[108px] w-full py-8 px-3 border-r-2 border-white">
                India
              </div>
              <div className="bg-[#e2e2e2] min-w-[108px] w-full py-8 px-3"></div>
              <div className="bg-[#e2e2e2] min-w-[108px] w-full py-8 px-3"></div>
            </div>
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="flex border-b-2 border-white last:border-b-0"
              >
                <div className="bg-[#e2e2e2] min-w-[108px] w-full text-[#757575] text-sm font-bold py-8 px-3 border-r-2 border-white flex items-center justify-end">
                  Lorum Ipsum
                </div>
                <div className="bg-[#e2e2e2] min-w-[108px] w-full py-8 px-3 border-r-2 border-white text-sm font-normal text-[#333] flex items-start flex-col">
                  Lorum Ipsum
                  <span className="text-xs block pt-1">&nbsp;</span>
                </div>
                <div className="bg-[#e2e2e2] min-w-[108px] w-full py-8 px-3 border-r-2 border-white text-sm font-normal text-[#333] flex items-start flex-col">
                  Lorum Ipsum
                  <span className="text-xs block pt-1">Lorum Ipsum</span>
                </div>
                <div className="bg-[#e2e2e2] min-w-[108px] w-full py-8 px-3 text-sm font-normal text-[#333] flex items-start flex-col">
                  Lorum Ipsum
                  <span className="text-xs block pt-1">Lorum Ipsum</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design Table */}
        <div className="mt-10">
          <div className="bg-[#F5F6F7] py-2 px-4 text-lg font-normal text-[#333333]">
            Design
          </div>
          <div className="whitespace-nowrap overflow-x-auto">
            <div className="flex border-b-2 border-white">
              <div className="bg-[#e2e2e2] min-w-[150px] w-full text-[#757575] text-sm font-bold py-8 px-3 border-r-2 border-white flex items-center justify-end">
                Dimensions
              </div>
              <div className="bg-[#e2e2e2] min-w-[150px] w-full py-8 px-3 border-r-2 border-white text-[#757575] text-sm font-bold">
                71.6 x 147.6 x 7.8 mm
              </div>
              <div className="bg-[#e2e2e2] min-w-[150px] w-full py-8 px-3 border-r-2 border-white text-[#757575] text-sm font-bold">
                79 x 162.3 x 8.6 mm
              </div>
              <div className="bg-[#e2e2e2] min-w-[150px] w-full py-8 px-3 text-[#757575] text-sm font-bold">
                76 x 162.4 x 8.2 mm
              </div>
            </div>
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="flex border-b-2 border-white last:border-b-0"
              >
                <div className="bg-[#e2e2e2] min-w-[150px] w-full text-[#757575] text-sm font-bold py-8 px-3 border-r-2 border-white flex items-center justify-end">
                  Lorum Ipsum
                </div>
                <div className="bg-[#e2e2e2] min-w-[150px] w-full py-8 px-3 border-r-2 border-white text-sm font-normal text-[#333] flex items-start flex-col">
                  Lorum Ipsum
                  <span className="text-xs block pt-1">&nbsp;</span>
                </div>
                <div className="bg-[#e2e2e2] min-w-[150px] w-full py-8 px-3 border-r-2 border-white text-sm font-normal text-[#333] flex items-start flex-col">
                  Lorum Ipsum
                  <span className="text-xs block pt-1">Lorum Ipsum</span>
                </div>
                <div className="bg-[#e2e2e2] min-w-[150px] w-full py-8 px-3 text-sm font-normal text-[#333] flex items-start flex-col">
                  Lorum Ipsum
                  <span className="text-xs block pt-1">Lorum Ipsum</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductComparisonInfo;
