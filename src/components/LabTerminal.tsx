// LabTerminal.tsx — SERVER Component (no "use client")
// Fetches data on the server, then passes rendered slots into the client shell.
// This pattern prevents Server Components from being pulled into the client bundle.

import { Suspense } from "react";
import LabTerminalShell from "./LabTerminalShell";
import LabRepos, { LabReposSkeleton } from "./LabRepos";

export default function LabTerminal() {
  return (
    <LabTerminalShell
      reposSlot={
        <Suspense fallback={<LabReposSkeleton />}>
          <LabRepos />
        </Suspense>
      }
    />
  );
}
