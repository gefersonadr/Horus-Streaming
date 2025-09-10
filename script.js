// Simples scripts front-end: registra usuário no localStorage (demo) e popula catálogo de exemplo.
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const moviesGrid = document.getElementById('moviesGrid');

const sampleMovies = [
  {title:'O Olho de Hórus', year:2023, img:'https://picsum.photos/seed/1/400/600'},
  {title:'Noite Sobre o Rio', year:2021, img:'https://picsum.photos/seed/2/400/600'},
  {title:'Memórias de Areia', year:2019, img:'https://picsum.photos/seed/3/400/600'},
  {title:'Caçadores de Estrelas', year:2022, img:'https://picsum.photos/seed/4/400/600'}
];

function renderMovies(){
  moviesGrid.innerHTML = '';
  sampleMovies.forEach(m=>{
    const div = document.createElement('div');
    div.className = 'movie';
    div.innerHTML = `
      <img src="${m.img}" alt="${m.title}" loading="lazy" />
      <h3>${m.title} <small>(${m.year})</small></h3>
    `;
    moviesGrid.appendChild(div);
  });
}
renderMovies();

signupForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  if(!email || !password){ alert('Preencha e-mail e senha'); return; }
  // demo: save in localStorage
  const users = JSON.parse(localStorage.getItem('horus_users')||'{}');
  if(users[email]){ alert('Esse e-mail já foi usado'); return; }
  users[email] = {name, email, password, createdAt: new Date().toISOString()};
  localStorage.setItem('horus_users', JSON.stringify(users));
  alert('Conta criada (demo). Você pode usar "entrar" para simular login.');
  signupForm.reset();
});

loginForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const users = JSON.parse(localStorage.getItem('horus_users')||'{}');
  const u = users[email];
  if(!u || u.password !== password){ alert('E-mail ou senha inválidos (demo).'); return; }
  alert('Login simulado: Bem-vindo, ' + (u.name || 'usuário') + '!');
  loginForm.reset();
});
