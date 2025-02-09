interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

let toastContainer: HTMLDivElement | null = null;

function createToastContainer() {
  if (toastContainer) return toastContainer;
  
  toastContainer = document.createElement('div');
  toastContainer.className = 'fixed bottom-4 right-4 flex flex-col gap-2 z-50';
  document.body.appendChild(toastContainer);
  return toastContainer;
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    const container = createToastContainer();
    const toastElement = document.createElement('div');
    
    toastElement.className = `p-4 rounded border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-['Press_Start_2P'] text-xs
      ${options.variant === 'destructive' 
        ? 'bg-red-500 text-white' 
        : 'bg-white dark:bg-gray-800 text-black dark:text-white'}
      transform transition-all duration-300 ease-in-out`;
    
    const titleElement = document.createElement('div');
    titleElement.className = 'font-bold mb-1';
    titleElement.textContent = options.title;
    toastElement.appendChild(titleElement);
    
    if (options.description) {
      const descElement = document.createElement('div');
      descElement.className = 'opacity-90';
      descElement.textContent = options.description;
      toastElement.appendChild(descElement);
    }
    
    container.appendChild(toastElement);
    
    // Trigger enter animation
    requestAnimationFrame(() => {
      toastElement.style.transform = 'translateX(0)';
    });
    
    setTimeout(() => {
      toastElement.style.opacity = '0';
      toastElement.style.transform = 'translateX(100%)';
      
      setTimeout(() => {
        if (container.contains(toastElement)) {
          container.removeChild(toastElement);
        }
        
        // Remove container if empty
        if (container.childNodes.length === 0) {
          document.body.removeChild(container);
          toastContainer = null;
        }
      }, 300);
    }, 3000);
  };

  return { toast };
}