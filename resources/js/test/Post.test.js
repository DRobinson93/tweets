import React from 'react';
import Post from '../components/Post';
import {postData, commentData} from './common/mockData.js';
import { queryByTestId } from "@testing-library/react";
import {expect} from "@jest/globals";
import { unmountComponentAtNode , render} from "react-dom";
import { act } from "react-dom/test-utils";
import axios from "axios";
import {waitFor} from "@testing-library/dom";
import {getSocialBtnByTestId, getSocialBtnParseInt} from './../common'
import {clickBtn} from "../common";

let container = null;
let commentBtn = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
        render(<Post {...postData} />, container);
    });
    commentBtn = getSocialBtnByTestId(document, postData.id, 'comment');
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('correct data shows on load', () => {
    //check for post value in dom
    expect(container.textContent).toContain(postData.value);

    //check the number of comments show correct
    const numOfCommentsInDom = getSocialBtnParseInt(commentBtn);
    expect(numOfCommentsInDom).toBe(postData.comments_count);
});

test('comments show after click, hide on second click', async () => {
    //make sure comment does not show on load
    const firstComment = commentData[0].value;
    expect(container.textContent).not.toContain(firstComment);

    //clicking comments calls a post call so fake the return data:
    await axios.get.mockResolvedValueOnce({
        data: commentData
    });

    clickBtn(commentBtn);

    await waitFor(() =>
        expect(container.textContent).toContain(firstComment)
    )

    //click again to hide div
    clickBtn(commentBtn);

    await waitFor(() =>
        expect(container.textContent).not.toContain(firstComment)
    )

});
