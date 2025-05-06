import HeadingComponent from "@/components/common/HeadingComponent";
import RegisterSellerFrom from "@/components/forms/auth/RegisterSellerFrom";

function Registeration() {
  return (
    <div className="flex flex-col md:gap-7 gap-5">
      <div className="flex flex-col gap-2">
        <HeadingComponent tag="h2" text="Create your FREE account" />
        <p className="text-grey88/70 lg:text-base text-sm font-semibold leading-normal">
          Tell us little about your business to get connected with millions of
          buyers and suppliers
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="md:text-base md:leading-normal text-sm font-semibold text-black/80 mix-blend-luminosity">
          Register Yourself*
        </p>
        <RegisterSellerFrom />
      </div>
    </div>
  );
}

export default Registeration;
