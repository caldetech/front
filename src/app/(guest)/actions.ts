'use server'

import { redirect } from "next/navigation"

export function signInWithGithub() {
  const githubSignInURL = new URL('login/oauth/authorize', 'https://github.com')

  githubSignInURL.searchParams.set('client_id', 'Ov23li41l4Gzz39ZZiuO')
  githubSignInURL.searchParams.set('redirect_uri', 'http://localhost:4444/api/auth/callback')
  githubSignInURL.searchParams.set('scope', 'user')

  redirect(githubSignInURL.toString())
}