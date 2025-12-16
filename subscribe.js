const scriptURL = 'https://script.google.com/macros/s/AKfycbwREF0zU18e6YBww8min9TXvQ1232UXAUifU1udEza6OXzIAu8X0F-5tU1x8QqFszZudQ/exec';
        const form = document.forms['submit-to-google-sheet'];
        const msg = document.getElementById("msg");
        const submitBtn = form.querySelector('button[type="submit"]');
        const mailIcon = submitBtn.querySelector('.mail-icon');
        const spinner = submitBtn.querySelector('.spinner');

        form.addEventListener('submit', e => {
            e.preventDefault();
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            mailIcon.style.display = 'none';
            spinner.classList.add('active');
            
            // Clear any previous message
            msg.className = '';
            msg.textContent = '';
            
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => {
                    // Show success message
                    msg.textContent = "Thank you for subscribing!";
                    msg.className = 'show success';
                    
                    // Reset form
                    form.reset();
                    
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
                    mailIcon.style.display = 'block';
                    spinner.classList.remove('active');
                });
        });