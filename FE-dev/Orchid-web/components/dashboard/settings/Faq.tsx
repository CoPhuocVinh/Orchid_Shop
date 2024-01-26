"use client";
import { useState } from "react";
import ProtoTypes from "prop-types";
import FaqTab from "./FaqTab";

function Faq({ name, activeTab }: any) {
  const [activeFaq, setActiveFaq] = useState([1]);
  const handleActiveFaq = (id: any) => {
    if (activeFaq?.find((item) => item === id)) {
      setActiveFaq(activeFaq.filter((item) => item !== id));
    } else {
      setActiveFaq([...activeFaq, id]);
    }
  };
  return (
    <div id="tab5" className={`tab-pane ${name === activeTab && "active"}`}>
      <div>
        <h3 className="text-2xl font-bold text-bgray-900 dark:text-white">
          FAQ
        </h3>
        <div>
          <FaqTab
            title="What is the most important part of a dashboard?"
            desc="In reality, the most important aspect of a great dashboard
                    is the part that gets the least amount of attention: The
                    underlying data. More than any other aspect, the data will
                    make or break a dashboard.Within this definition, successful
                    administration appears to rest on three basic skills, which
                    we will call technical, human, and conceptual.Dashboards are
                    business intelligence."
            id={1}
            activeId={activeFaq}
            handleActive={handleActiveFaq}
          />
          <FaqTab
            title="What are the three types of dashboard?"
            desc="In reality, the most important aspect of a great dashboard
                    is the part that gets the least amount of attention: The
                    underlying data. More than any other aspect, the data will
                    make or break a dashboard.Within this definition, successful
                    administration appears to rest on three basic skills, which
                    we will call technical, human, and conceptual.Dashboards are
                    business intelligence."
            id={2}
            activeId={activeFaq}
            handleActive={handleActiveFaq}
          />
          <FaqTab
            title="What are examples of admin?"
            desc="In reality, the most important aspect of a great dashboard
                  is the part that gets the least amount of attention: The
                  underlying data. More than any other aspect, the data will
                  make or break a dashboard.Within this definition, successful
                  administration appears to rest on three basic skills, which
                  we will call technical, human, and conceptual.Dashboards are
                  business intelligence."
            id={3}
            activeId={activeFaq}
            handleActive={handleActiveFaq}
          />
          <FaqTab
            title="What are 5 benefits of dashboards?"
            desc="In reality, the most important aspect of a great dashboard
                is the part that gets the least amount of attention: The
                underlying data. More than any other aspect, the data will
                make or break a dashboard.Within this definition, successful
                administration appears to rest on three basic skills, which
                we will call technical, human, and conceptual.Dashboards are
                business intelligence."
            id={4}
            activeId={activeFaq}
            handleActive={handleActiveFaq}
          />
          <FaqTab
            title="What makes a good dashboard?"
            desc="In reality, the most important aspect of a great dashboard
              is the part that gets the least amount of attention: The
              underlying data. More than any other aspect, the data will
              make or break a dashboard.Within this definition, successful
              administration appears to rest on three basic skills, which
              we will call technical, human, and conceptual.Dashboards are
              business intelligence."
            id={5}
            activeId={activeFaq}
            handleActive={handleActiveFaq}
          />
          <FaqTab
            title="What are the 3 basic skills of administrator?"
            desc="In reality, the most important aspect of a great dashboard
            is the part that gets the least amount of attention: The
            underlying data. More than any other aspect, the data will
            make or break a dashboard.Within this definition, successful
            administration appears to rest on three basic skills, which
            we will call technical, human, and conceptual.Dashboards are
            business intelligence."
            id={6}
            activeId={activeFaq}
            handleActive={handleActiveFaq}
          />
        </div>
      </div>
    </div>
  );
}
Faq.propTypes = {
  name: ProtoTypes.string,
  activeTab: ProtoTypes.string,
};
export default Faq;
