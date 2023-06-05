import "./globals.css";
import localFont from "next/font/local";
import Wrapper from "./Components/Wrapper";

const comfortaa = localFont({
  src: [
    {
      path: "../fonts/Comfortaa.ttf",
    },
  ],
});

export const metadata = {
  title: "Shower",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${comfortaa.className} bg-white dark:bg-gray-950 dark:text-gray-300`}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
