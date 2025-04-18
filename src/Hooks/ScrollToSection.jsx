import { useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

const ScrollToSection = ({ section }) => {
  const { aboutref, providerref } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const refMap = {
      about: aboutref,
      provider: providerref,
    };

    const targetRef = refMap[section];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    // Navigate back to the Home route to actually render the content
    navigate('/', { replace: true });
  }, [section, aboutref, providerref, navigate]);

  return null;
};

export default ScrollToSection;
