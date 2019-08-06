
export default {

    install(Vue) {
        Vue.mixin({
            methods: {
                deepCopy(obj) {
                    return JSON.parse(JSON.stringify(obj));
                },
                parseCurrency(x) {
                    if (!x || isNaN(x)) return "₱ 0.00"
                    return "₱ " + parseFloat(x).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                }
            }
        });
    }

}