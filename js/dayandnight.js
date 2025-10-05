document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');
  
  checkbox.addEventListener('change', function () {
    document.documentElement.classList.toggle('switch');
  });
});