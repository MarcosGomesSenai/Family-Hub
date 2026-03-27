// =============================================================================
// FAMILYHUB — login-auth.js
// Autenticação via backend PHP + banco de dados MySQL.
// =============================================================================

// ─── Persistência após login bem-sucedido ────────────────────────────────────
function applyLoginSuccess(data) {
  localStorage.setItem('fh_token', data.token);
  localStorage.setItem('fh_user',  JSON.stringify(data.user));

  const userEmail = data.user?.email?.toLowerCase() || '';
  const dbKey     = userEmail ? `familyHubDB_${userEmail}` : 'familyHubDB';

  if (data.family_data) {
    localStorage.setItem(dbKey, JSON.stringify(data.family_data));
  }

  window.location.href = 'dashboard.html';
}

// ============================================================
//  tryFetch() — Fetch com timeout automático
// ============================================================
async function tryFetch(url, options, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

// ============================================================
//  submitLogin()
// ============================================================
async function submitLogin() {
  hideError('login');

  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;

  if (!email || !pass) {
    showError('login', 'Preencha e-mail e senha.');
    return;
  }

  setLoading('login', true);

  try {
    const res  = await tryFetch(`${API_BASE}php/auth.php?action=login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password: pass }),
    });
    const data = await res.json();

    if (!data.ok) {
      showError('login', data.error || 'Erro ao fazer login.');
      setLoading('login', false, 'Entrar na plataforma');
      return;
    }

    applyLoginSuccess(data);
  } catch (_) {
    showError('login', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
    setLoading('login', false, 'Entrar na plataforma');
  }
}

// ============================================================
//  submitRegister()
// ============================================================
async function submitRegister() {
  hideError('reg');

  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-password').value;
  const phone = document.getElementById('reg-phone').value;
  const age   = document.getElementById('reg-age').value;

  if (!name) {
    showError('reg', 'Informe seu nome completo.');
    return;
  }

  setLoading('reg', true);

  try {
    const res  = await tryFetch(`${API_BASE}php/auth.php?action=register`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, password: pass, phone, age: parseInt(age) || null }),
    });
    const data = await res.json();

    if (!data.ok) {
      showError('reg', data.error || 'Erro ao criar conta.');
      setLoading('reg', false, 'Criar Conta');
      return;
    }

    applyLoginSuccess(data);
  } catch (_) {
    showError('reg', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
    setLoading('reg', false, 'Criar Conta');
  }
}
