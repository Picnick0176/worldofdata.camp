import { useEffect } from "react";

export default function SocialEmbed() {
  useEffect(() => {
    // โหลด Instagram script
    const igScript = document.createElement("script");
    igScript.src = "https://www.instagram.com/embed.js";
    igScript.async = true;
    document.body.appendChild(igScript);

    // โหลด Facebook SDK
    const fbScript = document.createElement("script");
    fbScript.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0";
    fbScript.async = true;
    document.body.appendChild(fbScript);
  }, []);

  return (
    <div className="flex flex-col md:flex-col lg:flex-row gap-8 justify-center items-start w-full px-4 m-auto">
      {/* Facebook Page */}
      <div className="w-full md:w-[500px]">
        <div
          className="fb-page"
          data-href="https://www.facebook.com/worldofdata.camp"
          data-tabs="timeline"
          data-width="500"
          data-height="700"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        ></div>
      </div>

      {/* Instagram Post */}
      <div className="w-full md:w-[500px]">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/worldofdata.camp?igsh=ZzBsdXBqMDIzc3l5"
          data-instgrm-version="14"
          style={{
            background: "#FFF",
            border: 0,
            margin: "0 auto",
            maxWidth: "100%",
            padding: 0,
            width: "100%",
          }}
        ></blockquote>
      </div>
    </div>
  );
}
