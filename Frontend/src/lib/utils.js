
 export const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',  // "2025"
      month: 'long',    // "February"
      day: 'numeric',   // "22"
    
    });
  };
  
  