import './App.css'
import * as React from 'react'
import { Provider as StyletronProvider } from 'styletron-react'
import { LightTheme, BaseProvider } from 'baseui'
import { Client as Styletron } from 'styletron-engine-atomic'
import { UserApp } from './UserApp'

const engine = new Styletron()

function App (): JSX.Element {
  return (
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <UserApp />
    </BaseProvider>
  </StyletronProvider>
  )
}

export default App
