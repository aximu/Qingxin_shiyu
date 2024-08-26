import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healt diet",
  description: "Chatbot for Healthy diet Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div
          className="flex flex-col h-full md:p-8"
          // style={{ background: "rgb(38, 38, 41)" }}
          style={{ background: "#f7fdfd" }}
        >
          {children}

          <div className="text-gray-400 text-sm text-center p-4">
          以上内容均由AI生成,仅供参考和借鉴 © 2024 Health Diet. E-smile团队.
          </div>
          {/* <div className="text-gray-400 text-sm text-center p-4">
            E-smile团队
          </div> */}
        </div>
      </body>
    </html>
  );
}
