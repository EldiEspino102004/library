document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const cartMessage = document.getElementById('cart-message');
    const clearCartButton = document.getElementById('clear-cart');
    const orderForm = document.getElementById('order-form');
    const receiptDetails = document.getElementById('receipt-details');
    const receiptPayment = document.getElementById('receipt-payment');
    const printReceiptButton = document.getElementById('print-receipt');
    const newOrderButton = document.getElementById('new-order');
    const addCoffeeButton = document.getElementById('add-coffee-button');
    const cartWarning = document.createElement('p');

    const cart = {};

    // Prices for each item
    const prices = {
        croissant: 168.00,
        muffin: 140.00,
        danish: 196.00,
        tart: 224.00,
        eclair: 210.00,
        brownie: 156.80,
        madeleine: 179.20,
        macaron: 252.00
    };

    // Add to cart function
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.dataset.info;
            cart[item] = (cart[item] || 0) + 1;
            updateCart();
        });
    });

    // Update cart display
    function updateCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;

        for (const [item, quantity] of Object.entries(cart)) {
            const li = document.createElement('li');
            li.textContent = `${item.charAt(0).toUpperCase() + item.slice(1)} x ${quantity}`;

            // Create remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = '✖'; // Symbol for better aesthetics
            removeButton.classList.add('remove-item'); // Add class for styling
            removeButton.addEventListener('click', () => {
                delete cart[item];
                updateCart();
            });

            li.appendChild(removeButton);
            cartItems.appendChild(li);

            totalPrice += (prices[item] || 0) * quantity;
        }

        cartMessage.textContent = `Total Price: ₱${totalPrice.toFixed(2)}`;
    }

    // Clear cart
    clearCartButton.addEventListener('click', () => {
        for (const item in cart) {
            delete cart[item];
        }
        updateCart();
    });

    // Place order with empty cart check
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (Object.keys(cart).length === 0) {
            // Show warning if cart is empty
            cartWarning.textContent = "Your cart is empty. Please add items before placing an order.";
            cartWarning.style.color = 'red';
            cartWarning.style.fontWeight = 'bold';
            cartMessage.appendChild(cartWarning);
        } else {
            // Proceed with order if cart is not empty
            cartWarning.textContent = ''; // Clear any previous warning
            document.getElementById('receipt').style.display = 'block';
            receiptDetails.innerHTML = '';

            let totalAmount = 0;

            receiptDetails.innerHTML = '<strong>Itemized Details:</strong><br>';
            for (const [item, quantity] of Object.entries(cart)) {
                const itemTotal = (prices[item] * quantity).toFixed(2);
                receiptDetails.innerHTML += `${item.charAt(0).toUpperCase() + item.slice(1)} (₱${prices[item].toFixed(2)}) x ${quantity} = ₱${itemTotal}<br>`;
                totalAmount += parseFloat(itemTotal);
            }

            receiptDetails.innerHTML += `<br><strong>Total Amount:</strong> ₱${totalAmount.toFixed(2)}`;
            receiptPayment.textContent = `Payment Method: ${document.getElementById('payment').value}`;
        }
    });

    // Print receipt
    printReceiptButton.addEventListener('click', () => {
        window.print();
    });

    // New order
    newOrderButton.addEventListener('click', () => {
        document.getElementById('receipt').style.display = 'none';
        cartItems.innerHTML = '';
        cartMessage.textContent = '';
        for (const item in cart) {
            delete cart[item];
        }
    });

    // Go to coffee shop
    addCoffeeButton.addEventListener('click', () => {
        window.location.href = 'index2.html'; // Update with the correct coffee shop URL
    });
});
