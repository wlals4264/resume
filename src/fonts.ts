import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    { path: "./fonts/pretendard/Pretendard-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/pretendard/Pretendard-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/pretendard/Pretendard-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/pretendard/Pretendard-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-pretendard",
  display: "swap",
});
