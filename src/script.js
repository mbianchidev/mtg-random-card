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
    const cardSetRarity = document.getElementById('card-set-rarity');
    const legalityContent = document.getElementById('legality-content');
    const rulingsContent = document.getElementById('rulings-content');
    const toggleLegality = document.getElementById('toggle-legality');
    const toggleRulings = document.getElementById('toggle-rulings');
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
            // Generate a random card ID between 1 and 698099
            const randomCardId = Math.floor(Math.random() * 698099) + 1;
            
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

            console.log('Fetched card:', card);
            
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
        
        // Set name and rarity
        if (card.setName && card.set) {
            const rarityText = card.rarity ? `${card.rarity}` : '';
            cardSetRarity.textContent = `${card.setName} (${card.set})${rarityText ? ` • ${rarityText}` : ''}`;
        } else {
            cardSetRarity.textContent = '';
        }
        
        // Legality information
        displayLegality(card.legalities);
        
        // Rulings information
        displayRulings(card.rulings);
        
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
            
            // Maintain proper sizing based on the actual image dimensions
            const aspectRatio = cardImage.naturalWidth / cardImage.naturalHeight;
            if (aspectRatio < 0.7) { // If it's a tall card (like split cards)
                cardImage.style.width = 'auto';
                cardImage.style.maxHeight = '100%';
            } else {
                cardImage.style.maxWidth = '100%';
                cardImage.style.height = 'auto';
            }
            
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
        // Ensure the image URL is always using HTTPS
        cardImage.src = card.imageUrl ? card.imageUrl.replace(/^http:/i, 'https:') : '';
        cardImage.alt = card.name || 'Magic: The Gathering Card';
    }
    
    // Display legality information
    function displayLegality(legalities) {
        legalityContent.innerHTML = '';
        
        // If no legality information is available
        if (!legalities || legalities.length === 0) {
            const noLegality = document.createElement('p');
            noLegality.textContent = 'No legality information available.';
            legalityContent.appendChild(noLegality);
            return;
        }
        
        // Sort legalities by format name
        legalities.sort((a, b) => a.format.localeCompare(b.format));
        
        // Create legality items
        legalities.forEach(legalityInfo => {
            const legalityItem = document.createElement('div');
            legalityItem.className = 'legality-item';
            
            const format = document.createElement('span');
            format.className = 'format';
            format.textContent = legalityInfo.format;
            
            const legality = document.createElement('span');
            legality.className = getLegalityClass(legalityInfo.legality);
            legality.textContent = legalityInfo.legality;
            
            legalityItem.appendChild(format);
            legalityItem.appendChild(legality);
            legalityContent.appendChild(legalityItem);
        });
    }
    
    // Get legality CSS class based on legality status
    function getLegalityClass(legality) {
        switch (legality.toLowerCase()) {
            case 'legal':
                return 'legal';
            case 'not legal':
                return 'not-legal';
            case 'restricted':
                return 'restricted';
            case 'banned':
                return 'banned';
            default:
                return '';
        }
    }
    
    // Display rulings information
    function displayRulings(rulings) {
        rulingsContent.innerHTML = '';
        
        // If no rulings are available
        if (!rulings || rulings.length === 0) {
            const noRulings = document.createElement('p');
            noRulings.textContent = 'No rulings available for this card.';
            rulingsContent.appendChild(noRulings);
            return;
        }
        
        // Sort rulings by date (newest first)
        rulings.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Create ruling items
        rulings.forEach(ruling => {
            const rulingItem = document.createElement('div');
            rulingItem.className = 'ruling';
            
            const date = document.createElement('div');
            date.className = 'ruling-date';
            date.textContent = formatDate(ruling.date);
            
            const text = document.createElement('div');
            text.className = 'ruling-text';
            text.textContent = ruling.text;
            
            rulingItem.appendChild(date);
            rulingItem.appendChild(text);
            rulingsContent.appendChild(rulingItem);
        });
    }
    
    // Format date (YYYY-MM-DD to human-readable format)
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
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
    
    // Toggle legality section
    toggleLegality.addEventListener('click', () => {
        legalityContent.classList.toggle('hidden');
        toggleLegality.textContent = legalityContent.classList.contains('hidden') ? 'Show' : 'Hide';
    });
    
    // Toggle rulings section
    toggleRulings.addEventListener('click', () => {
        rulingsContent.classList.toggle('hidden');
        toggleRulings.textContent = rulingsContent.classList.contains('hidden') ? 'Show' : 'Hide';
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
                cardSetRarity.textContent = '';
                legalityContent.innerHTML = '';
                rulingsContent.innerHTML = '';
                
                // Hide collapsible sections
                legalityContent.classList.add('hidden');
                rulingsContent.classList.add('hidden');
                toggleLegality.textContent = 'Show';
                toggleRulings.textContent = 'Show';
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
