let panier = JSON.parse(localStorage.getItem('cleanhome_panier')) || [];
let selectedPayment = 'online';
let services = [];


(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); 
})();


function ajouterAuPanier(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) {
        afficherNotification('❌ Service not found!');
        return;
    }

    const existingItem = panier.find(item => item.id === serviceId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        panier.push({
            id: service.id,
            name: service.name,
            price: service.price,
            qty: 1,
            image: service.image
        });
    }

    sauvegarderPanier();
    mettreAJourBadge();
    afficherNotification(`✅ ${service.name} added to cart!`);

    // Animation du bouton panier
    const cartBtn = document.getElementById('booking-btn');
    cartBtn.style.animation = 'bounce 0.6s ease';
    setTimeout(() => cartBtn.style.animation = '', 600);
}


document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            try {
                const submitBtn = document.querySelector('.btn-submit');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                const formData = {
                    name: document.getElementById('contactName').value,
                    email: document.getElementById('contactEmail').value,
                    phone: document.getElementById('contactPhone').value,
                    service: document.getElementById('contactService').value,
                    message: document.getElementById('contactMessage').value
                };

                // Envoyer email
                envoyerEmailContact(formData);

                // Reset form
                contactForm.reset();
                afficherNotification('✅ Message sent successfully! We\'ll get back to you soon.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            } catch (error) {
                console.error('Error submitting contact form:', error);
                afficherNotification('❌ Error sending message. Please try again.');
                const submitBtn = document.querySelector('.btn-submit');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }
});


function envoyerEmailContact(formData) {
    const templateParams = {
        to_email: 'proprietaire@cleanhome.com,operations@cleanhome.com',
        subject: `New Contact Form - ${formData.service} Service Inquiry`,
        from_name: formData.name,
        reply_to: formData.email,
        client_name: formData.name,
        client_email: formData.email,
        client_phone: formData.phone || 'Not provided',
        service_type: formData.service,
        message: formData.message
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_CONTACT_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Contact email sent!', response.status, response.text);
        }, function(error) {
            console.log('Contact email error:', error);
        });
}
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const hamburger = document.getElementById('hamburger-menu');
    const isOpen = mobileMenu.classList.toggle('active');

    mobileMenuOverlay.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll', isOpen);
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
}


