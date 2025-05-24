import { useEffect, useState } from 'react';

const useNearBottom = (threshold = 50) => {
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const checkNearBottom = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const nearBottom = pageHeight - scrollPosition <= threshold;

      setIsNearBottom(nearBottom);
    };

    window.addEventListener('scroll', checkNearBottom);
    window.addEventListener('resize', checkNearBottom); // Recalculate on resize too
    checkNearBottom(); // initial check

    return () => {
      window.removeEventListener('scroll', checkNearBottom);
      window.removeEventListener('resize', checkNearBottom);
    };
  }, [threshold]);

  return isNearBottom;
}

export default useNearBottom;


