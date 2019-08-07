
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
                },
                formatDate(date){
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var ampm = hours >= 12 ? 'pm' : 'am';
                    hours = hours % 12;
                    hours = hours ? hours : 12; 
                    minutes = minutes < 10 ? '0'+minutes : minutes;
                    var strTime = hours + ':' + minutes + ' ' + ampm;
                    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
                },
                status(stat) {
                    if (stat === 0) {
                        return "Order was placed by the client";
                    } else if (stat === 1) {
                        return "Order is being prepared by the supplier";
                    } else if (stat === 2) {
                        return "The order is ready to be shipped to courier";
                    } else if (stat === 3) {
                        return "The order has been shipped to the courier";
                    } else if (stat === 4) {
                        return "Received by the courier and preparing to be shipped";
                    } else if (stat === 5) {
                        return "The order is in transit to client";
                    } else if (stat === 6) {
                        return "Order recieved by the client";
                    } else if (stat === 7) {
                        return "Delivery completed";
                    }
                }
            }
        });
    }

}