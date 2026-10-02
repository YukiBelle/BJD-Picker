// Sample data - replace with your actual sets
const allSets = [
    {
        id: 1,
        name: "Dragon Series Set 1",
        image: "images/set-images/dragon-set-1.jpg",
        description: "Limited edition dragon-themed collection",
        isPopular: true,
        isNew: false,
        characters: [
            { name: "Azure Dragon", position: "Left" },
            { name: "Golden Dragon", position: "Center" },
            { name: "Crimson Dragon", position: "Right" }
        ]
    },
    {
        id: 2,
        name: "Celestial Beings Set",
        image: "images/set-images/celestial-set.jpg",
        description: "Mythical creatures collection",
        isPopular: true,
        isNew: false,
        characters: [
            { name: "Moon Guardian", position: "Left" },
            { name: "Sun Protector", position: "Center" },
            { name: "Star Dancer", position: "Right" }
        ]
    },
    {
        id: 3,
        name: "Ancient Legends Set",
        image: "images/set-images/legends-set.jpg",
        description: "Historical character collection",
        isPopular: false,
        isNew: true,
        characters: [
            { name: "Emperor", position: "Center-Left" },
            { name: "Empress", position: "Center-Right" },
            { name: "Minister", position: "Back Left" }
        ]
    },
    {
        id: 4,
        name: "Enchanted Forest Set",
        image: "images/set-images/forest-set.jpg",
        description: "Nature-inspired magical collection",
        isPopular: true,
        isNew: true,
        characters: [
            { name: "Forest Fairy", position: "Left" },
            { name: "Tree Guardian", position: "Center" },
            { name: "Woodland Spirit", position: "Right" }
        ]
    },
    {
        id: 5,
        name: "Ocean Dreams Set",
        image: "images/set-images/ocean-set.jpg",
        description: "Aquatic-themed luxury collection",
        isPopular: true,
        isNew: false,
        characters: [
            { name: "Mermaid Princess", position: "Center" },
            { name: "Sea King", position: "Left" },
            { name: "Pearl Maiden", position: "Right" }
        ]
    },
    {
        id: 6,
        name: "Starlight Collection",
        image: "images/set-images/starlight-set.jpg",
        description: "Cosmic-inspired doll set",
        isPopular: false,
        isNew: true,
        characters: [
            { name: "Celestial Maiden", position: "Center" },
            { name: "Night Shadow", position: "Left" },
            { name: "Cosmic Wanderer", position: "Right" }
        ]
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    
    // Check which page we're on
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
        loadPopularSetsHome();
    }
});

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearBtn');
    const resultsInfo = document.getElementById('search-results-info');

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

// Create individual set card
function createSetCard(set) {
    const card = document.createElement('div');
    card.className = 'set-card';

    const charactersHTML = set.characters.map(char => `
        <div class="character-tag">
            <strong>${char.name}</strong>
            <span class="position-indicator">(${char.position})</span>
        </div>
    `).join('');

    let badgeHTML = '';
    if (set.isPopular) {
        badgeHTML += '<span class="popular-badge">Popular</span>';
    }
    if (set.isNew) {
        badgeHTML += '<span class="popular-badge new-badge">New</span>';
    }

    card.innerHTML = `
        <div class="set-image-container">
            ${badgeHTML}
            <img src="${set.image}" alt="${set.name}" onerror="this.src='https://via.placeholder.com/300x250?text=BJD+Set'">
        </div>
        <div class="set-info">
            <div class="set-name">${set.name}</div>
            <div class="set-details">${set.description}</div>
            <div class="characters-section">
                <div class="characters-label">Characters:</div>
                <div class="character-list">
                    ${charactersHTML}
                </div>
            </div>
        </div>
    `;

    return card;
}