import { RelinkSession } from "@/components/RelinkSession";
import { lena } from "@/lib/lena";

export default function DemoPage() {
  return <RelinkSession seed={lena} note="demo · no model" />;
}
