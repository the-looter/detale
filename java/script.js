// ... existing code ...

    // Function to add a product to the wishli
    // Show modal if user hasn't logged in before
    window.addEventListener('DOMContentLoaded', () => {
        if (!localStorage.getItem('userName')) {
            document.getElementById('userModal').style.display = 'flex';
        }
    });
    // Add this at the top of script.js
window.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'login/login.html';
        return;
    }
    
    // Initialize search and record visit only if user is logged in
    initializeSearch();
    recordUserVisit();
});

// Remove or comment out these duplicate event listeners
// window.addEventListener('DOMContentLoaded', () => {
//     if (!localStorage.getItem('userName')) {
//         document.getElementById('userModal').style.display = 'flex';
//     }
// });

// window.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('userModal').style.display = 'flex';
// });

// window.addEventListener('DOMContentLoaded', () => {
//     const currentUser = localStorage.getItem('currentUser');
//     if (!currentUser) {
//         window.location.href = '/login/login.html';
//     }
//     initializeSearch();
//     recordUserVisit();
// });

// Single event listener for DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {
    // Check login status
    const currentUser = localStorage.getItem('currentUser');
    
    // Initialize login modal
    const loginModal = document.getElementById('login-modal');
    if (!currentUser && loginModal) {
        loginModal.style.display = 'flex';
    }
    
    // Initialize search
    initializeSearch();
    
    // Record visit
    recordUserVisit();
});

// Handle login submission
document.getElementById('login-submit')?.addEventListener('click', function() {
    const nameInput = document.getElementById('user-name');
    if (!nameInput) return;
    
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('currentUser', name);
        document.getElementById('login-modal').style.display = 'none';
        
        // Update header with user name
        const header = document.querySelector('.header-container');
        if (header) {
            const userDisplay = document.createElement('div');
            userDisplay.className = 'user-display';
            userDisplay.innerHTML = `Welcome, ${name}!`;
            userDisplay.style.color = '#2563eb';
            userDisplay.style.marginLeft = '1rem';
            header.appendChild(userDisplay);
        }
    }
});

// Handle loading screen
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
});

function initializeSearch() {
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container button');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-container input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === '') return;

    const productCards = document.querySelectorAll('.product-card');
    let resultsFound = false;

    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            resultsFound = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (!resultsFound) {
        alert('No products found matching your search.');
    }
}

// Keep your existing functions
function trackLaptopVisit(laptopData) {
    const userName = localStorage.getItem('currentUser') || 'Guest';
    const storageKey = `laptopVisits_${userName}`;
    let visits = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // Create a properly structured visit object
    const newVisit = {
        name: laptopData.title || laptopData.name,  // Handle both title and name properties
        price: laptopData.price,
        url: window.location.pathname,  // Store current page URL
        timestamp: new Date().toISOString()
    };
    
    // Check for duplicate entries
    const isDuplicate = visits.some(visit => visit.name === newVisit.name);
    if (!isDuplicate) {
        visits.unshift(newVisit);
        visits = visits.slice(0, 10); // Keep only last 10 visits
        localStorage.setItem(storageKey, JSON.stringify(visits));
        console.log('Laptop visit tracked:', newVisit); // For debugging
    }
}

    // Update the display function in profile.html
    function displayVisitedLaptops() {
        const currentUser = localStorage.getItem('currentUser') || 'Guest';
        const storageKey = `laptopVisits_${currentUser}`;
        const visitedContainer = document.getElementById('visitedLaptops');
        const visits = JSON.parse(localStorage.getItem(storageKey) || '[]');
        
        visitedContainer.innerHTML = '';
        
        if (visits.length === 0) {
            visitedContainer.innerHTML = '<p>No laptops viewed yet</p>';
            return;
        }
        
        visits.forEach(visit => {
            const visitElement = document.createElement('div');
            visitElement.className = 'visited-laptop-item';
            visitElement.innerHTML = `
                <img src="${visit.image}" alt="${visit.name}" style="width: 100px; height: 100px; object-fit: cover; margin-right: 1rem;">
                <div>
                    <h4>${visit.name}</h4>
                    <p>Price: ${visit.price}</p>
                    <p>Viewed: ${new Date(visit.timestamp).toLocaleString()}</p>
                    <a href="${visit.url}" class="btn">View Again</a>
                </div>
            `;
            visitedContainer.appendChild(visitElement);
        });
    }

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = './login/login.html';
    }

    // Example of how to call the tracking function when viewing a laptop
    function viewLaptopDetails(laptop) {
        trackLaptopVisit({
            title: laptop.querySelector('h3').textContent,
            price: laptop.querySelector('.price').textContent,
            url: laptop.querySelector('a').getAttribute('href')
        });
    }

    // Add click handlers to laptop items
    document.querySelectorAll('.laptop-item').forEach(laptop => {
        laptop.addEventListener('click', () => viewLaptopDetails(laptop));
    });