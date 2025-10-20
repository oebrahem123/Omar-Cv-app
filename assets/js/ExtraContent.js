
  let lastScrollY = 0;

  // فتح وغلق الكروت
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = e.target.closest('.portfolio-card');
      const portfolioItem = card.closest('.portfolio-item');

      if (card.classList.contains('expand')) {
        closeCard(card, portfolioItem);
      } else {
        lastScrollY = window.scrollY;
        closeAllCards();
        card.classList.add('expand');
        portfolioItem.classList.add('expanded');
        btn.innerHTML = '<i class="bi bi-x-lg"></i>';
        portfolioItem.style.gridColumn = '1 / -1';
        portfolioItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // ✅ أضف زر × فوق الصور لما الكارت يتفتح
        const extraImages = card.querySelector('.extra-images');
        if (extraImages && !extraImages.querySelector('.close-images')) {
          const closeBtn = document.createElement('span');
          closeBtn.className = 'close-images';
          closeBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
          extraImages.prepend(closeBtn);
        }
      }
    });
  });

  function closeCard(card, item) {
    card.classList.remove('expand');
    item.classList.remove('expanded');
    item.style.cssText = '';
    const icon = card.querySelector('.expand-btn');
    if (icon) icon.innerHTML = '<i class="bi bi-eye"></i>';

    // ✅ لما الكارت يتقفل، شيل زر الـ × من الصور
    const closeImagesBtn = card.querySelector('.close-images');
    if (closeImagesBtn) closeImagesBtn.remove();
  }

  function closeAllCards() {
    document.querySelectorAll('.portfolio-card.expand').forEach(openCard => {
      const openItem = openCard.closest('.portfolio-item');
      closeCard(openCard, openItem);
    });
  }

  document.addEventListener('click', e => {
    const isInsideCard = e.target.closest('.portfolio-card');
    const isPopupImage = e.target.closest('.image-popup');
    if (!isInsideCard && !isPopupImage) closeAllCards();
  });

  // ✅ لما تضغط على × بتاعة الصور تقفل المعرض كله
  document.addEventListener('click', e => {
    if (e.target.closest('.close-images')) {
      const card = e.target.closest('.portfolio-card');
      if (card) closeCard(card, card.closest('.portfolio-item'));
    }
  });

  // تكبير الصور
  document.addEventListener('click', e => {
    const img = e.target.closest('.extra-images img');
    const activePopup = document.querySelector('.image-popup');

    if (img) {
      e.stopPropagation();
      if (activePopup) activePopup.remove();

      const popup = document.createElement('div');
      popup.className = 'image-popup show';
      popup.innerHTML = `
        <div class="popup-content">
          <span class="close-popup"><i class="bi bi-x-lg"></i></span>
          <img src="${img.src}" alt="">
        </div>
      `;
      document.body.appendChild(popup);
      return;
    }

    if (activePopup && !e.target.closest('.popup-content')) {
      activePopup.remove();
    }
  });

  document.addEventListener('click', e => {
    if (e.target.closest('.close-popup')) {
      const popup = e.target.closest('.image-popup');
      if (popup) popup.remove();
    }
  });

  // Scroll To Top
  document.addEventListener("DOMContentLoaded", function() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  });











// كود بديل أكثر فعالية
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navmenu a');
    const sections = document.querySelectorAll('section[id]');
    
    // وظيفة لتحديث الرابط النشط
    function updateActiveNav() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // استمع للتمرير
    window.addEventListener('scroll', updateActiveNav);
    
    // استمع للنقر
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // تحديث أولي
    updateActiveNav();
});



