import clsx from "clsx";

type SectionProps = {
  className?: string;
  id?: string;
  children: React.ReactNode;
  tag?: "section" | "div";
  headerClassName?: string;
  title?: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  rightElement?: React.ReactNode;
};
export default function Section({
  children,
  className,
  id,
  tag = "section",
  title,
  titleClassName = "text-xl capitalize !leading-8 md:!text-2xl lg:!leading-[48px] 4xl:!leading-[48px] 4xl:!text-3xl",
  descriptionClassName = "font-normal capitalize leading-6 text-secondary 4xl:text-lg dark:text-white",
  description,
  headerClassName,
  rightElement,
}: SectionProps) {
  let Component = tag;
  return (
    <Component className={className} id={id}>
      {title && (
        <header
          className={clsx("flex justify-between capitalize", headerClassName)}
        >
          <div>
            <h2 className={titleClassName}>{title}</h2>
            {description && (
              <p className={descriptionClassName}>{description}</p>
            )}
          </div>
          {rightElement && <div className="hidden md:block">{rightElement}</div>}
        </header>
      )}
      {children}
    </Component>
  );
}
