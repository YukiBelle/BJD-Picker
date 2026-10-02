const allSets = [
    {
        id: 1,
        name: "Electronic Pet Game World",
        folderName: "EP-GW",
        teaserImage: "images/set-images/EP-GW/teaser.jpg",
        fullsetImage: "images/set-images/EP-GW/fullset.jpg",
        description: "Disclaimer: All blind box placements are estimated off live unboxings. Unbox at your own risk!",
        isPopular: true,
        isNew: true,
        isRandom: false,
        isUndetermined: false,
        orientation: "horizontal",
        characters: [
            { name: "Creamy Bischon-Pink", position: "TopLeft", imageNum: 1 },
            { name: "Charmed Serpent-Green", position: "BotLeft", imageNum: 2 },
            { name: "Virtual Butterfly-Purple", position: "TopMiddle", imageNum: 3 },
            { name: "Bunny Nurse-Light Blue", position: "BotMiddle", imageNum: 4 },
            { name: "Wolf Girl-Black", position: "TopRight", imageNum: 5 },
            { name: "Sea Hare-Blue", position: "BotRight", imageNum: 6 }
        ]
    },
    {
        id: 2,
        name: "MEOW 3",
        folderName: "MEOW-3",
        teaserImage: "images/set-images/MEOW-3/teaser.jpg",
        fullsetImage: "images/set-images/MEOW-3/fullset.jpg",
        description: "Disclaimer: All blind box placements are estimated off live unboxings. Unbox at your own risk!",
        isPopular: true,
        isNew: false,
        isRandom: false,
        isUndetermined: false,
        orientation: "vertical",
        characters: [
            { name: "Vivi", position: "TopLeft", imageNum: 1 },
            { name: "Fufu", position: "TopRight", imageNum: 4 },
            { name: "Ankh", position: "MiddleLeft", imageNum: 2 },
            { name: "Zero", position: "MiddleRight", imageNum: 5 },
            { name: "Rinne", position: "BotLeft", imageNum: 3 },
            { name: "Zizi", position: "BotRight", imageNum: 6 }
        ]
    }
];

let filteredSets = [...allSets];
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const resultsInfo = document.getElementById('search-results-info');

document.addEventListener('DOMContentLoaded', () => {
    initializeModal();
    initializeSearch();
    
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
        loadPopularSetsHome();
    }
});

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

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

