function provide(name) {
    let cwd = process.cwd();

    try {
        return require(`${cwd}/combine/directives/${name}`);
    } catch (e) {
        try {
            return require(`${cwd}/combine/directives/${name}-directive`);
        } catch (e) {
            return require(`@combinejs/${name}-directive`);
        }
    }
}

module.exports = provide;

