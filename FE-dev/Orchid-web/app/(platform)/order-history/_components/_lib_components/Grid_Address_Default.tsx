import React, { useState } from "react";

import { AlertOctagon, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
function Grid_Address_Default() {
  const handleSubmit = () => {};
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="mr-auto">Địa chỉ của tôi</h1>
        <button className="ml-auto bg-orange-400 py-3 px-6">
          thêm địa chỉ mới
        </button>
      </div>
      <div className="py-2">
        <Alert className="flex flex-col">
          <div className="flex justify-between items-center">
            <Terminal className="h-4 w-4" />
            <AlertTitle className="mr-auto">Kain Shun</AlertTitle>

            <AlertDescription>test</AlertDescription>
            <AlertDescription className="ml-auto ">
              You can add components to your app using the cli.
            </AlertDescription>
          </div>

          <div>
            <AlertDescription className="mb-auto">qwertyuyiou</AlertDescription>
          </div>
          <div>
            <AlertDescription className="mb-auto">qwertyuyiou</AlertDescription>
          </div>
          <div>
            <AlertDescription className="mb-auto">qwertyuyiou</AlertDescription>
          </div>
        </Alert>
      </div>
      <div className="py-2">
        <Alert className="flex justify-between items-center">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="mr-auto">Heads up!</AlertTitle>
          <AlertDescription className="ml-auto ">
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>
      <div className="py-2">
        <Alert className="flex justify-between items-center">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="mr-auto">Heads up!</AlertTitle>
          <AlertDescription className="ml-auto ">
            You can add components to your app using the cli.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}

export default Grid_Address_Default;
