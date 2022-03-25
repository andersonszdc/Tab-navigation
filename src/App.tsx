import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="App">
      <div className="wrapper">
        <Tab
          index={1}
          text="A"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tab
          index={2}
          text="B"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <Tab
          index={3}
          text="C"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <span className="slider">
          <span className="pointer" data-tab={activeTab} />
        </span>
      </div>
    </div>
  );
}

export default App;

const Tab = ({ text, index, activeTab, setActiveTab }: any) => {
  const [classname, setClassname] = useState("");
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
    <div onClick={handleClick} className={classname}>
      {text}
    </div>
  );
};
