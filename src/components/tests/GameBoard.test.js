import { iteratee } from 'lodash';
import React from 'react';
import { mount } from '../../enzyme';

import GameBoard from '../GameBoard';

describe('Game Board Suit', () => {
    const mountComponent = (props) =>
        mount(<GameBoard />)
    
    describe('Basic mounting', () => {
        it('should mount component', () => {
            const wrapper = mountComponent();

            expect(wrapper.find('.MuiButtonBase-root').exists()).toBe(true);
        })
    })
})
