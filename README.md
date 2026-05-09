# CleanHome Services - Professional Cleaning Website

## 🌟 Complete English Website for Home Cleaning Services

This is a fully functional, modern website for CleanHome Services, a professional home cleaning company. The site is completely in English with a futuristic design, interactive elements, and comprehensive functionality.

## ✨ Features

### 🎨 **Modern Design**
- **Futuristic UI**: Glassmorphism effects, gradients, and smooth animations
- **Responsive Design**: Works perfectly on all devices
- **Interactive Elements**: Hover effects, transitions, and micro-animations
- **Professional Images**: High-quality, relevant cleaning service photos

### 🛒 **E-commerce Functionality**
- **Service Catalog**: 6 professional cleaning services with detailed descriptions
- **Shopping Cart**: Add services, manage quantities, real-time updates
- **Checkout Process**: Customer information collection and booking confirmation
- **Payment Options**: Online payment and cash on delivery

### 📧 **Email Integration**
- **Automatic Emails**: Orders sent to administrators via EmailJS
- **Contact Form**: Professional contact form with service inquiries
- **WhatsApp Integration**: Direct booking confirmations via WhatsApp

### 📱 **User Experience**
- **Mobile-First**: Optimized for mobile devices
- **Fast Loading**: Optimized images and efficient code
- **Accessibility**: Proper semantic HTML and ARIA labels
- **Local Storage**: Cart persistence and booking history

## 🚀 Quick Start

1. **Clone/Download** the project files
2. **Open** `index.html` in your browser
3. **Configure** EmailJS (see setup below)
4. **Customize** content and styling as needed

## 📧 EmailJS Setup

### 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Create a free account

### 2. Add Email Service
- In dashboard, click "Email Services"
- Add your email provider (Gmail, Outlook, etc.)
- Note the `SERVICE_ID`

### 3. Create Email Templates

#### Booking Template (for orders)
```
Subject: New CleanHome Services Booking - {{client_name}}

New booking received:

Client: {{client_name}}
Email: {{client_email}}

{{message}}

Please contact the client to schedule the service.
```

#### Contact Template (for inquiries)
```
Subject: New Contact Form - {{service_type}} Service Inquiry

From: {{client_name}} ({{client_email}})
Phone: {{client_phone}}

Service: {{service_type}}

Message:
{{message}}
```

### 4. Get API Keys
- Copy your `Public Key` from Account > General
- Note the `TEMPLATE_ID` for each template

### 5. Configure JavaScript
In `app.js`, replace the placeholders:
```javascript
// Replace with your EmailJS Public Key
emailjs.init("YOUR_PUBLIC_KEY");

// In envoyerEmailCommande function:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_BOOKING_TEMPLATE_ID', templateParams)

// In envoyerEmailContact function:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_CONTACT_TEMPLATE_ID', templateParams)
```

## 📁 Project Structure

```
cleanhome-services/
├── index.html          # Main website
├── styles.css          # Styling and animations
├── app.js             # JavaScript functionality
├── script.sql         # Database schema
└── README.md          # This file
```

## 🎯 Services Offered

1. **Standard Home Cleaning** - $50
2. **Complete Car Cleaning** - $30
3. **Office Cleaning** - $80
4. **Deep Kitchen Cleaning** - $60
5. **Bathroom Deep Clean** - $40
6. **Move In/Out Cleaning** - $120

## 🛠️ Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-blue: #00d4ff;
    --secondary-purple: #9c27b0;
    --accent-pink: #ff4081;
    /* ... */
}
```

### Services
Modify services array in `app.js`:
```javascript
services = [
    { id: 1, name: 'Your Service', price: 50, image: 'image-url' },
    // ...
];
```

### Contact Information
Update contact details in `index.html` and email addresses in `app.js`.

## 📊 Database Schema

The `script.sql` file contains a complete MySQL/MariaDB schema with:
- `services` table
- `clients` table
- `commandes` (orders) table
- `commande_details` table
- `administrateurs` table

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📞 Support

For technical support or customization requests:
- Email: support@cleanhome.ht
- WhatsApp: +509 42 00 00 00

## 📄 License

This project is provided as-is for educational and commercial use. Please respect the original design and functionality.

---

**CleanHome Services** - Excellence in Home Cleaning 🧽✨</content>
<parameter name="filePath">c:\Users\senat\Desktop\barber\README.md