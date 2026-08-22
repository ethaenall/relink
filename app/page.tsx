import { RelinkSession } from "@/components/RelinkSession";
import { lena } from "@/lib/lena";

export default function Home() {
  return <RelinkSession seed={lena} hero />;
}
