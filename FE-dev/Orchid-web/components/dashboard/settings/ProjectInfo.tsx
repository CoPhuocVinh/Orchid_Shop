function ProjectInfo() {
  return (
    <div>
      <h4 className="font-semibold text-base uppercase text-bgray-900 dark:text-white mb-3">
        Info
      </h4>
      <ul className="space-y-6">
        <li className="flex justify-between">
          <span className="text-bgray-700 dark:text-white text-base font-medium">
            Type
          </span>
          <span className="text-bgray-700 dark:text-bgray-50 text-base font-medium text-left">
            Folder
          </span>
        </li>
        <li className="flex justify-between">
          <span className="text-bgray-700 dark:text-white text-base font-medium">
            Size
          </span>
          <span className="text-bgray-700 dark:text-bgray-50 text-base font-medium text-left">
            500 MB
          </span>
        </li>
        <li className="flex justify-between">
          <span className="text-bgray-700 dark:text-white text-base font-medium">
            Owner
          </span>
          <span className="text-bgray-700 dark:text-bgray-50 text-base font-medium text-left">
            BankCo.
          </span>
        </li>
        <li className="flex justify-between">
          <span className="text-bgray-700 dark:text-white text-base font-medium">
            Location
          </span>
          <span className="text-bgray-700 dark:text-bgray-50 text-base font-medium text-left">
            My Files
          </span>
        </li>
        <li className="flex justify-between">
          <span className="text-bgray-700 dark:text-white text-base font-medium">
            Modified
          </span>
          <span className="text-bgray-700 dark:text-white text-base font-medium">
            Sep 17, 2020 4:25
          </span>
        </li>
        <li className="flex justify-between">
          <span className="text-bgray-700 dark:text-white text-base font-medium">
            Created
          </span>
          <span className="text-bgray-700 dark:text-white text-base font-medium">
            Sep 10, 2020 2:25
          </span>
        </li>
      </ul>
    </div>
  );
}

export default ProjectInfo;
