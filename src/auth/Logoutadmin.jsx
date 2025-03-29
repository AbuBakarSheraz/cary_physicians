const handleLogout = () => {
  localStorage.removeItem('isAuthenticated');
  navigate('/');
};