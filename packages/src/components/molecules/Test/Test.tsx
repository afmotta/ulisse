import React from 'react'
import styled, { StyledComponent } from 'styled-components'

type Props = {
    props?: React.Props<any>
  }

const Wrapper: StyledComponent<'div', {}> = styled.div``

export const Test: React.FC<Props> = ({ ...props }) => (
    <Wrapper {...props}/>
)
