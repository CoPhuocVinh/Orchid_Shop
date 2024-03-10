"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useGetAddress } from "@/lib/react-query/queries";
function DeliveryInfor() {
  const { data: session } = useSession();
  const { data: in4DetailResponseList } = useGetAddress(session?.user.id! || "1");


  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

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
  }, [provinces]);

  const handleProvinceChange = (event: any) => {
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

  const handleDistrictChange = (event: any) => {
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

  const handleWardChange = (event: any) => {
    const selectedWardCode = event.target.value;
    const selectedWard = wards.find(
      (w: any) => w.ward_id === String(selectedWardCode)
    );

    if (selectedWard) {
      setSelectedWard(selectedWard.ward_name);
    }
  };

  const [delivery, setDelivery] = useState("office");
  const handleAddressSelect = (address: any) => {
    setSelectedAddress(address);
    setPhoneNumber(address.phone);

    const [province, district, ward, addressDetail] =
      address.address.split(",");

    const selectedProvince = provinces.find(
      (p: any) => p.province_name.trim() === province.trim()
    );

    setSelectedProvince(selectedProvince ? selectedProvince.province_id : "");
    setSelectedDistrict("");
    setSelectedWard("");
    setAddress(addressDetail.trim());

    if (selectedProvince) {
      axios
        .get(
          `https://vapi.vnappmob.com/api/province/district/${selectedProvince.province_id}`
        )
        .then((response) => {
          const selectedDistrict = response.data.results.find(
            (d: any) => d.district_name.trim() === district.trim()
          );
          setDistricts(response.data.results);
          setSelectedDistrict(
            selectedDistrict ? selectedDistrict.district_id : ""
          );

          if (selectedDistrict) {
            axios
              .get(
                `https://vapi.vnappmob.com/api/province/ward/${selectedDistrict.district_id}`
              )
              .then((response) => {
                const selectedWard = response.data.results.find(
                  (w: any) => w.ward_name.trim() === ward.trim()
                );
                setWards(response.data.results);
                setSelectedWard(selectedWard ? selectedWard.ward_id : "");
              })
              .catch((error) => {
                console.error("Error fetching wards:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });
    }
  };

  const onSubmit = () => {
    const fullAddress = `${selectedProvince}, ${selectedDistrict}, ${selectedWard}, ${address}`;

    const value = {
      phone: phoneNumber,
      address: fullAddress,
      info_name: delivery,
    };
    console.log(value);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="rounded-xl border bg-card text-card-foreground shadow w-full">
        <div className="flex justify-between p-6 space-y-1">
          <h3 className="font-semibold tracking-tight text-2xl">
            Delivery Information
          </h3>
          <h3 className="font-semibold tracking-tight text-2xl">
          <div>
          <label>Select Address</label>
          {in4DetailResponseList?.data.map((address:any) => (
            <div key={address.id}>
              <button onClick={() => handleAddressSelect(address)}>
                {address.info_name}
              </button>
            </div>
          ))}
        </div>
          </h3>
        </div>
        <div className="p-6 pt-0 grid gap-4">
          <div className="relative"></div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <div className="grid gap-2 mt-8">
                <label
                  htmlFor="Phone number"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  id="PhoneNumber"
                  placeholder="Please enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <div className="col-span-1">
              <div className="grid gap-2  mt-8 ">
                <label
                  htmlFor="Address"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="Address"
                  placeholder="Please enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="grid gap-2  mt-8 ">
                <label
                  htmlFor="Province"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Province
                </label>

                <div className=" container d-flex flex-wrap px-0 mt-3">
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
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                      >
                        <option value="">Chọn Tỉnh thành</option>
                        {provinces.map((province: any) => (
                          <option
                            key={province.province_id}
                            value={province.province_id}
                          >
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
                  >
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
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        disabled={!provinces.length}
                      >
                        <option value="" disabled selected>
                          Chọn Quận, huyện
                        </option>
                        {districts &&
                          districts.length > 0 &&
                          districts.map((district: any) => (
                            <option
                              key={district.district_id}
                              value={district.district_id}
                            >
                              {district.district_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div
                    className="form-group mb-3 w-100"
                    id="ward"
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
                        disabled={!districts.length}
                        className="form-control block w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                        id="billingDistrict"
                        value={selectedWard}
                      >
                        <option
                          disabled
                          selected
                          value=""
                          className="text-slate-500"
                        >
                          Chọn phường/xã
                        </option>
                        {wards &&
                          wards.length > 0 &&
                          wards.map((ward: any) => (
                            <option key={ward.ward_id} value={ward.ward_id}>
                              {ward.ward_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2  mt-8 ">
                  Delivery
                </label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    id="office"
                    name="delivery"
                    value="office"
                    // checked={delivery === "office"}
                    onChange={() => setDelivery("office")}
                    className="mr-2 w-1/6 border border-blue-500"
                  >
                    <svg
                      className="h-8 w-8 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    OFFICE
                  </Button>
                  <Button
                    variant="outline"
                    id="home"
                    name="delivery"
                    value="home"
                    // checked={delivery === "home"}
                    onChange={() => setDelivery("home")}
                    className="flex items-center justify-center mr-2 w-1/6 border border-red-500"
                  >
                    <svg
                      className="h-8 w-8 text-red-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <polyline points="5 12 3 12 12 3 21 12 19 12" />{" "}
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />{" "}
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                    </svg>
                    HOME
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end p-6 pt-0 mt-8 ">
          <Button
            onClick={onSubmit}
            className="bg-lime-600  hover:bg-orange-600 w-40"
          >
            Save
          </Button>
        </div>

       
      </div>
    </div>
  );
}

export default DeliveryInfor;
