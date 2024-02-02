
import "../globals.css";
import "/public/static/css/style.css";
import "/public/static/css/font-awesome-all.min.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-quill/dist/quill.snow.css";
// import ServiceWorker from "./(dashboard)/_components/sw/sw";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body>{children}</body>
    </html>
  );
}
