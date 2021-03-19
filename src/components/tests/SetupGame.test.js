import { iteratee } from 'lodash';
import React from 'react';
import { mount } from '../../enzyme';

import SetupGame from '../SetupGame';

describe('Game Board Suit', () => {
    const mountComponent = (props) =>
        mount(<SetupGame />)
    
    describe('Basic mounting', () => {
        it('board should mount', () => {
            const wrapper = mountComponent();

            expect(wrapper.find('.board').exists()).toBe(true);
        });
        it('by me button should mount', () => {
            const wrapper = mountComponent();

            expect(wrapper.find('.set_by_me_button').exists()).toBe(true);
        });
        it('random button should mount', () => {
            const wrapper = mountComponent();

            expect(wrapper.find('.random_button').exists()).toBe(true);
        });
        it('difficulty button should mount', () => {
            const wrapper = mountComponent();

            expect(wrapper.find('.label-section').exists()).toBe(true);
        });
    })
})
