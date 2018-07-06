const Nightmare = require('nightmare');
const vo = require('vo');

function * run() {
    const nightmare = new Nightmare({
        show: false,
        frame: false,
        maxHeight:16384,
        maxWidth:16384,
        width: 1200,
        height: 1024,
    });

    const dimensions = yield nightmare.goto('https://github.com/')
        .wait('body')
        .evaluate(function() {
            var body = document.querySelector('body');
            return {
                width: body.scrollWidth,
                height: body.scrollHeight
            }
        });

    yield nightmare.viewport(dimensions.width, dimensions.height)
        .wait(1000)
        .screenshot('sample.png');

    yield nightmare.end();
}

vo(run)(function() {
    console.log('done');
});
