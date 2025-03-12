import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import { useSelector } from 'react-redux';

const useGaTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  const { authUser } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize('G-CDVDM4GZME', { debug: false });
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized && authUser) {
      ReactGA.set({ userId: authUser.uid });
    }
  }, [initialized, authUser]);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
};

export default useGaTracker;
