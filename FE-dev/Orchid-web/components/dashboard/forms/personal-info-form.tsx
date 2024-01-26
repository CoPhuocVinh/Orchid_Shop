'use client'

function PersonalInfoFrom() {
  return (
    <div className="2xl:col-span-8 xl:col-span-7">
      <h3 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
        Personal Informations
      </h3>
      <div className="mt-8">
        <form action="">
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fname"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                First Name
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="fname"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="lname"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Last Name
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="lname"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Email
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Phone Number (Optional)
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="phone"
              />
            </div>
          </div>
          <h4 className="pt-8 pb-6 text-xl font-bold text-bgray-900 dark:text-white">
            Personal Address
          </h4>
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="country"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                Country or Region
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="country"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="country"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium"
              >
                City
              </label>
              <input
                type="text"
                placeholder="Washington"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="country"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="country"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium "
              >
                Address
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="address"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="postcode"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium "
              >
                Postal Code
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="postcode"
              />
            </div>
          </div>
          <h4 className="pt-8 pb-6 text-xl font-bold text-bgray-900 dark:text-white">
            Social Information
          </h4>
          <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="country"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium "
              >
                Facebook
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="fbook"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="twitter"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium "
              >
                Twitter
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="twitter"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="linkedin"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium "
              >
                Linkedin
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="linkedin"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="youtube"
                className="text-base text-bgray-600 dark:text-bgray-50  font-medium "
              >
                Youtube
              </label>
              <input
                type="text"
                className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                name="youtube"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              aria-label="none"
              className="rounded-lg bg-success-300 text-white font-semibold mt-10 py-3.5 px-4"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonalInfoFrom;
