export default () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;
        fetch('http://172.17.32.202:7001/tbk/item/getBaseData').then((data) => {
          console.log('data',data);
        });
        console.log('message', e);
        postMessage('postMessage');
    });
}
