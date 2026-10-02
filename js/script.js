const allSets = [
    {
        id: 1,
        name: "Electronic Pet Game World V2",
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
            { name: "Creamy Bischon", position: "TopLeft", imageNum: 1 },
            { name: "Virtual Butterfly", position: "TopMiddle", imageNum: 3 },
            { name: "Wolf Girl", position: "TopRight", imageNum: 5 },
            { name: "Charmed Serpent", position: "BotLeft", imageNum: 2 },
            { name: "Bunny Nurse", position: "BotMiddle", imageNum: 4 },
            { name: "Sea Hare", position: "BotRight", imageNum: 6 }
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
    },
    {
        id: 3,
        name: "Code X Elite Agent",
        folderName: "X-ELITE",
        teaserImage: "images/set-images/X-ELITE/teaser.jpg",
        fullsetImage: "images/set-images/X-ELITE/fullset.jpg",
        description: "Disclaimer: All blind box placements are estimated off live unboxings. Unbox at your own risk!",
        isPopular: true,
        isNew: false,
        isRandom: false,
        isUndetermined: false,
        orientation: "vertical",
        characters: [
            { name: "Nurse Bear", position: "TopLeft", imageNum: 1 },
            { name: "Detective Eagle", position: "TopRight", imageNum: 4 },
            { name: "Knight Rabbit", position: "MiddleLeft", imageNum: 2 },
            { name: "Gunnar Wolf", position: "MiddleRight", imageNum: 5 },
            { name: "Nun Whale", position: "BotLeft", imageNum: 3 },
            { name: "Clown Chameleon", position: "BotRight", imageNum: 6 }
        ]
    },
    {
        id: 4,
        name: "Mita Tarot",
        folderName: "MITA-TAROT",
        teaserImage: "images/set-images/MITA-TAROT/teaser.jpg",
        fullsetImage: "images/set-images/MITA-TAROT/fullset.jpg",
        description: "Disclaimer: All blind box placements are estimated off live unboxings. Unbox at your own risk!",
        isPopular: true,
        isNew: false,
        isRandom: false,
        isUndetermined: false,
        orientation: "vertical",
        characters: [
            { name: "Star", position: "TopLeft", imageNum: 1 },
            { name: "Hermit", position: "TopRight", imageNum: 4 },
            { name: "Devil", position: "MiddleLeft", imageNum: 2 },
            { name: "Emperor", position: "MiddleRight", imageNum: 5 },
            { name: "Hangman", position: "BotLeft", imageNum: 3 },
            { name: "Magician", position: "BotRight", imageNum: 6 }
        ]
    },
    {
        id: 5,
        name: "Electronic Pet Game World V1",
        folderName: "EP-GW-V1",
        teaserImage: "images/set-images/EP-GW-V1/teaser.jpg",
        fullsetImage: "images/set-images/EP-GW-V1/fullset.jpg",
        description: "Disclaimer: All blind box placements are estimated off live unboxings. Unbox at your own risk!",
        isPopular: false,
        isNew: false,
        isRandom: false,
        isUndetermined: false,
        orientation: "horizontal",
        characters: [
            { name: "Leopard Wave", position: "TopLeft", imageNum: 1 },
            { name: "Seals Fantasy", position: "TopMiddle", imageNum: 3 },
            { name: "Fierce Puppy", position: "TopRight", imageNum: 5 },
            { name: "Scarred Violence Bunny", position: "BotLeft", imageNum: 2 },
            { name: "Lace Cat Paradise", position: "BotMiddle", imageNum: 4 },
            { name: "Snail Gear", position: "BotRight", imageNum: 6 }
        ]
    },
    {
        id: 6,
        name: "Twinkle Polaris",
        folderName: "TWINKLE-POLARIS",
        teaserImage: "images/set-images/EP-GW-V1/teaser.jpg",
        fullsetImage: "images/set-images/EP-GW-V1/fullset.jpg",
        description: "Disclaimer: All blind box placements are estimated off live unboxings. Unbox at your own risk!",
        isPopular: false,
        isNew: false,
        isRandom: false,
        isUndetermined: true,
        orientation: "vertical",
        characters: [
            { name: "Undetermined - Need more data", position: "TopLeft", imageNum: 1 }
        ]
    },
    {
        id: 7,
        name: "Light Nightmare Twins II Dream Vow",
        folderName: "DREAM-VOW",
        teaserImage: "images/set-images/DREAM-VOW/teaser.jpg",
        fullsetImage: "images/set-images/DREAM-VOW/fullset.jpg",
        description: "Disclaimer: All blind box placements are estimated off live unboxings. Unbox at your own risk!",
        isPopular: false,
        isNew: false,
        isRandom: false,
        isUndetermined: true,
        orientation: "horizontal",
        characters: [
            { name: "Undetermined - Need more data", position: "TopLeft", imageNum: 1 }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initializeModal();
    initializeSearch();

    const currentPage = window.location.pathname.toLowerCase();

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
            searchInput.value = '';
            handleSearch('');
            searchInput.focus();
        });
    }
}

