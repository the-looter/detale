function trackPageView() {
    const currentPage = window.location.pathname;
    const timestamp = new Date().toISOString();
    const visits = JSON.parse(localStorage.getItem('websiteVisits') || '[]');
    
    visits.push({
        page: currentPage,
        date: timestamp,
        user: localStorage.getItem('currentUser') || 'Guest'
    });
    
    localStorage.setItem('websiteVisits', JSON.stringify(visits));
}

// Track page load
document.addEventListener('DOMContentLoaded', trackPageView);