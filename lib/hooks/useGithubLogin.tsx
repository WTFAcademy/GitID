import { useCallback, useState } from 'react'

export const useGithubLogin = () => {
  const [code, setCode] = useState('')

  const login = useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID
    const scope = process.env.NEXT_PUBLIC_OAUTH_SCOPE
    const redirectUri = `${window.location.origin}/code`

    const width = 600;
    const height = 600;
    const left = (window.innerWidth / 2) - (width / 2);
    const top = (window.innerHeight / 2) - (height / 2);

    const handleCode = (event: any) => {
      if (event.origin !== window.location.origin) return;

      const { code } = event.data;
      if (code) {
        setCode(code)
        window.removeEventListener('message', handleCode)
      }
    }

    window.addEventListener('message', handleCode)
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`,
      'GitHub Login',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  }, [])
  return {code, login}
}
