import Image from "next/image";

interface LocationItemProp {
  img: any;
  location: any;
  value: any;
  color: any;
}
function LocationItem({ img, location, value, color }: LocationItemProp) {
  return (
    <div className="flex space-x-5 items-center">
      <div className="w-[30px]">
        <Image
          priority={true}
          height={img.height}
          width={img.width}
          src={img.src}
          className="w-full"
          alt="flag"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-2">
          <span className="text-bgray-900 dark:text-white text-sm font-medium">
            {location}
          </span>
          <span className="text-sm dark:text-white font-medium">{value}</span>
        </div>
        <div className="w-full relative h-[14px] rounded bg-bgray-100 overflow-hidden">
          <div
            style={{ width: `${value}` }}
            className={`h-full absolute left-0 top-0 rounded  ${color}`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LocationItem;
