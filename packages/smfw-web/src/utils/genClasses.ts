import _ from 'lodash';

function genClasses(classes: any, prefixArr: string[], sp = ':') {
    const newClasses: any = {};
    _.forEach(prefixArr, (prefix: string) => {
        _.forEach(_.keys(classes), (key: string) => {
            if (key !== prefix && key.split(sp)[0] === prefix) {
                if (typeof newClasses[prefix] === 'undefined') {
                    newClasses[prefix] = {};
                }
                newClasses[prefix][key.split(sp)[1]] = classes[key];
            }
        });
    });
    return newClasses;
}

export default genClasses;
