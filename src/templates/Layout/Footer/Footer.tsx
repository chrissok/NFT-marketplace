import FooterSVG from "./FooterSVG";
import CrucibleSVG from "./CrucibleSVG";
import OpenMetaSVG from "./OpenMetaSVG";
import Button from "@/components/Buttons/Button";

// TODO add links and fix svg
function Footer() {
  return (
    <>
      <div className="mt-16 pt-5 bg-black-dark">
        <div className="flex w-full justify-end font-body text-grey-lightest p-6 gap-5 pt-0">
          <a
            href="https://www.emergence.site/doc/Crucible_privacy_policy_November2024.pdf"
            className="hover:text-blue-light"
            target="_blank"
          >
            Privacy
          </a>
          <a
            href="https://www.emergence.site/doc/Emergence_Terms_Nov2024.pdf"
            className="hover:text-blue-light"
            target="_blank"
          >
            Terms and conditions
          </a>
          <a
            href="https://www.emergence.site/contact-us"
            className="hover:text-blue-light"
            target="_blank"
          >
            Contact
          </a>
        </div>
        <div className="bg-light-blur-5 w-[100vw] h-[1px]"></div>
        <div className="flex justify-center py-14 px-5 xs:py-3">
          <FooterSVG />
        </div>
        <div className="bg-light-blur-5 w-[100vw] h-[1px]"></div>
        <div className="flex justify-between items-center p-8 xs:p-2 noMinLg:flex-col noMinLg:gap-y-5 noMinLg:justify-center">
          <div className="flex items-center gap-3 noMinLg:flex-col">
            <CrucibleSVG />
            <p className="text-grey-lightest font-body ">
              Built by Crucible for
            </p>
            <OpenMetaSVG />
          </div>

          <div className="flex items-center gap-5 relative">
            <div className="absolute w-[1px] bg-white-10 h-[100px] -left-[10%] noMinLg:hidden"></div>
            <a href={"https://x.com/timeofemergence?lang=en"} target="_blank">
              <Button text="X" />
            </a>
            <a
              href={"https://www.linkedin.com/company/open-meta-association/"}
              target="_blank"
            >
              <Button text="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
