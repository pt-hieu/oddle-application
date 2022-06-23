import { AnimatePresence } from 'framer-motion';

import { userUserData } from '@/hooks/useUserData';

export default function Summary() {
  const userData = userUserData();
  const { avatar_url, login, name, company } = userData.user || {};

  return (
    <div className="flex flex-col items-center p-4">
      <AnimatePresence>
        <img
          src={avatar_url}
          alt={`${login}'s avatar`}
          className="w-[160px] aspect-square rounded-full"
        />
      </AnimatePresence>

      <div className="!font-arsenal font-bold text-[26px] leading-[36px]">
        {name}
      </div>

      <div className="!font-arsenal text-[24px] leading-[32px]">{login}</div>

      <div className="flex gap-2 items-center !font-jost">
        <span className="fa fa-building text-black/[.54] dark:text-gray-600"></span>
        {company || 'N_A'}
      </div>
    </div>
  );
}
