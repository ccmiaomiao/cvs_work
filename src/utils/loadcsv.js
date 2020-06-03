function loadcsv(filepath) {
    const a = document.createElement('a');
    a.href = './a';
    const host = a.href.replace('/a', '');

    const path = host + '/frontend-1/' + filepath + '.csv';

    const worker = new Worker(host + '/workers/loadcsv.worker.js');

    return new Promise((resolve, reject) => {
        let postcount = 1;
        worker.onmessage = function(event) {
            if (event.data[0] === 'loadcsv_success') {
                worker.terminate();
                resolve(event.data[1]);
            } else if (event.data[0] === 'loadcsv_error') {
                if (postcount < 4) {
                    // 3次重试 ++
                    postcount++;
                    worker.postMessage(['loadcsv', path]);
                    // TODO: 弹出加载失败重连的信息
                } else {
                    reject('加载失败啦~', event.data);
                    worker.terminate();
                    // TODO: 弹出加载数据失败的信息
                }
            }
        };
        worker.postMessage(['loadcsv', path]);
    });
}

function importcsv(file) {
    const a = document.createElement('a');
    a.href = './a';
    const host = a.href.replace('/a', '');

    const worker = new Worker(host + '/workers/importcsv.worker.js');

    return new Promise((resolve, reject) => {
        worker.onmessage = function(event) {
            if (event.data[0] === 'importcsv_success') {
                worker.terminate();
                resolve(event.data[1]);
            } else if (event.data[0] === 'importcsv_error') {
                reject('加载失败啦~', event.data);
                worker.terminate();
                // TODO: 弹出加载数据失败的信息
            }
        };
        worker.postMessage(['importcsv', file]);
    });
}

export { loadcsv, importcsv };
