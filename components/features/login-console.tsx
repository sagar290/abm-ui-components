"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LoginPortal, useToast } from "@/components/ui";
import { organizations } from "@/lib/mock-data";

const domains = organizations.flatMap((org) => org.domains);

export function LoginConsole() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = React.useState("");
  const [domain, setDomain] = React.useState(domains[0] ?? "");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    window.setTimeout(() => {
      setLoading(false);
      toast({
        title: "Signed in",
        description: `${username}@${domain}`,
        variant: "success",
      });
      router.push("/users");
    }, 900);
  }

  return (
    <LoginPortal
      username={username}
      domain={domain}
      domains={domains}
      password={password}
      onUsernameChange={setUsername}
      onDomainChange={setDomain}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      loading={loading}
      forgotPasswordHref="/login"
      helpHref="/login"
    />
  );
}
