import { useImperativeHandle, useRef, forwardRef } from 'react';
import { Outlet, useSearchParams } from 'react-router';
type InputHandle = {
  hocus: () => void;
  chchs: () => number;
};

const FancyInput = forwardRef<InputHandle>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams()

  useImperativeHandle(ref, () => ({
    hocus() {
      inputRef.current?.focus();
      const randomNumber = String(parseInt(String(Math.random() * 100)))
      const searchParamssearchParams = JSON.parse(JSON.stringify(searchParams))
      console.log({ searchParamssearchParams })
      setSearchParams({ ...searchParamssearchParams, [randomNumber]: 'true' })
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


const listOfStates = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]

import { useState, useTransition } from "react";

const generateItems = () => Array.from({ length: 50000 }, (_, i) => `Item ${i + 1}`);

function UseTransitionExample() {
  const allItems = generateItems();
  const [input, setInput] = useState("");
  const [filteredItems, setFilteredItems] = useState(allItems);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    startTransition(() => {
    const filtered = allItems.filter(item => item.toLowerCase().includes(value.toLowerCase()));
    setFilteredItems(filtered);
    });
  };

  return (
    <div>
      <input value={input} onChange={handleChange} placeholder="Search…" />
      {isPending && <p>Updating list…</p>}
      <ul>
        {filteredItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}


import  { startTransition } from "react";

const heavyTask = (value) => {
  let result: string[] = [];
  for (let i = 0; i < 50000; i++) {
    if (`Item ${i}`.includes(value)) result.push(`Item ${i}`);
  }
  return result;
};

function StartTransitionExample() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([] as string[]);

  const handleInput = (e) => {
    const val = e.target.value;
    setInput(val);

    startTransition(() => {
    const result = heavyTask(val);
    setItems(result);
    });
  };

  return (
    <div>
      <input value={input} onChange={handleInput} placeholder="Search…" />
      <ul>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

import { useDeferredValue } from "react";

function Results({ filter }) {
  const filtered = generateItems().filter(item => item.includes(filter));
  return (
    <ul>
      {filtered.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function UseDeferredValueExample() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to filter..."
      />
      {query !== deferredQuery && <p>Updating results...</p>}
      <Results filter={deferredQuery} />
    </div>
  );
}



const PlayGround = () => {


  return <div>
    <Imps/>
    <div className='d-flex text-light'>
      <div className='d-inline-block border border-success'>
        Use Transition
        <UseTransitionExample/>
      </div>
      <div className='d-inline-block border  border-success'>
        start Transition
        <StartTransitionExample/>
      </div>
      <div className='d-inline-block border  border-success'>
        Use Deferred
        <UseDeferredValueExample/>
      </div>
    </div>
    <Outlet/>
  </div>
}

export default PlayGround