function handleSearch(searchTerm) {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const resultsInfo = document.getElementById('search-results-info');
    const currentPage = window.location.pathname.toLowerCase();

    let filteredSets = allSets;

    if (normalizedSearch !== '') {
        filteredSets = allSets.filter(set => {
            const matchesName = set.name.toLowerCase().includes(normalizedSearch);
            const matchesDescription = set.description.toLowerCase().includes(normalizedSearch);
            const matchesCharacter = set.characters.some(char =>
                char.name.toLowerCase().includes(normalizedSearch)
            );

            return matchesName || matchesDescription || matchesCharacter;
        });
    }

    if (resultsInfo) {
        if (normalizedSearch === '') {
            resultsInfo.textContent = '';
        } else {
            resultsInfo.textContent = `Found ${filteredSets.length} set(s)`;
        }
    }

    if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
        renderHomePageSearch(normalizedSearch, filteredSets);
    } else if (currentPage.includes('new.html')) {
        const newFilteredSets = normalizedSearch === ''
            ? allSets.filter(set => set.isNew && !set.isRandom && !set.isUndetermined)
            : filteredSets.filter(set => set.isNew);
        renderSets(newFilteredSets, 'newSetsContainer');
    } else if (currentPage.includes('popular.html')) {
        const popularFilteredSets = normalizedSearch === ''
            ? allSets.filter(set => set.isPopular && !set.isRandom && !set.isUndetermined)
            : filteredSets.filter(set => set.isPopular);
        renderSets(popularFilteredSets, 'popularSetsContainer');
    }
}

function renderHomePageSearch(searchTerm, filteredSets) {
    const popularContainer = document.getElementById('popularSetsContainer');
    const allSetsSection = document.getElementById('allSetsSection');

    if (searchTerm === '') {
        if (popularContainer) {
            popularContainer.parentElement.style.display = 'block';
        }
        if (allSetsSection) {
            allSetsSection.style.display = 'none';
        }
        loadPopularSetsHome();
    } else {
        if (popularContainer) {
            popularContainer.parentElement.style.display = 'none';
        }
        if (allSetsSection) {
            allSetsSection.style.display = 'block';
        }

        // IMPORTANT:
        // On the index page, search should show ALL matching sets,
        // including random and undetermined.
        renderSets(filteredSets, 'allSetsContainer');
    }
}

// ============================================
// PAGE LOADING FUNCTIONS
// ============================================

function loadPopularSetsHome() {
    // Default home page should HIDE random and undetermined
    const allDisplaySets = allSets.filter(set => !set.isRandom && !set.isUndetermined);
    renderSets(allDisplaySets, 'popularSetsContainer');
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
                <div class="characters-label">Characters (${set.characters.length}):</div>
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