import { DevicesConsole } from "@/components/features/devices-console";
import { devices } from "@/lib/mock-data";

export function generateStaticParams() {
  return devices.map((d) => ({ id: d.id }));
}

export default function DeviceDetailPage() {
  return <DevicesConsole />;
}
