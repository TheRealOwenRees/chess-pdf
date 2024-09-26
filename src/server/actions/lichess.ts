"use server";

// TODO add timeout of 60 seconds if response is 429
// TODO deal with 403 Forbidden error
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  accessToken,
  challenge,
  revokeAccessToken,
  studyChapters,
  user,
  userStudies,
  verifier,
} from "@/lib/lichessOAuth";
import { IChapter } from "@/types";

const clientId = process.env.LICHESS_CLIENT_ID as string;
const url = process.env.WEBSITE_URL as string;

const setCodeVerifierCookie = async (verifier: string) => {
  cookies().set("codeVerifier", verifier);
};

const getVerifier = async () => {
  return cookies().get("codeVerifier")?.value;
};

const setLichessTokenCookie = async (token: string) => {
  cookies().set("lichessToken", token);
};

const getLichessToken = async () => {
  return cookies().get("lichessToken")?.value;
};

const deleteLichessCookies = async () => {
  cookies().delete("lichessToken");
  cookies().delete("codeVerifier");
};

export const checkLogin = async () => {
  const token = await getLichessToken();

  if (token) {
    const response = await user(token);
    return { username: response.username, loggedIn: true };
  }

  return { username: "", loggedIn: false };
};

export const logout = async () => {
  const token = await getLichessToken(); // revoke token
  if (token) {
    await revokeAccessToken(token);
  }
  await deleteLichessCookies(); // delete all related cookies
  return true;
};

// TODO look at moving into lichessOAuth.ts
export const login = async () => {
  const lichessToken = await getLichessToken();

  if (lichessToken) {
    redirect("/chessboard");
  } else {
    await setCodeVerifierCookie(verifier);
  }

  redirect(
    "https://lichess.org/oauth?" +
      new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        redirect_uri: `${url}/callback`,
        scope: "study:read",
        code_challenge_method: "S256",
        code_challenge: challenge,
      }),
  );
};

export const verifyToken = async (code: string) => {
  const token = await getLichessToken();
  if (token) redirect("/chessboard");

  const verifier = await getVerifier();

  const lichessToken = await accessToken({
    redirectUri: `${url}/callback`,
    clientId,
    authCode: code,
    codeVerifier: verifier,
  });

  if (lichessToken.access_token) {
    await setLichessTokenCookie(lichessToken.access_token);
    return await user(lichessToken.access_token);
  }
};

export const getUserStudies = async (username: string) => {
  const token = await getLichessToken();

  if (!token) {
    // TODO error handling, 429 etc
    return;
  }

  const response = await userStudies(token, username);
  const text = await response.text();

  return text
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
};

export const getChapters = async (studyId: string) => {
  const token = await getLichessToken();

  // TODO error handling, 429 etc

  if (!token) {
    return {
      error: "You are not logged in!",
      pgn: "",
      name: "",
      chapterId: "",
    };
  }

  const response = await studyChapters(token, studyId);

  // handle forbidden / non-exportable study
  if (response.status === 403) {
    return {
      error: "This study does not allow exporting of it's games!",
      pgn: "",
      name: "",
      chapterId: "",
    };
  }

  const text = await response.text();

  return text
    .trim()
    .split(/\n{3,}/)
    .map((game) => {
      const eventHeaderText = game.match(/\[Event\s+"([^"]+)"]/)?.[1];
      const eventName = eventHeaderText?.match(/(?<=:\s+)[^"]+/)?.[0];
      const siteHeaderText = game.match(/\[Site\s+"([^"]+)"]/)?.[1];
      const chapterId = siteHeaderText?.match(/\/([^\/]+)$/)?.[1];
      return { chapterId, pgn: game, name: eventName };
    });
};
