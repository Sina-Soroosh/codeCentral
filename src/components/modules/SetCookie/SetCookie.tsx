"use client";

import React, { useEffect } from "react";

type SetCookieProps = {
  token: string;
};

function SetCookie({ token }: SetCookieProps) {
  useEffect(() => {
    fetch(`/api/set-cookie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  }, []);

  return <></>;
}

export default SetCookie;
