/* eslint-disable @next/next/no-page-custom-font */
import AnnouncementBanner from "@/components/main/shared/AnnouncementBanner";
import Footer from "@/components/main/shared/Footer";
import Navbar from "@/components/main/shared/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <link href="https://fonts.googleapis.com/css2?family=Stalemate&display=swap" rel="stylesheet" />
      <AnnouncementBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;