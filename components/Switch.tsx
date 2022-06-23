import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

type TProps = {
  initialChecked?: boolean;
  onChange?: (v: boolean) => void | Promise<void>;
};

export default function Switch({
  onChange: emitChange,
  initialChecked,
}: TProps) {
  const [state, setState] = useState(initialChecked || false);

  useEffect(() => {
    emitChange?.(state);
  }, [state]);

  return (
    <>
      <button
        data-tip="Toggle dark mode"
        onClick={() => setState((s) => !s)}
        className={`relative w-[46px] h-[24px] rounded-full p-[2px] ${
          state ? 'bg-primary' : 'bg-gray-400'
        }`}
      >
        <span className="h-5 aspect-square absolute right-[2px] top-1/2 -translate-y-1/2 grid place-content-center">
          <span className="fa fa-sun text-white  text-xs" />
        </span>

        <span className="h-5 aspect-square absolute left-[2px] top-1/2 -translate-y-1/2 grid place-content-center">
          <span className="fa fa-moon text-white  text-xs" />
        </span>

        <motion.span
          key={JSON.stringify(state)}
          className={`inline-block h-5 aspect-square rounded-full bg-white relative ${
            state ? 'float-right' : 'float-left'
          }`}
          transition={{ duration: 0.2 }}
          layoutId="switch-handler"
        />
      </button>

      <ReactTooltip effect="solid"  />
    </>
  );
}
