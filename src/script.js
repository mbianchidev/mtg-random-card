document.addEventListener('DOMContentLoaded', () => {
    const cardDisplay = document.getElementById('card-display');
    const cardImage = document.getElementById('card-image');
    const cardName = document.getElementById('card-name');
    const cardType = document.getElementById('card-type');
    const cardMana = document.getElementById('card-mana');
    const cardText = document.getElementById('card-text');
    const cardFlavor = document.getElementById('card-flavor');
    const cardArtist = document.getElementById('card-artist');
    const cardPowerToughness = document.getElementById('card-power-toughness');
    const newCardBtn = document.getElementById('new-card-btn');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');

    // Create floating particles for magical effect
    createMagicalParticles();

    // Fetch a random MTG card from the API
    async function fetchRandomCard() {
        // Show loading state
        loading.classList.remove('hidden');
        cardDisplay.classList.add('hidden');
        errorMessage.classList.add('hidden');

        // Make sure image container is in loading state
        const cardImageContainer = document.querySelector('.card-image-container');
        cardImageContainer.classList.add('loading');
        cardImage.style.display = 'none';

        try {
            // Generate a random card ID between 1 and 90870
            const randomCardId = Math.floor(Math.random() * 90870) + 1;
            
            // Fetch card data from API
            const response = await fetch(`https://api.magicthegathering.io/v1/cards/${randomCardId}`);
            
            // If it's a 404 error, try another random card
            if (response.status === 404) {
                console.log('Card not found (404), trying another random card...');
                fetchRandomCard();
                return;
            }
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            
            const data = await response.json();
            const card = data.card;
            
            // If the card doesn't have an image, try again
            if (!card || !card.imageUrl) {
                console.log('Card has no image, trying again...');
                fetchRandomCard();
                return;
            }
            
            // Display card data
            displayCard(card);
        } catch (error) {
            console.error('Error fetching card data:', error);
            loading.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        }
    }

    // Display card information
    function displayCard(card) {
        // Card name
        cardName.textContent = card.name || 'Unknown Card';
        
        // Card type
        cardType.textContent = card.type || '';
        
        // Mana cost - make it more readable
        if (card.manaCost) {
            const formattedMana = card.manaCost
                .replace(/\{W\}/g, '⚪')
                .replace(/\{U\}/g, '🔵')
                .replace(/\{B\}/g, '⚫')
                .replace(/\{R\}/g, '🔴')
                .replace(/\{G\}/g, '🟢')
                .replace(/\{([0-9X]+)\}/g, '$1');
            cardMana.textContent = formattedMana;
        } else {
            cardMana.textContent = '';
        }
        
        // Card text - replace mana symbols with more readable format
        if (card.text) {
            const processedText = card.text
                .replace(/\{T\}/g, '(Tap)')
                .replace(/\{W\}/g, '(White)')
                .replace(/\{U\}/g, '(Blue)')
                .replace(/\{B\}/g, '(Black)')
                .replace(/\{R\}/g, '(Red)')
                .replace(/\{G\}/g, '(Green)')
                .replace(/\{([0-9X]+)\}/g, '($1)')
                .replace(/\\n/g, '\n');
            cardText.textContent = processedText;
        } else {
            cardText.textContent = '';
        }
        
        // Flavor text
        cardFlavor.textContent = card.flavor || '';
        
        // Artist
        cardArtist.textContent = card.artist ? `Artist: ${card.artist}` : '';
        
        // Power/Toughness for creatures
        if (card.power && card.toughness) {
            cardPowerToughness.textContent = `Power/Toughness: ${card.power}/${card.toughness}`;
        } else {
            cardPowerToughness.textContent = '';
        }
        
        // Hide the main loading spinner
        loading.classList.add('hidden');
        
        // Make the card display visible (but keep image section as loading)
        cardDisplay.classList.remove('hidden');
        
        // Show the card information with animation
        cardDisplay.style.opacity = '0';
        cardDisplay.style.transform = 'translateY(20px)';
        setTimeout(() => {
            cardDisplay.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            cardDisplay.style.opacity = '1';
            cardDisplay.style.transform = 'translateY(0)';
        }, 50);
        
        // Add loading class to the image container
        const cardImageContainer = document.querySelector('.card-image-container');
        cardImageContainer.classList.add('loading');
        
        // Hide the card image until it loads
        cardImage.style.display = 'none';
        
        // Card image with loading handling
        cardImage.onload = () => {
            // Show the card image with a fade-in effect
            cardImage.style.opacity = '0';
            cardImage.style.display = 'block';
            
            // Remove the loading class from the container
            cardImageContainer.classList.remove('loading');
            
            // Fade in the image
            setTimeout(() => {
                cardImage.style.transition = 'opacity 0.5s ease';
                cardImage.style.opacity = '1';
            }, 50);
        };
        
        cardImage.onerror = () => {
            console.error('Failed to load card image, keeping placeholder visible');
            // Keep the placeholder visible but still show card info
            cardImageContainer.classList.add('loading');
            cardImage.style.display = 'none';
        };
        
        // Start loading the image
        cardImage.src = card.imageUrl;
        cardImage.alt = card.name || 'Magic: The Gathering Card';
    }

    // Create floating magical particles for gaming effect
    function createMagicalParticles() {
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('magical-particle');
            
            // Random styling
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 10 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(248, 177, 0, ${Math.random() * 0.5})`;
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = '0 0 10px rgba(248, 177, 0, 0.7)';
            
            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Animation
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            particle.style.animationDelay = Math.random() * 10 + 's';
            
            // Add to container
            container.appendChild(particle);
        }
    }

    // Button event listener
    newCardBtn.addEventListener('click', () => {
        // Add a click animation
        newCardBtn.classList.add('clicked');
        setTimeout(() => {
            newCardBtn.classList.remove('clicked');
        }, 200);
        
        // Show loading state and reset image container before fetching a new card
        resetCardDisplay();
        fetchRandomCard();
    });
    
    // Function to reset card display state and show placeholder
    function resetCardDisplay() {
        // Show loading indicator
        loading.classList.remove('hidden');
        
        // If we're already displaying a card, fade it out first
        if (!cardDisplay.classList.contains('hidden')) {
            // Fade out the current card
            cardDisplay.style.opacity = '0';
            cardDisplay.style.transform = 'translateY(20px)';
            
            // After fade out, reset the image container to show placeholder
            setTimeout(() => {
                // Hide the actual image and show the placeholder
                cardImage.style.display = 'none';
                document.querySelector('.card-image-container').classList.add('loading');
                
                // Clear existing card data
                cardName.textContent = '';
                cardType.textContent = '';
                cardMana.textContent = '';
                cardText.textContent = '';
                cardFlavor.textContent = '';
                cardArtist.textContent = '';
                cardPowerToughness.textContent = '';
            }, 300);
        } else {
            // If no card is displayed yet, just ensure image container has loading state
            cardImage.style.display = 'none';
            document.querySelector('.card-image-container').classList.add('loading');
        }
    }

    // Fetch a random card on page load
    fetchRandomCard();
});
