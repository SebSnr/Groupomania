import React from 'react'
import {render, cleanup} from '@testing-library/react'
import 'jest-canvas-mock';
import App from './App'

 afterEach(cleanup)

 it('should take a snapshot', () => {
    const { asFragment } = render(<App />)

    expect(asFragment(<App />)).toMatchSnapshot()
   }) 