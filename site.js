/* ============================================================
   AUREUM CLUB — shared behaviour for all pages (v5)
   ============================================================ */
(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // current year
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

  // nav background on scroll (interior pages start "solid")
  var bar = document.getElementById('topbar');
  if(bar && !bar.classList.contains('solid')){
    var onScroll = function(){ bar.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  }

  // hero masked headline — reveal shortly after load
  document.querySelectorAll('.mask-lines.on-load').forEach(function(el){
    setTimeout(function(){ el.classList.add('in'); }, 120);
  });

  // scroll reveals (plain, masked headlines, staggered groups)
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el = e.target;
      el.classList.add('in');
      if(el.classList.contains('reveal-stagger')){
        Array.prototype.forEach.call(el.children, function(child, i){
          child.style.transitionDelay = (i * 90) + 'ms';
          child.classList.add('in');
        });
      }
      io.unobserve(el);
    });
  }, {threshold:0.14, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal, .mask-lines:not(.on-load), .reveal-stagger').forEach(function(el){
    // children of a stagger group behave like reveals
    if(el.classList.contains('reveal-stagger')){
      Array.prototype.forEach.call(el.children, function(child){ child.classList.add('reveal'); });
    }
    io.observe(el);
  });

  // filmstrip marquee — duplicate the track once for a seamless loop
  document.querySelectorAll('.marquee .track').forEach(function(track){
    track.innerHTML += track.innerHTML;
  });

  // count-up numbers: <span class="n" data-count="6" data-prefix="€">
  var counters = document.querySelectorAll('[data-count]');
  if(counters.length){
    var finish = function(el){
      el.textContent = (el.getAttribute('data-prefix') || '') + el.getAttribute('data-count');
    };
    if(reduced){ counters.forEach(finish); }
    else{
      var cio = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(!e.isIntersecting) return;
          cio.unobserve(e.target);
          var el = e.target, target = parseFloat(el.getAttribute('data-count'));
          var prefix = el.getAttribute('data-prefix') || '', t0 = null;
          var step = function(ts){
            if(!t0) t0 = ts;
            var p = Math.min((ts - t0) / 1400, 1), eased = 1 - Math.pow(1 - p, 3);
            el.textContent = prefix + Math.round(target * eased);
            if(p < 1) requestAnimationFrame(step); else finish(el);
          };
          requestAnimationFrame(step);
        });
      }, {threshold:0.5});
      counters.forEach(function(el){ cio.observe(el); });
    }
  }

  // gallery lightbox
  var gallery = document.querySelectorAll('.gallery a');
  if(gallery.length){
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<img alt="" />' +
      '<button class="ev-arrow lb-prev" aria-label="Previous photo">&lsaquo;</button>' +
      '<button class="ev-arrow lb-next" aria-label="Next photo">&rsaquo;</button>' +
      '<button class="ev-arrow lb-close" aria-label="Close">&times;</button>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img'), current = 0;
    var show = function(i){
      current = (i + gallery.length) % gallery.length;
      lbImg.src = gallery[current].getAttribute('href');
      lb.classList.add('open');
    };
    var hide = function(){ lb.classList.remove('open'); };
    gallery.forEach(function(a, i){
      a.addEventListener('click', function(e){ e.preventDefault(); show(i); });
    });
    lb.querySelector('.lb-prev').addEventListener('click', function(e){ e.stopPropagation(); show(current - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function(e){ e.stopPropagation(); show(current + 1); });
    lb.querySelector('.lb-close').addEventListener('click', hide);
    lb.addEventListener('click', function(e){ if(e.target === lb) hide(); });
    document.addEventListener('keydown', function(e){
      if(!lb.classList.contains('open')) return;
      if(e.key === 'Escape') hide();
      if(e.key === 'ArrowLeft') show(current - 1);
      if(e.key === 'ArrowRight') show(current + 1);
    });
  }

  // swipeable poster row — arrow buttons
  var row = document.getElementById('evrow');
  if(row){
    var prev = document.querySelector('.ev-arrow.prev');
    var next = document.querySelector('.ev-arrow.next');
    var step = function(){ var c = row.querySelector('.poster-card'); return c ? c.offsetWidth + 22 : 270; };
    var sync = function(){
      if(!prev || !next) return;
      prev.disabled = row.scrollLeft < 8;
      next.disabled = row.scrollLeft > (row.scrollWidth - row.clientWidth - 8);
    };
    if(prev) prev.addEventListener('click', function(){ row.scrollBy({left:-step(), behavior:'smooth'}); });
    if(next) next.addEventListener('click', function(){ row.scrollBy({left: step(), behavior:'smooth'}); });
    row.addEventListener('scroll', sync, {passive:true}); sync();
  }

  // Forms are handled by Netlify Forms on the original Netlify site (works cross-origin; response is opaque)
  var FORM_ENDPOINT = 'https://joinaureum.netlify.app/';

  // free newsletter signup via Netlify Forms
  var sf = document.getElementById('subscribeForm');
  if(sf){ sf.addEventListener('submit', function(e){
    e.preventDefault();
    var msg = document.getElementById('formMsg');
    var body = new URLSearchParams(new FormData(sf)).toString();
    msg.textContent = 'Sending…';
    fetch(FORM_ENDPOINT, {method:'POST', mode:'no-cors', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:body})
      .then(function(){
        msg.textContent = "You're on the list. We'll write when the next table is set.";
        if(window.fbq) fbq('track','Lead',{content_name:'list'});
        sf.querySelector('input[type=email]').value = '';
      })
      .catch(function(){ msg.textContent = 'That didn’t send — please try again.'; });
  }); }

  // membership application via Netlify Forms
  var af = document.getElementById('applyForm');
  if(af){ af.addEventListener('submit', function(e){
    e.preventDefault();
    var msg = document.getElementById('applyMsg');
    var body = new URLSearchParams(new FormData(af)).toString();
    msg.textContent = 'Sending…';
    fetch(FORM_ENDPOINT, {method:'POST', mode:'no-cors', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:body})
      .then(function(){ msg.textContent = "Received. We read every application ourselves and reply within a week."; af.reset();
        if(window.fbq) fbq('track','Lead',{content_name:'membership-application'}); })
      .catch(function(){ msg.textContent = 'That didn’t send — please try again.'; });
  }); }

  // blog — rendered from blog/posts.js (window.AUREUM_POSTS, newest first)
  var posts = window.AUREUM_POSTS || [];
  var list = document.getElementById('noteList');
  if(list && posts.length){
    list.innerHTML = posts.map(function(p){
      return '<a class="note-card lift reveal" href="' + p.url + '">' +
        '<img src="' + p.cover + '" alt="" loading="lazy" />' +
        '<div><div class="nc-date">' + p.date + '</div>' +
        '<h3>' + p.title + '</h3>' +
        '<p>' + p.excerpt + '</p>' +
        '<span class="go">Read the note →</span></div></a>';
    }).join('');
    list.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  }
  var strip = document.getElementById('noteStrip');
  if(strip && posts.length){
    strip.innerHTML = '<span class="ns-label">Latest from the table</span>' +
      '<a class="sweep" href="' + posts[0].url + '">' + posts[0].title + ' →</a>';
  }
})();

  // Meta Pixel: outbound intent clicks (Luma reserve, WhatsApp group)
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]'); if(!a || !window.fbq) return;
    if(/luma\.com/.test(a.href)){
      var card = a.closest && a.closest('.cf-date'); var name = card ? (card.querySelector('h3')||{}).textContent : 'Luma event';
      var m = card && /€\s?(\d+)/.exec(card.textContent||''); var val = m ? parseFloat(m[1]) : 20;
      fbq('track','InitiateCheckout',{content_name:name, content_type:'product', value:val, currency:'EUR'});
    }
    if(/chat\.whatsapp\.com/.test(a.href)) fbq('trackCustom','WhatsAppJoin');
  });
