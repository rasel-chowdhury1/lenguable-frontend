import Footer from "@/components/main/shared/Footer";
import Navbar from "@/components/main/shared/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default layout;
