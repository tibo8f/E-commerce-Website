import Image from "next/image";
import imagetest from "../app/images/imagetest.png";
export default function Page() {
  return (
    <div>
      <h1>Bienvenue sur mon site !</h1>
      <div
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <Image
          alt="Picture of bass"
          src={imagetest}
          style={{
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}
