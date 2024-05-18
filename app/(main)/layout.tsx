import BgShapes from "@/components/bg-shapes";
import Footer from "@/components/footer";
import Header from "@/components/header";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <BgShapes />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
