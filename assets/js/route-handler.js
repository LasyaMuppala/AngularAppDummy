// This script is executed before the Angular app is loaded
document.addEventListener('DOMContentLoaded', function() {
 
  const intendedRoute = localStorage.getItem('intendedRoute');
  
  if (intendedRoute) {
    // We'll keep the route in localStorage - the Angular app will handle it
    console.log('Found intended route:', intendedRoute);
  }
});