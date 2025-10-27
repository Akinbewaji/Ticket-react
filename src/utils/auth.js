const SESSION_KEY = 'ticketapp_session';

export const login = (username, password) => {
  // Simulate auth - in real app, this would be API call
  if (username === 'admin' && password === 'password') {
    const session = { user: username, token: 'fake-token-' + Date.now() };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true };
  }
  return { success: false, error: 'Invalid credentials' };
};

export const signup = (username, password) => {
  // Simulate signup
  const session = { user: username, token: 'fake-token-' + Date.now() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true };
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
};

export const isAuthenticated = () => {
  const session = localStorage.getItem(SESSION_KEY);
  return session !== null;
};

export const getSession = () => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};
