import Container from "@/components/common/Container";
import Image from "next/image";
import Link from "next/link";
import { img404, notFound } from "../../public/images";
import { ButtonComponent } from "@/components/common/ButtonComponent";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen relative bg-white overflow-hidden z-10">
      <Image
        src={notFound}
        alt="bg-image"
        className="w-full h-full object-cover absolute top-0 left-0 z-[-1] pointer-events-none"
      />
      <Container>
        <div className="flex items-center justify-center flex-col min-h-screen gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="172"
            height="79"
            viewBox="0 0 172 79"
            fill="none"
            className="w-[172px] h-[78px]"
          >
            <path
              d="M100.15 38.7193L100.777 29.863C100.777 20.2562 97.1904 10.9954 90.7202 3.89438L87.9643 0.869629C87.4594 0.31558 86.7447 0 85.9951 0C85.2456 0 84.5309 0.31558 84.0259 0.869629L81.27 3.89438C74.7999 10.9957 71.2135 20.2562 71.2135 29.863L71.8399 38.7193L60.4604 47.3937V63.9804L72.9531 54.4575L73.3257 59.7264H98.6646L99.0371 54.4575L111.53 63.9804V47.3937L100.15 38.7193ZM85.9951 30.0909C82.6705 30.0909 79.9753 27.3957 79.9753 24.0711C79.9753 20.7465 82.6705 18.0513 85.9951 18.0513C89.3198 18.0513 92.015 20.7465 92.015 24.0711C92.015 27.3957 89.3198 30.0909 85.9951 30.0909Z"
              fill="#16315B"
            />
            <path
              d="M85.9955 63.2891C81.9851 63.2891 79.4782 67.6307 81.4836 71.1037L85.9955 78.9184L90.5074 71.1037C92.5124 67.6307 90.0059 63.2891 85.9955 63.2891Z"
              fill="#16315B"
            />
            <path
              d="M165.817 39.0579L166.157 34.2533C166.157 29.0413 164.211 24.017 160.701 20.1646L159.206 18.5236C158.932 18.223 158.544 18.0518 158.137 18.0518C157.731 18.0518 157.343 18.223 157.069 18.5236L155.574 20.1646C152.064 24.0173 150.118 29.0413 150.118 34.2533L150.458 39.0579L144.284 43.7642V52.7631L151.062 47.5965L151.264 50.4551H165.011L165.213 47.5965L171.991 52.7631V43.7642L165.817 39.0579ZM158.137 34.3768C156.334 34.3768 154.871 32.9145 154.871 31.1108C154.871 29.3071 156.334 27.8448 158.137 27.8448C159.941 27.8448 161.403 29.3071 161.403 31.1108C161.403 32.9145 159.941 34.3768 158.137 34.3768Z"
              fill="#718EC9"
            />
            <path
              d="M158.137 52.3887C155.961 52.3887 154.602 54.7441 155.69 56.6283L158.137 60.8679L160.585 56.6283C161.673 54.7441 160.313 52.3887 158.137 52.3887Z"
              fill="#718EC9"
            />
            <path
              d="M21.5325 39.0579L21.8723 34.2533C21.8723 29.0413 19.9266 24.017 16.4164 20.1646L14.9214 18.5236C14.6475 18.223 14.2599 18.0518 13.8533 18.0518C13.4466 18.0518 13.0587 18.223 12.7851 18.5236L11.2897 20.1646C7.77952 24.0173 5.83388 29.0413 5.83388 34.2533L6.17367 39.0579L0 43.7642V52.7631L6.77754 47.5965L6.97985 50.4551H20.727L20.9293 47.5965L27.7069 52.7631V43.7642L21.5325 39.0579ZM13.8529 34.3768C12.0492 34.3768 10.587 32.9145 10.587 31.1108C10.587 29.3071 12.0492 27.8448 13.8529 27.8448C15.6567 27.8448 17.1189 29.3071 17.1189 31.1108C17.1189 32.9145 15.6563 34.3768 13.8529 34.3768Z"
              fill="#718EC9"
            />
            <path
              d="M13.8532 52.3887C11.6773 52.3887 10.3174 54.7441 11.4054 56.6283L13.8532 60.8679L16.3011 56.6283C17.3887 54.7441 16.0288 52.3887 13.8532 52.3887Z"
              fill="#718EC9"
            />
          </svg>
          <div className="sm:mt-20 sm:mb-14 my-8">
            {/* <h1 className="text-[253.75px] leading-normal font-bold text-blueDark4F font-tektur">
              404
            </h1> */}
            <Image
              src={img404}
              alt="bg-image"
              className="pointer-events-none"
            />
          </div>
          <h4 className="text-2xl leading-[27px] font-semibold text-blueDark4F text-center">
            Oops ,The page you are looking for is not available.
          </h4>
          <p className="max-w-[563px] text-lg leading-[30px] font-medium mx-auto text-center text-blueDark4F/50">
            We are sorry for the inconvenience,The page you are trying to access
            has been removed or never been existed.
          </p>
          <div className="mt-6">
            <ButtonComponent
              variant="primary"
              element="link"
              href="/"
              className="gap-1 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                className="w-[14px] h-[14px]"
              >
                <path
                  d="M5.02466 7.14894H11.9317V8.2831H5.02466L8.07557 11.3227L7.27031 12.1279L2.8584 7.71602L7.27031 3.30411L8.07557 4.10937L5.02466 7.14894Z"
                  fill="white"
                />
              </svg>
              <span>BACK TO HOME</span>
            </ButtonComponent>
          </div>
        </div>
      </Container>
    </div>
  );
}
