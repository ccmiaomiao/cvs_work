self.addEventListener(
    'message',
    e => {
        if (e.data[0] === 'loadcsv') {
            const filepath = e.data[1];
        
            fetch(filepath, {
                method: 'get',
                headers: {
                    'Content-Type': 'text/csv'
                }
            })
                .then(res => {
                    res.body.getReader().read().then(({value}) => {
                        const blob = new Blob([value]);
                        const reader = new FileReader();
                        reader.onload = function() {
                            const splitkey = '|$|$|';
                            const rsstr = this.result.replace(/[\n\r]/g, splitkey);
                            const csvarr = rsstr.split(splitkey);

                            const datas = [];
                            const headers = csvarr[0].split(',');
                            for (let i = 1; i < csvarr.length; i++) {
                                const data = {};
                                const temp = csvarr[i].split(',');
                                for (let j = 0; j < temp.length; j++) {
                                    data[headers[j]] = temp[j];
                                }
                                datas.push(data);
                            }
                            self.postMessage(['loadcsv_success', datas]);
                        };
                        reader.readAsText(blob);
                    })
                })
                .catch(err => {
                    self.postMessage(['loadcsv_error', filepath, err]);
                });
        }
    },
    false
);
