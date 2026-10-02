const allSets = [
    {
        id: 1,
        name: "Electronic Pet Game World",
        teaserImage: "images/set-images/EP-GW-teaser.jpg",
        fullsetImage: "images/set-images/EP-GW-fullset.jpg",
        description: "A vibrant collection of digital-inspired BJD characters",
        isPopular: true,
        isNew: true,
        characters: [
            { name: "Creamy Bischon-Pink", position: "TopLeft" },
            { name: "Virtual Butterfly-Purple", position: "TopMiddle" },
            { name: "Wolf Girl-Black", position: "TopRight" },
            { name: "Charmed Serpent-Green", position: "BotLeft" },
            { name: "Bunny Nurse-Light Blue", position: "BotMiddle" },
            { name: "Sea Hare-Blue", position: "BotRight" }
        ]
    },
    {
        id: 2,
        name: "Twinkle Polaris",
        teaserImage: "images/set-images/dragon-set-1-teaser.png",
        fullsetImage: "images/set-images/dragon-set-1-fullset.png",
        description: "Limited edition dragon-themed collection",
        isPopular: true,
        isNew: true,
        characters: [
            { name: "Azure Dragon", position: "TopLeft" },
            { name: "Golden Dragon", position: "TopMiddle" },
            { name: "Yuni", position: "TopRight" },
            { name: "Emerald Dragon", position: "BotLeft" },
            { name: "Silver Dragon", position: "BotMiddle" },
            { name: "Ruby Dragon", position: "BotRight" }
        ]
    },
    {
        id: 3,
        name: "Celestial Beings Set",
        teaserImage: "images/set-images/celestial-set-teaser.png",
        fullsetImage: "images/set-images/celestial-set-fullset.png",
        description: "Mythical creatures collection",
        isPopular: true,
        isNew: false,
        characters: [
            { name: "Moon Guardian", position: "TopLeft" },
            { name: "Sun Protector", position: "TopMiddle" },
            { name: "Star Dancer", position: "TopRight" },
            { name: "Cloud Rider", position: "BotLeft" },
            { name: "Night Watcher", position: "BotMiddle" },
            { name: "Dawn Keeper", position: "BotRight" }
        ]
    },
    {
        id: 4,
        name: "Ancient Legends Set",
        teaserImage: "images/set-images/legends-set-teaser.png",
        fullsetImage: "images/set-images/legends-set-fullset.png",
        description: "Historical character collection",
        isPopular: false,
        isNew: true,
        characters: [
            { name: "Emperor", position: "TopLeft" },
            { name: "Empress", position: "TopMiddle" },
            { name: "Minister", position: "TopRight" },
            { name: "Scholar", position: "BotLeft" },
            { name: "General", position: "BotMiddle" },
            { name: "Advisor", position: "BotRight" }
        ]
    },
    {
        id: 5,
        name: "Enchanted Forest Set",
        teaserImage: "images/set-images/forest-set-teaser.png",
        fullsetImage: "images/set-images/forest-set-fullset.png",
        description: "Nature-inspired magical collection",
        isPopular: true,
        isNew: true,
        characters: [
            { name: "Forest Fairy", position: "TopLeft" },
            { name: "Tree Guardian", position: "TopMiddle" },
            { name: "Woodland Spirit", position: "TopRight" },
            { name: "Moss Keeper", position: "BotLeft" },
            { name: "Flower Sprite", position: "BotMiddle" },
            { name: "Root Maiden", position: "BotRight" }
        ]
    },
    {
        id: 6,
        name: "Ocean Dreams Set",
        teaserImage: "images/set-images/ocean-set-teaser.png",
        fullsetImage: "images/set-images/ocean-set-fullset.png",
        description: "Aquatic-themed luxury collection",
        isPopular: true,
        isNew: false,
        characters: [
            { name: "Mermaid Princess", position: "TopLeft" },
            { name: "Sea King", position: "TopMiddle" },
            { name: "Pearl Maiden", position: "TopRight" },
            { name: "Coral Guardian", position: "BotLeft" },
            { name: "Wave Dancer", position: "BotMiddle" },
            { name: "Depths Keeper", position: "BotRight" }
        ]
    }
];

let filteredSets = [...allSets];
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const resultsInfo = document.getElementById('search-results-info');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeModal();
    initializeSearch();
    
    // Check which page we're on
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
        loadPopularSetsHome();
    }
});

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearBtn');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            handleSearch(e.target.value);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                handleSearch('');
                searchInput.focus();
            }
        });
    }
}

