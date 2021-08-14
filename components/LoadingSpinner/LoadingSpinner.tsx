import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { loadingCircleStagger, loadingCircleTransition, loadingStagger } from '../../lib/animation'

const LoadingSpinner = () => {
  return (
    <Overlay>
      <Wrapper initial='initial' animate='animate' variants={loadingStagger}>
        <Loading>Loading</Loading>
        <Circle variants={loadingCircleStagger} transition={loadingCircleTransition} />
        <Circle variants={loadingCircleStagger} transition={loadingCircleTransition} />
        <Circle variants={loadingCircleStagger} transition={loadingCircleTransition} />
      </Wrapper>
    </Overlay>
  )
}

const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsl(0deg 0% 0% / 0.8);
  color: var(--color-white);
  font-size: calc(24rem / 16);
  font-weight: var(--font-weight-bold);
  letter-spacing: 1px;
`

const Wrapper = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  gap: 2px;
`

const Loading = styled(motion.p)`
  font-style: italic;
  line-height: 1;
`

const Circle = styled(motion.span)`
  width: calc(4rem / 16);
  height: calc(4rem / 16);
  background: var(--color-white);
  border-radius: 50%;
`

export default LoadingSpinner
