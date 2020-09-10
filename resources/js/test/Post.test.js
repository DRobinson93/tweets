import React from 'react';
import Post from '../components/Post';
import {postData, commentData} from './common/mockData.js';
import {expect} from "@jest/globals";
import { unmountComponentAtNode , render} from "react-dom";
import { act } from "react-dom/test-utils";
import axios from "axios";
import {waitFor} from "@testing-library/dom";

let container = null;
let commentBtn = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
        render(<Post {...postData} />, container);
    });
    commentBtn = getSocialBtnByTestId(container, postData.id);
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
    const numOfCommentsInDom = parseInt(commentBtn.querySelector('[data-testclass="text"]').innerHTML);
    expect(numOfCommentsInDom).toBe(postData.comments_count);
});

test('comments show only after click', async () => {
    //make sure comment does not show on load
    const firstComment = commentData[0].value;
    expect(container.textContent).not.toContain(firstComment)

    //clicking comments calls a post call so fake the return data:
    await axios.get.mockResolvedValueOnce({
        data: commentData
    });

    act(() => {
        commentBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    await waitFor(() =>
        expect(container.textContent).toContain(firstComment)
    )

});

function getSocialBtnByTestId(dom, id){
    return document.querySelector("[data-testid=post"+id+"commentbtn]");
}
