const fs = require('fs');
module.exports = {
    write_2_stream: function(stream, data) {
        return new Promise(resolve => {
            if (!stream.write(data)) {
                stream.once('drain', () => {
                    resolve();
                });
            } else {
                process.nextTick(() => {
                    resolve();
                });
            }
        });
    },
}