import { RelinkSession } from "@/components/RelinkSession";
import { lena } from "@/lib/lena";

export default function LenaPage() {
  return <RelinkSession seed={lena} />;
}
