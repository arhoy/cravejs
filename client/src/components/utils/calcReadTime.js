import _ from 'lodash';

const calcReadTime = (contentArr) => {
    let readTime;
    let accumulator=0;
    const newContentArr = contentArr.filter(element => element.nodeType === 'paragraph');
    for(let i = 0; i < newContentArr.length; i++ ){
        for(let j = 0; j < newContentArr[i].content.length; j++ ){
            const content = newContentArr[i].content[j].value;
            if(content){
                accumulator+=content.length;
            }
        }
    }
    readTime = Math.round(accumulator/1000,2);
    return readTime;
}

export default calcReadTime;