function handleSearch(searchTerm) {
    searchTerm = searchTerm.toLowerCase().trim();
    const resultsInfo = document.getElementById('search-results-info');
    const currentPage = window.location.pathname;

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

    if (resultsInfo) {
        if (searchTerm === '') {
            resultsInfo.textContent = '';
        } else {
            resultsInfo.textContent = `Found ${filteredSets.length} set(s)`;
        }
    }

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

function renderHomePageSearch(searchTerm, filteredSets) {
    const popularContainer = document.getElementById('popularSetsContainer');
    const allSetsSection = document.getElementById('allSetsSection');
    const allSetsContainer = document.getElementById('allSetsContainer');

    if (searchTerm === '') {
        if (popularContainer) {
            loadPopularSetsHome();
        }
        if (allSetsSection) {
            allSetsSection.style.display = 'none';
        }
    } else {
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

function loadPopularSetsHome() {
    const popularSets = allSets.filter(set => set.isPopular && !set.isRandom && !set.isUndetermined);
    const container = document.getElementById('popularSetsContainer');
    
    if (container) {
        container.parentElement.style.display = 'block';
        renderSets(popularSets, 'popularSetsContainer');
    }
}

function loadNewSets() {
    const newSets = allSets.filter(set => set.isNew && !set.isRandom && !set.isUndetermined);
    renderSets(newSets, 'newSetsContainer');
}

function loadPopularSets() {
    const popularSets = allSets.filter(set => set.isPopular && !set.isRandom && !set.isUndetermined);
    renderSets(popularSets, 'popularSetsContainer');
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

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

function createSetCard(set) {
    const card = document.createElement('div');
    card.className = 'set-card';

    const charactersHTML = set.characters.map(char => `
        <div class="character-tag" data-set-folder="${set.folderName}" data-image-num="${char.imageNum}" data-char-name="${char.name}">
            <strong>${char.name}</strong>
            <span class="position-indicator">${char.position}</span>
        </div>
    `).join('');

    let badgeHTML = '';
    if (set.isPopular || set.isNew || set.isRandom || set.isUndetermined) {
        badgeHTML = '<div class="badge-container">';
        if (set.isPopular) {
            badgeHTML += '<span class="popular-badge">Popular</span>';
        }
        if (set.isNew) {
            badgeHTML += '<span class="popular-badge new-badge">New</span>';
        }
        if (set.isRandom) {
            badgeHTML += '<span class="popular-badge random-badge">Random</span>';
        }
        if (set.isUndetermined) {
            badgeHTML += '<span class="popular-badge undetermined-badge">Undetermined</span>';
        }
        badgeHTML += '</div>';
    }

    const orientationClass = set.orientation || 'horizontal';

    card.innerHTML = `
        <div class="set-image-container">
            ${badgeHTML}
            <img class="set-gallery-image" src="${set.teaserImage}" alt="${set.name}" onerror="this.src='https://via.placeholder.com/300x250?text=BJD+Set'">
        </div>
        <div class="set-info">
            <div class="set-name">${set.name}</div>
            <div class="set-details">${set.description}</div>
            <div class="characters-section">
                <div class="characters-label">Characters (6):</div>
                <div class="character-list ${orientationClass}">
                    ${charactersHTML}
                </div>
            </div>
        </div>
    `;

    const mainImage = card.querySelector('.set-gallery-image');
    const originalSrc = mainImage.src;
    const charTags = card.querySelectorAll('.character-tag');

    charTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const folderName = tag.getAttribute('data-set-folder');
            const imageNum = tag.getAttribute('data-image-num');
            const imageSrc = `images/set-images/${folderName}/${imageNum}.jpg`;
            mainImage.src = imageSrc;
            mainImage.onerror = function() {
                this.src = 'https://via.placeholder.com/300x250?text=No+Image';
            };
        });

        tag.addEventListener('mouseleave', () => {
            mainImage.src = originalSrc;
            mainImage.onerror = function() {
                this.src = 'https://via.placeholder.com/300x250?text=BJD+Set';
            };
        });
    });

    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('character-tag') && !e.target.closest('.character-tag')) {
            openModal(set.id);
        }
    });

    return card;
}

// ============================================
// MODAL/POPUP FUNCTIONALITY
// ============================================

function initializeModal() {
    const modal = document.getElementById('setModal');
    const closeBtn = document.querySelector('.close-modal');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

function openModal(setId) {
    const set = allSets.find(s => s.id === setId);
    if (!set) return;

    const modal = document.getElementById('setModal');
    
    const modalImage = document.getElementById('modalImage');
    const originalSrc = set.fullsetImage;
    modalImage.src = originalSrc;
    modalImage.style.objectFit = 'cover';
    modalImage.onerror = function() {
        this.src = 'https://via.placeholder.com/600x600?text=Full+Set+Image';
    };

    document.getElementById('modalTitle').textContent = set.name;
    document.getElementById('modalDescription').textContent = set.description;

    const characterList = document.getElementById('modalCharacterList');
    const orientationClass = set.orientation || 'horizontal';
    
    const modalCharactersHTML = set.characters.map(char => `
        <div class="character-tag" data-set-folder="${set.folderName}" data-image-num="${char.imageNum}" data-char-name="${char.name}">
            <strong>${char.name}</strong>
            <span class="position-indicator">${char.position}</span>
        </div>
    `).join('');
    
    characterList.className = `character-list ${orientationClass}`;
    characterList.innerHTML = modalCharactersHTML;

    const modalCharTags = characterList.querySelectorAll('.character-tag');

    modalCharTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const folderName = tag.getAttribute('data-set-folder');
            const imageNum = tag.getAttribute('data-image-num');
            const imageSrc = `images/set-images/${folderName}/${imageNum}.jpg`;
            modalImage.src = imageSrc;
            modalImage.style.objectFit = 'cover';
            modalImage.onerror = function() {
                this.src = originalSrc;
            };
        });

        tag.addEventListener('mouseleave', () => {
            modalImage.src = originalSrc;
            modalImage.style.objectFit = 'cover';
            modalImage.onerror = function() {
                this.src = 'https://via.placeholder.com/600x600?text=Full+Set+Image';
            };
        });
    });

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('setModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}