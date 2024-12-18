document.addEventListener('DOMContentLoaded', () => {
    // Select all quantity buttons and cart items
    const cartItems = document.querySelectorAll('.cart-item');
    const subtotalEl = document.querySelector('.cart-summary div:last-child p:first-child');
    const taxEl = document.querySelector('.cart-summary div:last-child p:nth-child(2)');
    const totalEl = document.querySelector('.cart-summary div:last-child p:last-child strong');
    const itemCountEl = document.querySelector('.cart-header span');

    // Function to calculate totals
    function updateTotals() {
        let subtotal = 0;
        let itemCount = 0;

        // Recalculate subtotal for each item
        cartItems.forEach(item => {
            const quantitySpan = item.querySelector('.item-quantity span');
            const priceText = item.querySelector('.item-details p:nth-child(3)').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const quantity = parseInt(quantitySpan.textContent);
            
            const totalItemPrice = price * quantity;
            subtotal += totalItemPrice;
            itemCount += quantity;

            // Update the total price for this item
            item.querySelector('strong:last-child').textContent = `$${totalItemPrice.toFixed(2)}`;

        });

        // Calculate tax (8% in this example)
        const tax = subtotal * 0.08;
        const total = subtotal + tax;

        // Update summary elements
       subtotalEl.textContent = `$${subtotal.toFixed(2)}`; taxEl.textContent = `$${tax.toFixed(2)}`; totalEl.textContent = `$${total.toFixed(2)}`; itemCountEl.textContent = `${itemCount} Items`
    }

    // Add event listeners to all quantity buttons
    cartItems.forEach(item => {
        const decreaseBtn = item.querySelector('.quantity-btn:first-child');
        const increaseBtn = item.querySelector('.quantity-btn:last-child');
        const quantitySpan = item.querySelector('.item-quantity span');

        // Decrease button functionality
        decreaseBtn.addEventListener('click', () => {
            let currentQuantity = parseInt(quantitySpan.textContent);
            if (currentQuantity > 1) {
                quantitySpan.textContent = currentQuantity - 1;
                updateTotals();
            }
        });

        // Increase button functionality
        increaseBtn.addEventListener('click', () => {
            let currentQuantity = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = currentQuantity + 1;
            updateTotals();
        });
    });

    // Add checkout button event listener
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
         // Alert user with total amount on checkout button click
         alert('Proceeding to checkout. Total amount: ' + 
             totalEl.textContent);
         // In a real application, this would redirect to a checkout page
     });

     // Initial total calculation
     updateTotals();
 });