const scriptURL = 'https://script.google.com/macros/s/AKfycbzYLptTJUvviHdgiHUDvp5Z2EsXa1FESknYDteRyviYkVsGsmwAwRfecKDOguob5sZXRA/exec'

// Handle Subscribe Form (if it exists on the page)
const subscribeForm = document.forms['submit-to-google-sheet'];
if (subscribeForm) {
    const msg = document.getElementById("msg");
    const submitBtn = subscribeForm.querySelector('button[type="submit"]');
    const mailIcon = submitBtn.querySelector('.mail-icon');
    const spinner = submitBtn.querySelector('.spinner');

    subscribeForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        if (mailIcon) mailIcon.style.display = 'none';
        if (spinner) spinner.classList.add('active');
        
        // Clear any previous message
        msg.className = '';
        msg.textContent = '';
        
        fetch(scriptURL, { method: 'POST', body: new FormData(subscribeForm)})
            .then(response => {
                // Show success message
                msg.textContent = "Thank you for subscribing!";
                msg.className = 'show success';
                
                // Reset form
                subscribeForm.reset();
                
                // Hide message after 3 seconds
                setTimeout(() => {
                    msg.classList.remove('show');
                }, 3000);
            })
            .catch(error => {
                // Show error message
                msg.textContent = "Oops! Something went wrong. Please try again.";
                msg.className = 'show error';
                console.error('Error!', error.message);
                
                // Hide error after 4 seconds
                setTimeout(() => {
                    msg.classList.remove('show');
                }, 4000);
            })
            .finally(() => {
                // Re-enable button and restore icon
                submitBtn.disabled = false;
                if (mailIcon) mailIcon.style.display = 'block';
                if (spinner) spinner.classList.remove('active');
            });
    });
}

// Handle Contact Form (if it exists on the page)
const contactForm = document.querySelector('.contact');
if (contactForm) {
    // Create message element for contact form (matching subscribe style)
    const contactMsg = document.createElement('div');
    contactMsg.id = 'contact-msg';
    contactForm.appendChild(contactMsg);
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Create spinner if it doesn't exist
    let spinner = submitBtn.querySelector('.spinner');
    
    if (!spinner) {
        spinner = document.createElement('span');
        spinner.className = 'spinner';
        submitBtn.appendChild(spinner);
    }

    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        spinner.classList.add('active');
        
        // Clear any previous message
        contactMsg.className = '';
        contactMsg.textContent = '';
        
        // Add formType parameter to identify this as a contact form
        const formData = new FormData(contactForm);
        formData.append('formType', 'contact');
        
        fetch(scriptURL, { method: 'POST', body: formData})
            .then(response => response.json())
            .then(data => {
                if (data.result === 'success') {
                    // Show success message
                    contactMsg.textContent = "Thank you for your message!";
                    contactMsg.className = 'show success';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide message after 3 seconds
                    setTimeout(() => {
                        contactMsg.classList.remove('show');
                    }, 3000);
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(error => {
                // Show error message
                contactMsg.textContent = "Oops! Something went wrong. Please try again.";
                contactMsg.className = 'show error';
                console.error('Error!', error);
                
                // Hide error after 4 seconds
                setTimeout(() => {
                    contactMsg.classList.remove('show');
                }, 4000);
            })
            .finally(() => {
                // Re-enable button and restore spinner
                submitBtn.disabled = false;
                spinner.classList.remove('active');
            });
    });
}