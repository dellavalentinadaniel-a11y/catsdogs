
import ReactGA from 'react-ga4';

// Initialize GA4
export const initGA = (measurementId) => {
  try {
    const id = measurementId || 'G-RLK0GRSJEN';
    ReactGA.initialize(id);
    
    // Log initialization in development
    if (import.meta.env.DEV) {
      console.log(`GA4 Initialized with ID: ${id}`);
    }
  } catch (error) {
    console.error('GA4 Initialization Error:', error);
  }
};

// Track Page View
export const trackPageView = (path) => {
  try {
    ReactGA.send({ hitType: "pageview", page: path });
  } catch (error) {
    console.warn('GA4 PageView Error:', error);
  }
};

// Custom Events
export const trackAffiliateClick = (productName) => {
  ReactGA.event({
    category: "Affiliate",
    action: "Click",
    label: productName,
  });
};

export const trackSearch = (query) => {
  ReactGA.event({
    category: "Search",
    action: "Global Search",
    label: query,
  });
};

export const trackGuideDownload = (guideName) => {
  ReactGA.event({
    category: "Resource",
    action: "Download Guide",
    label: guideName,
  });
};

export const trackNewsletterSubscription = () => {
  ReactGA.event({
    category: "Engagement",
    action: "Subscribe Newsletter",
  });
};

export const trackBlogClick = (articleTitle) => {
  ReactGA.event({
    category: "Content",
    action: "Read Article",
    label: articleTitle,
  });
};

export const trackToolUsage = (toolName) => {
  ReactGA.event({
    category: "Tool",
    action: "Use Tool",
    label: toolName,
  });
};

export const trackQuizCompletion = (score) => {
  ReactGA.event({
    category: "Tool",
    action: "Complete Quiz",
    label: `Score: ${score}`,
  });
};

export const trackCalculatorUsage = (petType) => {
  ReactGA.event({
    category: "Tool",
    action: "Calculate Calories",
    label: petType,
  });
};
