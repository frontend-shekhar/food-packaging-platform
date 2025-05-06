import React from "react";

interface HeadingProps {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  text: string;
  className?: string;
}

const headingStyles: Record<string, string> = {
  h1: "md:text-[40px] md:leading-normal sm:text-3xl text-2xl font-semibold text-content45",
  h2: "md:text-[32px] md:leading-normal sm:text-2xl text-2xl font-bold text-[#122D4F]",
};

const HeadingComponent: React.FC<HeadingProps> = ({ tag, text, className }) => {
  const defaultStyles = headingStyles[tag] || "";
  const combinedClassName = `${defaultStyles} ${className || ""}`;
  return React.createElement(tag, { className: combinedClassName }, text);
};

export default HeadingComponent;
