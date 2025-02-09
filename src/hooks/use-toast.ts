interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    const toastElement = document.createElement('div');
    toastElement.className = `fixed bottom-4 right-4 p-4 rounded border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono text-sm
      ${options.variant === 'destructive' 
        ? 'bg-red-500 text-white' 
        : 'bg-white dark:bg-gray-800 text-black dark:text-white'}`;
    
    const titleElement = document.createElement('div');
    titleElement.className = 'font-bold mb-1';
    titleElement.textContent = options.title;
    
    toastElement.appendChild(titleElement);
    
    if (options.description) {
      const descElement = document.createElement('div');
      descElement.className = 'text-sm opacity-90';
      descElement.textContent = options.description;
      toastElement.appendChild(descElement);
    }
    
    document.body.appendChild(toastElement);
    
    setTimeout(() => {
      toastElement.style.opacity = '0';
      toastElement.style.transform = 'translateX(100%)';
      toastElement.style.transition = 'all 0.3s ease-out';
      
      setTimeout(() => {
        document.body.removeChild(toastElement);
      }, 300);
    }, 3000);
  };

  return { toast };
}