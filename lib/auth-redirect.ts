type AuthUser = {
  userid?: string;
  id?: string;
  name?: string;
  email?: string;
};

type AuthPayload = {
  accessToken: string;
  refreshToken?: string;
  user?: AuthUser;
  fallbackPath?: string;
};

export function redirectAfterAuth(payload: AuthPayload) {
  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get('returnTo');

  if (!returnTo) {
    window.location.href = payload.fallbackPath || '/account/profile';
    return;
  }

  const url = new URL(returnTo);
  url.searchParams.set('accesstoken', payload.accessToken);

  if (payload.refreshToken) {
    url.searchParams.set('refreshtoken', payload.refreshToken);
  }

  if (payload.user?.userid || payload.user?.id) {
    const id = payload.user.userid || payload.user.id || '';
    url.searchParams.set('userid', id);
    url.searchParams.set('userId', id);
  }

  if (payload.user?.name) {
    url.searchParams.set('name', payload.user.name);
  }

  if (payload.user?.email) {
    url.searchParams.set('email', payload.user.email);
  }

  window.location.href = url.toString();
}
