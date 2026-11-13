(function(){
  var b=document.querySelector('.burger'),panel=document.getElementById('panel');
  function zamknij(){panel.classList.remove('otwarte');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');document.body.style.overflow='';}
  b.addEventListener('click',function(){
    var o=!panel.classList.contains('otwarte');
    panel.classList.toggle('otwarte',o);b.setAttribute('aria-expanded',String(o));
    b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');document.body.style.overflow=o?'hidden':'';
  });
  panel.querySelectorAll('a').forEach(function(a){a.addEventListener('click',zamknij)});
  addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});

  document.getElementById('rok').textContent=new Date().getFullYear();

  // aktywna pozycja menu
  var linki=document.querySelectorAll('.menu a[href^="#"]');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){linki.forEach(function(a){a.classList.toggle('aktywny',a.getAttribute('href')==='#'+e.target.id&&!a.classList.contains('menu-kontakt'))})}
    })},{rootMargin:'-45% 0px -50% 0px'});
    ['kancelaria','obszary','zespol','wspolpraca','kontakt'].forEach(function(id){io.observe(document.getElementById(id))});
  }

  // formularz pokazowy
  var f=document.getElementById('formularz'),blad=document.getElementById('blad'),ok=document.getElementById('ok');
  f.addEventListener('submit',function(e){
    e.preventDefault();var m=[];
    if(!f.imie.value.trim())m.push('podaj imię i nazwisko');
    if(!f.tel.value.trim()&&!f.mail.value.trim())m.push('podaj telefon lub e-mail');
    if(f.mail.value.trim()&&!/^\S+@\S+\.\S+$/.test(f.mail.value.trim()))m.push('sprawdź adres e-mail');
    if(!document.getElementById('f-zgoda').checked)m.push('zaznacz zgodę na kontakt');
    if(m.length){blad.textContent='Aby wysłać: '+m.join(', ')+'.';blad.style.display='block';ok.style.display='none';return;}
    blad.style.display='none';
    ok.textContent='Dziękujemy. W gotowej stronie zapytanie trafi do wybranego prawnika. To podgląd, więc formularz niczego nie wysyła.';
    ok.style.display='block';
  });

  // pasek telefonów na telefonie po przewinięciu za pierwszy ekran
  var mob=document.getElementById('mob'),tel=document.querySelector('.kafel-tel'),kontakt=document.getElementById('kontakt');
  var za=false,wK=false;
  function stan(){mob.classList.toggle('widac',za&&!wK)}
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(e){za=!e[0].isIntersecting&&e[0].boundingClientRect.top<0;stan()}).observe(tel);
    new IntersectionObserver(function(e){wK=e[0].isIntersecting;stan()},{threshold:0.05}).observe(kontakt);
  }
})();
