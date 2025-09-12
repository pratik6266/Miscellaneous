import './App.css'
import PopOver from './PopOver'

const App = () => {
  return (
    <div className='app'>
      <PopOver>
        <PopOver.Power label="Click Me..."></PopOver.Power>  
        <PopOver.Context content='This is a context'/>
      </PopOver>
      <p>Another component</p>
      <button popoverTarget='my-popover'>show popover</button>
      <div id='my-popover' popover='auto'>
        <h1 >This is a popover</h1>
        <button popoverTargetAction='hide'>close popover</button>
      </div>
    </div>
  )
}

export default App