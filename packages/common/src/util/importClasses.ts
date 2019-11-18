import * as path from 'path';

/**
 * 加载需要被Inject的Controller类
 * Loads all exported classes from the given directory.
 */
export function importClassesFromDirectories(directories: string[], formats = ['.js', '.ts']): Function[] {

    const loadFileClasses = function (exported: any, allLoaded: Function[]) {
        if (exported instanceof Function) {
            allLoaded.push(exported);
        } else if (exported instanceof Array) {
            exported.forEach((i: any) => loadFileClasses(i, allLoaded));
        } else if (exported instanceof Object || typeof exported === 'object') {
            Object.keys(exported).forEach(key => loadFileClasses(exported[key], allLoaded));
        }

        return allLoaded;
    };

    const allFiles = directories.reduce((allDirs, dir) => {
        //glob 通配符匹配文件名包
        return allDirs.concat(require('glob').sync(path.normalize(dir)));
    }, [] as string[]);

    const dirs = allFiles
        .filter(file => {
            const dtsExtension = file.substring(file.length - 5, file.length);
            return formats.indexOf(path.extname(file)) !== -1 && dtsExtension !== '.d.ts';
        })
        .map(file => {
            return require(file);
        });

    return loadFileClasses(dirs, []);
}

// const arr=(importClassesFromDirectories([__dirname+'/test/*.ts']));
// console.log(arr);
// const a=require('glob').sync(path.normalize(__dirname+'/test/*.ts'));
// console.log(a)
//"/Users/wdf/Program/javascript/2019-work/zhili-app/packages/server/src/util/test/a.ts"