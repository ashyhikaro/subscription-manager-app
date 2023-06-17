import React, { useState } from 'react';
import './styles/app.scss'
import { MainPanel } from './components/subscriptionsContainerComponents/MainPanel';
import { SidePanel } from './components/sidepanelComponents/SidePanel';

const App: React.FC = () => {
  const [sum, setSum] = useState<number>(localStorage.getItem('sumOfSubs') ? Number(localStorage.getItem('sumOfSubs')) : 0.00)
  
  return (
    <div className='app-window'>
      <MainPanel setSum={setSum} sum={sum}/>
      <SidePanel sum={sum} />
    </div>
  );
}

export default App;