// Handle search across all pages
function handleSearch(searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();
    const resultsInfo = document.getElementById('search-results-info');
    const currentPage = window.location.pathname;

    // Filter sets based on search
    let filteredSets = allSets;
    
    if (searchTerm !== '') {
        filteredSets = allSets.filter(set => {
            const matchesName = set.name.toLowerCase().includes(searchTerm);
            const matchesDescription = set.description.toLowerCase().includes(searchTerm);
            const matchesCharacter = set.characters.some(char => 
                char.name.toLowerCase().includes(searchTerm)
            );
            return matchesName || matchesDescription || matchesCharacter;
        });
    }

    // Update results info
    if (resultsInfo) {
        if (searchTerm === '') {
            resultsInfo.textContent = '';
        } else {
            resultsInfo.textContent = `Found ${filteredSets.length} set(s)`;
        }
    }

    // Render based on current page
    if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
        renderHomePageSearch(searchTerm, filteredSets);
    } else if (currentPage.includes('new.html')) {
        filteredSets = filteredSets.filter(set => set.isNew);
        renderSets(filteredSets, 'newSetsContainer');
    } else if (currentPage.includes('popular.html')) {
        filteredSets = filteredSets.filter(set => set.isPopular);
        renderSets(filteredSets, 'popularSetsContainer');
    }
}

// Home page search - show all matching sets
function renderHomePageSearch(searchTerm, filteredSets) {
    const popularContainer = document.getElementById('popularSetsContainer');
    const allSetsSection = document.getElementById('allSetsSection');
    const allSetsContainer = document.getElementById('allSetsContainer');

    if (searchTerm === '') {
        // Show popular sets only
        if (popularContainer) {
            loadPopularSetsHome();
        }
        if (allSetsSection) {
            allSetsSection.style.display = 'none';
        }
    } else {
        // Hide popular section and show all matching
        if (popularContainer) {
            popularContainer.parentElement.style.display = 'none';
        }
        if (allSetsSection) {
            allSetsSection.style.display = 'block';
        }
        if (allSetsContainer) {
            renderSets(filteredSets, 'allSetsContainer');
        }
    }
}

// ============================================
// PAGE LOADING FUNCTIONS
// ============================================

// Load popular sets on home page
function loadPopularSetsHome() {
    const popularSets = allSets.filter(set => set.isPopular);
    const container = document.getElementById('popularSetsContainer');
    
    if (container) {
        container.parentElement.style.display = 'block';
        renderSets(popularSets, 'popularSetsContainer');
    }
}

// Load new sets on new.html page
function loadNewSets() {
    const newSets = allSets.filter(set => set.isNew);
    renderSets(newSets, 'newSetsContainer');
}

// Load popular sets on popular.html page
function loadPopularSets() {
    const popularSets = allSets.filter(set => set.isPopular);
    renderSets(popularSets, 'popularSetsContainer');
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

// Render sets to container
function renderSets(setsToRender, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) return;

    container.innerHTML = '';

    if (setsToRender.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h2>No sets found</h2>
                <p>Try adjusting your search terms</p>
            </div>
        `;
        return;
    }

    setsToRender.forEach(set => {
        const setCard = createSetCard(set);
        container.appendChild(setCard);
    });
}

// Create individual set card with 6-character grid
function createSetCard(set) {
    const card = document.createElement('div');
    card.className = 'set-card';

    // Create 3x2 grid of characters
    const charactersHTML = set.characters.map(char => `
        <div class="character-tag">
            <strong>${char.name}</strong>
            <span class="position-indicator">${char.position}</span>
        </div>
    `).join('');

let badgeHTML = '';
if (set.isPopular || set.isNew) {
    badgeHTML = '<div class="badge-container">';
    if (set.isPopular) {
        badgeHTML += '<span class="popular-badge">Popular</span>';
    }
    if (set.isNew) {
        badgeHTML += '<span class="popular-badge new-badge">New</span>';
    }
    badgeHTML += '</div>';
}

    card.innerHTML = `
        <div class="set-image-container">
            ${badgeHTML}
            <img src="${set.teaserImage}" alt="${set.name}" onerror="this.src='https://via.placeholder.com/300x250?text=BJD+Set'">
        </div>
        <div class="set-info">
            <div class="set-name">${set.name}</div>
            <div class="set-details">${set.description}</div>
            <div class="characters-section">
                <div class="characters-label">Characters (6):</div>
                <div class="character-list">
                    ${charactersHTML}
                </div>
            </div>
        </div>
    `;

    // Add click event to open modal
    card.addEventListener('click', () => {
        openModal(set.id);
    });

    return card;
}

// ============================================
// MODAL/POPUP FUNCTIONALITY
// ============================================

// Initialize modal
function initializeModal() {
    const modal = document.getElementById('setModal');
    const closeBtn = document.querySelector('.close-modal');

    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the content
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

// Open modal with set details
function openModal(setId) {
    const set = allSets.find(s => s.id === setId);
    if (!set) return;

    const modal = document.getElementById('setModal');
    
    // Update modal content
    document.getElementById('modalImage').src = set.fullsetImage;
    document.getElementById('modalImage').onerror = function() {
        this.src = 'https://via.placeholder.com/600x600?text=Full+Set+Image';
    };
    document.getElementById('modalTitle').textContent = set.name;
    document.getElementById('modalDescription').textContent = set.description;

    // Update characters list with 6-character grid
    const characterList = document.getElementById('modalCharacterList');
    characterList.innerHTML = set.characters.map(char => `
        <div class="character-tag">
            <strong>${char.name}</strong>
            <span class="position-indicator">${char.position}</span>
        </div>
    `).join('');

    // Show modal
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('setModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}