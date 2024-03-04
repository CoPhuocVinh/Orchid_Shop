import React, { useState } from "react";
import provincesData from "./dataProvince.json";

interface Province {
  id: number;
  name: string;
  districts: string[];
}

function GetListProvince() {
  const [selectedProvince, setSelectedProvince] = useState<number>(0); // Initialize to 0
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinceId = parseInt(event.target.value);
    setSelectedProvince(provinceId);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtName = event.target.value;
    setSelectedDistrict(districtName);
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="province"
          className="block text-sm font-medium text-gray-700"
        >
          Tỉnh/Thành phố
        </label>
        <select
          id="province"
          name="province"
          value={selectedProvince}
          onChange={handleProvinceChange}
          className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Chọn tỉnh/thành phố</option>
          {provincesData.provinces.map((province: Province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProvince !== null && (
        <div>
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700"
          >
            Quận/Huyện
          </label>
          <select
            id="district"
            name="district"
            value={selectedDistrict || ""}
            onChange={handleDistrictChange}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Chọn quận/huyện</option>
            {provincesData.provinces[selectedProvince]?.districts?.map(
              (district: string, index: number) => (
                <option key={index} value={district}>
                  {district}
                </option>
              )
            )}
          </select>
        </div>
      )}
    </div>
  );
}

export default GetListProvince;
