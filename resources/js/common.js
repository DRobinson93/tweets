import {act} from "react-dom/test-utils";

export const messages = {
    newTweetForm : {blank: 'Tweet can not be blank', success:'Tweet added'}
};

export function getSocialBtnTestId(id, type){
    return "post"+id+type+"btn"; //example post1commentbtn
}

export function queryDocumentByTestId(dom, testId){
    return dom.querySelector("[data-testid="+testId+"]");
}

export function getSocialBtnByTestId(dom, id, type){
    const testId = getSocialBtnTestId(id, type);
    return queryDocumentByTestId(dom, testId);
}

function queryByTestClass(element, testClassName){
    return element.querySelector('[data-testclass="'+testClassName+'"]');
}

//use this to get num of reposts and likes
export function getSocialBtnParseInt(socialBtn){
    return parseInt(queryByTestClass(socialBtn, 'text').innerHTML);
}

export function getCommentsTestIds(postId){
    const start = 'post'+postId+'Comment';
    return {
        input: start+'Input',
        btn: start+'Btn',
    }
}

export function clickBtn(btn){
    act(() => {
        btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
}

export function addToPostArr(post){
    const posts = [post, ...this.state.posts];
    this.setState({posts: posts});
}
