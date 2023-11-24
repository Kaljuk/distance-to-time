import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Screens from './screens'

createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <Screens />
    </StrictMode>,
  )
