import { useImperativeHandle, useRef, forwardRef } from 'react';

type InputHandle = {
  hocus: () => void;
  chchs: () => number;
};

const FancyInput = forwardRef<InputHandle>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    hocus() {
      inputRef.current?.focus();
    },
    chchs: () => 10
  }));

  return <input ref={inputRef} />;
});

// Parent using it
function Imps() {
  const inputRef = useRef<InputHandle>(null);
  const jsjs = inputRef.current?.chchs()

  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current?.hocus()}>Focus input {jsjs}</button>
    </>
  );
}

const PlayGround = () => {


  return <div>
    <Imps/>
  </div>
}

export default PlayGround