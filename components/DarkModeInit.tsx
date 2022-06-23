import { useEffect } from 'react';

export default function DarkModeInit() {
  useEffect(() => {
    const root = document.getElementsByTagName('html')[0];
    const flag = localStorage?.getItem('dark-mode');

    if (!!flag) {
      root.classList.add('dark');
      return;
    }

    root.classList.remove('dark');
  }, []);

  return null;
}
