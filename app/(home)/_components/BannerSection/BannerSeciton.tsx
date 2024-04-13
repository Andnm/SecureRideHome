"use client";

import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BannerSection = () => {
  const router = useRouter();

  return (
    <section className="p-0 banner-section">
      {/* <div className="overlay"></div> */}
      <div className="container flex items-center" style={{ height: "100%" }}>
        <div className="banner-content flex flex-col justify-center h-full">
          <p className="font-semi-bold text-4xl w-10/12">
            Bạn uống tôi lái
          </p>

          <p className="w-10/12 mt-8 text-justify" style={{ width: "80%" }}>
            Ứng dụng của chúng tôi cung cấp dịch vụ lái xe hộ cho những người
            say xỉn, giúp bạn đến nhà một cách an toàn và tiện lợi. Chúng tôi
            cam kết mang lại trải nghiệm lái xe đáng tin cậy và không bao giờ để
            bạn phải lo lắng trên đường.
          </p>

          <div className="mt-8">
            <button
              className="btn-more"
              onClick={() => router.push("/#")}
            >
              <span></span>
              <p className="relative z-10 text-black">Tìm hiểu thêm</p>
            </button>
          </div>
        </div>

        <div>
          <div className="img-banner">
            <img
              src="https://live.staticflickr.com/65535/53649746124_0d68a84556_c.jpg"
              alt="img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
