import axios from "axios";

import React, { useEffect, useState } from "react";

function GetApi_Province() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách tỉnh, thành phố
    axios
      .get(`https://vapi.vnappmob.com/api/province/`)
      .then((response) => {
        setProvinces(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
    console.log(provinces);
  }, []);

  //console.log(provinces)
  const handleProvinceChange = (event: any) => {
    const selectedProvinceCode = event.target.value;

    const selectedProvince = provinces.find(
      (p: any) => p.province_id === String(selectedProvinceCode)
    );

    if (selectedProvince) {
      setSelectedProvince(selectedProvince.province_name);

      // Assuming you have another API endpoint to fetch districts for the selected province
      axios
        .get(
          `https://vapi.vnappmob.com/api/province/district/${selectedProvinceCode}`
        )
        .then((response) => {
          setDistricts(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });

      setSelectedDistrict("");
      setWards([]);
      setSelectedWard("");
    }
  };

  const handleDistrictChange = (event: any) => {
    const selectedDistrictCode = event.target.value;
    const selectedDistrict = districts.find(
      (d: any) => d.district_id === String(selectedDistrictCode)
    );

    if (selectedDistrict) {
      setSelectedDistrict(selectedDistrict.district_name);
      // Lấy danh sách các wards từ API
      axios
        .get(
          `https://vapi.vnappmob.com/api/province/ward/${selectedDistrictCode}`
        )
        .then((response) => {
          // Set danh sách wards vào state
          setWards(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching wards:", error);
        });

      setSelectedWard("");
    }
  };

  const handleWardChange = (event: any) => {
    const selectedWardCode = event.target.value;
    const selectedWard = wards.find(
      (w: any) => w.ward_id === String(selectedWardCode)
    );

    if (selectedWard) {
      setSelectedWard(selectedWard.ward_name);
    }
  };

  return (
    <>
      <div className=" container d-flex flex-wrap px-0 mt-3">
        <div className="form-group mb-3 w-100 " id="province">
          {/* <label htmlFor="province"></label> */}
          <div className="custom_select">
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700"
            >
              Tỉnh/Thành phố
            </label>
            <select
              className="form-control block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              id="billingProvince"
              onChange={handleProvinceChange}
            >
              <option value="" placeholder="">
                Chọn Tỉnh thành
              </option>
              {provinces.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="form-group mb-3 w-100"
          id="district"
          onChange={handleDistrictChange}
          disabled={!provinces.length}
        >
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700"
          >
            Quận/Huyện
          </label>
          {/* <label htmlFor="city"></label> */}
          <div className="custom_select">
            <select
              className="form-control block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              id="billingCity"
              onChange={handleDistrictChange}
            >
              <option value="" disabled selected>
                Chọn Quận, huyện
              </option>
              {districts && districts.length > 0 ? (
                districts.map((district) => (
                  <option
                    key={district.district_id}
                    value={district.district_id}
                  >
                    {district.district_name}
                  </option>
                ))
              ) : (
                <option disabled>Không có dữ liệu quận/huyện</option>
              )}
            </select>
          </div>
        </div>

        <div
          className="form-group mb-3 w-100"
          id="ward"
          disabled={!districts.length}
          onChange={handleWardChange}
        >
          {" "}
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700"
          >
            Chọn Phường/Xã
          </label>
          <div className="custom_select">
            <select
              className="form-control block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              id="billingDistrict"
            >
              <option disabled selected value="" className="text-slate-500">
                Chọn phường/xã
              </option>
              {wards && wards.length > 0 ? (
                wards.map((ward) => (
                  <option key={ward.ward_id} value={ward.ward_id}>
                    {ward.ward_name}
                  </option>
                ))
              ) : (
                <option disabled>Không có dữ liệu phường/xã</option>
              )}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetApi_Province;
