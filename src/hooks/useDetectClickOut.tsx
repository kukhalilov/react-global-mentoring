import React, { useEffect, useRef, useState } from 'react';

const useDetectClickOut = (initState: boolean) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(initState);
  const handleClickOutside = (event: unknown) => {
    if (
      triggerRef.current &&
      triggerRef.current.contains(
        (event as React.MouseEvent).target as HTMLDivElement,
      )
    ) {
      return setShow(!show);
    }
    if (
      nodeRef.current &&
      !nodeRef.current.contains(
        (event as React.MouseEvent).target as HTMLDivElement,
      )
    ) {
      return setShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
  return {
    triggerRef,
    nodeRef,
    show,
    setShow,
  };
};

export default useDetectClickOut;
