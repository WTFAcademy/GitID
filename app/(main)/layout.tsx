import BgShapes from "@/components/bg-shapes";
import Footer from "@/components/footer";
import Header from "@/components/header";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <BgShapes />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
