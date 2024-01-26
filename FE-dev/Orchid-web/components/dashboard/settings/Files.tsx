import ProtoTypes from "prop-types";

function Files({ name, size, children }: any) {
  return (
    <div className="flex flex-col items-center w-24 h-24 lg:w-44 lg:h-44">
      <div className="w-full flex justify-center">{children}</div>
      <h4 className="md:text-base text-sm  dark:text-white font-semibold mt-2">
        {name}
      </h4>
      <span className="text-base text-bgray-600 dark:text-bgray-50">
        {size}
      </span>
    </div>
  );
}
Files.propTypes = {
  name: ProtoTypes.string,
  size: ProtoTypes.string,
  children: ProtoTypes.node,
};

export default Files;
