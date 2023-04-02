class Statistics {
    stats = []

    addStatOption(id, label, value) {
        if (label.length <= 0) {
            throw new Error('Label must be type of string and length must be longer than 1')
        }
        if (!value) {
            this.stats.push({ label, value: undefined })
            return
        }
        this.stats.push({ label, value: value })
    }

    remove(id) {
        this.stats.forEach((el, index) => {
            if (el.id === id) this.stats.splice(index, 1);
        })
    }
    render() { }
}