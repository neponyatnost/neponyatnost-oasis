import isPropValid from '@emotion/is-prop-valid'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { StyleSheetManager } from 'styled-components'
import App from './App'
import './index.css'
import ErrorFallback from './ui/ErrorFallback'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ErrorBoundary>
    </StyleSheetManager>
  </React.StrictMode>
)
