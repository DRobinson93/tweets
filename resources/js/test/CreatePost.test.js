import React from 'react';
import CreatePost from '../components/CreatePost';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react'

test('Empty tweet gives an alert error', () => {
    const component = renderer.create(
        <CreatePost />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually click submit btn
    component.root.findByType('button').props.onClick();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

const setup = () => {
    const utils = render(<CreatePost />)
    const input = utils.getByLabelText('New Tweet')
    return {
        input,
        ...utils,
    }
}

test('Input value is not changed', () => {
    const { input } = setup()
    fireEvent.change(input, { target: { value: '23' } });
    expect(input.value).toBe('23')
})
