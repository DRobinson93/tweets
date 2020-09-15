import React from 'react';
import Comments from '../components/Comments';
import {postData, commentData} from './common/mockData.js';
import {expect} from "@jest/globals";
import { unmountComponentAtNode , render} from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import axios from "axios";
import {waitFor} from "@testing-library/dom";
import {queryDocumentByTestId, getCommentsTestIds} from './../common'
import {newCommentData, newPostData} from "./common/mockData";
import {clickBtn} from "../common";

let container = null;
const postId = 1; //this can be any post id, just for testing
beforeEach(async ()  => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
   //this calls an get call to get the coments, mock the response
    await axios.get.mockResolvedValueOnce({
        data: commentData
    });
    act(() => {
        render(<Comments postId={postId} setParentNumberOfComments={function(){}} />, container);
    });
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('can add comment', async () => {
    const testIds = getCommentsTestIds(postId);
    const btn = queryDocumentByTestId(container, testIds.btn);
    const textarea = queryDocumentByTestId(container, testIds.input);
    //set val of text area and then similate change and (mock response then) click submit
    textarea.value = newCommentData.value;
    ReactTestUtils.Simulate.change(textarea);
    //mock success response then click submit
    await axios.post.mockResolvedValueOnce({
        data: newCommentData
    });
    clickBtn(btn);
    //comments input value should clear out and the new comment should be in dom
    await waitFor(() => {
        expect(textarea.textContent).not.toContain(newCommentData.value);//value cleared
        expect(container.textContent).toContain(newCommentData.value)//container contins new commnent
    });
});
