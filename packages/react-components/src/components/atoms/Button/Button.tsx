import { get } from 'lodash'
import React from 'react'
import styled, { StyledComponent } from 'styled-components'
import { ThemeType } from '../../../themes/themeTypes'

interface Props {
  props?: React.Props<any>
}

const getButtonProp = (path: string) => ({
  theme,
  variant = 'primary',
}: {
  theme: ThemeType
  variant: string
}) => get(theme, `buttons.variants.${variant}.${path}`)

const Wrapper: StyledComponent<'div', { props: Props }> = styled.div`
  border-radius: ${getButtonProp('borderRadius')};
  color: ${getButtonProp('color')};
  background-color: ${getButtonProp('backgroundColor')};
  padding: 4px 16px;
  display: inline-block;
`

export const Button: React.FC<Props> = ({ ...props }) => <Wrapper {...props} />
