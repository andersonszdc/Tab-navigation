import React, {
  createRef,
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import "./App.css";

const items = [
  { index: 1, text: "A" },
  { index: 2, text: "B" },
  { index: 3, text: "C" },
];

function App() {
  const [activeTab, setActiveTab] = useState(items[0].index);
  const tabRefs = items.reduce((acc: any, item) => {
    acc[item.index] = createRef();
    return acc;
  }, {});

  return (
    <div className="App">
      <div className="tabs">
        {items.map((item, index) => (
          <Tab
            key={index}
            ref={tabRefs[item.index]}
            index={item.index}
            text={item.text}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
      <Underline activeTab={activeTab} refs={tabRefs} />
    </div>
  );
}

export default App;

const Tab = forwardRef(
  ({ text, index, activeTab, setActiveTab }: any, ref: Ref<HTMLDivElement>) => {
    const [classname, setClassname] = useState("tab");

    useEffect(() => {
      if (activeTab === index) {
        setClassname("tab active");
      } else {
        setClassname("tab");
      }
    }, [activeTab, index]);

    const handleClick = () => {
      setActiveTab(index);
    };

    return (
      <div ref={ref} onClick={handleClick} className={classname}>
        {text}
      </div>
    );
  }
);

const Underline = ({ activeTab, refs }: any) => {
  const [x, setAttributes] = useState(0);

  const updateAttributes = useCallback(() => {
    console.log(refs[activeTab]);
    if (refs[activeTab]) {
      setAttributes(refs[activeTab].current?.clientWidth);
    }
  }, [activeTab, refs]);

  useEffect(() => {
    updateAttributes();
  }, [refs, activeTab, updateAttributes]);

  useEffect(() => {
    console.log(refs);
  }, [refs]);

  return (
    <span className="underline">
      <motion.span
        animate={{ left: (activeTab - 1) * x }}
        transition={{duration: 0.5}}
        className="pointer"
      />
    </span>
  );
};
