function Folders() {
  return (
    <div className="flex flex-col items-center md:w-32 md:h-32 w-24 h-24 lg:w-44 lg:h-44">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.56578 12.9268H36.2647C38.1443 12.9268 39.8804 13.9307 40.8183 15.5595L45.5417 22.0121C46.4796 23.6408 48.216 24.6448 50.0953 24.6448H120V98.3153C120 102.184 116.863 105.321 112.994 105.321H7.00587C3.13675 105.321 0 102.184 0 98.3153V32.8171C0 27.4018 0.836656 22.0188 2.4805 16.8589C3.08269 14.5432 5.17317 12.9268 7.56578 12.9268Z"
          fill="#4ADE80"
        />
        <path
          d="M103.16 23.4395H10.9199V62.4043H103.16V23.4395Z"
          fill="#EBF0F3"
        />
        <path
          d="M114.746 16.4297H85.825C83.7683 16.4297 81.9005 17.6297 81.0459 19.5003L76.097 30.3312C75.2421 32.2019 73.3746 33.4019 71.3179 33.4019H0V100.067C0 103.936 3.13675 107.072 7.00587 107.072H112.994C116.863 107.072 120 103.936 120 100.067V21.6841C120 18.7823 117.647 16.4297 114.746 16.4297Z"
          fill="#22C55E"
        />
      </svg>
      <h4 className="md:text-xl text-sm font-semibold dark:text-white">
        2021 Invoice
      </h4>
      <span className="md:text-base text-xs text-bgray-600 dark:text-darkblack-300">
        120 MB
      </span>
    </div>
  );
}

export default Folders;
