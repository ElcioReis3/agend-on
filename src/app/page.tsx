import { Banner } from "@/components/banner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Location } from "@/components/location";
import { TablePrice } from "@/components/table-price";

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <TablePrice />
      <Location />
      <Footer />
    </>
  );
}
