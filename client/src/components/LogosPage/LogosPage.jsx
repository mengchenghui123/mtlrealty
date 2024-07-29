import { useState } from 'react';
import { Tabs } from '@mantine/core';
import './LogosPage.css'
const LogosPage = ({ title, imgURL, tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs ? tabs[0].key : '');

  return (
    <div className="logos-page-container">
      <h1 className='logos-title'>{title}</h1>
      {tabs && tabs.length > 1 ? (
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Tab key={tab.key} value={tab.key}>
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Panel key={tab.key} value={tab.key}>
              <div className="logos-image-container">
                <img src={tab.imgURL} alt={tab.label} />
              </div>
            </Tabs.Panel>
          ))}
        </Tabs>
      ) : (
        <div className="logos-image-container">
          <img src={imgURL} alt={title} />
        </div>
      )}
      <div className='break-line' />
    </div>

  );
};

export default LogosPage;