import React, { useState } from "react";
// import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EyeIcon, EyeOffIcon } from "lucide-react";
function Grid_My_Profile() {
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to submit form data
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleToggleConFirmPasswordVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  document
    .getElementById("avatar-upload")
    ?.addEventListener("change", (event) => {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newAvatarSrc = e.target?.result as string;
          // Thực hiện cập nhật avatar với hình ảnh mới (newAvatarSrc)
        };
        reader.readAsDataURL(file);
      }
    });
  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 w-3/4">
      <div className="flex items-center">
        <label htmlFor="avatar-upload" className="mr-4 cursor-pointer">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </label>
        <div>
          <h1 className="text-2xl font-semibold mb-4">My Profile</h1>
        </div>
        <input
          type="file"
          id="avatar-upload"
          className="hidden"
          accept="image/*"
        />
      </div>

      <div className="flex">
        <div className="w-1/2 pr-4">
          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="firstName">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-4 py-2 border rounded-md"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="lastName">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full px-4 py-2 border rounded-md"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Your last name"
              required
            />
          </div>
        </div>
        <div className="w-1/2 pl-4">
          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="contactNumber">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              className="w-full px-4 py-2 border rounded-md"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="8801"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          className="w-full px-4 py-2 border rounded-md"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            className="w-full px-4 py-2 border rounded-md"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="state">
            State
          </label>
          <input
            type="text"
            id="state"
            className="w-full px-4 py-2 border rounded-md"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="zipCode">
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            className="w-full px-4 py-2 border rounded-md"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="00000"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="country">
            Country
          </label>
          <input
            type="text"
            id="country"
            className="w-full px-4 py-2 border rounded-md"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
        </div>
      </div>
      <div className="mb-4 relative">
        <label className="block font-semibold mb-1" htmlFor="password">
          Password *
        </label>
        <div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-full px-4 py-2 pr-10 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create A Password"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 py-2 mt-7"
            onClick={handleTogglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOffIcon className="h-6 w-6 text-gray-500" />
            ) : (
              <EyeIcon className="h-6 w-6 text-gray-500" />
            )}
          </button>
        </div>
      </div>
      <div className="mb-4 relative">
        <label className="block font-semibold mb-1" htmlFor="confirmPassword">
          Confirm Password *
        </label>
        <div>
          <input
            type={showPasswordConfirm ? "text" : "password"}
            id="confirmPassword"
            className="w-full px-4 py-2 pr-10 border rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password A Password"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 py-2 mt-7"
            onClick={handleToggleConFirmPasswordVisibility}
          >
            {showPasswordConfirm ? (
              <EyeOffIcon className="h-6 w-6 text-gray-500" />
            ) : (
              <EyeIcon className="h-6 w-6 text-gray-500" />
            )}
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg
border-blue-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Update Profile
        </button>
        <button
          type="button"
          className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg
border-red-600
border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          onClick={() => console.log("Cancelled")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Grid_My_Profile;