function chargerServices() {
    const servicesStockage = JSON.parse(localStorage.getItem('cleanhome_services'));
    if (servicesStockage) {
        services = servicesStockage;
    } else {
        // Services par défaut
        services = [
            { id: 1, name: 'Standard Home Cleaning', price: 50, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=250&fit=crop' },
            { id: 2, name: 'Complete Car Cleaning', price: 30, image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c9f188?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=250&fit=crop' },
            { id: 3, name: 'Office Cleaning', price: 80, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=250&fit=crop' },
            { id: 4, name: 'Deep Kitchen Cleaning', price: 60, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=250&fit=crop' },
            { id: 5, name: 'Bathroom Deep Clean', price: 40, image: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=250&fit=crop' },
            { id: 6, name: 'Move In/Out Cleaning', price: 120, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=400&h=250&fit=crop' },
            { id: 14, name: 'Complete Disinfection', price: 3500, image: 'https://images.unsplash.com/photo-1584622781564-1d987fa5c2c4?ixlib=rb-4.1.0&q=85&fm=jpg' },
            { id: 15, name: 'Post-Construction Cleaning', price: 7000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&q=85&fm=jpg' },
            { id: 16, name: 'Moving Cleaning', price: 6000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&q=85&fm=jpg' },
            { id: 17, name: 'Event Cleaning', price: 8000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&q=85&fm=jpg' },
            { id: 18, name: 'Home + Car Package', price: 12000, image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c9f188?ixlib=rb-4.1.0&q=85&fm=jpg' },
            { id: 19, name: 'Premium Package (Home + Car + Windows)', price: 15000, image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c9f188?ixlib=rb-4.1.0&q=85&fm=jpg' },
            { id: 20, name: 'Complete Office Package', price: 10000, image: 'https://images.unsplash.com/photo-1584622781564-1d987fa5c2c4?ixlib=rb-4.1.0&q=85&fm=jpg' },
            { id: 21, name: 'All-Inclusive Package', price: 20000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&q=85&fm=jpg' },
            { id: 22, name: 'Curtains & Fabric Cleaning', price: 2500, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&q=85&fm=jpg' },
            { id: 23, name: 'Carpet Cleaning', price: 3500, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&q=85&fm=jpg' },
            { id: 24, name: 'Terrace/Balcony Cleaning', price: 4000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&q=85&fm=jpg' },
            { id: 25, name: 'Outdoor Garden Cleaning', price: 5000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&q=85&fm=jpg' },
            { id: 26, name: 'Emergency Service (24h)', price: 8000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.1.0&q=85&fm=jpg' }
        ];
    }
}

function retirer(id) {
    panier = panier.filter(item => item.id !== id);
    sauvegarderPanier();
    afficherCartModal();
    mettreAJourBadge();
}

function sauvegarderReservation(total, clientEmail, clientName) {
    const reservations = JSON.parse(localStorage.getItem('cleanhome_reservations')) || [];
    const reservation = {
        id: Date.now(),
        clientName: clientName || 'Anonymous',
        clientEmail: clientEmail || '',
        total,
        paymentMethod: selectedPayment,
        items: panier.map(item => ({ id: item.id, name: item.name, qty: item.qty, price: item.price })),
        date: new Date().toISOString(),
        emailSent: false
    };
    reservations.push(reservation);
    localStorage.setItem('cleanhome_reservations', JSON.stringify(reservations));
}

function retirer(id) {
    panier = panier.filter(item => item.id !== id);
    sauvegarderPanier();
    afficherCartModal();
    mettreAJourBadge();
}


function changerQuantite(id, diff) {
    const item = panier.find(item => item.id === id);
    if (item) {
        item.qty += diff;
        if (item.qty <= 0) {
            retirer(id);
        } else {
            sauvegarderPanier();
            afficherCartModal();
        }
    }
}


function sauvegarderPanier() {
    localStorage.setItem('cleanhome_panier', JSON.stringify(panier));
}


function afficherNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #d4af37, #f0c856);
        color: #1a1a1a;
        padding: 15px 25px;
        border-radius: 50px;
        z-index: 3000;
        animation: slideIn 0.4s ease;
        font-weight: 700;
        box-shadow: 0 8px 25px rgba(212,175,55,0.3);
    `;
    
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}


function mettreAJourBadge() {
    const total = panier.reduce((s, item) => s + item.qty, 0);
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'flex' : 'none';
    }
}


function afficherCartModal() {
    const overlay = document.getElementById('cart-modal-overlay');
    const modal = document.getElementById('cart-modal');
    
    if (!modal) return;
    
    let html = '';
    let subtotal = 0;
    
    if (panier.length === 0) {
        html = '<p style="text-align:center; color:#999; padding:40px;">No services in your cart</p>';
    } else {
        panier.forEach(item => {
            const sousTotal = item.price * item.qty;
            subtotal += sousTotal;
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <div class="cart-item-price">${item.price} USD × ${item.qty}</div>
                    </div>
                    <div class="cart-controls">
                        <button class="qty-btn" onclick="changerQuantite(${item.id}, -1)">−</button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn" onclick="changerQuantite(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="retirer(${item.id})">🗑️</button>
                    </div>
                </div>
            `;
        });
    }
    
    modal.querySelector('.cart-list').innerHTML = html;
    afficherSommaire(subtotal);
    
    overlay.classList.add('active');
}


function afficherSommaire(subtotal) {
    const modal = document.getElementById('cart-modal');
    const total = subtotal;
    
    const sommaire = modal.querySelector('.cart-summary');
    sommaire.innerHTML = `
        <div class="summary-row total">
            <span>Total:</span>
            <span>${total} USD</span>
        </div>
    `;
}


function confirmerReservation() {
    if (panier.length === 0) {
        afficherNotification('❌ Your cart is empty!');
        return;
    }

    // Get customer information
    const clientEmail = document.getElementById('client-email').value.trim();
    const clientName = document.getElementById('client-name').value.trim();

    const subtotal = panier.reduce((s, item) => s + item.price * item.qty, 0);
    const total = subtotal;

    let message = '🧽 *CLEANHOME SERVICES BOOKING*\n\n';
    if (clientName) message += `👤 Client: ${clientName}\n`;
    if (clientEmail) message += `📧 Email: ${clientEmail}\n`;
    message += '📅 ' + new Date().toLocaleString('en-US') + '\n';
    message += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    message += '🧽 *SELECTED SERVICES:*\n';

    panier.forEach(item => {
        const sousTotal = item.price * item.qty;
        message += `• ${item.name}\n  × ${item.qty} = $${sousTotal}\n`;
    });

    message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `✅ *TOTAL:* $${total}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `💳 *Payment Method:* ${selectedPayment === 'online' ? '💻 Online Payment' : '💵 Cash on Delivery'}\n`;
    message += `\n🏠 *Home Service*\n`;
    message += `📍 *Area:* Port-au-Prince, Haiti\n`;
    message += `⏰ *Hours:* Mon-Sat 7AM-7PM | Sun by Appointment\n\n`;
    message += `📞 We will contact you to schedule the service!`;

    // Send to WhatsApp
    const whatsappUrl = `https://wa.me/50942000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Send email to administrators
    envoyerEmailCommande(message.replace(/\*/g, '').replace(/━/g, '-'), clientEmail, clientName);

    // Save the reservation
    sauvegarderReservation(total, clientEmail, clientName);

    // Reset
    panier = [];
    sauvegarderPanier();
    mettreAJourBadge();
    fermerCartModal();

    afficherNotification('✅ Booking confirmed! Check WhatsApp and your emails.');
}


function envoyerEmailCommande(message, clientEmail = '', clientName = '') {
    const templateParams = {
        to_email: 'proprietaire@cleanhome.com,operations@cleanhome.com', // Administrator emails
        subject: `New CleanHome Services Order${clientName ? ` - ${clientName}` : ''}`,
        message: message,
        client_email: clientEmail || 'Not provided',
        client_name: clientName || 'Not provided',
        from_name: 'CleanHome Services Bot',
        reply_to: clientEmail || 'noreply@cleanhome.com'
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            // Mark email as sent in localStorage
            marquerEmailEnvoye();
            afficherNotification('📧 Email sent to administrators!');
        }, function(error) {
            console.log('Error sending email:', error);
            afficherNotification('⚠️ Booking confirmed but email issue. Contact us directly.');
        });
}


function marquerEmailEnvoye() {
    const reservations = JSON.parse(localStorage.getItem('cleanhome_reservations')) || [];
    if (reservations.length > 0) {
        reservations[reservations.length - 1].emailEnvoye = true;
        localStorage.setItem('cleanhome_reservations', JSON.stringify(reservations));
    }
}


function fermerCartModal() {
    const overlay = document.getElementById('cart-modal-overlay');
    if (overlay) overlay.classList.remove('active');
}


function ouvrirCartModal() {
    afficherCartModal();
}


function selectionnerPaiement(method, event) {
    selectedPayment = method;
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    if (event && event.target) {
        const target = event.target.closest('.payment-option');
        if (target) target.classList.add('selected');
    }
}


function ouvrirAllServices() {
    const overlay = document.getElementById('services-modal-overlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function fermerAllServices() {
    const overlay = document.getElementById('services-modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Load services (localStorage or default)
    chargerServices();

    // Update badge on startup
    mettreAJourBadge();

    // Close cart modal when clicking outside
    const overlay = document.getElementById('cart-modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) fermerCartModal();
        });
    }

    // Close services modal when clicking outside
    const servicesOverlay = document.getElementById('services-modal-overlay');
    if (servicesOverlay) {
        servicesOverlay.addEventListener('click', function(e) {
            if (e.target === servicesOverlay) fermerAllServices();
        });
    }
    
    // Close modal buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => btn.addEventListener('click', () => {
        fermerCartModal();
        fermerAllServices();
    }));

    // Scroll animation
    observerSections();
});


function observerSections() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.service-card, .testimonial, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}


function rechercherService(query) {
    const results = services.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase())
    );
    return results;
}


const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

