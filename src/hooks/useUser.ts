"use client";

import { useUser as useClerkUser } from "@clerk/nextjs";

export function useUser() {
  const { isLoaded, isSignedIn, user } = useClerkUser();

  if (!user) {
    return { user: null, isLoaded, isSignedIn };
  }

  const _user = {
    ...user,
    id: user.externalId,
    clerkId: user.id,
    image: user.imageUrl,
  };

  return { user: _user, isLoaded, isSignedIn };
}
