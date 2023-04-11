import React, {useEffect, useState} from 'react';
import './styles/app.scss'
import { MainPanel } from './components/subscriptionsContainerComponents/MainPanel';
import { SidePanel } from './components/sidepanelComponents/SidePanel';

function App() {
  const [sum, setSum] = useState(localStorage.getItem('sumOfSubs') ? localStorage.getItem('sumOfSubs') : 0.00)
  
  return (
    <div className='app-window'>
      <MainPanel setSum={setSum} sum={sum}/>
      <SidePanel sum={sum} />
    </div>
  );
}

export default App;
