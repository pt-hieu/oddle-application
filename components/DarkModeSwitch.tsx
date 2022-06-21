import { useEffect, useState } from 'react';
import Switch from 'react-switch';

function getRoot() {
  return document.getElementsByTagName('html')[0];
}

function isDarkModeEnabled() {
  const root = getRoot();
  return root.classList.contains('dark');
}

function isDarkModeDisabled() {
  return !isDarkModeEnabled();
}

function turnOnDarkMode() {
  if (isDarkModeEnabled()) return;
  getRoot().classList.add('dark');
}

function turnOffDarkMode() {
  if (isDarkModeDisabled()) return;
  getRoot().classList.remove('dark');
}

export default function DarkModeSwitch() {
  const [flag, setFlag] = useState(isDarkModeEnabled());

  useEffect(() => {
    if (flag) {
      turnOnDarkMode();
      localStorage.setItem('dark-mode', 'on');
    }

    if (!flag) {
      turnOffDarkMode();
      localStorage.removeItem('dark-mode');
    }
  }, [flag]);

  return <Switch checked={flag} onChange={setFlag} />;
}
