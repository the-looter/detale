function trackPageView(productName) {
    let pageViews = JSON.parse(localStorage.getItem('pageViews') || '{}');
    
    if (!pageViews[productName]) {
        pageViews[productName] = {
            views: 0,
            lastViewed: null
        };
    }
    
    pageViews[productName].views++;
    pageViews[productName].lastViewed = new Date().toISOString();
    
    localStorage.setItem('pageViews', JSON.stringify(pageViews));
}