import React, {useEffect, useState} from 'react';
import './styles/media-req.scss'
import './styles/app.scss'
import { MainPanel } from './components/subscriptionsContainerComponents/MainPanel';
import { SidePanel } from './components/sidepanelComponents/SidePanel';

function App() {
  const [sum, setSum] = useState(localStorage.getItem('sumOfSubs') ? localStorage.getItem('sumOfSubs') : 0)

  useEffect(() => {
    let pricesArr = document.querySelectorAll('.sub-price')
    let sumOfPrices = 0
    pricesArr.forEach(item => {
      sumOfPrices += parseFloat((item.innerText.split(' ')[1]))
    })
    setSum(sumOfPrices.toFixed(2))
  })

  useEffect(() => {localStorage.setItem('sumOfSubs', sum)}, [sum])

  return (
    <div className='app-window' style={{}}>
      <MainPanel />
      <SidePanel sum={sum} />
    </div>
  );
}

export default App;