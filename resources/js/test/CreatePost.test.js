import React from 'react';
import CreatePost from '../components/CreatePost';
import renderer from 'react-test-renderer';

test('Empty tweet gives an alert error', () => {
    const component = renderer.create(
        <CreatePost />,
    );
    // let tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
    //
    // // manually click submit btn
    // component.root.findByType('button').props.onClick();
    // // re-rendering
    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
});
