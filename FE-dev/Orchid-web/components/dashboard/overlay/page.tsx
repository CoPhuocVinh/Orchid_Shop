function Overlay() {
  return (
    <div
      style={{ zIndex: "25" }}
      className="aside-overlay fixed left-0 top-0 block h-full w-full bg-black bg-opacity-30 sm:hidden"
    ></div>
  );
}

export default Overlay;
