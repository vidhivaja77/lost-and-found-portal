const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

export async function apiRequest(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
      body: options.body ? options.body : undefined,
    });
    
    const data = await res.json().catch(() => ({}));
    
    if (!res.ok) {
      const error = new Error(data?.error || `Request failed with status ${res.status}`);
      error.response = { status: res.status, data };
      throw error;
    }
    
    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }
    throw error;
  }
}

export function setToken(token) {
  localStorage.setItem('unifind_token', token);
}

export function setUser(user) {
  localStorage.setItem('unifind_user', JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem('unifind_user');
  return user ? JSON.parse(user) : null;
}

export function getAuthHeader() {
  const token = localStorage.getItem('unifind_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function logout() {
  localStorage.removeItem('unifind_token');
  localStorage.removeItem('unifind_user');
}

export async function registerUser({ name, email, password, enrollmentNumber, role, department, phone, username }) {
  return apiRequest('/api/auth/register', { 
    method: 'POST', 
    body: JSON.stringify({ name, email, password, enrollmentNumber, role, department, phone, username }) 
  });
}

export async function loginUser({ email, password }) {
  return apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}

export async function getCurrentUser() {
  return apiRequest('/api/auth/me', {
    headers: {
      ...getAuthHeader(),
    },
  });
}

export async function listItems({ type, q } = {}) {
  const params = new URLSearchParams();
  if (type) params.set('type', type);
  if (q) params.set('q', q);
  const query = params.toString();
  return apiRequest(`/api/items${query ? `?${query}` : ''}`);
}

export async function createItem(payload) {
  return apiRequest('/api/items', {
    method: 'POST',
    headers: {
      ...getAuthHeader(),
    },
    body: JSON.stringify(payload),
  });
}


