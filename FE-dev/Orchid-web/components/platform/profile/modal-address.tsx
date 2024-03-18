'use client'

import { Button } from "@/components/ui/button";
import { createUserAddressInfo } from "@/lib/actions";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const GetApi_Province: React.FC = () => {

  const {data: session} = useSession()

  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [wards, setWards] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`https://vapi.vnappmob.com/api/province/`)
      .then((response) => {
        setProvinces(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching provinces:", error);
      });
  }, []);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedProvinceCode = event.target.value;
    const selectedProvince = provinces.find(
      (p: any) => p.province_id === String(selectedProvinceCode)
    );

    if (selectedProvince) {
      setSelectedProvince(selectedProvince.province_name);
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

  // Handle district selection
  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDistrictCode = event.target.value;
    const selectedDistrict = districts.find(
      (d: any) => d.district_id === String(selectedDistrictCode)
    );

    if (selectedDistrict) {
      setSelectedDistrict(selectedDistrict.district_name);
      axios
        .get(
          `https://vapi.vnappmob.com/api/province/ward/${selectedDistrictCode}`
        )
        .then((response) => {
          setWards(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching wards:", error);
        });
      setSelectedWard("");
    }
  };

  // Handle ward selection
  const handleWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWardCode = event.target.value;
    const selectedWard = wards.find(
      (w: any) => w.ward_id === String(selectedWardCode)
    );

    if (selectedWard) {
      setSelectedWard(selectedWard.ward_name);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const fullAddress = `${selectedProvince}, ${selectedDistrict}, ${selectedWard}, ${address}`;
    const fullAddress = `${address}, ${selectedWard}, ${selectedDistrict}, ${selectedProvince} `;
    const value = { phone: parseInt(phoneNumber), address: fullAddress };
    console.log(value); // You can replace this with your desired action like API call
  
    try {
      React.startTransition(() => {
        toast.promise(
          createUserAddressInfo(session?.user.id.toString()!, value),
          {
            loading: "Creating...",
            success: () => "Address created successfully.",
            error: (err) => `Error: ${err.message}`,
          }
        );
      });
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container d-flex flex-wrap px-0 mt-3">
        {/* Phone Number input */}
        <div className="col-span-1">
          <div className="grid gap-2 mt-8">
            <label
              htmlFor="PhoneNumber"
              className="text-sm font-medium leading-none"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="PhoneNumber"
              placeholder="Nhập số điện thoại..."
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          {/* Address input */}
          <div className="grid gap-2  my-6">
            <label
              htmlFor="Address"
              className="text-sm font-medium leading-none"
            >
              Address
            </label>
            <input
              type="text"
              id="Address"
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>
        {/* Province selection */}
        <div className="form-group mb-3 w-100 " id="province">
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
              <option value="">Chọn Tỉnh thành</option>
              {provinces.map((province: any) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* District selection */}
        <div className="form-group mb-3 w-100" id="district">
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700"
          >
            Quận/Huyện
          </label>
          <div className="custom_select">
            <select
              className="form-control block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              id="billingCity"
              onChange={handleDistrictChange}
              disabled={!provinces.length}
            >
              <option value="" disabled selected>
                Chọn Quận, huyện
              </option>
              {districts && districts.length > 0 ? (
                districts.map((district: any) => (
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
        {/* Ward selection */}
        <div className="form-group mb-3 w-100" id="ward">
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700"
          >
            Chọn Phường/Xã
          </label>
          <div className="custom_select">
            <select
              disabled={!districts.length}
              className="form-control block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              id="billingDistrict"
              onChange={handleWardChange}
            >
              <option disabled selected value="" className="text-slate-500">
                Chọn phường/xã
              </option>
              {wards && wards.length > 0 ? (
                wards.map((ward: any) => (
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
      {/* Submit button */}
      <Button type="submit" variant="action" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default GetApi_Province;
