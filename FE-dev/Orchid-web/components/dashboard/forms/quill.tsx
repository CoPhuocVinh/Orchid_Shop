import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});



function Quill({ ...props }) {
  return <ReactQuill {...props} />;
}

export default Quill;
