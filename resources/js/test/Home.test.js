import React from 'react';
import Home from '../components/Home';
import { render, queryByTestId, getByText } from "@testing-library/react";
import axios from 'axios';
import {postsData, postData, secondPostData} from './common/mockData.js';
import {waitFor} from '@testing-library/dom'
import {expect} from "@jest/globals";
import {testIds} from "./common/testHelpers";
import ReactTestUtils from 'react-dom/test-utils';
import {messages} from "../common";

let globalContainer = null;
beforeEach(async () => {
    await axios.get.mockResolvedValueOnce({
        data: postsData
    });
    const {container} = render(<Home />);
    globalContainer = container;
});

afterEach(() => {
    // cleanup on exiting
    globalContainer = null;
});

test('posts load', async () => {
    //wait for the fake post data to return
    const firstTestId = "post"+postData['id'];
    await waitFor(() =>
        expect(queryByTestId(globalContainer, firstTestId)).toBeTruthy()
    )

    //check by id for each post to exist on the page
    postsData.forEach(postData => {
        let testId = 'post'+postData['id'];
        expect(queryByTestId(globalContainer, testId)).toBeTruthy()
    });

});

function getAddTweetAlertDiv(){
    return queryByTestId(globalContainer, testIds.tweetFormError);
}

test('function to add to post arr from child CreatePost component works', async () => {
    const textarea = queryByTestId(globalContainer, testIds.addNewTweet.input);
    const submitBtn = queryByTestId(globalContainer, testIds.addNewTweet.btn);

    //first make sure error does not show on load
    expect(getAddTweetAlertDiv()).toBeNull();
    submitBtn.click();

    //then click btn to submit.. error should show
    await waitFor(() => {
            expect(getAddTweetAlertDiv()).toBeTruthy();
            expect(getAddTweetAlertDiv().innerHTML).toBe(messages.newTweetForm.blank);
        }
    );

    //set value of input and submit form
    textarea.value = secondPostData.value;
    ReactTestUtils.Simulate.change(textarea);
    //clicking submit calls a post call so fake the return data
    await axios.post.mockResolvedValueOnce({
        data: secondPostData
    });
    submitBtn.click();
    await waitFor(() => {
        expect(getByText(globalContainer, secondPostData.value)).toBeTruthy();
        //now make sure the error is gone, and success shows
        expect(getAddTweetAlertDiv().innerHTML).toBe(messages.newTweetForm.success);
        }
    )
});
