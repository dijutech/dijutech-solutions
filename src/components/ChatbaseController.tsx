import React, { useEffect } from 'react';

interface ChatbaseControllerProps {
  isAdminRoute: boolean;
}

export const ChatbaseController: React.FC<ChatbaseControllerProps> = ({ isAdminRoute }) => {
  useEffect(() => {
    // Function to hide/show chatbase widget
    const toggleChatbase = (show: boolean) => {
      // Wait for chatbase to load
      const checkChatbase = () => {
        const chatbaseWidget = document.querySelector('[data-chatbase-widget]') || 
                             document.querySelector('.chatbase-widget') ||
                             document.querySelector('#chatbase-bubble') ||
                             document.querySelector('iframe[src*="chatbase"]');
        
        if (chatbaseWidget) {
          (chatbaseWidget as HTMLElement).style.display = show ? 'block' : 'none';
        } else {
          // If widget not found, try again after a short delay
          setTimeout(checkChatbase, 500);
        }
      };

      // Initial check
      checkChatbase();
      
      // Also check after a delay to ensure widget is loaded
      setTimeout(checkChatbase, 2000);
    };

    // Hide chatbot on admin routes, show on public routes
    toggleChatbase(!isAdminRoute);

    // Cleanup function
    return () => {
      // Optionally restore chatbot visibility when component unmounts
      if (!isAdminRoute) {
        toggleChatbase(true);
      }
    };
  }, [isAdminRoute]);

  // This component doesn't render anything visible
  return null;
};