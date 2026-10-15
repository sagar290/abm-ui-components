import { UsersConsole } from "@/components/features/users-console";
import { users } from "@/lib/mock-data";

export function generateStaticParams() {
  return users.map((u) => ({ id: u.id }));
}

export default function UserDetailPage() {
  return <UsersConsole />;
}
